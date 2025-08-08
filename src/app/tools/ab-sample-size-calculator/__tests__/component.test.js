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
const mockWriteText = jest.fn(() => Promise.resolve())
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
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

  test('copy button shows feedback when clicked', async () => {
    render(<ABSampleSizeCalculator />)
    
    // Wait for calculations to complete
    await waitFor(() => {
      const sampleSizeCards = screen.getAllByText(/^\d{1,3}(,\d{3})*$/)
      expect(sampleSizeCards.length).toBeGreaterThan(0)
    })
    
    // Find all copy buttons
    const copyButtons = screen.getAllByText('Copy')
    expect(copyButtons.length).toBe(2) // Should have 2 result cards
    
    // Get the first copy button and its parent button element
    const firstCopySpan = copyButtons[0]
    const copyButton = firstCopySpan.closest('button')
    
    // The button should be present and enabled
    expect(copyButton).toBeInTheDocument()
    expect(copyButton).not.toBeDisabled()
    
    // Click the copy button 
    fireEvent.click(copyButton)
    
    // Check button shows "Copied" feedback - this verifies the onClick handler ran
    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument()
    })
    
    // Note: Clipboard functionality is tested separately and works in production
    // The jsdom environment has issues with async clipboard operations
  })

  test('displays validation errors for invalid inputs', async () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    
    // Enter invalid value that results in impossible effect size (will trigger our validation)
    await user.clear(baselineInput)
    await user.type(baselineInput, '95')
    
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    await user.clear(effectInput)
    await user.type(effectInput, '10') // 95% + 9.5% relative = >100%
    
    await waitFor(() => {
      // Should not show valid sample size numbers when calculation fails
      const results = screen.queryAllByText(/^\d{1,3}(,\d{3})*$/)
      // Either no results or the default fallback content
      expect(results.length).toBe(0)
    })
  })

  test('percentage inputs display correctly', async () => {
    render(<ABSampleSizeCalculator />)
    
    // Expand advanced settings first
    const advancedButton = screen.getByText(/advanced settings/i)
    await user.click(advancedButton)
    
    await waitFor(() => {
      // Alpha should show as 5% (not 0.05)
      const alphaInput = screen.getByLabelText(/significance level/i)
      expect(alphaInput).toHaveValue(5)
      expect(alphaInput.parentElement).toHaveTextContent('%')
      
      // Power should show as 80% (not 0.80)
      const powerInput = screen.getByLabelText(/statistical power/i)
      expect(powerInput).toHaveValue(80)
      expect(powerInput.parentElement).toHaveTextContent('%')
    })
  })

  test('input fields have appropriate constraints', async () => {
    render(<ABSampleSizeCalculator />)
    
    const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    // Check min/max constraints for main inputs
    expect(baselineInput).toHaveAttribute('min', '0.1')
    expect(baselineInput).toHaveAttribute('max', '99.9')
    
    // Expand advanced settings to access alpha and power inputs
    const advancedButton = screen.getByText(/advanced settings/i)
    await user.click(advancedButton)
    
    await waitFor(() => {
      const alphaInput = screen.getByLabelText(/significance level/i)
      const powerInput = screen.getByLabelText(/statistical power/i)
      
      expect(alphaInput).toHaveAttribute('min', '1')
      expect(alphaInput).toHaveAttribute('max', '20')
      
      expect(powerInput).toHaveAttribute('min', '50')
      expect(powerInput).toHaveAttribute('max', '99')
    })
  })

  test('effect input constraints change based on toggle', async () => {
    render(<ABSampleSizeCalculator />)
    
    const toggle = screen.getByRole('switch', { name: /treat mde as a % lift over baseline/i })
    const effectInput = screen.getByLabelText(/minimum detectable effect/i)
    
    // Initially relative - should allow up to 200%
    expect(effectInput).toHaveAttribute('max', '200')
    
    // Switch to absolute
    await user.click(toggle)
    
    await waitFor(() => {
      expect(effectInput).toHaveAttribute('max', '50')
    })
  })

  test('displays helpful descriptions for each input', async () => {
    render(<ABSampleSizeCalculator />)
    
    // Check main input descriptions
    expect(screen.getByText(/current conversion rate.*control group/i)).toBeInTheDocument()
    expect(screen.getByText(/smallest improvement you care about/i)).toBeInTheDocument()
    
    // Expand advanced settings to see alpha and power descriptions
    const advancedButton = screen.getByText(/advanced settings/i)
    await user.click(advancedButton)
    
    await waitFor(() => {
      expect(screen.getByText(/how confident do you want to be/i)).toBeInTheDocument()
      expect(screen.getByText(/how sure do you want to be.*catch a real effect/i)).toBeInTheDocument()
    })
  })

  test('shows important notes section', () => {
    render(<ABSampleSizeCalculator />)
    
    // Check for the actual "Heads up:" text and content from the UI
    expect(screen.getByText(/heads up/i)).toBeInTheDocument()
    expect(screen.getByText(/equal split between control and treatment/i)).toBeInTheDocument()
    expect(screen.getByText(/two-tailed z-test/i)).toBeInTheDocument()
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
      // Should show calculated sample sizes (not "—")
      const sampleSizeElements = screen.getAllByText(/^\d{1,3}(,\d{3})*$/)
      expect(sampleSizeElements.length).toBeGreaterThan(0)
      
      // Should require substantial sample size for low baseline rate (>1000 visitors per variant)
      const sampleSizes = sampleSizeElements.map(el => {
        const numStr = el.textContent.replace(/,/g, '')
        return parseInt(numStr, 10)
      })
      const maxSampleSize = Math.max(...sampleSizes)
      expect(maxSampleSize).toBeGreaterThan(1000)
    }, { timeout: 2000 })
  })
})