// Unit tests for Stylist Feature Component
// Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 8.1, 8.5

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Stylist Feature Component', () => {
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

  describe('HTML Structure (Requirements 5.1, 5.5, 8.1)', () => {
    it('should have a stylists section with correct ID', () => {
      const stylistsSection = document.getElementById('about');
      expect(stylistsSection).toBeTruthy();
      expect(stylistsSection.tagName).toBe('SECTION');
      expect(stylistsSection.classList.contains('stylists')).toBe(true);
    });

    it('should use semantic section element', () => {
      const stylistsSection = document.getElementById('about');
      expect(stylistsSection.tagName).toBe('SECTION');
    });

    it('should use semantic article elements for stylist cards', () => {
      const stylistsSection = document.getElementById('about');
      const articles = stylistsSection.querySelectorAll('article');
      
      expect(articles.length).toBeGreaterThan(0);
      
      articles.forEach(article => {
        expect(article.classList.contains('stylist-card')).toBe(true);
      });
    });

    it('should have a section title', () => {
      const stylistsSection = document.getElementById('about');
      const title = stylistsSection.querySelector('h2');
      
      expect(title).toBeTruthy();
      expect(title.textContent.trim()).toBe('Meet The Team');
    });
  });

  describe('Grid Layout (Requirement 5.1)', () => {
    it('should use CSS Grid for stylist cards layout', () => {
      const stylistsSection = document.getElementById('about');
      const grid = stylistsSection.querySelector('.stylists__grid');
      
      expect(grid).toBeTruthy();
      
      // Verify CSS has grid layout
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      expect(css).toContain('display: grid');
      
      // Should use auto-fit or auto-fill with minmax
      const gridRule = css.match(/\.stylists__grid\s*\{[^}]*grid-template-columns[^}]*\}/s);
      expect(gridRule).toBeTruthy();
    });

    it('should have responsive grid with auto-fit and minmax', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for auto-fit/auto-fill with minmax pattern
      const hasAutoFit = css.match(/grid-template-columns:\s*repeat\((auto-fit|auto-fill),\s*minmax/);
      expect(hasAutoFit).toBeTruthy();
    });
  });

  describe('Stylist Card Content (Requirements 5.2, 5.3, 8.5)', () => {
    it('should have images in each stylist card', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      stylistCards.forEach(card => {
        const image = card.querySelector('img');
        expect(image).toBeTruthy();
        expect(image.getAttribute('src')).toBeTruthy();
      });
    });

    it('should have alt attributes on all images', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      
      stylistCards.forEach(card => {
        const image = card.querySelector('img');
        expect(image).toBeTruthy();
        
        const alt = image.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt.trim()).not.toBe('');
      });
    });

    it('should display stylist names using h3 elements', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      stylistCards.forEach(card => {
        const name = card.querySelector('h3');
        expect(name).toBeTruthy();
        expect(name.classList.contains('stylist-card__name')).toBe(true);
        expect(name.textContent.trim()).not.toBe('');
      });
    });

    it('should display stylist titles/roles', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      
      stylistCards.forEach(card => {
        const title = card.querySelector('.stylist-card__title');
        expect(title).toBeTruthy();
        expect(title.textContent.trim()).not.toBe('');
      });
    });

    it('should have at least 3 stylist cards', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Typography (Requirement 5.3)', () => {
    it('should use elegant typography for stylist names', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Stylist names should use heading font
      const nameRule = css.match(/\.stylist-card__name\s*\{[^}]*\}/s);
      expect(nameRule).toBeTruthy();
      expect(nameRule[0]).toMatch(/font-family:\s*var\(--font-heading\)/);
    });
  });

  describe('Animations (Requirement 5.4)', () => {
    it('should have fade-in animation defined', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for fadeInUp or similar animation
      const hasAnimation = css.match(/@keyframes\s+fadeInUp/);
      expect(hasAnimation).toBeTruthy();
    });

    it('should apply animation to stylist cards', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Stylist cards should have animation property
      const cardRule = css.match(/\.stylist-card\s*\{[^}]*animation[^}]*\}/s);
      expect(cardRule).toBeTruthy();
    });

    it('should have staggered animation delays', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Check for nth-child selectors with animation-delay
      const hasStagger = css.match(/\.stylist-card:nth-child\(\d+\)\s*\{[^}]*animation-delay/);
      expect(hasStagger).toBeTruthy();
    });
  });

  describe('Card Styling', () => {
    it('should have image with proper aspect ratio', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Images should have aspect-ratio or similar constraint
      const imageRule = css.match(/\.stylist-card__image\s+img\s*\{[^}]*\}/s);
      expect(imageRule).toBeTruthy();
      expect(imageRule[0]).toMatch(/aspect-ratio|height/);
    });

    it('should have hover effects on cards', () => {
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      
      // Cards should have hover state
      const hoverRule = css.match(/\.stylist-card:hover/);
      expect(hoverRule).toBeTruthy();
    });
  });

  describe('Content Verification', () => {
    it('should have specific stylist names', () => {
      const names = Array.from(document.querySelectorAll('.stylist-card__name'))
        .map(el => el.textContent.trim());
      
      expect(names.length).toBeGreaterThan(0);
      expect(names).toContain('Jane Doe');
      expect(names).toContain('John Smith');
      expect(names).toContain('Emily Chen');
    });

    it('should have stylist titles/specializations', () => {
      const titles = Array.from(document.querySelectorAll('.stylist-card__title'))
        .map(el => el.textContent.trim());
      
      expect(titles.length).toBeGreaterThan(0);
      expect(titles).toContain('Master Stylist');
      expect(titles).toContain('Color Specialist');
      expect(titles).toContain('Senior Stylist');
    });
  });
});
