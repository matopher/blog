# A/B Test Sample Size Calculator - Tests

This directory contains comprehensive tests for the A/B test sample size calculator to ensure statistical accuracy and prevent regressions.

## Test Files

### `calculations.test.js`
Unit tests for the core statistical functions:
- **`getZScore()`** - Tests Beasley-Springer-Moro inverse normal CDF approximation
- **`calculateSampleSize()`** - Tests sample size calculations using classic A/B testing formula
- **Edge cases** - Tests validation and boundary conditions  
- **Real-world scenarios** - Tests common use cases (e-commerce, email, landing pages)

### `component.test.js`
Component and UI interaction tests:
- **Form rendering** - Tests that all inputs render with correct default values
- **User interactions** - Tests input changes, toggle switches, and form validation
- **Copy functionality** - Tests clipboard copying and visual feedback
- **Calculations** - Tests that UI changes trigger recalculations
- **Accessibility** - Tests input constraints and helpful descriptions

### `url-params.test.js`
URL parameter integration tests:
- **Parameter loading** - Tests loading values from URL on page load
- **Parameter updates** - Tests URL updates when form values change
- **Error handling** - Tests graceful handling of invalid URL parameters
- **Shareability** - Tests creating shareable URLs for common scenarios

### `input-handling.test.js`
Input field behavior and UX tests:
- **Leading zero removal** - Prevents confusing leading zeros in number inputs
- **Decimal preservation** - Maintains valid decimal formats like "0.5"
- **Edge cases** - Empty inputs, multiple zeros, decimal handling
- **Integration** - Ensures calculator functionality works with cleaned inputs
- **Regression prevention** - Guards against UX issues returning

## Test Coverage

The tests cover:

✅ **Statistical Accuracy**
- Precise inverse normal CDF calculations for any confidence level and power
- Classic A/B testing formula matching industry standards (Evan Miller, etc.)
- Proper relative vs absolute effect calculations
- Sample size calculations for various scenarios
- Edge case handling and input validation

✅ **User Interface**
- Form field rendering and default values
- Input validation and constraints
- Toggle functionality (relative/absolute effects)
- Copy button behavior and hover states
- Real-time calculation updates

✅ **URL Integration**
- Parameter persistence across page loads
- URL updates on form changes
- Invalid parameter handling
- Shareable link generation

## Running Tests

```bash
# Run all A/B test calculator tests
npm test -- --testPathPatterns=ab-sample-size

# Run specific test file
npm test -- calculations.test.js
npm test -- component.test.js
npm test -- url-params.test.js

# Run tests in watch mode
npm run test:watch -- --testPathPatterns=ab-sample-size
```

## Statistical Methodology

The calculator uses the **classic A/B testing approach**:
- **Null Hypothesis**: Both groups have baseline conversion rate
- **Formula**: Industry-standard two-proportion z-test  
- **Accuracy**: Matches established tools like Evan Miller's calculator
- **Z-scores**: Beasley-Springer-Moro inverse normal CDF (15+ decimal precision)

## Test Scenarios Covered

### Statistical Validation
- E-commerce conversion rates (2-5% baseline)
- Email marketing (20-30% baseline)  
- Landing page optimization (10-20% baseline)
- High-conversion scenarios (40%+ baseline)

### UI Edge Cases
- Invalid input values (negative, zero, out of range)
- Very large numbers (formatting and display)
- Rapid input changes (debouncing)
- Mobile/touch interactions

### Integration Scenarios
- Deep linking with parameters
- Browser back/forward navigation
- Bookmarking and sharing
- URL parameter validation

## Future Improvements

- Add performance tests for large calculations
- Add visual regression tests for UI components
- Add accessibility compliance tests
- Add cross-browser compatibility tests
- Add mobile-specific interaction tests