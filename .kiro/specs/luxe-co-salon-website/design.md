# Design Document: Luxe & Co. Salon Website

## Overview

The Luxe & Co. salon website is a static, single-page application built with semantic HTML5 and vanilla CSS. The design emphasizes luxury aesthetics through careful typography choices, a sophisticated color palette, and smooth interactions. The website follows a mobile-first responsive approach and prioritizes accessibility compliance.

The architecture is component-based, with each major section (Navigation, Hero, Services, Stylists, Contact, Footer) designed as a self-contained module with its own styling. The design system uses CSS custom properties to ensure consistency and maintainability.

## Architecture

### High-Level Structure

```
index.html (Single Page Application)
├── <header> - Navigation Bar
├── <main>
│   ├── <section id="hero"> - Hero Section
│   ├── <section id="services"> - Services Menu
│   ├── <section id="about"> - Stylist Feature
│   ├── <section id="gallery"> - Gallery (placeholder)
│   └── <section id="contact"> - Contact Section
└── <footer> - Footer
```

### CSS Architecture

The CSS will be organized in a single stylesheet with the following structure:

1. **CSS Custom Properties** - Design system variables
2. **Reset & Base Styles** - Normalize and foundational styles
3. **Typography** - Font imports and text styling
4. **Layout Utilities** - Container, grid, flexbox utilities
5. **Component Styles** - Individual component styling
6. **Responsive Media Queries** - Breakpoint-specific overrides
7. **Animations & Transitions** - Reusable animation definitions

### Responsive Breakpoints

- **Mobile**: < 768px (base styles, mobile-first)
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px

### Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, transitions
- **JavaScript**: Minimal vanilla JS for hamburger menu toggle and smooth scrolling

## Components and Interfaces

### 1. Design System (CSS Variables)

The design system is implemented through CSS custom properties defined on the `:root` selector:

```css
:root {
  /* Color Palette */
  --color-primary: #FBF9F6;        /* Off-White */
  --color-background: #1C1C1C;     /* Deep Charcoal */
  --color-accent: #D4AF37;         /* Matte Gold */
  --color-accent-alt: #C5A059;     /* Alternative Gold */
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing Scale */
  --spacing-xs: 0.5rem;    /* 8px */
  --spacing-sm: 1rem;      /* 16px */
  --spacing-md: 2rem;      /* 32px */
  --spacing-lg: 4rem;      /* 64px */
  --spacing-xl: 6rem;      /* 96px */
  
  /* Typography Scale */
  --text-xs: 0.875rem;     /* 14px */
  --text-sm: 1rem;         /* 16px */
  --text-md: 1.125rem;     /* 18px */
  --text-lg: 1.5rem;       /* 24px */
  --text-xl: 2rem;         /* 32px */
  --text-2xl: 3rem;        /* 48px */
  --text-3xl: 4rem;        /* 64px */
  
  /* Layout */
  --container-max: 1200px;
  --border-radius: 0.25rem;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### 2. Navigation Bar Component

**Structure:**
```html
<header class="navbar">
  <div class="navbar__container">
    <div class="navbar__logo">Luxe & Co.</div>
    <button class="navbar__toggle" aria-label="Toggle navigation menu">
      <span class="navbar__toggle-icon"></span>
    </button>
    <nav class="navbar__nav">
      <ul class="navbar__list">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" class="btn btn--primary">Book Appointment</a>
    </nav>
  </div>
</header>
```

**Styling Approach:**
- Position: `fixed` with `top: 0` and `z-index: 1000`
- Background: `var(--color-background)` with subtle transparency
- Flexbox layout for horizontal alignment
- Hamburger menu hidden on desktop, visible on mobile
- Smooth color transitions on hover states

**Mobile Behavior:**
- Navigation links hidden by default
- Toggle button triggers `.navbar__nav--open` class
- Navigation slides in from top or fades in
- Overlay prevents body scroll when menu is open

### 3. Hero Section Component

**Structure:**
```html
<section id="hero" class="hero">
  <div class="hero__container">
    <h1 class="hero__title">Elevate Your Style</h1>
    <p class="hero__subtitle">Experience luxury hair care and styling in an elegant, modern setting</p>
    <a href="#contact" class="btn btn--primary btn--large">Book Your Appointment</a>
  </div>
</section>
```

**Styling Approach:**
- Full viewport width with centered content
- Large typography for impact (h1: `var(--text-3xl)`)
- Vertical centering using Flexbox
- Minimum height: `80vh` to `100vh`
- Background: `var(--color-primary)` with optional subtle texture
- Text color: `var(--color-background)` for contrast

### 4. Services Menu Component

**Structure:**
```html
<section id="services" class="services">
  <div class="services__container">
    <h2 class="services__title">Our Services</h2>
    <div class="services__grid">
      <div class="services__category">
        <h3 class="services__category-title">Hair</h3>
        <ul class="services__list">
          <li class="services__item">
            <span class="services__name">Women's Cut</span>
            <span class="services__dots"></span>
            <span class="services__price">$85</span>
          </li>
          <!-- More items -->
        </ul>
      </div>
      <!-- More categories -->
    </div>
  </div>
