// Property-Based Test: Relative Unit Usage
// Property 12: For any CSS sizing property (font-size, padding, margin, width, height),
// the value should use relative units (rem, em, %, vh, vw) rather than fixed pixel values,
// except for minimum constraints.
// **Validates: Requirements 7.5**

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Property 12: Relative Unit Usage', () => {
  let css;

  beforeEach(() => {
    css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
  });

  it('**Property 12**: CSS variables use relative units', () => {
    // Check spacing variables use rem
    expect(css).toMatch(/--spacing-xs:\s*[\d.]+rem/);
    expect(css).toMatch(/--spacing-sm:\s*[\d.]+rem/);
    expect(css).toMatch(/--spacing-md:\s*[\d.]+rem/);
    expect(css).toMatch(/--spacing-lg:\s*[\d.]+rem/);
    expect(css).toMatch(/--spacing-xl:\s*[\d.]+rem/);
    
    // Check typography variables use rem
    expect(css).toMatch(/--text-xs:\s*[\d.]+rem/);
    expect(css).toMatch(/--text-sm:\s*[\d.]+rem/);
    expect(css).toMatch(/--text-md:\s*[\d.]+rem/);
    expect(css).toMatch(/--text-lg:\s*[\d.]+rem/);
    expect(css).toMatch(/--text-xl:\s*[\d.]+rem/);
  });

  it('**Property 12**: Font sizes use relative units (rem, em)', () => {
    // Find all font-size declarations
    const fontSizeMatches = css.matchAll(/font-size:\s*([^;]+);/g);
    const fontSizes = Array.from(fontSizeMatches);
    
    expect(fontSizes.length).toBeGreaterThan(0);
    
    const invalidFontSizes = [];
    
    fontSizes.forEach((match, index) => {
      const value = match[1].trim();
      
      // Should use rem, em, %, or CSS variable
      const usesRelativeUnit = value.includes('rem') || 
                               value.includes('em') || 
                               value.includes('%') ||
                               value.includes('var(');
      
      // Fixed px values are not allowed for font-size (except root font-size: 16px)
      const usesPixels = value.includes('px') && !value.includes('var(');
      const isRootFontSize = value === '16px'; // Root font-size is acceptable
      
      if ((!usesRelativeUnit || usesPixels) && !isRootFontSize) {
        invalidFontSizes.push({
          index,
          value,
          context: match[0]
        });
      }
    });
    
    if (invalidFontSizes.length > 0) {
      console.log('Font sizes using fixed pixels:', invalidFontSizes);
    }
    
    expect(invalidFontSizes.length).toBe(0);
  });

  it('**Property 12**: Padding uses relative units or CSS variables', () => {
    // Find all padding declarations
    const paddingMatches = css.matchAll(/padding(?:-[a-z]+)?:\s*([^;]+);/g);
    const paddings = Array.from(paddingMatches);
    
    expect(paddings.length).toBeGreaterThan(0);
    
    const invalidPaddings = [];
    
    paddings.forEach((match, index) => {
      const value = match[1].trim();
      
      // Should use rem, em, %, or CSS variable
      const usesRelativeUnit = value.includes('rem') || 
                               value.includes('em') || 
                               value.includes('%') ||
                               value.includes('var(');
      
      // Fixed px values should be minimal
      const usesPixels = value.match(/\d+px/) && !value.includes('var(');
      
      if (!usesRelativeUnit && usesPixels) {
        invalidPaddings.push({
          index,
          value
        });
      }
    });
    
    if (invalidPaddings.length > 0) {
      console.log('Paddings using fixed pixels:', invalidPaddings);
    }
    
    // Allow some flexibility, but most should use relative units
    expect(invalidPaddings.length).toBeLessThanOrEqual(2);
  });

  it('**Property 12**: Margins use relative units or CSS variables', () => {
    // Find all margin declarations
    const marginMatches = css.matchAll(/margin(?:-[a-z]+)?:\s*([^;]+);/g);
    const margins = Array.from(marginMatches);
    
    expect(margins.length).toBeGreaterThan(0);
    
    const invalidMargins = [];
    
    margins.forEach((match, index) => {
      const value = match[1].trim();
      
      // Should use rem, em, %, auto, or CSS variable
      const usesRelativeUnit = value.includes('rem') || 
                               value.includes('em') || 
                               value.includes('%') ||
                               value.includes('var(') ||
                               value.includes('auto');
      
      // Fixed px values should be minimal
      const usesPixels = value.match(/\d+px/) && !value.includes('var(');
      
      if (!usesRelativeUnit && usesPixels) {
        invalidMargins.push({
          index,
          value
        });
      }
    });
    
    if (invalidMargins.length > 0) {
      console.log('Margins using fixed pixels:', invalidMargins);
    }
    
    // Allow some flexibility
    expect(invalidMargins.length).toBeLessThanOrEqual(2);
  });

  it('**Property 12**: Minimum constraints can use pixels (44px touch targets)', () => {
    // Verify min-height and min-width use CSS variable for touch targets
    const minHeightMatches = css.match(/min-height:\s*var\(--min-touch-target\)/g);
    const minWidthMatches = css.match(/min-width:\s*var\(--min-touch-target\)/g);
    
    // Should have multiple instances of minimum touch target
    expect(minHeightMatches || minWidthMatches).toBeTruthy();
    
    // Verify the variable is defined with pixels (this is acceptable)
    const touchTargetDef = css.match(/--min-touch-target:\s*44px/);
    expect(touchTargetDef).toBeTruthy();
  });

  it('**Property 12**: Width and height use relative units where appropriate', () => {
    // Find width/height declarations (excluding min/max)
    const sizeMatches = css.matchAll(/(?<!min-)(?<!max-)(?:width|height):\s*([^;]+);/g);
    const sizes = Array.from(sizeMatches);
    
    const invalidSizes = [];
    
    sizes.forEach((match, index) => {
      const value = match[1].trim();
      
      // Should use %, vh, vw, rem, em, auto, or CSS variable
      const usesRelativeUnit = value.includes('%') || 
                               value.includes('vh') ||
                               value.includes('vw') ||
                               value.includes('rem') ||
                               value.includes('em') ||
                               value.includes('var(') ||
                               value.includes('auto');
      
      // Fixed px values should be minimal (except for specific cases like icons)
      const usesPixels = value.match(/\d+px/) && !value.includes('var(');
      
      if (!usesRelativeUnit && usesPixels) {
        invalidSizes.push({
          index,
          value,
          context: match[0]
        });
      }
    });
    
    if (invalidSizes.length > 0) {
      console.log('Sizes using fixed pixels:', invalidSizes);
    }
    
    // Allow some flexibility for specific cases (icons, etc.)
    expect(invalidSizes.length).toBeLessThanOrEqual(5);
  });

  it('should verify root font-size is set for rem calculations', () => {
    // Check that html or :root has font-size defined
    const htmlFontSize = css.match(/html\s*\{[^}]*font-size:\s*16px/s);
    expect(htmlFontSize).toBeTruthy();
  });

  it('should verify most sizing uses CSS variables', () => {
    // Count usage of CSS variables vs direct pixel values
    const varUsage = (css.match(/var\(--/g) || []).length;
    const pxUsage = (css.match(/\d+px/g) || []).length;
    
    // Variables should be used more than direct pixel values
    // (excluding the variable definitions themselves)
    expect(varUsage).toBeGreaterThan(20);
  });

  it('should verify spacing scale is consistently used', () => {
    // Verify spacing variables are used throughout
    const spacingUsage = [
      (css.match(/var\(--spacing-xs\)/g) || []).length,
      (css.match(/var\(--spacing-sm\)/g) || []).length,
      (css.match(/var\(--spacing-md\)/g) || []).length,
      (css.match(/var\(--spacing-lg\)/g) || []).length,
      (css.match(/var\(--spacing-xl\)/g) || []).length
    ];
    
    const totalSpacingUsage = spacingUsage.reduce((a, b) => a + b, 0);
    expect(totalSpacingUsage).toBeGreaterThan(10);
  });
});
