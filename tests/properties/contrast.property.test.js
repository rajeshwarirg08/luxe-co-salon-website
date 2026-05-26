/**
 * Property-Based Tests: WCAG AA Contrast Compliance
 * 
 * Property 3: WCAG AA Contrast Compliance
 * **Validates: Requirements 1.4, 9.1**
 * 
 * For any text element and its background, the contrast ratio should meet 
 * or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text or 18pt+).
 * 
 * Feature: luxe-co-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM } from '../setup.js';
import * as fc from 'fast-check';

describe('Property 3: WCAG AA Contrast Compliance', () => {
  beforeEach(() => {
    setupDOM();
  });

  /**
   * Resolve CSS variable to its actual value
   * jsdom doesn't fully resolve CSS variables in getComputedStyle
   */
  function resolveCSSVariable(value) {
    // Check if value is a CSS variable reference
    const varMatch = value.match(/var\((--[\w-]+)\)/);
    if (varMatch) {
      const varName = varMatch[1];
      // Get the variable value from :root
      const varValue = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      return varValue || value;
    }
    return value;
  }

  /**
   * Helper function to parse RGB color string to RGB object
   * Handles formats: rgb(r, g, b), rgba(r, g, b, a), #RRGGBB, #RGB
   */
  function parseColor(colorString) {
    // Resolve CSS variables first
    colorString = resolveCSSVariable(colorString);
    
    // Handle rgba/rgb format
    const rgbaMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1]),
        g: parseInt(rgbaMatch[2]),
        b: parseInt(rgbaMatch[3])
      };
    }
    
    // Handle hex format
    const hexMatch = colorString.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      // Expand shorthand hex (#RGB to #RRGGBB)
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    }
    
    // Default to black if parsing fails
    return { r: 0, g: 0, b: 0 };
  }

  /**
   * Calculate relative luminance according to WCAG formula
   * https://www.w3.org/TR/WCAG20-TECHS/G17.html
   */
  function getRelativeLuminance(rgb) {
    const { r, g, b } = rgb;
    
    // Convert to 0-1 range
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;
    
    // Apply gamma correction
    const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  }

  /**
   * Calculate contrast ratio between two colors
   * https://www.w3.org/TR/WCAG20-TECHS/G17.html
   */
  function getContrastRatio(color1, color2) {
    const lum1 = getRelativeLuminance(parseColor(color1));
    const lum2 = getRelativeLuminance(parseColor(color2));
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if text is considered "large" according to WCAG
   * Large text is 18pt (24px) or 14pt (18.66px) bold
   */
  function isLargeText(element) {
    const style = getComputedStyle(element);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = parseInt(style.fontWeight) || 400;
    
    // 18pt = 24px (at 96 DPI)
    if (fontSize >= 24) {
      return true;
    }
    
    // 14pt bold = 18.66px bold (at 96 DPI)
    if (fontSize >= 18.66 && fontWeight >= 700) {
      return true;
    }
    
    return false;
  }

  /**
   * Get the effective background color of an element
   * Walks up the DOM tree to find the first non-transparent background
   */
  function getEffectiveBackgroundColor(element) {
    let current = element;
    
    while (current && current !== document.documentElement) {
      const bgColor = getComputedStyle(current).backgroundColor;
      
      // Check if background is not transparent
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }
      
      current = current.parentElement;
    }
    
    // Default to document background or white
    const docBg = getComputedStyle(document.body).backgroundColor;
    return docBg || 'rgb(255, 255, 255)';
  }

  /**
   * Get all text-containing elements from the document
   * Excludes script, style, and hidden elements
   */
  function getTextElements() {
    const allElements = document.querySelectorAll('*');
    const textElements = [];
    
    for (const element of allElements) {
      // Skip non-visible elements
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        continue;
      }
      
      // Skip script, style, and other non-text elements
      const tagName = element.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'svg', 'path'].includes(tagName)) {
        continue;
      }
      
      // Check if element has direct text content (not just from children)
      const hasDirectText = Array.from(element.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
      );
      
      if (hasDirectText) {
        textElements.push(element);
      }
    }
    
    return textElements;
  }

  /**
   * Unit test: Verify specific known text/background combinations meet WCAG AA
   */
  it('should meet WCAG AA contrast for primary color on background color', () => {
    // Primary (#FBF9F6) on Background (#1C1C1C)
    const ratio = getContrastRatio('#FBF9F6', '#1C1C1C');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('should meet WCAG AA contrast for background color on primary color', () => {
    // Background (#1C1C1C) on Primary (#FBF9F6)
    const ratio = getContrastRatio('#1C1C1C', '#FBF9F6');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('should meet WCAG AA contrast for accent color on background color', () => {
    // Accent (#D4AF37) on Background (#1C1C1C)
    const ratio = getContrastRatio('#D4AF37', '#1C1C1C');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('should meet WCAG AA contrast for background color on accent color', () => {
    // Background (#1C1C1C) on Accent (#D4AF37)
    const ratio = getContrastRatio('#1C1C1C', '#D4AF37');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  /**
   * Property-based test: For any text element in the document, verify it meets
   * WCAG AA contrast requirements with its background
   */
  it('Property 3: all text elements should meet WCAG AA contrast ratios', () => {
    const textElements = getTextElements();
    
    // If no text elements found, test passes trivially
    if (textElements.length === 0) {
      expect(true).toBe(true);
      return;
    }
    
    // Use fast-check to test the property across all text elements
    fc.assert(
      fc.property(
        fc.constantFrom(...textElements),
        (element) => {
          const style = getComputedStyle(element);
          const textColor = style.color;
          const backgroundColor = getEffectiveBackgroundColor(element);
          
          // Calculate contrast ratio
          const ratio = getContrastRatio(textColor, backgroundColor);
          
          // Determine required ratio based on text size
          const isLarge = isLargeText(element);
          const requiredRatio = isLarge ? 3.0 : 4.5;
          
          // Check if contrast meets requirements
          const meetsRequirement = ratio >= requiredRatio;
          
          if (!meetsRequirement) {
            const tagName = element.tagName.toLowerCase();
            const className = element.className || '(no class)';
            console.log(`❌ Contrast failure on <${tagName}> ${className}:`);
            console.log(`   Text: ${textColor}, Background: ${backgroundColor}`);
            console.log(`   Ratio: ${ratio.toFixed(2)}:1 (required: ${requiredRatio}:1)`);
            console.log(`   Large text: ${isLarge}`);
            console.log(`   Text content: "${element.textContent.trim().substring(0, 50)}..."`);
          }
          
          return meetsRequirement;
        }
      ),
      { 
        numRuns: Math.min(100, textElements.length),
        verbose: true
      }
    );
  });

  /**
   * Property-based test: Verify all heading elements meet contrast requirements
   * Headings are often large text, so they need at least 3:1 contrast
   */
  it('Property 3: all heading elements should meet WCAG AA contrast ratios', () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (headings.length === 0) {
      expect(true).toBe(true);
      return;
    }
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(headings)),
        (heading) => {
          const style = getComputedStyle(heading);
          const textColor = style.color;
          const backgroundColor = getEffectiveBackgroundColor(heading);
          
          const ratio = getContrastRatio(textColor, backgroundColor);
          const isLarge = isLargeText(heading);
          const requiredRatio = isLarge ? 3.0 : 4.5;
          
          const meetsRequirement = ratio >= requiredRatio;
          
          if (!meetsRequirement) {
            console.log(`❌ Heading contrast failure on <${heading.tagName.toLowerCase()}>:`);
            console.log(`   Text: ${textColor}, Background: ${backgroundColor}`);
            console.log(`   Ratio: ${ratio.toFixed(2)}:1 (required: ${requiredRatio}:1)`);
            console.log(`   Content: "${heading.textContent.trim()}"`);
          }
          
          return meetsRequirement;
        }
      ),
      { 
        numRuns: Math.min(100, headings.length),
        verbose: true
      }
    );
  });

  /**
   * Property-based test: Verify all interactive elements (buttons, links) meet contrast
   */
  it('Property 3: all interactive elements should meet WCAG AA contrast ratios', () => {
    const interactive = document.querySelectorAll('a, button, input, select');
    
    if (interactive.length === 0) {
      expect(true).toBe(true);
      return;
    }
    
    fc.assert(
      fc.property(
        fc.constantFrom(...Array.from(interactive)),
        (element) => {
          const style = getComputedStyle(element);
          
          // Skip if element has no visible text (like icon-only buttons)
          const hasText = element.textContent.trim().length > 0;
          if (!hasText && element.tagName.toLowerCase() !== 'input') {
            return true; // Skip elements without text
          }
          
          const textColor = style.color;
          const backgroundColor = getEffectiveBackgroundColor(element);
          
          const ratio = getContrastRatio(textColor, backgroundColor);
          const isLarge = isLargeText(element);
          const requiredRatio = isLarge ? 3.0 : 4.5;
          
          const meetsRequirement = ratio >= requiredRatio;
          
          if (!meetsRequirement) {
            const tagName = element.tagName.toLowerCase();
            const className = element.className || '(no class)';
            console.log(`❌ Interactive element contrast failure on <${tagName}> ${className}:`);
            console.log(`   Text: ${textColor}, Background: ${backgroundColor}`);
            console.log(`   Ratio: ${ratio.toFixed(2)}:1 (required: ${requiredRatio}:1)`);
          }
          
          return meetsRequirement;
        }
      ),
      { 
        numRuns: Math.min(100, interactive.length),
        verbose: true
      }
    );
  });
});
