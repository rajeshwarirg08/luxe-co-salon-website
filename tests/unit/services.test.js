// Unit tests for Services Menu Component
// Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 7.2, 8.1, 8.4, 10.5

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Services Menu Component', () => {
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

  describe('HTML Structure (Requirements 4.3, 4.6, 8.1, 8.4)', () => {
    it('should have a services section with correct ID', () => {
      const servicesSection = document.getElementById('services');
      expect(servicesSection).toBeTruthy();
      expect(servicesSection.tagName).toBe('SECTION');
      expect(servicesSection.classList.contains('services')).toBe(true);
    });

    it('should have 3 service categories', () => {
      const servicesSection = document.getElementById('services');
      const categories = servicesSection.querySelectorAll('.services__category');
      expect(categories.length).toBe(3);
    });

    it('should have category titles for Hair, Styling, and Color', () => {
      const servicesSection = document.getElementById('services');
      const categoryTitles = servicesSection.querySelectorAll('.services__category-title');
      
      expect(categoryTitles.length).toBe(3);
      
      const titles = Array.from(categoryTitles).map(el => el.textContent.trim());
      expect(titles).toContain('Hair');
      expect(titles).toContain('Styling');
      expect(titles).toContain('Color');
    });

    it('should have each category with a title and list', () => {
      const servicesSection = document.getElementById('services');
      const categories = servicesSection.querySelectorAll('.services__category');
      
      categories.forEach(category => {
        const title = category.querySelector('.services__category-title');
        const list = category.querySelector('.services__list');
        
        expect(title).toBeTruthy();
        expect(list).toBeTruthy();
        expect(list.tagName).toBe('UL');
      });
    });

    it('should use semantic list elements', () => {
      const servicesSection = document.getElementById('services');
      const lists = servicesSection.querySelectorAll('ul');
      
      expect(lists.length).toBeGreaterThanOrEqual(3);
      
      lists.forEach(list => {
        const items = list.querySelectorAll('li');
        expect(items.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Service Item Structure (Requirement 4.4)', () => {
    it('should display service name, dots, and price for each item', () => {
      const servicesSection = document.getElementById('services');
      const serviceItems = servicesSection.querySelectorAll('.services__item');
      
      expect(serviceItems.length).toBeGreaterThan(0);
      
      serviceItems.forEach(item => {
        const name = item.querySelector('.services__name');
        const dots = item.querySelector('.services__dots');
        const price = item.querySelector('.services__price');
        
        expect(name).toBeTruthy();
        expect(dots).toBeTruthy();
        expect(price).toBeTruthy();
        
        // Verify content
        expect(name.textContent.trim()).not.toBe('');
        expect(price.textContent.trim()).toMatch(/\$\d+/);
      });
    });

    it('should have dotted leader lines between name and price', () => {
      const servicesSection = document.getElementById('services');
      const dots = servicesSection.querySelectorAll('.services__dots');
      
      expect(dots.length).toBeGreaterThan(0);
      
      // Verify CSS has dotted border styling
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      expect(css).toContain('border-bottom');
      expect(css).toContain('dotted');
    });
  });

  describe('Grid Layout (Requirements 4.1, 4.2, 7.2)', () => {
    it('should use CSS Grid for services layout', () => {
      const servicesSection = document.getElementById('services');
      const grid = servicesSection.querySelector('.services__grid');
      
      expect(grid).toBeTruthy();
      
      // Verify CSS has grid layout
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      expect(css).toContain('display: grid');
      expect(css).toContain('grid-template-columns');
    });

    it('should have responsive grid layout rules', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for mobile (1-column) and desktop (3-column) layouts
      expect(css).toContain('grid-template-columns: 1fr'); // Mobile
      expect(css).toContain('grid-template-columns: repeat(3, 1fr)'); // Desktop
      expect(css).toContain('@media (min-width: 992px)'); // Desktop breakpoint
    });
  });

  describe('Hover Effects (Requirements 4.5, 10.5)', () => {
    it('should have hover transition styles for service items', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for transition property
      expect(css).toMatch(/\.services__item[^}]*transition/);
      
      // Check for hover state
      expect(css).toMatch(/\.services__item:hover/);
    });

    it('should use consistent transition timing', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check that transitions use CSS variables
      const serviceItemSection = css.match(/\.services__item\s*\{[^}]*\}/s);
      if (serviceItemSection) {
        expect(serviceItemSection[0]).toMatch(/transition.*var\(--transition/);
      }
    });
  });

  describe('Semantic HTML (Requirement 8.1)', () => {
    it('should use semantic section element', () => {
      const servicesSection = document.getElementById('services');
      expect(servicesSection.tagName).toBe('SECTION');
    });

    it('should have proper heading hierarchy', () => {
      const servicesSection = document.getElementById('services');
      const h2 = servicesSection.querySelector('h2');
      const h3s = servicesSection.querySelectorAll('h3');
      
      expect(h2).toBeTruthy(); // Main section title
      expect(h3s.length).toBe(3); // Category titles
      
      // No h4 or lower should exist without h3
      const h4s = servicesSection.querySelectorAll('h4');
      expect(h4s.length).toBe(0);
    });
  });

  describe('Content Verification', () => {
    it('should have specific service items with prices', () => {
      const servicesSection = document.getElementById('services');
      const serviceNames = Array.from(servicesSection.querySelectorAll('.services__name'))
        .map(el => el.textContent.trim());
      
      // Verify some expected services exist
      expect(serviceNames).toContain("Women's Cut");
      expect(serviceNames).toContain("Men's Cut");
      expect(serviceNames).toContain('Blowout');
      expect(serviceNames).toContain('Full Color');
    });

    it('should have prices in correct format', () => {
      const servicesSection = document.getElementById('services');
      const prices = servicesSection.querySelectorAll('.services__price');
      
      prices.forEach(price => {
        const priceText = price.textContent.trim();
        expect(priceText).toMatch(/^\$\d+$/);
      });
    });
  });
});
