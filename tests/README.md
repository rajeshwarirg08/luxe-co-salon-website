# Stylish Salon Website - Test Suite

This directory contains unit tests and property-based tests for the Stylish Salon website.

## Test Framework

- **Vitest**: Modern, fast unit testing framework
- **jsdom**: DOM environment for testing HTML/CSS in Node.js

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Test Structure

```
tests/
├── setup.js                           # Test setup and helper functions
├── unit/                              # Unit tests
│   └── design-system.test.js         # Design system variable tests
└── properties/                        # Property-based tests
    ├── css-variables.property.test.js # CSS variable usage tests
    └── contrast.property.test.js      # WCAG AA contrast compliance tests
```

## Unit Tests

### Design System Tests (`unit/design-system.test.js`)

Tests for **Requirements 1.1 and 1.5**:

#### Color Palette Variables
- ✓ Verifies `--color-primary` is defined as #FBF9F6
- ✓ Verifies `--color-background` is defined as #1C1C1C
- ✓ Verifies `--color-accent` is defined as #D4AF37
- ✓ Verifies `--color-accent-alt` is defined as #C5A059

#### Typography Variables
- ✓ Verifies `--font-heading` contains 'Playfair Display'
- ✓ Verifies `--font-body` contains 'Inter'

#### Spacing Scale Variables
- ✓ Verifies all spacing variables (xs, sm, md, lg, xl) are defined with correct rem values

#### Typography Scale Variables
- ✓ Verifies all text size variables (xs through 3xl) are defined with correct rem values

#### Layout Variables
- ✓ Verifies `--container-max` is 1200px
- ✓ Verifies `--border-radius` is 0.25rem

#### Transition Variables
- ✓ Verifies transition timing variables (fast, normal, slow) are defined correctly

#### Font Family Application
- ✓ Verifies Playfair Display is applied to heading elements (h1, h2, h3)
- ✓ Verifies Inter is applied to body text elements

#### Color Value Specifications
- ✓ Verifies primary color is used for light backgrounds (hero section)
- ✓ Verifies background color is used for dark sections (services section)
- ✓ Verifies accent color is used for CTA buttons

## Test Coverage

Current test coverage focuses on:
- CSS custom property definitions
- Color palette correctness
- Typography system implementation
- Spacing and layout variables
- Transition timing consistency
- Font family application to elements
- **WCAG AA contrast compliance for all text elements**

## Property-Based Tests

### Contrast Compliance Tests (`properties/contrast.property.test.js`)

Tests for **Property 3: WCAG AA Contrast Compliance** (Requirements 1.4, 9.1):

#### Unit Tests for Known Color Combinations
- ✓ Verifies primary color (#FBF9F6) on background color (#1C1C1C) meets WCAG AA
- ✓ Verifies background color on primary color meets WCAG AA
- ✓ Verifies accent color (#D4AF37) on background color meets WCAG AA
- ✓ Verifies background color on accent color meets WCAG AA

#### Property-Based Tests
- ✓ **Property 3**: For any text element in the document, verifies it meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text 18pt+)
- ✓ **Property 3**: For any heading element, verifies it meets WCAG AA contrast requirements
- ✓ **Property 3**: For any interactive element (buttons, links, inputs), verifies it meets WCAG AA contrast requirements

The test includes:
- Automatic CSS variable resolution for jsdom compatibility
- Proper calculation of relative luminance according to WCAG formula
- Contrast ratio calculation following WCAG standards
- Detection of "large text" (18pt/24px or 14pt/18.66px bold)
- Walking up the DOM tree to find effective background colors
- Detailed failure reporting with color values and ratios

### CSS Variable Usage Tests (`properties/css-variables.property.test.js`)

Tests for **Property 18: CSS Variable Usage for Repeated Values** (Requirement 10.3):

- ✓ Verifies repeated color values (>2 occurrences) are defined as CSS variables
- ✓ Verifies repeated spacing values (>2 occurrences) are defined as CSS variables
- ✓ Verifies repeated timing values (>2 occurrences) are defined as CSS variables
- ✓ **Property 18**: For any CSS property value appearing more than twice, verifies it uses CSS variables
- ✓ **Property 18 (inverse)**: Verifies all defined CSS variables are actually used in the stylesheet

## Notes

- Tests use jsdom which has limitations with CSS variable resolution in `getComputedStyle()`
- Tests verify both the CSS variable definitions and their application to elements
- Color tests convert RGB values to hex for comparison with specifications
