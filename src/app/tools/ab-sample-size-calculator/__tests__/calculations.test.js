// Extract calculation functions for testing (updated versions)
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

  // Validate that p2 is within valid bounds [0, 1]
  if (p2 < 0 || p2 > 1) {
    throw new Error('Invalid effect size: resulting proportion must be between 0% and 100%')
  }

  // Z-scores for alpha and power (two-tailed test)
  const zAlpha = getZScore(1 - alpha / 2)  // Critical value for Type I error
  const zBeta = getZScore(power)           // Critical value for Type II error (1-β)

  // Classic two-proportion sample size formula (industry standard)
  // Uses baseline rate for null hypothesis variance - standard for A/B testing
  
  // Under null hypothesis: both groups have baseline conversion rate p1
  const varianceNull = 2 * p1 * (1 - p1)
  
  // Under alternative hypothesis: groups have their respective rates
  const varianceAlt = p1 * (1 - p1) + p2 * (1 - p2)
  
  // Effect size (difference in proportions)
  const delta = Math.abs(p2 - p1)
  
  // Sample size per group using classic A/B testing formula
  const numerator = Math.pow(zAlpha * Math.sqrt(varianceNull) + zBeta * Math.sqrt(varianceAlt), 2)
  const denominator = Math.pow(delta, 2)

  const sampleSize = numerator / denominator
  
  // Round up to next integer (can't have fractional visitors)
  return Math.ceil(sampleSize)
}

function getZScore(probability) {
  // Beasley-Springer-Moro inverse normal CDF approximation
  // More accurate than lookup table for any probability value
  
  if (probability <= 0 || probability >= 1) {
    throw new Error('Probability must be between 0 and 1')
  }
  
  // For probabilities very close to 0.5, return 0
  if (Math.abs(probability - 0.5) < 1e-10) {
    return 0
  }
  
  let p = probability
  let sign = 1
  
  // Use symmetry for values > 0.5
  if (p > 0.5) {
    p = 1 - p
    sign = -1
  }
  
  // Beasley-Springer-Moro approximation coefficients
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00]
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01]
  const c = [0, -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00]
  const d = [0, 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00]
  
  let x
  
  if (p < 2.5e-1) {
    // Rational approximation for lower region
    const q = Math.sqrt(-2 * Math.log(p))
    x = (((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) / 
        ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1)
  } else {
    // Rational approximation for central region
    const q = p - 0.5
    const r = q * q
    x = (((((a[1] * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * r + a[6]) * q / 
        (((((b[1] * r + b[2]) * r + b[3]) * r + b[4]) * r + b[5]) * r + 1)
  }
  
  return sign * x
}

describe('A/B Test Sample Size Calculator - Statistical Functions', () => {
  describe('getZScore', () => {
    test('returns accurate z-scores for common probability values', () => {
      expect(getZScore(0.975)).toBeCloseTo(1.96, 3)    // 95% confidence
      expect(getZScore(0.95)).toBeCloseTo(1.6449, 3)   // 90% confidence  
      expect(getZScore(0.80)).toBeCloseTo(0.8416, 3)   // 80% power
      expect(getZScore(0.99)).toBeCloseTo(2.3263, 3)   // 99% confidence
    })
    
    test('returns correct z-score for 50% probability', () => {
      const result = getZScore(0.50)
      expect(result).toBeCloseTo(0, 10)
    })

    test('returns accurate z-scores for any probability value', () => {
      // Test values that weren't in the old lookup table
      expect(getZScore(0.77)).toBeCloseTo(0.739, 2)    // Should be ~0.739
      expect(getZScore(0.85)).toBeCloseTo(1.036, 2)    // Should be ~1.036
      expect(getZScore(0.025)).toBeCloseTo(-1.96, 2)   // Should be ~-1.96
    })

    test('throws error for invalid probability values', () => {
      expect(() => getZScore(0)).toThrow('Probability must be between 0 and 1')
      expect(() => getZScore(1)).toThrow('Probability must be between 0 and 1')
      expect(() => getZScore(-0.1)).toThrow('Probability must be between 0 and 1')
      expect(() => getZScore(1.1)).toThrow('Probability must be between 0 and 1')
    })
  })

  describe('calculateSampleSize', () => {
    test('calculates correct sample size for relative effect', () => {
      // Test case: 10% baseline, 20% relative improvement, 5% alpha, 80% power
      const result = calculateSampleSize(10, 20, 0.05, 0.80, true)
      
      // Expected: 10% -> 12% (20% relative increase)
      // Using classic formula: should be exactly 3,623 samples per group
      expect(result).toBe(3623)
      expect(Number.isInteger(result)).toBe(true)
    })

    test('calculates correct sample size for absolute effect', () => {
      // Test case: 10% baseline, 2pp absolute improvement, 5% alpha, 80% power
      const result = calculateSampleSize(10, 2, 0.05, 0.80, false)
      
      // Expected: 10% -> 12% (2 percentage point increase)
      // Should be same as relative test above: exactly 3,623
      expect(result).toBe(3623)
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
      // E-commerce conversion rate optimization (3% -> 3.6%)
      const ecommerce = calculateSampleSize(3, 20, 0.05, 0.80, true)
      expect(ecommerce).toBe(13051) // Updated expectation based on classic formula
      
      // Email open rate test (25% -> 27.5%)
      const email = calculateSampleSize(25, 10, 0.05, 0.80, true)
      expect(email).toBe(4754) // Updated expectation
      
      // High-conversion landing page (15% -> 17.25%)
      const landing = calculateSampleSize(15, 15, 0.05, 0.80, true)
      expect(landing).toBe(4024) // Updated expectation
    })
  })

  describe('Input validation scenarios', () => {
    test('handles zero and negative values appropriately', () => {
      // These should be caught by validation in the UI, but test robustness
      expect(() => calculateSampleSize(0, 20, 0.05, 0.80, true)).not.toThrow()
      expect(() => calculateSampleSize(10, 0, 0.05, 0.80, true)).not.toThrow()
    })

    test('throws error for impossible effect sizes', () => {
      // Test relative effect that would exceed 100%
      expect(() => calculateSampleSize(90, 20, 0.05, 0.80, true)).toThrow('Invalid effect size')
      
      // Test absolute effect that would exceed 100%
      expect(() => calculateSampleSize(90, 15, 0.05, 0.80, false)).toThrow('Invalid effect size')
      
      // Test negative resulting proportion
      expect(() => calculateSampleSize(5, -10, 0.05, 0.80, false)).toThrow('Invalid effect size')
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