</section>
```

**Styling Approach:**
- CSS Grid: `grid-template-columns: repeat(3, 1fr)` on desktop
- Gap: `var(--spacing-lg)`
- Service items use Flexbox for name-dots-price alignment
- Dotted leader lines: `border-bottom: 2px dotted` with flex-grow
- Hover effect: Scale transform and accent color change
- Transition: `var(--transition-normal)` for smooth hover

**Dotted Leader Line Implementation:**
```css
.services__item {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.services__dots {
  flex-grow: 1;
  border-bottom: 2px dotted var(--color-accent);
  opacity: 0.3;
  min-width: 20px;
}
```

### 5. Stylist Feature Component

**Structure:**
```html
<section id="about" class="stylists">
  <div class="stylists__container">
    <h2 class="stylists__title">Meet The Team</h2>
    <div class="stylists__grid">
      <article class="stylist-card">
        <div class="stylist-card__image">
          <img src="placeholder.jpg" alt="Stylist name">
        </div>
        <h3 class="stylist-card__name">Jane Doe</h3>
        <p class="stylist-card__title">Master Stylist</p>
      </article>
      <!-- More stylist cards -->
    </div>
  </div>
</section>
```

**Styling Approach:**
- CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
- Card styling: Subtle border or shadow
- Image: Aspect ratio 1:1, object-fit cover
- Fade-in animation using Intersection Observer or CSS animation
- Typography: Heading font for names, body font for titles

**Fade-in Animation:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stylist-card {
  animation: fadeInUp var(--transition-slow) ease-out;
  animation-fill-mode: both;
}

.stylist-card:nth-child(1) { animation-delay: 0.1s; }
.stylist-card:nth-child(2) { animation-delay: 0.2s; }
.stylist-card:nth-child(3) { animation-delay: 0.3s; }
```

### 6. Contact Section Component

**Structure:**
```html
<section id="contact" class="contact">
  <div class="contact__container">
    <div class="contact__info">
      <h2>Visit Us</h2>
      <div class="contact__hours">
        <h3>Hours of Operation</h3>
        <ul>
          <li>Monday - Friday: 9am - 8pm</li>
          <li>Saturday: 9am - 6pm</li>
          <li>Sunday: 10am - 5pm</li>
        </ul>
      </div>
    </div>
    <div class="contact__form-wrapper">
      <h2>Book an Appointment</h2>
      <form class="contact__form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="service">Service</label>
          <select id="service" name="service" required>
            <option value="">Select a service</option>
            <option value="hair">Hair Services</option>
            <option value="styling">Styling</option>
            <option value="color">Color</option>
          </select>
        </div>
        <button type="submit" class="btn btn--primary">Submit Request</button>
      </form>
    </div>
  </div>
</section>
```

**Styling Approach:**
- Two-column layout using CSS Grid: `grid-template-columns: 1fr 1fr`
- Form inputs: Consistent styling with accent color focus states
- Input height: Minimum 44px for touch targets
- Label positioning: Above inputs with clear hierarchy
- Validation: HTML5 required attributes, custom error styling

**Form Styling:**
```css
.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--spacing-sm);
  border: 2px solid var(--color-background);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-accent);
}
```

### 7. Footer Component

**Structure:**
```html
<footer class="footer">
  <div class="footer__container">
    <div class="footer__social">
      <a href="#" aria-label="Instagram">
        <svg><!-- Instagram icon --></svg>
      </a>
      <a href="#" aria-label="Facebook">
        <svg><!-- Facebook icon --></svg>
      </a>
      <a href="#" aria-label="Twitter">
        <svg><!-- Twitter icon --></svg>
      </a>
    </div>
    <p class="footer__copyright">&copy; 2024 Luxe & Co. All rights reserved.</p>
  </div>
</footer>
```

**Styling Approach:**
- Background: `var(--color-background)`
- Text color: `var(--color-primary)`
- Centered content with padding
- Social icons: SVG with hover color transition to accent
- Icon size: 24px x 24px minimum for accessibility

### 8. Button Component

**Reusable Button Styles:**
```css
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-body);
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 44px;
  min-width: 44px;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-background);
}

.btn--primary:hover {
  background-color: var(--color-accent-alt);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-md);
}
```

## Data Models

Since this is a static website prototype, there are no backend data models. However, we define the structure of data that would be represented in the HTML:

### Service Item
```typescript
interface ServiceItem {
  name: string;        // e.g., "Women's Cut"
  price: string;       // e.g., "$85"
  category: string;    // e.g., "Hair", "Styling", "Color"
}
```

### Stylist Profile
```typescript
interface StylistProfile {
  name: string;        // e.g., "Jane Doe"
  title: string;       // e.g., "Master Stylist"
  imageUrl: string;    // Path to placeholder image
  imageAlt: string;    // Alt text for accessibility
}
```

### Contact Form Data
```typescript
interface ContactFormData {
  name: string;        // Required, non-empty
  email: string;       // Required, valid email format
  service: string;     // Required, one of the service categories
}
```

### Navigation Link
```typescript
interface NavigationLink {
  text: string;        // e.g., "Services"
  href: string;        // e.g., "#services"
  ariaLabel?: string;  // Optional for accessibility
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- **Requirements 1.4 and 9.1** both test WCAG AA contrast ratios - these will be combined into a single comprehensive property
- **Requirements 8.3 and 9.3** both test aria-labels for interactive elements - these will be combined
- **Requirements 9.4 and 9.5** both test focus indicators - these will be combined into one property about focus visibility and contrast

### Properties

**Property 1: Typography Consistency for Headings**
*For any* heading element (h1, h2, h3, h4, h5, h6) in the document, the computed font-family should include "Playfair Display".
**Validates: Requirements 1.2**

**Property 2: Typography Consistency for Body Text**
*For any* non-heading text element in the document, the computed font-family should include "Inter" or "Montserrat".
**Validates: Requirements 1.3**

**Property 3: WCAG AA Contrast Compliance**
*For any* text element and its background, the contrast ratio should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text or 18pt+).
**Validates: Requirements 1.4, 9.1**

**Property 4: Smooth Scroll Navigation**
*For any* navigation link with an anchor href (starting with #), clicking the link should result in smooth scrolling to the target section.
**Validates: Requirements 2.5**

**Property 5: Service Item Structure**
*For any* service item in the services menu, the item should display a service name, dotted leader line, and price in a horizontal layout.
**Validates: Requirements 4.4**

**Property 6: Service Item Hover Transitions**
*For any* service item, hovering over the item should trigger a smooth visual transition effect (transform, color, or opacity change).
**Validates: Requirements 4.5**

**Property 7: Stylist Card Image Presence**
*For any* stylist card in the stylist feature section, the card should contain an image element with a valid src attribute.
**Validates: Requirements 5.2**

**Property 8: Stylist Card Typography**
*For any* stylist card, the stylist name should use the heading font family (Playfair Display).
**Validates: Requirements 5.3**

**Property 9: Form Validation for Required Fields**
*For any* form submission attempt where the Name or Email field is empty, the form should prevent submission and display validation feedback.
**Validates: Requirements 6.4**

**Property 10: Social Media Icon Accessibility**
*For any* social media icon link in the footer, the link should have an aria-label attribute with a descriptive value.
**Validates: Requirements 6.5, 8.3, 9.3**

**Property 11: Minimum Touch Target Size**
*For any* interactive element (button, link, input), the element should have a minimum width and height of 44 pixels on mobile viewports (width < 768px).
**Validates: Requirements 7.4**

**Property 12: Relative Unit Usage**
*For any* CSS sizing property (font-size, padding, margin, width, height), the value should use relative units (rem, em, %, vh, vw) rather than fixed pixel values, except for minimum constraints.
**Validates: Requirements 7.5**

**Property 13: Heading Hierarchy**
*For any* sequence of heading elements in the document, the heading levels should follow proper hierarchical order without skipping levels (e.g., h1 → h2 → h3, not h1 → h3).
**Validates: Requirements 8.2**

**Property 14: Interactive Element ARIA Labels**
*For any* interactive element without visible text content (icon-only buttons, icon links), the element should have an aria-label or aria-labelledby attribute.
**Validates: Requirements 8.3, 9.3**

**Property 15: Image Alt Attributes**
*For any* img element in the document, the element should have an alt attribute (may be empty for decorative images).
**Validates: Requirements 8.5**

**Property 16: Keyboard Accessibility**
*For any* interactive element (button, link, input, select), the element should be reachable and operable using only keyboard navigation (Tab, Enter, Space).
**Validates: Requirements 9.2**

**Property 17: Focus Indicator Visibility**
*For any* interactive element when focused, the element should display a visible focus indicator with sufficient contrast (minimum 3:1 against adjacent colors).
**Validates: Requirements 9.4, 9.5**

**Property 18: CSS Variable Usage for Repeated Values**
*For any* CSS property value that appears more than twice in the stylesheet (colors, spacing, timing), the value should be defined as a CSS custom property and referenced via var().
**Validates: Requirements 10.3**

**Property 19: Consistent Transition Timing**
*For any* element with CSS transitions, the transition timing function should use one of the predefined timing variables (--transition-fast, --transition-normal, --transition-slow).
**Validates: Requirements 10.5**

## Error Handling

### Form Validation Errors

**HTML5 Validation:**
- Use `required` attribute for mandatory fields
- Use `type="email"` for email validation
- Browser displays native validation messages

**Custom Validation Styling:**
```css
.form-group input:invalid:not(:placeholder-shown) {
  border-color: #e74c3c;
}

.form-group input:valid:not(:placeholder-shown) {
  border-color: var(--color-accent);
}
```

**Error States:**
- Invalid input: Red border (#e74c3c)
- Valid input: Accent color border
- Focus state: Always show accent color regardless of validity

### Missing Content Handling

**Placeholder Images:**
- Use data URIs or placeholder services (e.g., placeholder.com)
- Fallback: CSS background color matching design system
- Alt text describes the expected content

**Missing JavaScript:**
- Hamburger menu: Fallback to CSS-only solution using checkbox hack
- Smooth scroll: Fallback to browser default anchor navigation
- Progressive enhancement approach

### Responsive Layout Failures

**Overflow Prevention:**
```css
* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 100%;
  overflow-x: hidden;
}
```

**Font Loading Failures:**
- System font fallbacks defined in font stack
- Font-display: swap for web fonts to prevent invisible text

## Testing Strategy

### Unit Testing Approach

Since this is a static HTML/CSS website, traditional unit tests will focus on:

1. **HTML Structure Tests** (using DOM testing)
   - Verify presence of required semantic elements
   - Check specific content exists (logo, CTA buttons, form fields)
   - Validate heading hierarchy
   - Confirm navigation links point to correct sections

2. **CSS Computed Style Tests**
   - Verify CSS variables are defined with correct values
   - Check responsive breakpoint behavior
   - Validate color contrast ratios
   - Confirm font families are applied correctly

3. **Accessibility Tests**
   - Check all images have alt attributes
   - Verify ARIA labels on icon-only elements
   - Test keyboard navigation order
   - Validate focus indicators are visible

4. **Form Validation Tests**
   - Test empty field submission prevention
   - Verify required attribute presence
   - Check email format validation

**Example Unit Tests:**
- Test that navigation bar contains exactly 4 section links
- Test that hero section CTA links to #contact
- Test that services menu has 3 categories
- Test that contact form has Name, Email, and Service fields
- Test that footer has 3 social media icons

### Property-Based Testing Approach

Property-based tests will verify universal properties across all instances of elements:

1. **Typography Properties**
   - Generate random heading elements, verify all use Playfair Display
   - Generate random body text elements, verify all use Inter/Montserrat

2. **Accessibility Properties**
   - Generate random interactive elements, verify all meet 44px minimum size
   - Generate random images, verify all have alt attributes
   - Generate random icon buttons, verify all have aria-labels

3. **Contrast Properties**
   - Generate random text/background combinations, verify all meet WCAG AA
   - Generate random focus states, verify all have 3:1 contrast

4. **Layout Properties**
   - Generate random service items, verify all have name-dots-price structure
   - Generate random stylist cards, verify all have image and name

**Testing Framework:**
- **DOM Testing**: Jest + jsdom or Vitest for HTML/CSS testing
- **Property-Based Testing**: fast-check (JavaScript property testing library)
- **Accessibility Testing**: axe-core or pa11y for automated accessibility checks
- **Visual Regression**: Optional - Percy or Chromatic for visual testing

**Property Test Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: luxe-co-salon-website, Property N: [property text]**

**Test Organization:**
```
tests/
├── unit/
│   ├── navigation.test.js
│   ├── hero.test.js
│   ├── services.test.js
│   ├── stylists.test.js
│   ├── contact.test.js
│   └── footer.test.js
├── properties/
│   ├── typography.property.test.js
│   ├── accessibility.property.test.js
│   ├── contrast.property.test.js
│   └── layout.property.test.js
└── setup.js
```

**Example Property Test Structure:**
```javascript
// Feature: luxe-co-salon-website, Property 1: Typography Consistency for Headings
test('all heading elements use Playfair Display font', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('h1', 'h2', 'h3', 'h4', 'h5', 'h6'),
      (tagName) => {
        const headings = document.querySelectorAll(tagName);
        return Array.from(headings).every(heading => {
          const fontFamily = window.getComputedStyle(heading).fontFamily;
          return fontFamily.includes('Playfair Display');
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Testing Balance

- **Unit tests**: Focus on specific examples, edge cases (mobile/desktop breakpoints), and concrete element presence
- **Property tests**: Focus on universal rules that apply to all instances (typography, accessibility, contrast)
- Together they provide comprehensive coverage: unit tests catch specific implementation bugs, property tests verify general correctness across all elements
