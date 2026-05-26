// Unit tests for Hero Section Component
// Requirements: 3.1, 3.2, 3.3, 3.4

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Hero Section Component', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
    const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    
    // Create a new JSDOM instance
    dom = new JSDOM(html, {
      resources: 'usable',
      runScripts: 'dangerously'
    });
    
    document = dom.window.document;
    window = dom.window;
    
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  });

  describe('HTML Structure (Requirement 3.1)', () => {
    it('should have a hero section with correct ID', () => {
      const heroSection = document.getElementById('hero');
      expect(heroSection).toBeTruthy();
      expect(heroSection.tagName).toBe('SECTION');
      expect(heroSection.classList.contains('hero')).toBe(true);
    });

    it('should have an h1 tagline', () => {
      const heroSection = document.getElementById('hero');
      const h1 = heroSection.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent.trim()).toBe('Elevate Your Style');
    });

    it('should have a value proposition paragraph', () => {
      const heroSection = document.getElementById('hero');
      const subtitle = heroSection.querySelector('.hero__subtitle');
      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toContain('Experience luxury hair care');
    });

    it('should have a CTA button linking to #contact', () => {
      const heroSection = document.getElementById('hero');
      const ctaButton = heroSection.querySelector('a.btn');
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.getAttribute('href')).toBe('#contact');
      expect(ctaButton.textContent).toContain('Book Your Appointment');
    });
  });

  describe('Styling (Requirement 3.2)', () => {
    it('should have full-width layout with minimum height', () => {
      const heroSection = document.getElementById('hero');
      const styles = window.getComputedStyle(heroSection);
      
      // Check display flex for centering
      expect(styles.display).toBe('flex');
      
      // Check minimum height (should be 100vh or similar)
      expect(styles.minHeight).toBeTruthy();
    });

    it('should use large typography for h1', () => {
      const heroSection = document.getElementById('hero');
      const h1 = heroSection.querySelector('h1');
      
      // H1 should have hero__title class which applies large typography
      expect(h1.classList.contains('hero__title')).toBe(true);
      
      // Verify the CSS rule exists for large text
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      expect(css).toContain('--text-3xl');
      expect(css).toContain('font-size: var(--text-3xl)');
    });

    it('should have CTA button with hover effects', () => {
      const heroSection = document.getElementById('hero');
      const ctaButton = heroSection.querySelector('a.btn');
      
      expect(ctaButton.classList.contains('btn--primary')).toBe(true);
      expect(ctaButton.classList.contains('btn--large')).toBe(true);
    });

    it('should use primary background color', () => {
      const heroSection = document.getElementById('hero');
      const styles = window.getComputedStyle(heroSection);
      
      // Background should be primary color (light)
      expect(styles.backgroundColor).toBeTruthy();
    });
  });

  describe('Semantic HTML (Requirement 8.1)', () => {
    it('should use semantic section element', () => {
      const heroSection = document.getElementById('hero');
      expect(heroSection.tagName).toBe('SECTION');
    });

    it('should have proper heading hierarchy starting with h1', () => {
      const heroSection = document.getElementById('hero');
      const h1 = heroSection.querySelector('h1');
      const h2OrLower = heroSection.querySelector('h2, h3, h4, h5, h6');
      
      expect(h1).toBeTruthy();
      // Hero section should only have h1, no lower headings
      expect(h2OrLower).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive text content', () => {
      const heroSection = document.getElementById('hero');
      const textContent = heroSection.textContent;
      
      expect(textContent).toContain('Elevate Your Style');
      expect(textContent).toContain('Experience luxury');
      expect(textContent).toContain('Book Your Appointment');
    });

    it('should have CTA button with sufficient size', () => {
      const heroSection = document.getElementById('hero');
      const ctaButton = heroSection.querySelector('a.btn');
      
      // Button should have btn--large class for larger touch target
      expect(ctaButton.classList.contains('btn--large')).toBe(true);
    });
  });
});
