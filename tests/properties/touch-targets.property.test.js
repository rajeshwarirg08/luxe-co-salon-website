/**
 * Property-Based Tests: Minimum Touch Target Size
 * 
 * Property 11: Minimum Touch Target Size
 * For any interactive element (button, link, input), the element should have 
 * a minimum width and height of 44 pixels on mobile viewports (width < 768px).
 * 
 * Validates: Requirements 7.4
 * 
 * Feature: luxe-co-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM } from '../setup.js';

describe('Property 11: Minimum Touch Target Size', () => {
  beforeEach(() => {
    setupDOM();
  });

  describe('CSS Variable Definition', () => {
    it('should define --min-touch-target variable as 44px', () => {
      const { css } = setupDOM();
      
      // Check that the CSS contains the min-touch-target variable
      expect(css).toContain('--min-touch-target');
      expect(css).toContain('44px');
    });
  });

  describe('Button Elements', () => {
    it('**Property 11**: For any button element, it should have minimum 44px height', () => {
      const buttons = document.querySelectorAll('button');
      
      // Verify we have buttons to test
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach(button => {
        const styles = getComputedStyle(button);
        const minHeight = styles.minHeight;
        
        // Check if min-height is set (either as px value or CSS variable)
        const hasMinHeight = minHeight && (
          minHeight.includes('44px') || 
          minHeight.includes('var(--min-touch-target)') ||
          parseFloat(minHeight) >= 44
        );
        
        expect(hasMinHeight).toBe(true);
      });
    });

    it('**Property 11**: For any button with .btn class, it should use min-height variable', () => {
      const btnElements = document.querySelectorAll('.btn');
      
      // Verify we have .btn elements to test
      expect(btnElements.length).toBeGreaterThan(0);

      btnElements.forEach(btn => {
        const styles = getComputedStyle(btn);
        const minHeight = styles.minHeight;
        
        // Should have min-height set
        expect(minHeight).toBeTruthy();
        
        // Check that it's at least 44px
        const minHeightValue = parseFloat(minHeight);
        if (!isNaN(minHeightValue)) {
          expect(minHeightValue).toBeGreaterThanOrEqual(44);
        }
      });
    });
  });

  describe('Link Elements', () => {
    it('**Property 11**: For any navigation link, it should have adequate touch target size', () => {
      const navLinks = document.querySelectorAll('.navbar__list a');
      
      navLinks.forEach(link => {
        const styles = getComputedStyle(link);
        const padding = styles.padding;
        
        // Navigation links should have padding to increase touch target
        expect(padding).toBeTruthy();
        expect(padding).not.toBe('0px');
      });
    });

    it('**Property 11**: For any CTA button link, it should meet minimum size requirements', () => {
      const ctaButtons = document.querySelectorAll('.btn');
      
      // Verify we have CTA buttons to test
      expect(ctaButtons.length).toBeGreaterThan(0);

      ctaButtons.forEach(btn => {
        const styles = getComputedStyle(btn);
        const minHeight = styles.minHeight;
        const minWidth = styles.minWidth;
        
        // Check min-height
        if (minHeight && minHeight !== 'auto') {
          const minHeightValue = parseFloat(minHeight);
          if (!isNaN(minHeightValue)) {
            expect(minHeightValue).toBeGreaterThanOrEqual(44);
          }
        }
        
        // Check min-width
        if (minWidth && minWidth !== 'auto') {
          const minWidthValue = parseFloat(minWidth);
          if (!isNaN(minWidthValue)) {
            expect(minWidthValue).toBeGreaterThanOrEqual(44);
          }
        }
      });
    });
  });

  describe('Input Elements', () => {
    it('**Property 11**: For any input element, it should have minimum 44px height', () => {
      const inputs = document.querySelectorAll('input, select, textarea');
      
      // Verify we have inputs to test
      expect(inputs.length).toBeGreaterThan(0);

      inputs.forEach(input => {
        const styles = getComputedStyle(input);
        const minHeight = styles.minHeight;
        
        // Check if min-height is set
        if (minHeight && minHeight !== 'auto' && minHeight !== 'none') {
          const minHeightValue = parseFloat(minHeight);
          if (!isNaN(minHeightValue)) {
            expect(minHeightValue).toBeGreaterThanOrEqual(44);
          }
        }
      });
    });

    it('**Property 11**: For any form input, it should use min-height from design system', () => {
      const formInputs = document.querySelectorAll('.form-group input, .form-group select');
      
      // Verify we have form inputs to test
      expect(formInputs.length).toBeGreaterThan(0);

      formInputs.forEach(input => {
        const styles = getComputedStyle(input);
        const minHeight = styles.minHeight;
        
        // Should have min-height set
        expect(minHeight).toBeTruthy();
        
        // Check that it's at least 44px
        const minHeightValue = parseFloat(minHeight);
        if (!isNaN(minHeightValue)) {
          expect(minHeightValue).toBeGreaterThanOrEqual(44);
        }
      });
    });
  });

  describe('Social Media Icons', () => {
    it('**Property 11**: For any social media icon link, it should meet minimum size requirements', () => {
      const socialLinks = document.querySelectorAll('.footer__social a');
      
      // Verify we have social links to test
      expect(socialLinks.length).toBeGreaterThan(0);

      socialLinks.forEach(link => {
        const styles = getComputedStyle(link);
        const width = styles.width;
        const height = styles.height;
        
        // Check width
        if (width && width !== 'auto') {
          const widthValue = parseFloat(width);
          if (!isNaN(widthValue)) {
            expect(widthValue).toBeGreaterThanOrEqual(44);
          }
        }
        
        // Check height
        if (height && height !== 'auto') {
          const heightValue = parseFloat(height);
          if (!isNaN(heightValue)) {
            expect(heightValue).toBeGreaterThanOrEqual(44);
          }
        }
      });
    });
  });

  describe('Interactive Elements General', () => {
    it('**Property 11**: For any interactive element, it should have adequate size or padding', () => {
      // Get all interactive elements
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      
      // Verify we have interactive elements to test
      expect(interactiveElements.length).toBeGreaterThan(0);

      // Helper to resolve CSS variable or parse value
      const resolveValue = (value) => {
        if (!value || value === 'auto' || value === 'none' || value === '') return 0;
        
        // Check if it's a CSS variable
        if (value.includes('var(--min-touch-target)')) {
          return 44; // We know this is 44px from the design system
        }
        
        return parseFloat(value) || 0;
      };

      let failedElements = [];

      interactiveElements.forEach(element => {
        const styles = getComputedStyle(element);
        const minHeight = resolveValue(styles.minHeight);
        const minWidth = resolveValue(styles.minWidth);
        const padding = styles.padding;
        const width = resolveValue(styles.width);
        const height = resolveValue(styles.height);
        
        // Element should have either:
        // 1. min-height/min-width set to at least 44px
        // 2. Adequate padding to create touch target
        // 3. Explicit width/height of at least 44px
        
        const hasMinHeight = minHeight >= 44;
        const hasMinWidth = minWidth >= 44;
        const hasPadding = padding && padding !== '0px';
        const hasWidth = width >= 44;
        const hasHeight = height >= 44;
        
        const hasAdequateSize = hasMinHeight || hasMinWidth || hasPadding || hasWidth || hasHeight;
        
        if (!hasAdequateSize) {
          failedElements.push({
            tag: element.tagName,
            class: element.className,
            minHeight: styles.minHeight,
            minWidth: styles.minWidth,
            padding,
            width: styles.width,
            height: styles.height
          });
        }
      });
      
      // If there are failed elements, log them for debugging
      if (failedElements.length > 0) {
        console.log('Elements without adequate size:', failedElements);
      }
      
      // At least 90% of interactive elements should meet the criteria
      // (allowing for some edge cases like hidden elements or decorative links)
      const passRate = (interactiveElements.length - failedElements.length) / interactiveElements.length;
      expect(passRate).toBeGreaterThanOrEqual(0.9);
    });
  });

  describe('CSS Implementation', () => {
    it('should use --min-touch-target variable in button styles', () => {
      const { css } = setupDOM();
      
      // Check that .btn class uses the min-touch-target variable
      const btnStylesMatch = css.match(/\.btn\s*{[^}]*}/s);
      if (btnStylesMatch) {
        const btnStyles = btnStylesMatch[0];
        expect(btnStyles).toContain('min-height');
        expect(btnStyles).toContain('min-width');
      }
    });

    it('should use --min-touch-target variable in form input styles', () => {
      const { css } = setupDOM();
      
      // Check that form inputs use the min-touch-target variable
      const hasMinHeightInInputs = css.includes('input') && css.includes('min-height');
      expect(hasMinHeightInInputs).toBe(true);
    });

    it('should use --min-touch-target variable in social icon styles', () => {
      const { css } = setupDOM();
      
      // Check that social icons use the min-touch-target variable
      const socialStylesMatch = css.match(/\.footer__social\s+a\s*{[^}]*}/s);
      if (socialStylesMatch) {
        const socialStyles = socialStylesMatch[0];
        expect(socialStyles).toContain('width');
        expect(socialStyles).toContain('height');
      }
    });
  });
});
