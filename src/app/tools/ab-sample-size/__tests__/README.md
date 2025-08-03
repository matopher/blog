# A/B Test Sample Size Calculator - Tests

This directory contains comprehensive tests for the A/B test sample size calculator to ensure statistical accuracy and prevent regressions.

## Test Files

### `calculations.test.js`
Unit tests for the core statistical functions:
- **`getZScore()`** - Tests z-score lookup table for common statistical values
- **`calculateSampleSize()`** - Tests sample size calculations for different scenarios
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

## Test Coverage

The tests cover:

✅ **Statistical Accuracy**
- Correct z-score calculations for confidence levels and power
- Proper relative vs absolute effect calculations
- Sample size calculations for various scenarios
- Edge case handling (very low/high baseline rates)

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

## Known Test Issues

Some tests may need adjustment based on statistical precision:
- Z-score lookup table precision (floating point comparisons)
- Statistical power relationship direction (needs verification)

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