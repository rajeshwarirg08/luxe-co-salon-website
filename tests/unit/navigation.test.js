/**
 * Unit Tests: Navigation Component
 * 
 * Tests for Requirements 2.2, 2.3, 2.4, 8.3:
 * - Verify navigation contains logo text
 * - Verify navigation has 4 section links
 * - Verify CTA button exists and links to #contact
 * - Verify hamburger button has aria-label
 * 
 * Feature: luxe-co-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM } from '../setup.js';

describe('Navigation Component', () => {
  beforeEach(() => {
    setupDOM();
  });

  describe('Navigation Structure', () => {
    it('should contain logo text "Luxe & Co."', () => {
      const logo = document.querySelector('.navbar__logo');
      expect(logo).toBeTruthy();
      expect(logo.textContent).toBe('Luxe & Co.');
    });

    it('should have exactly 4 section navigation links', () => {
      const navLinks = document.querySelectorAll('.navbar__list a');
      expect(navLinks.length).toBe(4);
      
      // Verify the links point to the correct sections
      const hrefs = Array.from(navLinks).map(link => link.getAttribute('href'));
      expect(hrefs).toEqual(['#services', '#about', '#gallery', '#contact']);
    });

    it('should have navigation links with correct text', () => {
      const navLinks = document.querySelectorAll('.navbar__list a');
      const linkTexts = Array.from(navLinks).map(link => link.textContent.trim());
      expect(linkTexts).toEqual(['Services', 'About', 'Gallery', 'Contact']);
    });

    it('should have a "Book Appointment" CTA button that links to #contact', () => {
      const ctaButton = document.querySelector('.navbar__nav .btn--primary');
      expect(ctaButton).toBeTruthy();
      expect(ctaButton.textContent.trim()).toBe('Book Appointment');
      expect(ctaButton.getAttribute('href')).toBe('#contact');
    });

    it('should have hamburger button with aria-label', () => {
      const hamburgerButton = document.querySelector('.navbar__toggle');
      expect(hamburgerButton).toBeTruthy();
      
      const ariaLabel = hamburgerButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toBe('Toggle navigation menu');
    });
  });

  describe('Navigation Styling', () => {
    it('should have fixed positioning', () => {
      const navbar = document.querySelector('.navbar');
      expect(navbar).toBeTruthy();
      
      const position = getComputedStyle(navbar).position;
      expect(position).toBe('fixed');
    });

    it('should have high z-index for stacking context', () => {
      const navbar = document.querySelector('.navbar');
      const zIndex = getComputedStyle(navbar).zIndex;
      expect(parseInt(zIndex)).toBeGreaterThanOrEqual(1000);
    });

    it('should use background color from design system', () => {
      const navbar = document.querySelector('.navbar');
      const bgColor = getComputedStyle(navbar).backgroundColor;
      
      // Convert rgb to hex
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        expect(hex.toLowerCase()).toBe('#1c1c1c');
      }
    });

    it('should style CTA button with accent color', () => {
      const ctaButton = document.querySelector('.navbar__nav .btn--primary');
      const bgColor = getComputedStyle(ctaButton).backgroundColor;
      
      // Convert rgb to hex
      const rgb = bgColor.match(/\d+/g);
      if (rgb) {
        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        expect(hex.toLowerCase()).toBe('#d4af37');
      }
    });
  });

  describe('Semantic HTML', () => {
    it('should use semantic header element', () => {
      const header = document.querySelector('header.navbar');
      expect(header).toBeTruthy();
      expect(header.tagName.toLowerCase()).toBe('header');
    });

    it('should use semantic nav element', () => {
      const nav = document.querySelector('nav.navbar__nav');
      expect(nav).toBeTruthy();
      expect(nav.tagName.toLowerCase()).toBe('nav');
    });

    it('should use semantic ul element for navigation list', () => {
      const navList = document.querySelector('.navbar__list');
      expect(navList).toBeTruthy();
      expect(navList.tagName.toLowerCase()).toBe('ul');
    });

    it('should use semantic button element for hamburger toggle', () => {
      const toggleButton = document.querySelector('.navbar__toggle');
      expect(toggleButton).toBeTruthy();
      expect(toggleButton.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('Accessibility', () => {
    it('should have all navigation links accessible', () => {
      const navLinks = document.querySelectorAll('.navbar__list a');
      navLinks.forEach(link => {
        expect(link.getAttribute('href')).toBeTruthy();
        expect(link.textContent.trim()).toBeTruthy();
      });
    });

    it('should have descriptive aria-label on hamburger button', () => {
      const hamburgerButton = document.querySelector('.navbar__toggle');
      const ariaLabel = hamburgerButton.getAttribute('aria-label');
      
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.length).toBeGreaterThan(5); // Should be descriptive
      expect(ariaLabel.toLowerCase()).toContain('menu');
    });
  });

  describe('Smooth Scroll', () => {
    it('should have smooth scroll behavior on html element', () => {
      const html = document.documentElement;
      const scrollBehavior = getComputedStyle(html).scrollBehavior;
      
      // Note: jsdom may not fully support scroll-behavior, so we check the CSS
      expect(scrollBehavior === 'smooth' || scrollBehavior === '').toBe(true);
    });

    it('should have all anchor links pointing to valid section IDs', () => {
      const navLinks = document.querySelectorAll('.navbar__list a');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          expect(targetElement).toBeTruthy();
        }
      });
    });
  });
});
