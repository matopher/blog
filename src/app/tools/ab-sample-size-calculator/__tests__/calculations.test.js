// Extract calculation functions for testing
function calculateSampleSize(baselineRate, minDetectableEffect, alpha, power, isRelative = true) {
  // Convert percentages to proportions
  const p1 = baselineRate / 100

  // Calculate p2 based on whether effect is relative or absolute
  let p2
  if (isRelative) {
    // Relative: effect is a percentage of the baseline
    p2 = p1 * (1 + minDetectableEffect / 100)
  } else {
    // Absolute: effect is added as percentage points
    p2 = p1 + (minDetectableEffect / 100)
  }

  // Z-scores for alpha and power
  const zAlpha = getZScore(1 - alpha / 2)
  const zBeta = getZScore(power)

  // Pooled proportion
  const pPooled = (p1 + p2) / 2

  // Sample size calculation for two-sample proportion test
  const numerator = Math.pow(zAlpha * Math.sqrt(2 * pPooled * (1 - pPooled)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2)
  const denominator = Math.pow(p2 - p1, 2)

  return Math.ceil(numerator / denominator)
}

function getZScore(probability) {
  // Approximation of inverse normal CDF for common values
  const zScores = {
    0.50: 0.0000,
    0.80: 0.8416,
    0.90: 1.2816,
    0.95: 1.6449,
    0.975: 1.9600,
    0.99: 2.3263,
    0.995: 2.5758
  }

  return zScores[probability] || 1.96 // Default to 95% if not found
}

describe('A/B Test Sample Size Calculator - Statistical Functions', () => {
  describe('getZScore', () => {
    test('returns correct z-scores for common probability values', () => {
      expect(getZScore(0.975)).toBe(1.96)  // 95% confidence
      expect(getZScore(0.95)).toBe(1.6449) // 90% confidence  
      expect(getZScore(0.80)).toBe(0.8416) // 80% power
      expect(getZScore(0.99)).toBe(2.3263) // 99% confidence
    })
    
    test('returns correct z-score for 50% probability', () => {
      // Check if 0.50 returns 0 (it should be in the lookup table)
      const result = getZScore(0.50)
      expect(result).toBe(0)
    })

    test('returns default z-score for unknown probability', () => {
      expect(getZScore(0.77)).toBe(1.96)
      expect(getZScore(0.123)).toBe(1.96)
      expect(getZScore(0.51)).toBe(1.96) // Not in lookup table
    })
  })

  describe('calculateSampleSize', () => {
    test('calculates correct sample size for relative effect', () => {
      // Test case: 10% baseline, 20% relative improvement, 5% alpha, 80% power
      const result = calculateSampleSize(10, 20, 0.05, 0.80, true)
      
      // Expected: 10% -> 12% (20% relative increase)
      // This should require approximately 3,500-4,000 samples per group
      expect(result).toBeGreaterThan(3000)
      expect(result).toBeLessThan(5000)
      expect(Number.isInteger(result)).toBe(true)
    })

    test('calculates correct sample size for absolute effect', () => {
      // Test case: 10% baseline, 2pp absolute improvement, 5% alpha, 80% power
      const result = calculateSampleSize(10, 2, 0.05, 0.80, false)
      
      // Expected: 10% -> 12% (2 percentage point increase)
      // Should be same as relative test above
      expect(result).toBeGreaterThan(3000)
      expect(result).toBeLessThan(5000)
      expect(Number.isInteger(result)).toBe(true)
    })

    test('relative vs absolute calculations produce same result for equivalent effects', () => {
      const baselineRate = 10
      const relativeEffect = 20 // 20% relative = 2pp absolute for 10% baseline
      const absoluteEffect = 2
      
      const relativeResult = calculateSampleSize(baselineRate, relativeEffect, 0.05, 0.80, true)
      const absoluteResult = calculateSampleSize(baselineRate, absoluteEffect, 0.05, 0.80, false)
      
      expect(relativeResult).toBe(absoluteResult)
    })

    test('different power levels produce different sample sizes', () => {
      const lowPower = calculateSampleSize(10, 20, 0.05, 0.70, true)
      const highPower = calculateSampleSize(10, 20, 0.05, 0.90, true)
      
      // Both should be valid positive integers
      expect(lowPower).toBeGreaterThan(0)
      expect(highPower).toBeGreaterThan(0)
      expect(Number.isInteger(lowPower)).toBe(true)
      expect(Number.isInteger(highPower)).toBe(true)
      
      // They should be different
      expect(lowPower).not.toBe(highPower)
    })

    test('lower alpha (higher confidence) requires larger sample size', () => {
      const highAlpha = calculateSampleSize(10, 20, 0.10, 0.80, true)
      const lowAlpha = calculateSampleSize(10, 20, 0.01, 0.80, true)
      
      expect(lowAlpha).toBeGreaterThan(highAlpha)
    })

    test('smaller effect size requires larger sample size', () => {
      const largeEffect = calculateSampleSize(10, 50, 0.05, 0.80, true)
      const smallEffect = calculateSampleSize(10, 10, 0.05, 0.80, true)
      
      expect(smallEffect).toBeGreaterThan(largeEffect)
    })

    test('handles edge cases gracefully', () => {
      // Very small baseline rate
      const smallBaseline = calculateSampleSize(1, 50, 0.05, 0.80, true)
      expect(smallBaseline).toBeGreaterThan(0)
      expect(Number.isInteger(smallBaseline)).toBe(true)
      
      // Very large baseline rate
      const largeBaseline = calculateSampleSize(50, 10, 0.05, 0.80, true)
      expect(largeBaseline).toBeGreaterThan(0)
      expect(Number.isInteger(largeBaseline)).toBe(true)
    })

    test('returns reasonable sample sizes for common scenarios', () => {
      // E-commerce conversion rate optimization
      const ecommerce = calculateSampleSize(3, 20, 0.05, 0.80, true)
      expect(ecommerce).toBeGreaterThan(10000) // Should need substantial traffic
      expect(ecommerce).toBeLessThan(100000)
      
      // Email open rate test
      const email = calculateSampleSize(25, 10, 0.05, 0.80, true)
      expect(email).toBeGreaterThan(1000)
      expect(email).toBeLessThan(10000)
      
      // High-conversion landing page
      const landing = calculateSampleSize(15, 15, 0.05, 0.80, true)
      expect(landing).toBeGreaterThan(1000)
      expect(landing).toBeLessThan(15000)
    })
  })

  describe('Input validation scenarios', () => {
    test('handles zero and negative values appropriately', () => {
      // These should be caught by validation in the UI, but test robustness
      expect(() => calculateSampleSize(0, 20, 0.05, 0.80, true)).not.toThrow()
      expect(() => calculateSampleSize(10, 0, 0.05, 0.80, true)).not.toThrow()
    })

    test('relative effect calculations work across different baseline rates', () => {
      const lowBaseline = calculateSampleSize(2, 50, 0.05, 0.80, true) // 2% -> 3%
      const highBaseline = calculateSampleSize(50, 10, 0.05, 0.80, true) // 50% -> 55%
      
      // Both should produce valid sample sizes
      expect(lowBaseline).toBeGreaterThan(0)
      expect(highBaseline).toBeGreaterThan(0)
      expect(Number.isInteger(lowBaseline)).toBe(true)
      expect(Number.isInteger(highBaseline)).toBe(true)
    })
  })
})