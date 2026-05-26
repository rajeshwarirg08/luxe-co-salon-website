// Property-Based Test: Service Item Structure
// Property 5: For any service item in the services menu, the item should display
// a service name, dotted leader line, and price in a horizontal layout.
// **Validates: Requirements 4.4**

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Property 5: Service Item Structure', () => {
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

  it('**Property 5**: For ANY service item, it has name, dots, and price elements', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    const failedItems = [];
    
    serviceItems.forEach((item, index) => {
      const name = item.querySelector('.services__name');
      const dots = item.querySelector('.services__dots');
      const price = item.querySelector('.services__price');
      
      if (!name || !dots || !price) {
        failedItems.push({
          index,
          hasName: !!name,
          hasDots: !!dots,
          hasPrice: !!price,
          html: item.outerHTML.substring(0, 100)
        });
      }
    });
    
    if (failedItems.length > 0) {
      console.log('Failed service items:', failedItems);
    }
    
    expect(failedItems.length).toBe(0);
  });

  it('**Property 5**: For ANY service item, name element has non-empty text', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    const failedItems = [];
    
    serviceItems.forEach((item, index) => {
      const name = item.querySelector('.services__name');
      const nameText = name ? name.textContent.trim() : '';
      
      if (!nameText) {
        failedItems.push({
          index,
          nameText,
          html: item.outerHTML.substring(0, 100)
        });
      }
    });
    
    expect(failedItems.length).toBe(0);
  });

  it('**Property 5**: For ANY service item, price element has valid price format', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    const failedItems = [];
    const pricePattern = /^\$\d+$/;
    
    serviceItems.forEach((item, index) => {
      const price = item.querySelector('.services__price');
      const priceText = price ? price.textContent.trim() : '';
      
      if (!pricePattern.test(priceText)) {
        failedItems.push({
          index,
          priceText,
          html: item.outerHTML.substring(0, 100)
        });
      }
    });
    
    if (failedItems.length > 0) {
      console.log('Failed price formats:', failedItems);
    }
    
    expect(failedItems.length).toBe(0);
  });

  it('**Property 5**: For ANY service item, elements are in horizontal layout', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // Verify CSS uses flexbox for horizontal layout
    const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    expect(serviceItemRule[0]).toContain('display: flex');
    
    // Verify dots element uses flex-grow for spacing
    const dotsRule = css.match(/\.services__dots\s*\{[^}]*\}/s);
    expect(dotsRule).toBeTruthy();
    expect(dotsRule[0]).toContain('flex-grow');
  });

  it('**Property 5**: For ANY service item, dots element has dotted border styling', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    const dots = document.querySelectorAll('.services__dots');
    expect(dots.length).toBe(serviceItems.length);
    
    // Verify CSS has dotted border
    const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    const dotsRule = css.match(/\.services__dots\s*\{[^}]*\}/s);
    
    expect(dotsRule).toBeTruthy();
    expect(dotsRule[0]).toContain('border-bottom');
    expect(dotsRule[0]).toContain('dotted');
  });

  it('should verify all service items follow the same structure pattern', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // All items should have exactly 3 child elements
    serviceItems.forEach((item, index) => {
      const children = Array.from(item.children);
      
      // Should have name, dots, price as direct children
      expect(children.length).toBe(3);
      
      // Verify order: name, dots, price
      expect(children[0].classList.contains('services__name')).toBe(true);
      expect(children[1].classList.contains('services__dots')).toBe(true);
      expect(children[2].classList.contains('services__price')).toBe(true);
    });
  });

  it('should verify service items are within service lists', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    serviceItems.forEach((item, index) => {
      // Each service item should be an li element
      expect(item.tagName).toBe('LI');
      
      // Parent should be a ul with services__list class
      const parent = item.parentElement;
      expect(parent.tagName).toBe('UL');
      expect(parent.classList.contains('services__list')).toBe(true);
    });
  });
});
