'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

function CopyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
      <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
    </svg>
  )
}

function ResultCard({ title, value, description }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value.toString())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <button
          onClick={handleCopy}
          disabled={!value}
          className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-opacity opacity-0 group-hover:opacity-100 group-hover:duration-500 duration-1000 ${
            value 
              ? 'border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer text-zinc-700 dark:text-zinc-200' 
              : 'border-zinc-200 dark:border-zinc-700 cursor-not-allowed text-zinc-400 dark:text-zinc-500'
          }`}
          title={value ? "Copy value" : "No value to copy"}
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className={`h-4 w-4 ${value ? 'text-zinc-600 dark:text-zinc-300' : 'text-zinc-300 dark:text-zinc-600'}`} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <p className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
        {value?.toLocaleString() || '—'}
      </p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  )
}

export default function ABSampleSizeCalculator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Helper function to get URL parameter with fallback
  const getUrlParam = (key, defaultValue, validator = null) => {
    if (!searchParams) return defaultValue
    
    const value = searchParams.get(key)
    if (value === null) return defaultValue
    
    if (validator) {
      const validated = validator(value)
      return validated !== null ? validated : defaultValue
    }
    return value
  }
  
  // Validators
  const parseFloatParam = (value) => {
    const parsed = Number(value)
    return !isNaN(parsed) && parsed >= 0 ? parsed : null
  }
  
  const parseBoolean = (value) => {
    return value === 'true' ? true : value === 'false' ? false : null
  }
  
  const [baselineRate, setBaselineRate] = useState(10)
  const [minDetectableEffect, setMinDetectableEffect] = useState(20)
  const [isRelativeEffect, setIsRelativeEffect] = useState(true)
  const [alpha, setAlpha] = useState(0.05)
  const [power, setPower] = useState(0.80)
  const [sampleSize, setSampleSize] = useState(null)
  const [totalVisitors, setTotalVisitors] = useState(null)

  // Load URL parameters on mount
  useEffect(() => {
    if (searchParams) {
      const baseline = getUrlParam('baseline', 10, parseFloatParam)
      const effect = getUrlParam('effect', 20, parseFloatParam)
      const relative = getUrlParam('relative', true, parseBoolean)
      const alphaParam = getUrlParam('alpha', 0.05, parseFloatParam)
      const powerParam = getUrlParam('power', 0.80, parseFloatParam)
      
      setBaselineRate(baseline)
      setMinDetectableEffect(effect)
      setIsRelativeEffect(relative)
      setAlpha(alphaParam)
      setPower(powerParam)
    }
  }, [searchParams])

  // Update URL parameters when form values change
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('baseline', baselineRate.toString())
    params.set('effect', minDetectableEffect.toString())
    params.set('relative', isRelativeEffect.toString())
    params.set('alpha', alpha.toString())
    params.set('power', power.toString())
    
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [baselineRate, minDetectableEffect, isRelativeEffect, alpha, power])

  // Calculate sample size when parameters change
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
      title="How many visitors do you need to run your A/B test?"
      intro="Use this quick calculator to get your sample size. Built for marketers, PMs, and experiment-happy folks who hate stats jargon."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Test Setup
          </h2>

          <InputField
            label="Baseline Conversion Rate"
            value={baselineRate}
            onChange={(value) => setBaselineRate(Number(value))}
            min="0.1"
            max="99.9"
            step="0.1"
            suffix="%"
            description="What's your current conversion rate? (Control group)"
          />

          <InputField
            label={isRelativeEffect ? "Minimum Detectable Effect (Relative)" : "Minimum Detectable Effect (Absolute)"}
            value={minDetectableEffect}
            onChange={(value) => setMinDetectableEffect(Number(value))}
            min="0.1"
            max={isRelativeEffect ? "200" : "50"}
            step="0.1"
            suffix={isRelativeEffect ? "%" : "pp"}
            description={
              isRelativeEffect
                ? "Smallest improvement you care about (% lift over baseline). (e.g. 10% = 50% → 55%)"
                : "Smallest improvement you care about (% lift over baseline). (e.g. 2pp = 50% → 52%)"
            }
          />

          <Toggle
            label="Treat MDE as a % lift over baseline?"
            enabled={isRelativeEffect}
            onChange={setIsRelativeEffect}
            description="(If off, uses absolute % point change instead)"
          />

          <InputField
            label="Significance Level (α)"
            value={alpha * 100}
            onChange={(value) => setAlpha(Number(value) / 100)}
            min="1"
            max="20"
            step="1"
            suffix="%"
            description="How confident do you want to be in your results? (5% = 95% confidence)"
          />

          <InputField
            label="Statistical Power (1-β)"
            value={power * 100}
            onChange={(value) => setPower(Number(value) / 100)}
            min="50"
            max="99"
            step="1"
            suffix="%"
            description="How sure do you want to be that you'll catch a real effect? (80% is a solid default)"
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
              💡 Heads up:
            </h3>
            <ul className="mt-2 space-y-1 text-xs text-amber-700 dark:text-amber-300">
              <li>• Assumes equal split between control and treatment</li>
              <li>• Uses a standard two-tailed z-test (normal approximation)</li>
              <li>• Seasonality and novelty effects can skew results</li>
              <li>• Longer tests = more reliable results (aim for a full biz cycle if you can)</li>
            </ul>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
