// Property-Based Test: Service Item Hover Transitions
// Property 6: For any service item, hovering over the item should trigger
// a smooth visual transition effect (transform, color, or opacity change).
// **Validates: Requirements 4.5**

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Property 6: Service Item Hover Transitions', () => {
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

  it('**Property 6**: For ANY service item, CSS defines transition property', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // Verify CSS has transition property for service items
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    expect(serviceItemRule[0]).toMatch(/transition:\s*[^;]+;/);
  });

  it('**Property 6**: For ANY service item, CSS defines hover state', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // Verify CSS has hover state for service items
    const hoverRule = css.match(/\.services__item:hover\s*\{[^}]*\}/s);
    
    expect(hoverRule).toBeTruthy();
  });

  it('**Property 6**: Hover state includes visual effect (transform, color, or opacity)', () => {
    const hoverRule = css.match(/\.services__item:hover\s*\{[^}]*\}/s);
    
    expect(hoverRule).toBeTruthy();
    
    // Check for at least one visual effect
    const hasTransform = hoverRule[0].includes('transform');
    const hasColor = hoverRule[0].includes('color');
    const hasOpacity = hoverRule[0].includes('opacity');
    
    expect(hasTransform || hasColor || hasOpacity).toBe(true);
  });

  it('**Property 6**: Transition uses smooth timing function', () => {
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    
    // Check for smooth timing (ease, ease-in, ease-out, ease-in-out, or CSS variable)
    const transitionLine = serviceItemRule[0].match(/transition:\s*([^;]+);/);
    expect(transitionLine).toBeTruthy();
    
    const hasEase = transitionLine[1].includes('ease');
    const hasVariable = transitionLine[1].includes('var(--transition');
    
    expect(hasEase || hasVariable).toBe(true);
  });

  it('**Property 6**: Transition timing uses CSS variable for consistency', () => {
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    
    // Check if transition uses CSS variable (--transition-fast, --transition-normal, --transition-slow)
    const usesVariable = serviceItemRule[0].match(/var\(--transition-(fast|normal|slow)\)/);
    
    expect(usesVariable).toBeTruthy();
  });

  it('should verify all service items have consistent transition behavior', () => {
    const serviceItems = document.querySelectorAll('.services__item');
    expect(serviceItems.length).toBeGreaterThan(0);
    
    // All service items should use the same class, ensuring consistent behavior
    serviceItems.forEach((item, index) => {
      expect(item.classList.contains('services__item')).toBe(true);
    });
    
    // Verify only one transition rule exists for consistency
    const transitionRules = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/gs);
    expect(transitionRules.length).toBe(1);
  });

  it('should verify hover effect is smooth (not instant)', () => {
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    
    // Extract transition duration
    const transitionLine = serviceItemRule[0].match(/transition:\s*([^;]+);/);
    
    // Should not be 0s (instant)
    expect(transitionLine[1]).not.toContain('0s');
    
    // Should have a duration (either explicit or via variable)
    const hasDuration = transitionLine[1].match(/\d+\.?\d*s/) || 
                       transitionLine[1].includes('var(--transition');
    expect(hasDuration).toBeTruthy();
  });

  it('should verify transition applies to all properties or specific ones', () => {
    const serviceItemRule = css.match(/\.services__item\s*\{[^}]*transition[^}]*\}/s);
    
    expect(serviceItemRule).toBeTruthy();
    
    const transitionLine = serviceItemRule[0].match(/transition:\s*([^;]+);/);
    
    // Should specify 'all' or specific properties
    const specifiesProperties = transitionLine[1].includes('all') || 
                                transitionLine[1].includes('transform') ||
                                transitionLine[1].includes('color') ||
                                transitionLine[1].includes('opacity');
    
    expect(specifiesProperties).toBe(true);
  });
});
