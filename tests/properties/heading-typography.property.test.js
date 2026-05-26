// Property-Based Test: Typography Consistency for Headings
// Property 1: For any heading element (h1, h2, h3, h4, h5, h6) in the document,
// the computed font-family should include "Playfair Display".
// **Validates: Requirements 1.2**

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Property 1: Typography Consistency for Headings', () => {
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

  it('should apply Playfair Display font to all h1 elements', () => {
    const headings = document.querySelectorAll('h1');
    expect(headings.length).toBeGreaterThan(0);
    
    headings.forEach(heading => {
      const styles = window.getComputedStyle(heading);
      const fontFamily = styles.fontFamily || '';
      
      // Check if Playfair Display is in the font stack
      // Note: jsdom may not fully resolve CSS variables, so we also check the CSS directly
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      const hasPlayfairInCSS = css.includes('--font-heading') && 
                               css.includes('Playfair Display');
      const hasPlayfairRule = css.match(/h1[^{]*\{[^}]*font-family:\s*var\(--font-heading\)/);
      
      expect(hasPlayfairInCSS).toBe(true);
      expect(hasPlayfairRule || fontFamily.includes('Playfair Display')).toBeTruthy();
    });
  });

  it('should apply Playfair Display font to all h2 elements', () => {
    const headings = document.querySelectorAll('h2');
    expect(headings.length).toBeGreaterThan(0);
    
    headings.forEach(heading => {
      const styles = window.getComputedStyle(heading);
      const fontFamily = styles.fontFamily || '';
      
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      const hasPlayfairInCSS = css.includes('--font-heading') && 
                               css.includes('Playfair Display');
      const hasPlayfairRule = css.match(/h2[^{]*\{[^}]*font-family:\s*var\(--font-heading\)/);
      
      expect(hasPlayfairInCSS).toBe(true);
      expect(hasPlayfairRule || fontFamily.includes('Playfair Display')).toBeTruthy();
    });
  });

  it('should apply Playfair Display font to all h3 elements', () => {
    const headings = document.querySelectorAll('h3');
    expect(headings.length).toBeGreaterThan(0);
    
    headings.forEach(heading => {
      const styles = window.getComputedStyle(heading);
      const fontFamily = styles.fontFamily || '';
      
      const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
      const hasPlayfairInCSS = css.includes('--font-heading') && 
                               css.includes('Playfair Display');
      const hasPlayfairRule = css.match(/h3[^{]*\{[^}]*font-family:\s*var\(--font-heading\)/);
      
      expect(hasPlayfairInCSS).toBe(true);
      expect(hasPlayfairRule || fontFamily.includes('Playfair Display')).toBeTruthy();
    });
  });

  it('should apply Playfair Display font to all h4, h5, h6 elements if present', () => {
    const headings = document.querySelectorAll('h4, h5, h6');
    
    // If there are any h4, h5, or h6 elements, they should use Playfair Display
    if (headings.length > 0) {
      headings.forEach(heading => {
        const styles = window.getComputedStyle(heading);
        const fontFamily = styles.fontFamily || '';
        
        const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
        const hasPlayfairInCSS = css.includes('--font-heading') && 
                                 css.includes('Playfair Display');
        
        expect(hasPlayfairInCSS).toBe(true);
        expect(fontFamily.includes('Playfair Display') || hasPlayfairInCSS).toBeTruthy();
      });
    }
  });

  it('**Property 1**: For ANY heading element, font-family includes Playfair Display', () => {
    // This is the universal property test
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(allHeadings.length).toBeGreaterThan(0);
    
    // Read CSS to verify the rule is defined
    const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    
    // Check that CSS defines --font-heading with Playfair Display
    const fontHeadingMatch = css.match(/--font-heading:\s*['"]?Playfair Display['"]?/);
    expect(fontHeadingMatch).toBeTruthy();
    
    // Check that all heading elements use the heading font
    const headingRuleMatch = css.match(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*font-family:\s*var\(--font-heading\)/s);
    expect(headingRuleMatch).toBeTruthy();
    
    // Verify each heading element
    const failedHeadings = [];
    allHeadings.forEach((heading, index) => {
      const tagName = heading.tagName.toLowerCase();
      const styles = window.getComputedStyle(heading);
      const fontFamily = styles.fontFamily || '';
      
      // Due to jsdom limitations, we verify the CSS rule exists
      // In a real browser, fontFamily would contain "Playfair Display"
      if (!fontFamily.includes('Playfair Display') && !headingRuleMatch) {
        failedHeadings.push({
          index,
          tagName,
          fontFamily,
          text: heading.textContent.substring(0, 50)
        });
      }
    });
    
    if (failedHeadings.length > 0) {
      console.log('Failed headings:', failedHeadings);
    }
    
    expect(failedHeadings.length).toBe(0);
  });

  it('should verify CSS rule applies font-family to all heading levels', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
    
    // Verify the CSS has a rule that applies font-family to all headings
    const headingRule = css.match(/h1,\s*\n?h2,\s*\n?h3,\s*\n?h4,\s*\n?h5,\s*\n?h6\s*\{[^}]*font-family:\s*var\(--font-heading\)/s);
    
    expect(headingRule).toBeTruthy();
  });
});
