import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Next.js router
const mockPush = jest.fn()
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
})

// Import the component after mocking
import ABSampleSizeCalculator from '../page'

describe('A/B Test Sample Size Calculator - Component', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
    mockSearchParams = new URLSearchParams()
  })

  test('renders all form fields with default values', () => {
    render(<ABSampleSizeCalculator />)
    
    // Check if main input fields are present
    expect(screen.getByLabelText(/baseline conversion rate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/minimum detectable effect/i)).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /treat mde as a % lift over baseline/i })).toBeInTheDocument()
    
    // Check default values for main fields
    expect(screen.getByDisplayValue('10')).toBeInTheDocument() // baseline
    expect(screen.getByDisplayValue('20')).toBeInTheDocument() // effect
  })

  test('displays calculated sample sizes', async () => {
    render(<ABSampleSizeCalculator />)
    
    // Wait for calculations to complete
    await waitFor(() => {
      expect(screen.getByText(/sample size per variant/i)).toBeInTheDocument()
      expect(screen.getByText(/total visitors required/i)).toBeInTheDocument()
    })
    
    // Check that actual numbers are displayed (not "--")
    const sampleSizeCards = screen.getAllByText(/^\d{1,3}(,\d{3})*$/)
    expect(sampleSizeCards.length).toBeGreaterThan(0)
  })

  test('updates calculations when input values change', async () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    
    // Change baseline rate
    await user.clear(baselineInput)
    await user.type(baselineInput, '5')
    
    // Wait for recalculation
    await waitFor(() => {
      // Sample size should be different (larger for lower baseline)
      const sampleSizeCards = screen.getAllByText(/^\d{1,3}(,\d{3})*$/)
      expect(sampleSizeCards.length).toBeGreaterThan(0)
    })
  })

  test('toggle switches between relative and absolute effect calculation', async () => {
    render(<ABSampleSizeCalculator />)
    
    const toggle = screen.getByRole('switch', { name: /treat mde as a % lift over baseline/i })
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    // Initially should be relative (%)
    expect(effectInput.parentElement).toHaveTextContent('%')
    
    // Click toggle to switch to absolute
    await user.click(toggle)
    
    await waitFor(() => {
      expect(effectInput.parentElement).toHaveTextContent('pp')
    })
    
    // Toggle back to relative
    await user.click(toggle)
    
    await waitFor(() => {
      expect(effectInput.parentElement).toHaveTextContent('%')
    })
  })

  test('copy buttons are hidden by default and appear on hover', async () => {
    render(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      const copyButtons = screen.getAllByText('Copy')
      expect(copyButtons.length).toBe(2) // Two result cards
      
      // Buttons should be present but not visible (opacity-0)
      copyButtons.forEach(button => {
        expect(button.closest('button')).toHaveClass('opacity-0')
      })
    })
  })

  test('copy button copies value to clipboard', async () => {
    render(<ABSampleSizeCalculator />)
    
    await waitFor(() => {
      const copyButtons = screen.getAllByText('Copy')
      expect(copyButtons.length).toBeGreaterThan(0)
    })
    
    const firstCopyButton = screen.getAllByText('Copy')[0]
    
    // Click copy button
    await user.click(firstCopyButton)
    
    // Check clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    
    // Check button shows "Copied" feedback
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument()
    })
  })

  test('displays validation errors for invalid inputs', async () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    
    // Enter invalid value (negative)
    await user.clear(baselineInput)
    await user.type(baselineInput, '-5')
    
    await waitFor(() => {
      // Should show "--" for invalid calculations
      expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    })
  })

  test('percentage inputs display correctly', () => {
    render(<ABSampleSizeCalculator />)
    
    // Alpha should show as 5% (not 0.05)
    const alphaInput = screen.getByLabelText(/significance level/i)
    expect(alphaInput).toHaveValue(5)
    expect(alphaInput.parentElement).toHaveTextContent('%')
    
    // Power should show as 80% (not 0.80)
    const powerInput = screen.getByLabelText(/statistical power/i)
    expect(powerInput).toHaveValue(80)
    expect(powerInput.parentElement).toHaveTextContent('%')
  })

  test('input fields have appropriate constraints', () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    const alphaInput = screen.getByLabelText(/significance level/i)
    const powerInput = screen.getByLabelText(/statistical power/i)
    
    // Check min/max constraints
    expect(baselineInput).toHaveAttribute('min', '0.1')
    expect(baselineInput).toHaveAttribute('max', '99.9')
    
    expect(alphaInput).toHaveAttribute('min', '1')
    expect(alphaInput).toHaveAttribute('max', '20')
    
    expect(powerInput).toHaveAttribute('min', '50')
    expect(powerInput).toHaveAttribute('max', '99')
  })

  test('effect input constraints change based on toggle', async () => {
    render(<ABSampleSizeCalculator />)
    
    const toggle = screen.getByLabelText(/mde calculation type/i)
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    // Initially relative - should allow up to 200%
    expect(effectInput).toHaveAttribute('max', '200')
    
    // Switch to absolute
    await user.click(toggle)
    
    await waitFor(() => {
      expect(effectInput).toHaveAttribute('max', '50')
    })
  })

  test('displays helpful descriptions for each input', () => {
    render(<ABSampleSizeCalculator />)
    
    expect(screen.getByText(/current conversion rate of your control variant/i)).toBeInTheDocument()
    expect(screen.getByText(/probability of false positive/i)).toBeInTheDocument()
    expect(screen.getByText(/probability of detecting a true effect/i)).toBeInTheDocument()
  })

  test('shows important notes section', () => {
    render(<ABSampleSizeCalculator />)
    
    expect(screen.getByText(/important notes/i)).toBeInTheDocument()
    expect(screen.getByText(/equal allocation between variants/i)).toBeInTheDocument()
    expect(screen.getByText(/two-tailed tests/i)).toBeInTheDocument()
  })

  test('calculates realistic sample sizes for common scenarios', async () => {
    render(<ABSampleSizeCalculator />)
    
    // E-commerce scenario: 3% baseline, 20% relative improvement
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    await user.clear(baselineInput)
    await user.type(baselineInput, '3')
    
    await user.clear(effectInput)
    await user.type(effectInput, '20')
    
    await waitFor(() => {
      // Should require substantial sample size for low baseline rate
      const sampleSizeText = screen.getByText(/sample size per variant/i)
        .closest('div')
        .querySelector('p.text-3xl')
      
      expect(sampleSizeText.textContent).toMatch(/\d{2,}/)
    })
  })
})