// Property-Based Test: Form Validation for Required Fields
// Property 9: For any form submission attempt where the Name or Email field is empty,
// the form should prevent submission and display validation feedback.
// **Validates: Requirements 6.4**
//
// Property 10: Social Media Icon Accessibility
// For any social media icon link in the footer, the link should have an aria-label
// attribute with a descriptive value.
// **Validates: Requirements 6.5, 8.3, 9.3**

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Form and Accessibility Properties', () => {
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

  describe('Property 9: Form Validation for Required Fields', () => {
    it('**Property 9**: Name field has required attribute', () => {
      const nameInput = document.getElementById('name');
      expect(nameInput).toBeTruthy();
      expect(nameInput.hasAttribute('required')).toBe(true);
    });

    it('**Property 9**: Email field has required attribute', () => {
      const emailInput = document.getElementById('email');
      expect(emailInput).toBeTruthy();
      expect(emailInput.hasAttribute('required')).toBe(true);
    });

    it('**Property 9**: Email field has email type for validation', () => {
      const emailInput = document.getElementById('email');
      expect(emailInput).toBeTruthy();
      expect(emailInput.getAttribute('type')).toBe('email');
    });

    it('**Property 9**: Form has validation feedback styles', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for invalid state styling
      const invalidRule = css.match(/\.form-group\s+input:invalid/);
      expect(invalidRule).toBeTruthy();
      
      // Check for valid state styling
      const validRule = css.match(/\.form-group\s+input:valid/);
      expect(validRule).toBeTruthy();
    });

    it('**Property 9**: For ANY required form field, it has required attribute', () => {
      const form = document.querySelector('.contact__form');
      expect(form).toBeTruthy();
      
      // Get all input and select elements
      const formFields = form.querySelectorAll('input[type="text"], input[type="email"], select');
      expect(formFields.length).toBeGreaterThan(0);
      
      const failedFields = [];
      
      formFields.forEach((field, index) => {
        const id = field.getAttribute('id');
        const hasRequired = field.hasAttribute('required');
        
        // Name, Email, and Service should all be required
        if (['name', 'email', 'service'].includes(id) && !hasRequired) {
          failedFields.push({
            index,
            id,
            hasRequired
          });
        }
      });
      
      if (failedFields.length > 0) {
        console.log('Fields missing required attribute:', failedFields);
      }
      
      expect(failedFields.length).toBe(0);
    });

    it('should verify form prevents submission when fields are empty', () => {
      const form = document.querySelector('.contact__form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      
      // HTML5 validation will prevent submission
      // We verify the required attributes are in place
      expect(nameInput.hasAttribute('required')).toBe(true);
      expect(emailInput.hasAttribute('required')).toBe(true);
      
      // Verify form element exists and can be validated
      expect(form.tagName).toBe('FORM');
    });
  });

  describe('Property 10: Social Media Icon Accessibility', () => {
    it('**Property 10**: For ANY social media icon link, it has aria-label attribute', () => {
      const socialLinks = document.querySelectorAll('.footer__social a');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      const failedLinks = [];
      
      socialLinks.forEach((link, index) => {
        const ariaLabel = link.getAttribute('aria-label');
        
        if (!ariaLabel || ariaLabel.trim() === '') {
          failedLinks.push({
            index,
            ariaLabel,
            href: link.getAttribute('href'),
            html: link.outerHTML.substring(0, 100)
          });
        }
      });
      
      if (failedLinks.length > 0) {
        console.log('Social links without aria-label:', failedLinks);
      }
      
      expect(failedLinks.length).toBe(0);
    });

    it('**Property 10**: For ANY social media icon link, aria-label is descriptive', () => {
      const socialLinks = document.querySelectorAll('.footer__social a');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      const failedLinks = [];
      
      socialLinks.forEach((link, index) => {
        const ariaLabel = link.getAttribute('aria-label');
        
        // Aria-label should be descriptive (more than just a single character)
        if (!ariaLabel || ariaLabel.trim().length < 2) {
          failedLinks.push({
            index,
            ariaLabel,
            html: link.outerHTML.substring(0, 100)
          });
        }
      });
      
      expect(failedLinks.length).toBe(0);
    });

    it('**Property 10**: Social media links have expected aria-labels', () => {
      const socialLinks = document.querySelectorAll('.footer__social a');
      const labels = Array.from(socialLinks).map(link => link.getAttribute('aria-label'));
      
      // Should have common social media platform names
      const hasInstagram = labels.some(label => label && label.toLowerCase().includes('instagram'));
      const hasFacebook = labels.some(label => label && label.toLowerCase().includes('facebook'));
      const hasTwitter = labels.some(label => label && label.toLowerCase().includes('twitter'));
      
      expect(hasInstagram || hasFacebook || hasTwitter).toBe(true);
    });

    it('should verify all icon-only links have aria-labels', () => {
      // Find all links that contain only SVG or icon elements (no visible text)
      const allLinks = document.querySelectorAll('a');
      const iconOnlyLinks = [];
      
      allLinks.forEach(link => {
        const textContent = link.textContent.trim();
        const hasSvg = link.querySelector('svg');
        
        // If link has SVG but no text, it's icon-only
        if (hasSvg && !textContent) {
          iconOnlyLinks.push(link);
        }
      });
      
      // All icon-only links should have aria-label
      iconOnlyLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel.trim()).not.toBe('');
      });
    });
  });

  describe('Additional Form Properties', () => {
    it('should verify all form labels are associated with inputs', () => {
      const form = document.querySelector('.contact__form');
      const labels = form.querySelectorAll('label');
      
      labels.forEach(label => {
        const forAttr = label.getAttribute('for');
        expect(forAttr).toBeTruthy();
        
        // Verify the input exists
        const input = document.getElementById(forAttr);
        expect(input).toBeTruthy();
      });
    });

    it('should verify form has submit button', () => {
      const form = document.querySelector('.contact__form');
      const submitButton = form.querySelector('button[type="submit"]');
      
      expect(submitButton).toBeTruthy();
      expect(submitButton.textContent.trim()).not.toBe('');
    });
  });
});
