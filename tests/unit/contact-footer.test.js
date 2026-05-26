// Unit tests for Contact Section and Footer Components
// Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.2, 7.4, 8.1, 8.3

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Contact Section and Footer', () => {
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

  describe('Contact Section Structure (Requirements 6.1, 6.2, 6.3, 8.1)', () => {
    it('should have a contact section with correct ID', () => {
      const contactSection = document.getElementById('contact');
      expect(contactSection).toBeTruthy();
      expect(contactSection.tagName).toBe('SECTION');
      expect(contactSection.classList.contains('contact')).toBe(true);
    });

    it('should have 2-column layout container', () => {
      const contactSection = document.getElementById('contact');
      const container = contactSection.querySelector('.contact__container');
      
      expect(container).toBeTruthy();
      
      // Verify CSS has grid layout
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      const containerRule = css.match(/\.contact__container\s*\{[^}]*\}/s);
      expect(containerRule).toBeTruthy();
      expect(containerRule[0]).toContain('display: grid');
    });

    it('should display hours of operation', () => {
      const contactSection = document.getElementById('contact');
      const hours = contactSection.querySelector('.contact__hours');
      
      expect(hours).toBeTruthy();
      
      const hoursList = hours.querySelector('ul');
      expect(hoursList).toBeTruthy();
      
      const listItems = hoursList.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThanOrEqual(3);
    });

    it('should have contact form with required fields', () => {
      const contactSection = document.getElementById('contact');
      const form = contactSection.querySelector('.contact__form');
      
      expect(form).toBeTruthy();
      expect(form.tagName).toBe('FORM');
      
      // Check for Name field
      const nameInput = form.querySelector('#name');
      expect(nameInput).toBeTruthy();
      expect(nameInput.getAttribute('type')).toBe('text');
      expect(nameInput.hasAttribute('required')).toBe(true);
      
      // Check for Email field
      const emailInput = form.querySelector('#email');
      expect(emailInput).toBeTruthy();
      expect(emailInput.getAttribute('type')).toBe('email');
      expect(emailInput.hasAttribute('required')).toBe(true);
      
      // Check for Service field
      const serviceSelect = form.querySelector('#service');
      expect(serviceSelect).toBeTruthy();
      expect(serviceSelect.tagName).toBe('SELECT');
      expect(serviceSelect.hasAttribute('required')).toBe(true);
    });

    it('should have labels for all form fields', () => {
      const contactSection = document.getElementById('contact');
      const form = contactSection.querySelector('.contact__form');
      
      const nameLabel = form.querySelector('label[for="name"]');
      const emailLabel = form.querySelector('label[for="email"]');
      const serviceLabel = form.querySelector('label[for="service"]');
      
      expect(nameLabel).toBeTruthy();
      expect(emailLabel).toBeTruthy();
      expect(serviceLabel).toBeTruthy();
    });

    it('should have submit button', () => {
      const contactSection = document.getElementById('contact');
      const form = contactSection.querySelector('.contact__form');
      const submitButton = form.querySelector('button[type="submit"]');
      
      expect(submitButton).toBeTruthy();
      expect(submitButton.classList.contains('btn')).toBe(true);
      expect(submitButton.classList.contains('btn--primary')).toBe(true);
    });
  });

  describe('Form Validation (Requirement 6.4)', () => {
    it('should have required attributes on Name and Email fields', () => {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      
      expect(nameInput.hasAttribute('required')).toBe(true);
      expect(emailInput.hasAttribute('required')).toBe(true);
    });

    it('should have email type for Email field', () => {
      const emailInput = document.getElementById('email');
      expect(emailInput.getAttribute('type')).toBe('email');
    });

    it('should have service select with options', () => {
      const serviceSelect = document.getElementById('service');
      const options = serviceSelect.querySelectorAll('option');
      
      expect(options.length).toBeGreaterThan(1); // At least placeholder + options
      
      // First option should be placeholder
      expect(options[0].value).toBe('');
      
      // Should have service options
      const values = Array.from(options).map(opt => opt.value);
      expect(values).toContain('hair');
      expect(values).toContain('styling');
      expect(values).toContain('color');
    });
  });

  describe('Form Styling (Requirements 6.1, 7.2, 7.4)', () => {
    it('should have minimum 44px height for form inputs', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for min-height on inputs
      const inputRule = css.match(/\.form-group\s+input[^}]*\{[^}]*\}/s);
      expect(inputRule).toBeTruthy();
      expect(inputRule[0]).toMatch(/min-height:\s*var\(--min-touch-target\)/);
    });

    it('should have focus states with accent color', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for focus styles
      const focusRule = css.match(/\.form-group\s+input:focus[^}]*\{[^}]*\}/s);
      expect(focusRule).toBeTruthy();
      expect(focusRule[0]).toContain('border-color');
      expect(focusRule[0]).toContain('var(--color-accent)');
    });

    it('should have validation state styles', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for invalid state
      const invalidRule = css.match(/\.form-group\s+input:invalid/);
      expect(invalidRule).toBeTruthy();
      
      // Check for valid state
      const validRule = css.match(/\.form-group\s+input:valid/);
      expect(validRule).toBeTruthy();
    });
  });

  describe('Responsive Layout (Requirement 7.2)', () => {
    it('should have responsive grid layout for contact section', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Should have 1-column on mobile, 2-column on desktop
      expect(css).toMatch(/\.contact__container\s*\{[^}]*grid-template-columns:\s*1fr/s);
      
      // Check for desktop breakpoint (768px)
      expect(css).toContain('@media (min-width: 768px)');
      expect(css).toMatch(/\.contact__container\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s);
    });
  });

  describe('Footer Structure (Requirements 6.5, 6.6, 8.1, 8.3)', () => {
    it('should have a footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
      expect(footer.classList.contains('footer')).toBe(true);
    });

    it('should have 3 social media links', () => {
      const footer = document.querySelector('footer');
      const socialLinks = footer.querySelectorAll('.footer__social a');
      
      expect(socialLinks.length).toBe(3);
    });

    it('should have aria-labels on social media icons', () => {
      const footer = document.querySelector('footer');
      const socialLinks = footer.querySelectorAll('.footer__social a');
      
      socialLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel.trim()).not.toBe('');
      });
      
      // Check for specific labels
      const labels = Array.from(socialLinks).map(link => link.getAttribute('aria-label'));
      expect(labels).toContain('Instagram');
      expect(labels).toContain('Facebook');
      expect(labels).toContain('Twitter');
    });

    it('should have copyright text', () => {
      const footer = document.querySelector('footer');
      const copyright = footer.querySelector('.footer__copyright');
      
      expect(copyright).toBeTruthy();
      expect(copyright.textContent).toContain('2024');
      expect(copyright.textContent).toContain('Luxe & Co');
    });

    it('should use semantic footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer.tagName).toBe('FOOTER');
    });
  });

  describe('Footer Styling (Requirements 7.4)', () => {
    it('should have minimum 44px size for social icons', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for min size on social links
      const socialRule = css.match(/\.footer__social\s+a\s*\{[^}]*\}/s);
      expect(socialRule).toBeTruthy();
      expect(socialRule[0]).toMatch(/width:\s*var\(--min-touch-target\)/);
      expect(socialRule[0]).toMatch(/height:\s*var\(--min-touch-target\)/);
    });

    it('should have hover transitions for social icons', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for transition
      const socialRule = css.match(/\.footer__social\s+a\s*\{[^}]*\}/s);
      expect(socialRule).toBeTruthy();
      expect(socialRule[0]).toContain('transition');
      
      // Check for hover state
      const hoverRule = css.match(/\.footer__social\s+a:hover/);
      expect(hoverRule).toBeTruthy();
    });
  });

  describe('Content Verification', () => {
    it('should have specific hours of operation', () => {
      const hours = document.querySelector('.contact__hours');
      const text = hours.textContent;
      
      expect(text).toContain('Monday');
      expect(text).toContain('Friday');
      expect(text).toContain('Saturday');
      expect(text).toContain('Sunday');
    });

    it('should have form field placeholders or labels', () => {
      const nameLabel = document.querySelector('label[for="name"]');
      const emailLabel = document.querySelector('label[for="email"]');
      const serviceLabel = document.querySelector('label[for="service"]');
      
      expect(nameLabel.textContent.trim()).toBe('Name');
      expect(emailLabel.textContent.trim()).toBe('Email');
      expect(serviceLabel.textContent.trim()).toBe('Service');
    });
  });
});
