import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ABSampleSizeCalculator from '../page'

const user = userEvent.setup()

// Mock Next.js router
const mockPush = jest.fn()
const mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}))

// Mock window.history
Object.defineProperty(window, 'history', {
  value: { replaceState: jest.fn() },
  writable: true,
})

// Mock window.location
delete window.location
window.location = {
  pathname: '/tools/ab-sample-size-calculator',
  search: '',
  hash: '',
  href: 'http://localhost/tools/ab-sample-size-calculator'
}

describe('A/B Test Calculator - Input Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Leading Zero Handling', () => {
    test('removes leading zeros from baseline conversion rate input', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field and type a value with leading zero
      await user.clear(baselineInput)
      await user.type(baselineInput, '05')
      
      // Should automatically remove the leading zero
      expect(baselineInput.value).toBe('5')
    })

    test('removes leading zeros from effect size input', async () => {
      render(<ABSampleSizeCalculator />)
      
      const effectInput = screen.getByLabelText(/minimum detectable effect/i)
      
      // Clear the field and type a value with leading zero
      await user.clear(effectInput)
      await user.type(effectInput, '025')
      
      // Should automatically remove the leading zero
      expect(effectInput.value).toBe('25')
    })

    test('preserves single zero', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field and type just zero
      await user.clear(baselineInput)
      await user.type(baselineInput, '0')
      
      // Should keep the single zero
      expect(baselineInput.value).toBe('0')
    })

    test('preserves decimal inputs with leading zero', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field and type a decimal with leading zero
      await user.clear(baselineInput)
      await user.type(baselineInput, '0.5')
      
      // Should preserve "0.5" format
      expect(baselineInput.value).toBe('0.5')
    })

    test('handles multiple leading zeros', async () => {
      render(<ABSampleSizeCalculator />)
      
      const effectInput = screen.getByLabelText(/minimum detectable effect/i)
      
      // Clear the field and type multiple leading zeros
      await user.clear(effectInput)
      await user.type(effectInput, '0015')
      
      // Should remove all leading zeros, leaving just "15"
      expect(effectInput.value).toBe('15')
    })

    test('handles leading zeros in decimal numbers', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field and type decimal with leading zeros
      await user.clear(baselineInput)
      await user.type(baselineInput, '005.5')
      
      // Should remove leading zeros but preserve decimal
      expect(baselineInput.value).toBe('5.5')
    })

    test('converts multiple zeros to single zero', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field and type multiple zeros
      await user.clear(baselineInput)
      await user.type(baselineInput, '000')
      
      // Should convert to single zero
      expect(baselineInput.value).toBe('0')
    })

    test('handles empty input gracefully', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      
      // Clear the field completely
      await user.clear(baselineInput)
      
      // Should convert empty input to "0" (our onChange handler behavior)
      // This is correct behavior since Number('') || 0 = 0
      expect(baselineInput.value).toBe('0')
    })

    test('works with advanced settings fields', async () => {
      render(<ABSampleSizeCalculator />)
      
      // Expand advanced settings
      const advancedButton = screen.getByText(/advanced settings/i)
      await user.click(advancedButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText(/significance level/i)).toBeInTheDocument()
      })
      
      const alphaInput = screen.getByLabelText(/significance level/i)
      
      // Clear and type value with leading zero
      await user.clear(alphaInput)
      await user.type(alphaInput, '01')
      
      // Should remove leading zero
      expect(alphaInput.value).toBe('1')
    })

    test('maintains calculator functionality with cleaned inputs', async () => {
      render(<ABSampleSizeCalculator />)
      
      const baselineInput = screen.getByLabelText(/baseline conversion rate/i)
      const effectInput = screen.getByLabelText(/minimum detectable effect/i)
      
      // Input values with leading zeros
      await user.clear(baselineInput)
      await user.type(baselineInput, '010')
      
      await user.clear(effectInput)  
      await user.type(effectInput, '020')
      
      // Verify the calculator still works with cleaned values
      await waitFor(() => {
        const sampleSizeElements = screen.getAllByText(/\d{1,3}(,\d{3})*/)
        expect(sampleSizeElements.length).toBeGreaterThan(0)
      })
      
      // Verify the inputs show cleaned values
      expect(baselineInput.value).toBe('10')
      expect(effectInput.value).toBe('20')
    })
  })
})