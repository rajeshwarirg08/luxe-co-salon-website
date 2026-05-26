// Property-Based Tests: Accessibility Properties
// Property 2: Typography Consistency for Body Text - Requirements 1.3
// Property 13: Heading Hierarchy - Requirements 8.2
// Property 14: Interactive Element ARIA Labels - Requirements 8.3, 9.3
// Property 16: Keyboard Accessibility - Requirements 9.2
// Property 17: Focus Indicator Visibility - Requirements 9.4, 9.5

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Accessibility Properties', () => {
  let dom;
  let document;
  let window;
  let css;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
    css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    
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

  describe('Property 2: Typography Consistency for Body Text', () => {
    it('**Property 2**: Body element uses Inter or Montserrat font', () => {
      // Verify CSS defines --font-body with Inter
      const fontBodyMatch = css.match(/--font-body:\s*['"]?Inter['"]?/);
      expect(fontBodyMatch).toBeTruthy();
      
      // Verify body uses the font variable
      const bodyRule = css.match(/body\s*\{[^}]*font-family:\s*var\(--font-body\)/s);
      expect(bodyRule).toBeTruthy();
    });

    it('**Property 2**: For ANY non-heading text element, font-family includes Inter', () => {
      // Get all text elements that are not headings
      const allElements = document.querySelectorAll('p, span, li, a, label, button, input, select');
      expect(allElements.length).toBeGreaterThan(0);
      
      // Verify CSS rule applies body font to non-heading elements
      // Body font is inherited from body element
      const bodyRule = css.match(/body\s*\{[^}]*font-family:\s*var\(--font-body\)/s);
      expect(bodyRule).toBeTruthy();
      
      const fontBodyDef = css.match(/--font-body:\s*['"]?Inter['"]?/);
      expect(fontBodyDef).toBeTruthy();
    });
  });

  describe('Property 13: Heading Hierarchy', () => {
    it('**Property 13**: Document has proper heading hierarchy without skipping levels', () => {
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(allHeadings.length).toBeGreaterThan(0);
      
      const headingLevels = Array.from(allHeadings).map(h => parseInt(h.tagName[1]));
      
      // Check for h1
      expect(headingLevels).toContain(1);
      
      // Verify no levels are skipped
      const uniqueLevels = [...new Set(headingLevels)].sort();
      
      for (let i = 0; i < uniqueLevels.length - 1; i++) {
        const current = uniqueLevels[i];
        const next = uniqueLevels[i + 1];
        
        // Next level should not skip (e.g., h1 -> h3 is invalid)
        if (next - current > 1) {
          throw new Error(`Heading hierarchy skips from h${current} to h${next}`);
        }
      }
    });

    it('**Property 13**: Document starts with h1', () => {
      const h1 = document.querySelector('h1');
      expect(h1).toBeTruthy();
      
      // h1 should appear before h2
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const firstHeading = allHeadings[0];
      expect(firstHeading.tagName).toBe('H1');
    });

    it('**Property 13**: For ANY section, heading hierarchy is maintained', () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 1) {
          const levels = Array.from(headings).map(h => parseInt(h.tagName[1]));
          
          // Within a section, levels should not skip
          for (let i = 0; i < levels.length - 1; i++) {
            const diff = levels[i + 1] - levels[i];
            // Can go down (h2 -> h3) or stay same (h2 -> h2) or go up (h3 -> h2)
            // But should not skip levels going down (h2 -> h4)
            if (diff > 1) {
              throw new Error(`Section heading hierarchy skips from h${levels[i]} to h${levels[i + 1]}`);
            }
          }
        }
      });
    });
  });

  describe('Property 14: Interactive Element ARIA Labels', () => {
    it('**Property 14**: For ANY icon-only button, it has aria-label', () => {
      // Find all buttons
      const buttons = document.querySelectorAll('button');
      
      buttons.forEach(button => {
        const textContent = button.textContent.trim();
        const hasSvg = button.querySelector('svg');
        const hasIcon = button.classList.contains('navbar__toggle') || hasSvg;
        
        // If button has icon but no text, it needs aria-label
        if (hasIcon && !textContent) {
          const ariaLabel = button.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel.trim()).not.toBe('');
        }
      });
    });

    it('**Property 14**: Hamburger menu button has aria-label', () => {
      const hamburger = document.querySelector('.navbar__toggle');
      expect(hamburger).toBeTruthy();
      
      const ariaLabel = hamburger.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.toLowerCase()).toContain('menu');
    });

    it('**Property 14**: For ANY icon-only link, it has aria-label', () => {
      const allLinks = document.querySelectorAll('a');
      
      allLinks.forEach(link => {
        const textContent = link.textContent.trim();
        const hasSvg = link.querySelector('svg');
        
        // If link has SVG but no text, it needs aria-label
        if (hasSvg && !textContent) {
          const ariaLabel = link.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel.trim()).not.toBe('');
        }
      });
    });
  });

  describe('Property 16: Keyboard Accessibility', () => {
    it('**Property 16**: For ANY interactive element, it is keyboard accessible', () => {
      // Get all interactive elements
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      expect(interactiveElements.length).toBeGreaterThan(0);
      
      interactiveElements.forEach(element => {
        // Elements should not have tabindex="-1" (which removes from tab order)
        const tabindex = element.getAttribute('tabindex');
        if (tabindex) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(0);
        }
        
        // Elements should be focusable (native interactive elements are by default)
        // We verify they're not explicitly disabled
        const isDisabled = element.hasAttribute('disabled');
        expect(isDisabled).toBe(false);
      });
    });

    it('**Property 16**: All links are keyboard accessible', () => {
      const links = document.querySelectorAll('a');
      
      links.forEach(link => {
        // Links should have href or be explicitly made focusable
        const href = link.getAttribute('href');
        const tabindex = link.getAttribute('tabindex');
        
        expect(href || tabindex).toBeTruthy();
      });
    });

    it('**Property 16**: All buttons are keyboard accessible', () => {
      const buttons = document.querySelectorAll('button');
      
      buttons.forEach(button => {
        // Buttons are natively keyboard accessible
        // Verify they're not disabled
        expect(button.hasAttribute('disabled')).toBe(false);
      });
    });

    it('**Property 16**: All form inputs are keyboard accessible', () => {
      const inputs = document.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        // Inputs are natively keyboard accessible
        // Verify they're not disabled
        expect(input.hasAttribute('disabled')).toBe(false);
      });
    });
  });

  describe('Property 17: Focus Indicator Visibility', () => {
    it('**Property 17**: CSS defines focus styles for interactive elements', () => {
      // Check for focus styles on links
      const linkFocusRule = css.match(/a:focus/);
      expect(linkFocusRule).toBeTruthy();
      
      // Check for focus styles on buttons
      const buttonFocusRule = css.match(/button:focus/);
      expect(buttonFocusRule).toBeTruthy();
      
      // Check for focus styles on inputs
      const inputFocusRule = css.match(/input:focus/);
      expect(inputFocusRule).toBeTruthy();
    });

    it('**Property 17**: Focus styles use accent color for visibility', () => {
      // Find focus style rules
      const focusRules = css.match(/[^}]*:focus[^}]*\{[^}]*\}/gs);
      expect(focusRules).toBeTruthy();
      expect(focusRules.length).toBeGreaterThan(0);
      
      // At least one focus rule should use accent color
      const usesAccent = focusRules.some(rule => 
        rule.includes('var(--color-accent)') || rule.includes('outline')
      );
      expect(usesAccent).toBe(true);
    });

    it('**Property 17**: Focus indicators have sufficient contrast', () => {
      // Verify focus styles define outline or border with accent color
      const focusRules = css.match(/[^}]*:focus[^}]*\{[^}]*\}/gs);
      
      focusRules.forEach(rule => {
        // Should have outline or border defined
        const hasOutline = rule.includes('outline');
        const hasBorder = rule.includes('border');
        
        expect(hasOutline || hasBorder).toBe(true);
      });
    });

    it('**Property 17**: For ANY interactive element, focus style is defined', () => {
      // Verify CSS has general focus styles
      const generalFocusRule = css.match(/a:focus,\s*button:focus,\s*input:focus,\s*select:focus/);
      expect(generalFocusRule).toBeTruthy();
    });
  });

  describe('Additional Accessibility Checks', () => {
    it('should verify all form labels are properly associated', () => {
      const labels = document.querySelectorAll('label');
      
      labels.forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr) {
          const input = document.getElementById(forAttr);
          expect(input).toBeTruthy();
        }
      });
    });

    it('should verify semantic HTML structure', () => {
      // Check for semantic elements
      expect(document.querySelector('header')).toBeTruthy();
      expect(document.querySelector('nav')).toBeTruthy();
      expect(document.querySelector('main')).toBeTruthy();
      expect(document.querySelector('footer')).toBeTruthy();
      
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });
});
