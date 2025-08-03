'use client'

import { useState, useEffect } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'

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

function InputField({ label, value, onChange, type = "number", min, max, step, suffix, description }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {label}
      </label>
      <div className="relative w-20">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-sm text-zinc-500 dark:text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </div>
  )
}

function Toggle({ label, enabled, onChange, description }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${enabled ? 'bg-teal-600' : 'bg-zinc-200 dark:bg-zinc-700'
          }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
      </button>
      {description && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </div>
  )
}

function ResultCard({ title, value, description }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
        {value?.toLocaleString() || '—'}
      </p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  )
}

export default function ABSampleSizeCalculator() {
  const [baselineRate, setBaselineRate] = useState(10)
  const [minDetectableEffect, setMinDetectableEffect] = useState(20)
  const [isRelativeEffect, setIsRelativeEffect] = useState(true)
  const [alpha, setAlpha] = useState(0.05)
  const [power, setPower] = useState(0.80)
  const [sampleSize, setSampleSize] = useState(null)
  const [totalVisitors, setTotalVisitors] = useState(null)

  useEffect(() => {
    try {
      if (baselineRate > 0 && minDetectableEffect > 0 && alpha > 0 && alpha < 1 && power > 0 && power < 1) {
        const n = calculateSampleSize(baselineRate, minDetectableEffect, alpha, power, isRelativeEffect)
        setSampleSize(n)
        setTotalVisitors(n * 2)
      } else {
        setSampleSize(null)
        setTotalVisitors(null)
      }
    } catch (error) {
      setSampleSize(null)
      setTotalVisitors(null)
    }
  }, [baselineRate, minDetectableEffect, alpha, power, isRelativeEffect])

  return (
    <SimpleLayout
      title="A/B Test Sample Size Calculator"
      intro="Calculate the required sample size for your A/B test using a two-sample proportion z-test. Input your test parameters below to get real-time sample size calculations."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Test Parameters
          </h2>

          <InputField
            label="Baseline Conversion Rate"
            value={baselineRate}
            onChange={setBaselineRate}
            min="0.1"
            max="99.9"
            step="0.1"
            suffix="%"
            description="Current conversion rate of your control variant"
          />

          <InputField
            label={isRelativeEffect ? "Minimum Detectable Effect (Relative)" : "Minimum Detectable Effect (Absolute)"}
            value={minDetectableEffect}
            onChange={setMinDetectableEffect}
            min="0.1"
            max={isRelativeEffect ? "200" : "50"}
            step="0.1"
            suffix={isRelativeEffect ? "%" : "pp"}
            description={
              isRelativeEffect
                ? `Smallest relative improvement (e.g., 20% means ${baselineRate}% → ${(baselineRate * (1 + minDetectableEffect / 100)).toFixed(1)}%)`
                : `Smallest absolute improvement (e.g., 2pp means ${baselineRate}% → ${(baselineRate + parseFloat(minDetectableEffect || 0)).toFixed(1)}%)`
            }
          />

          <Toggle
            label="Calculate MDE as Relative % Lift?"
            enabled={isRelativeEffect}
            onChange={setIsRelativeEffect}
            description={isRelativeEffect ? "Relative lift: MDE as % of baseline (e.g., 20% improvement)" : "Absolute lift: MDE as percentage points (e.g., 2pp improvement)"}
          />

          <InputField
            label="Significance Level (α)"
            value={alpha}
            onChange={setAlpha}
            min="0.01"
            max="0.20"
            step="0.01"
            description="Probability of false positive (typically 0.05 for 95% confidence)"
          />

          <InputField
            label="Statistical Power (1-β)"
            value={power}
            onChange={setPower}
            min="0.50"
            max="0.99"
            step="0.01"
            description="Probability of detecting a true effect (typically 0.80 for 80% power)"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Results
          </h2>

          <div className="space-y-4">
            <ResultCard
              title="Sample Size per Variant"
              value={sampleSize}
              description="Number of visitors needed in each variant (control and treatment)"
            />

            <ResultCard
              title="Total Visitors Required"
              value={totalVisitors}
              description="Total number of visitors needed for the entire test"
            />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Important Notes
            </h3>
            <ul className="mt-2 space-y-1 text-xs text-amber-700 dark:text-amber-300">
              <li>• This calculator assumes equal allocation between variants</li>
              <li>• Results are for two-tailed tests with normal approximation</li>
              <li>• Consider external factors like seasonality and novelty effects</li>
              <li>• Run tests for at least one full business cycle when possible</li>
            </ul>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
