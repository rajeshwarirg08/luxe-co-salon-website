// Property-Based Tests: Stylist Card Properties
// Property 7: Stylist Card Image Presence - Requirements 5.2
// Property 8: Stylist Card Typography - Requirements 5.3
// Property 15: Image Alt Attributes - Requirements 8.5

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Stylist Card Properties', () => {
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

  describe('Property 7: Stylist Card Image Presence', () => {
    it('**Property 7**: For ANY stylist card, it contains an image element', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      const failedCards = [];
      
      stylistCards.forEach((card, index) => {
        const image = card.querySelector('img');
        
        if (!image) {
          failedCards.push({
            index,
            html: card.outerHTML.substring(0, 100)
          });
        }
      });
      
      if (failedCards.length > 0) {
        console.log('Stylist cards without images:', failedCards);
      }
      
      expect(failedCards.length).toBe(0);
    });

    it('**Property 7**: For ANY stylist card image, it has a valid src attribute', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      const failedImages = [];
      
      stylistCards.forEach((card, index) => {
        const image = card.querySelector('img');
        const src = image ? image.getAttribute('src') : null;
        
        if (!src || src.trim() === '') {
          failedImages.push({
            index,
            src,
            html: card.outerHTML.substring(0, 100)
          });
        }
      });
      
      expect(failedImages.length).toBe(0);
    });

    it('**Property 7**: For ANY stylist card, image is within proper container', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      
      stylistCards.forEach((card, index) => {
        const imageContainer = card.querySelector('.stylist-card__image');
        expect(imageContainer).toBeTruthy();
        
        const image = imageContainer.querySelector('img');
        expect(image).toBeTruthy();
      });
    });
  });

  describe('Property 8: Stylist Card Typography', () => {
    it('**Property 8**: For ANY stylist card, name uses heading font family', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      // Verify CSS rule applies Playfair Display to stylist names
      const nameRule = css.match(/\.stylist-card__name\s*\{[^}]*font-family[^}]*\}/s);
      expect(nameRule).toBeTruthy();
      expect(nameRule[0]).toMatch(/font-family:\s*var\(--font-heading\)/);
      
      // Verify --font-heading is Playfair Display
      const fontHeadingDef = css.match(/--font-heading:\s*['"]?Playfair Display['"]?/);
      expect(fontHeadingDef).toBeTruthy();
    });

    it('**Property 8**: For ANY stylist card, name element exists and has content', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      const failedCards = [];
      
      stylistCards.forEach((card, index) => {
        const name = card.querySelector('.stylist-card__name');
        const nameText = name ? name.textContent.trim() : '';
        
        if (!name || !nameText) {
          failedCards.push({
            index,
            hasName: !!name,
            nameText,
            html: card.outerHTML.substring(0, 100)
          });
        }
      });
      
      expect(failedCards.length).toBe(0);
    });

    it('**Property 8**: For ANY stylist card, name uses h3 element', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      
      stylistCards.forEach((card, index) => {
        const name = card.querySelector('.stylist-card__name');
        expect(name).toBeTruthy();
        expect(name.tagName).toBe('H3');
      });
    });
  });

  describe('Property 15: Image Alt Attributes', () => {
    it('**Property 15**: For ANY img element in the document, it has an alt attribute', () => {
      const allImages = document.querySelectorAll('img');
      expect(allImages.length).toBeGreaterThan(0);
      
      const failedImages = [];
      
      allImages.forEach((image, index) => {
        const alt = image.getAttribute('alt');
        
        if (alt === null) {
          failedImages.push({
            index,
            src: image.getAttribute('src'),
            html: image.outerHTML
          });
        }
      });
      
      if (failedImages.length > 0) {
        console.log('Images without alt attributes:', failedImages);
      }
      
      expect(failedImages.length).toBe(0);
    });

    it('**Property 15**: For ANY stylist card image, alt text is descriptive', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      const failedImages = [];
      
      stylistCards.forEach((card, index) => {
        const image = card.querySelector('img');
        const alt = image ? image.getAttribute('alt') : null;
        
        // Alt should exist and not be empty (decorative images can have empty alt)
        // For stylist images, alt should be descriptive
        if (!alt || alt.trim() === '') {
          failedImages.push({
            index,
            alt,
            src: image ? image.getAttribute('src') : null
          });
        }
      });
      
      if (failedImages.length > 0) {
        console.log('Stylist images with missing/empty alt:', failedImages);
      }
      
      expect(failedImages.length).toBe(0);
    });

    it('should verify all images in document have alt attributes', () => {
      const allImages = document.querySelectorAll('img');
      
      allImages.forEach((image, index) => {
        const hasAlt = image.hasAttribute('alt');
        expect(hasAlt).toBe(true);
      });
    });
  });

  describe('Additional Stylist Card Properties', () => {
    it('should verify all stylist cards have consistent structure', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      expect(stylistCards.length).toBeGreaterThan(0);
      
      stylistCards.forEach((card, index) => {
        // Each card should have: image container, name (h3), and title (p)
        const imageContainer = card.querySelector('.stylist-card__image');
        const name = card.querySelector('.stylist-card__name');
        const title = card.querySelector('.stylist-card__title');
        
        expect(imageContainer).toBeTruthy();
        expect(name).toBeTruthy();
        expect(title).toBeTruthy();
      });
    });

    it('should verify stylist cards are article elements', () => {
      const stylistCards = document.querySelectorAll('.stylist-card');
      
      stylistCards.forEach((card, index) => {
        expect(card.tagName).toBe('ARTICLE');
      });
    });
  });
});
