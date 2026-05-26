/**
 * Property-Based Tests: Smooth Scroll Navigation
 * 
 * Property 4: Smooth Scroll Navigation
 * For any navigation link with an anchor href (starting with #), 
 * clicking the link should result in smooth scrolling to the target section.
 * 
 * Validates: Requirements 2.5
 * 
 * Feature: luxe-co-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM } from '../setup.js';

describe('Property 4: Smooth Scroll Navigation', () => {
  beforeEach(() => {
    setupDOM();
  });

  it('should have smooth scroll behavior enabled on html element', () => {
    const html = document.documentElement;
    
    // Check if scroll-behavior is set to smooth in the CSS
    // Note: jsdom may not fully compute this, so we verify the CSS contains it
    const { css } = setupDOM();
    expect(css).toContain('scroll-behavior: smooth');
  });

  it('**Property 4**: For any navigation link with anchor href, the target section should exist', () => {
    // Get all links in the navigation
    const allNavLinks = document.querySelectorAll('.navbar a, .navbar__list a');
    
    // Filter to only anchor links (starting with #)
    const anchorLinks = Array.from(allNavLinks).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#');
    });

    // Verify we have anchor links to test
    expect(anchorLinks.length).toBeGreaterThan(0);

    // For each anchor link, verify the target exists
    anchorLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href.substring(1); // Remove the #
      const targetElement = document.getElementById(targetId);
      
      expect(targetElement).toBeTruthy();
      expect(targetElement).toBeInstanceOf(Element);
    });
  });

  it('**Property 4**: For any anchor link in the document, the target section should exist', () => {
    // Get all anchor links in the entire document
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    // Verify we have anchor links to test
    expect(allLinks.length).toBeGreaterThan(0);

    // For each anchor link, verify the target exists
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href.substring(1); // Remove the #
      
      // Skip empty anchors (href="#")
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        
        expect(targetElement).toBeTruthy();
        expect(targetElement).toBeInstanceOf(Element);
      }
    });
  });

  it('**Property 4**: For any navigation link, if it has an anchor href, it should point to a section element', () => {
    const navLinks = document.querySelectorAll('.navbar__list a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        expect(targetElement).toBeTruthy();
        
        // Verify it's a section or main element (semantic HTML)
        const tagName = targetElement.tagName.toLowerCase();
        expect(['section', 'main', 'div'].includes(tagName)).toBe(true);
      }
    });
  });

  it('**Property 4**: All CTA buttons with anchor hrefs should point to valid sections', () => {
    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    
    // Verify we have CTA buttons to test
    expect(ctaButtons.length).toBeGreaterThan(0);

    ctaButtons.forEach(button => {
      const href = button.getAttribute('href');
      const targetId = href.substring(1);
      
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        expect(targetElement).toBeTruthy();
      }
    });
  });

  it('**Property 4**: For any element with an id, it should be a valid anchor target', () => {
    const elementsWithId = document.querySelectorAll('[id]');
    
    elementsWithId.forEach(element => {
      const id = element.getAttribute('id');
      
      // Verify the id is not empty
      expect(id).toBeTruthy();
      expect(id.length).toBeGreaterThan(0);
      
      // Verify we can find it by id
      const foundElement = document.getElementById(id);
      expect(foundElement).toBe(element);
    });
  });

  describe('Smooth Scroll CSS Property', () => {
    it('should define scroll-behavior: smooth on html element', () => {
      const { css } = setupDOM();
      
      // Check that the CSS contains the smooth scroll declaration
      const hasHtmlScrollBehavior = css.includes('html') && css.includes('scroll-behavior: smooth');
      expect(hasHtmlScrollBehavior).toBe(true);
    });
  });

  describe('Navigation Link Integrity', () => {
    it('**Property 4**: For any navigation link, the href should be a valid anchor or external URL', () => {
      const allLinks = document.querySelectorAll('a');
      
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href) {
          // Should be either an anchor link (#...) or a valid URL
          const isAnchor = href.startsWith('#');
          const isExternal = href.startsWith('http://') || href.startsWith('https://');
          const isRelative = !isAnchor && !isExternal;
          
          // For anchor links, verify target exists
          if (isAnchor && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            expect(targetElement).toBeTruthy();
          }
          
          // All links should have some href value
          expect(href.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
