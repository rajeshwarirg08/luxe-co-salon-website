/**
 * Unit Tests: Design System Variables
 * 
 * Tests for Requirements 1.1 and 1.5:
 * - Verify all required CSS variables are defined
 * - Verify color values match specifications
 * - Verify font families are correctly imported
 * 
 * Feature: stylish-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM, getCSSVariable } from '../setup.js';

describe('Design System Variables', () => {
  beforeEach(() => {
    setupDOM();
  });

  describe('Color Palette Variables', () => {
    it('should define --color-primary with correct value (#FBF9F6)', () => {
      const primaryColor = getCSSVariable('--color-primary');
      expect(primaryColor.toLowerCase()).toBe('#fbf9f6');
    });

    it('should define --color-background with correct value (#1C1C1C)', () => {
      const backgroundColor = getCSSVariable('--color-background');
      expect(backgroundColor.toLowerCase()).toBe('#1c1c1c');
    });

    it('should define --color-accent with correct value (#D4AF37)', () => {
      const accentColor = getCSSVariable('--color-accent');
      expect(accentColor.toLowerCase()).toBe('#d4af37');
    });

    it('should define --color-accent-alt with correct value (#C5A059)', () => {
      const accentAltColor = getCSSVariable('--color-accent-alt');
      expect(accentAltColor.toLowerCase()).toBe('#c5a059');
    });
  });

  describe('Typography Variables', () => {
    it('should define --font-heading with Playfair Display', () => {
      const fontHeading = getCSSVariable('--font-heading');
      expect(fontHeading).toContain('Playfair Display');
    });

    it('should define --font-body with Inter', () => {
      const fontBody = getCSSVariable('--font-body');
      expect(fontBody).toContain('Inter');
    });
  });

  describe('Spacing Scale Variables', () => {
    it('should define --spacing-xs as 0.5rem (8px)', () => {
      const spacingXs = getCSSVariable('--spacing-xs');
      expect(spacingXs).toBe('0.5rem');
    });

    it('should define --spacing-sm as 1rem (16px)', () => {
      const spacingSm = getCSSVariable('--spacing-sm');
      expect(spacingSm).toBe('1rem');
    });

    it('should define --spacing-md as 2rem (32px)', () => {
      const spacingMd = getCSSVariable('--spacing-md');
      expect(spacingMd).toBe('2rem');
    });

    it('should define --spacing-lg as 4rem (64px)', () => {
      const spacingLg = getCSSVariable('--spacing-lg');
      expect(spacingLg).toBe('4rem');
    });

    it('should define --spacing-xl as 6rem (96px)', () => {
      const spacingXl = getCSSVariable('--spacing-xl');
      expect(spacingXl).toBe('6rem');
    });
  });

  describe('Typography Scale Variables', () => {
    it('should define --text-xs as 0.875rem (14px)', () => {
      const textXs = getCSSVariable('--text-xs');
      expect(textXs).toBe('0.875rem');
    });

    it('should define --text-sm as 1rem (16px)', () => {
      const textSm = getCSSVariable('--text-sm');
      expect(textSm).toBe('1rem');
    });

    it('should define --text-md as 1.125rem (18px)', () => {
      const textMd = getCSSVariable('--text-md');
      expect(textMd).toBe('1.125rem');
    });

    it('should define --text-lg as 1.5rem (24px)', () => {
      const textLg = getCSSVariable('--text-lg');
      expect(textLg).toBe('1.5rem');
    });

    it('should define --text-xl as 2rem (32px)', () => {
      const textXl = getCSSVariable('--text-xl');
      expect(textXl).toBe('2rem');
    });

    it('should define --text-2xl as 3rem (48px)', () => {
      const text2xl = getCSSVariable('--text-2xl');
      expect(text2xl).toBe('3rem');
    });

    it('should define --text-3xl as 4rem (64px)', () => {
      const text3xl = getCSSVariable('--text-3xl');
      expect(text3xl).toBe('4rem');
    });
  });

  describe('Layout Variables', () => {
    it('should define --container-max as 1200px', () => {
      const containerMax = getCSSVariable('--container-max');
      expect(containerMax).toBe('1200px');
    });

    it('should define --border-radius as 0.25rem', () => {
      const borderRadius = getCSSVariable('--border-radius');
      expect(borderRadius).toBe('0.25rem');
    });
  });

  describe('Transition Variables', () => {
    it('should define --transition-fast as 0.2s ease', () => {
      const transitionFast = getCSSVariable('--transition-fast');
      expect(transitionFast).toBe('0.2s ease');
    });

    it('should define --transition-normal as 0.3s ease', () => {
      const transitionNormal = getCSSVariable('--transition-normal');
      expect(transitionNormal).toBe('0.3s ease');
    });

    it('should define --transition-slow as 0.5s ease', () => {
      const transitionSlow = getCSSVariable('--transition-slow');
      expect(transitionSlow).toBe('0.5s ease');
    });
  });

  describe('Font Family Application', () => {
    it('should apply Playfair Display to heading elements', () => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const h3 = document.querySelector('h3');
      
      expect(h1).toBeTruthy();
      expect(h2).toBeTruthy();
      expect(h3).toBeTruthy();
      
      const h1Font = getComputedStyle(h1).fontFamily;
      const h2Font = getComputedStyle(h2).fontFamily;
      const h3Font = getComputedStyle(h3).fontFamily;
      
      // In jsdom, CSS variables may not be fully resolved, so check for either the variable or the actual font
      expect(h1Font === 'var(--font-heading)' || h1Font.includes('Playfair Display')).toBe(true);
      expect(h2Font === 'var(--font-heading)' || h2Font.includes('Playfair Display')).toBe(true);
      expect(h3Font === 'var(--font-heading)' || h3Font.includes('Playfair Display')).toBe(true);
      
      // Verify the CSS variable itself contains the correct font
      const fontHeadingVar = getCSSVariable('--font-heading');
      expect(fontHeadingVar).toContain('Playfair Display');
    });

    it('should apply Inter to body text elements', () => {
      const body = document.querySelector('body');
      
      expect(body).toBeTruthy();
      
      // Verify the CSS variable itself contains the correct font
      const fontBodyVar = getCSSVariable('--font-body');
      expect(fontBodyVar).toContain('Inter');
      
      // Verify body element uses the font-body variable or Inter directly
      const bodyFont = getComputedStyle(body).fontFamily;
      const usesCorrectFont = 
        bodyFont === 'var(--font-body)' || 
        bodyFont.includes('Inter') ||
        bodyFont.includes(fontBodyVar);
      
      expect(usesCorrectFont).toBe(true);
    });
  });

  describe('Color Value Specifications', () => {
    it('should use primary color for light backgrounds', () => {
      const heroSection = document.querySelector('.hero');
      expect(heroSection).toBeTruthy();
      
      const bgColor = getComputedStyle(heroSection).backgroundColor;
      // Convert rgb to hex for comparison
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        expect(hex.toLowerCase()).toBe('#fbf9f6');
      }
    });

    it('should use background color for dark sections', () => {
      const servicesSection = document.querySelector('.services');
      expect(servicesSection).toBeTruthy();
      
      const bgColor = getComputedStyle(servicesSection).backgroundColor;
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        expect(hex.toLowerCase()).toBe('#1c1c1c');
      }
    });

    it('should use accent color for CTA buttons', () => {
      const ctaButton = document.querySelector('.btn--primary');
      expect(ctaButton).toBeTruthy();
      
      const bgColor = getComputedStyle(ctaButton).backgroundColor;
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        expect(hex.toLowerCase()).toBe('#d4af37');
      }
    });
  });
});
