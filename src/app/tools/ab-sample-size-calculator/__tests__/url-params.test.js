import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Next.js router with URL parameters
const mockPush = jest.fn()
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}))

// Mock window.history for URL updates
const mockReplaceState = jest.fn()
Object.defineProperty(window, 'history', {
  value: { replaceState: mockReplaceState },
  writable: true,
})

// Mock window.location 
delete window.location
window.location = { pathname: '/tools/ab-sample-size-calculator' }

import ABSampleSizeCalculator from '../page'

describe('A/B Test Sample Size Calculator - URL Parameters', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
    mockSearchParams = new URLSearchParams()
    mockReplaceState.mockClear()
  })

  test('loads default values when no URL parameters are present', () => {
    render(<ABSampleSizeCalculator />)
    
    expect(screen.getByDisplayValue('10')).toBeInTheDocument() // baseline
    expect(screen.getByDisplayValue('20')).toBeInTheDocument() // effect
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()  // alpha
    expect(screen.getByDisplayValue('80')).toBeInTheDocument() // power
  })

  test('loads values from URL parameters', async () => {
    // Set up URL parameters
    mockSearchParams = new URLSearchParams({
      baseline: '15',
      effect: '25',
      relative: 'true',
      alpha: '0.01',
      power: '0.90'
    })

    render(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('15')).toBeInTheDocument() // baseline
      expect(screen.getByDisplayValue('25')).toBeInTheDocument() // effect
      expect(screen.getByDisplayValue('1')).toBeInTheDocument()  // alpha as percentage
      expect(screen.getByDisplayValue('90')).toBeInTheDocument() // power as percentage
    })
  })

  test('handles invalid URL parameters gracefully', async () => {
    mockSearchParams = new URLSearchParams({
      baseline: 'invalid',
      effect: '-10',
      alpha: '2.5', // Invalid - too high
      power: 'abc'
    })

    render(<ABSampleSizeCalculator />)
    
    // Should fall back to defaults for invalid values
    await waitFor(() => {
      expect(screen.getByDisplayValue('10')).toBeInTheDocument() // baseline default
      expect(screen.getByDisplayValue('20')).toBeInTheDocument() // effect default
      expect(screen.getByDisplayValue('5')).toBeInTheDocument()  // alpha default
      expect(screen.getByDisplayValue('80')).toBeInTheDocument() // power default
    })
  })

  test('updates URL when form values change', async () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    
    // Change a value
    await user.clear(baselineInput)
    await user.type(baselineInput, '8')
    
    await waitFor(() => {
      // URL should be updated
      expect(mockReplaceState).toHaveBeenCalled()
      const lastCall = mockReplaceState.mock.calls[mockReplaceState.mock.calls.length - 1]
      expect(lastCall[2]).toContain('baseline=8')
    })
  })

  test('preserves all parameters in URL updates', async () => {
    render(<ABSampleSizeCalculator />)
    
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    await user.clear(effectInput)
    await user.type(effectInput, '30')
    
    await waitFor(() => {
      expect(mockReplaceState).toHaveBeenCalled()
      const lastCall = mockReplaceState.mock.calls[mockReplaceState.mock.calls.length - 1]
      const url = lastCall[2]
      
      // Should contain all parameters
      expect(url).toContain('baseline=10')
      expect(url).toContain('effect=30')
      expect(url).toContain('relative=true')
      expect(url).toContain('alpha=0.05')
      expect(url).toContain('power=0.8')
    })
  })

  test('handles relative/absolute toggle in URL', async () => {
    mockSearchParams = new URLSearchParams({
      baseline: '10',
      effect: '2',
      relative: 'false', // Absolute mode
      alpha: '0.05',
      power: '0.80'
    })

    render(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      const effectInput = screen.getByLabelText(/minimum detectable effect/i)
      // Should show "pp" suffix for absolute mode
      expect(effectInput.parentElement).toHaveTextContent('pp')
    })
  })

  test('URL parameters work with percentage conversion', async () => {
    mockSearchParams = new URLSearchParams({
      baseline: '12',
      effect: '18',
      relative: 'true',
      alpha: '0.10', // Should display as 10%
      power: '0.85'  // Should display as 85%
    })

    render(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('12')).toBeInTheDocument() // baseline
      expect(screen.getByDisplayValue('18')).toBeInTheDocument() // effect
      expect(screen.getByDisplayValue('10')).toBeInTheDocument() // alpha as 10%
      expect(screen.getByDisplayValue('85')).toBeInTheDocument() // power as 85%
    })
  })

  test('maintains URL state across component re-renders', async () => {
    const { rerender } = render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    await user.clear(baselineInput)
    await user.type(baselineInput, '7')
    
    // Re-render component
    rerender(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      // Should maintain the updated value
      expect(screen.getByDisplayValue('7')).toBeInTheDocument()
    })
  })

  test('handles edge cases in URL parameter parsing', async () => {
    mockSearchParams = new URLSearchParams({
      baseline: '0', // Edge case - zero
      effect: '1000', // Edge case - very large
      relative: 'maybe', // Invalid boolean
      alpha: '0', // Edge case - zero
      power: '1.5' // Edge case - over 100%
    })

    render(<ABSampleSizeCalculator />)
    
    // Should handle gracefully and fall back to reasonable defaults
    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton')
      inputs.forEach(input => {
        expect(input.value).toMatch(/^\d+(\.\d+)?$/) // Should be valid numbers
      })
    })
  })

  test('creates shareable URLs for common scenarios', async () => {
    render(<ABSampleSizeCalculator />)
    
    // Set up a common e-commerce scenario
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    const alphaInput = screen.getByLabelText(/significance level/i)
    const powerInput = screen.getByLabelText(/statistical power/i)
    
    await user.clear(baselineInput)
    await user.type(baselineInput, '2.5')
    
    await user.clear(effectInput)
    await user.type(effectInput, '25')
    
    await user.clear(alphaInput)
    await user.type(alphaInput, '1')
    
    await user.clear(powerInput)
    await user.type(powerInput, '90')
    
    await waitFor(() => {
      expect(mockReplaceState).toHaveBeenCalled()
      const lastCall = mockReplaceState.mock.calls[mockReplaceState.mock.calls.length - 1]
      const url = lastCall[2]
      
      // Should create a complete, shareable URL
      expect(url).toContain('baseline=2.5')
      expect(url).toContain('effect=25')
      expect(url).toContain('relative=true')
      expect(url).toContain('alpha=0.01')
      expect(url).toContain('power=0.9')
    })
  })

  test('URL updates happen on every parameter change', async () => {
    render(<ABSampleSizeCalculator />)
    
    const toggle = screen.getByLabelText(/mde calculation type/i)
    
    // Click toggle
    await user.click(toggle)
    
    await waitFor(() => {
      expect(mockReplaceState).toHaveBeenCalled()
      const lastCall = mockReplaceState.mock.calls[mockReplaceState.mock.calls.length - 1]
      expect(lastCall[2]).toContain('relative=false')
    })
  })
})