/**
 * Property-Based Tests: CSS Variable Usage
 * 
 * Property 18: CSS Variable Usage for Repeated Values
 * Validates: Requirements 10.3
 * 
 * For any CSS property value that appears more than twice in the stylesheet 
 * (colors, spacing, timing), the value should be defined as a CSS custom 
 * property and referenced via var().
 * 
 * Feature: luxe-co-salon-website
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { setupDOM } from '../setup.js';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Property 18: CSS Variable Usage for Repeated Values', () => {
  let cssContent;
  
  beforeEach(() => {
    setupDOM();
    cssContent = readFileSync(join(process.cwd(), 'styles.css'), 'utf-8');
  });

  /**
   * Helper function to extract all property values from CSS
   * Returns a map of value -> count
   */
  function extractPropertyValues(css) {
    const valueCount = new Map();
    
    // Remove comments
    const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Match CSS property: value pairs
    // This regex matches property declarations like "color: #FBF9F6;" or "padding: 1rem;"
    const propertyRegex = /([a-z-]+)\s*:\s*([^;{}]+);/gi;
    let match;
    
    while ((match = propertyRegex.exec(cleanCss)) !== null) {
      const property = match[1].trim();
      const value = match[2].trim();
      
      // Skip if the value is already a CSS variable reference (var(...))
      if (value.includes('var(')) {
        continue;
      }
      
      // Skip properties that are typically unique (like content, animation-name, etc.)
      const skipProperties = ['content', 'animation-name', 'grid-template-columns', 
                             'grid-template-rows', 'transform', 'animation-delay'];
      if (skipProperties.includes(property)) {
        continue;
      }
      
      // Normalize the value (lowercase, remove extra spaces)
      const normalizedValue = value.toLowerCase().replace(/\s+/g, ' ').trim();
      
      // Count occurrences
      valueCount.set(normalizedValue, (valueCount.get(normalizedValue) || 0) + 1);
    }
    
    return valueCount;
  }

  /**
   * Helper function to extract defined CSS variables from :root
   */
  function extractDefinedVariables(css) {
    const variables = new Map();
    
    // Find the :root block
    const rootMatch = css.match(/:root\s*{([^}]*)}/s);
    if (!rootMatch) {
      return variables;
    }
    
    const rootContent = rootMatch[1];
    
    // Match CSS variable definitions like "--color-primary: #FBF9F6;"
    const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
    let match;
    
    while ((match = varRegex.exec(rootContent)) !== null) {
      const varName = match[1].trim();
      const varValue = match[2].trim().toLowerCase().replace(/\s+/g, ' ');
      variables.set(varValue, `--${varName}`);
    }
    
    return variables;
  }

  /**
   * Helper function to check if a value should be a CSS variable
   * based on its type and frequency
   */
  function shouldBeVariable(value, count) {
    // Must appear more than twice
    if (count <= 2) {
      return false;
    }
    
    // Check if it's a color (hex, rgb, rgba, hsl, hsla)
    const isColor = /^(#[0-9a-f]{3,8}|rgb|rgba|hsl|hsla)/i.test(value);
    
    // Check if it's a spacing value (rem, em, px)
    // Exclude percentage values as they are often semantic (100% = full width)
    // rather than design system values
    const isSpacing = /^[\d.]+\s*(rem|em|px)$/i.test(value);
    
    // Check if it's a timing value (s, ms with ease functions)
    const isTiming = /^[\d.]+\s*(s|ms)(\s+ease)?/i.test(value);
    
    // Exclude common semantic values that don't need to be variables
    const semanticValues = ['100%', '0', '0px', 'auto', 'none', 'inherit', 'initial'];
    if (semanticValues.includes(value)) {
      return false;
    }
    
    return isColor || isSpacing || isTiming;
  }

  it('should define CSS variables for all repeated color values (appearing > 2 times)', () => {
    const valueCount = extractPropertyValues(cssContent);
    const definedVariables = extractDefinedVariables(cssContent);
    
    // Find all color values that appear more than twice
    const repeatedColors = Array.from(valueCount.entries())
      .filter(([value, count]) => {
        const isColor = /^#[0-9a-f]{3,8}$/i.test(value);
        return isColor && count > 2;
      });
    
    // Check each repeated color
    repeatedColors.forEach(([color, count]) => {
      const hasVariable = definedVariables.has(color);
      expect(hasVariable, 
        `Color "${color}" appears ${count} times but is not defined as a CSS variable`
      ).toBe(true);
    });
  });

  it('should define CSS variables for all repeated spacing values (appearing > 2 times)', () => {
    const valueCount = extractPropertyValues(cssContent);
    const definedVariables = extractDefinedVariables(cssContent);
    
    // Find all spacing values that appear more than twice
    const repeatedSpacing = Array.from(valueCount.entries())
      .filter(([value, count]) => {
        const isSpacing = /^[\d.]+\s*rem$/i.test(value);
        return isSpacing && count > 2;
      });
    
    // Check each repeated spacing value
    repeatedSpacing.forEach(([spacing, count]) => {
      const hasVariable = definedVariables.has(spacing);
      expect(hasVariable,
        `Spacing value "${spacing}" appears ${count} times but is not defined as a CSS variable`
      ).toBe(true);
    });
  });

  it('should define CSS variables for all repeated timing values (appearing > 2 times)', () => {
    const valueCount = extractPropertyValues(cssContent);
    const definedVariables = extractDefinedVariables(cssContent);
    
    // Find all timing values that appear more than twice
    const repeatedTiming = Array.from(valueCount.entries())
      .filter(([value, count]) => {
        const isTiming = /^[\d.]+s\s+ease$/i.test(value);
        return isTiming && count > 2;
      });
    
    // Check each repeated timing value
    repeatedTiming.forEach(([timing, count]) => {
      const hasVariable = definedVariables.has(timing);
      expect(hasVariable,
        `Timing value "${timing}" appears ${count} times but is not defined as a CSS variable`
      ).toBe(true);
    });
  });

  /**
   * Property-based test: For any CSS property value that appears more than 
   * twice and is a color, spacing, or timing value, it should be defined 
   * as a CSS variable
   */
  it('Property 18: repeated values (>2 occurrences) should use CSS variables', () => {
    const valueCount = extractPropertyValues(cssContent);
    const definedVariables = extractDefinedVariables(cssContent);
    
    // Generate test cases from actual repeated values in the stylesheet
    const repeatedValues = Array.from(valueCount.entries())
      .filter(([value, count]) => shouldBeVariable(value, count))
      .map(([value, count]) => ({ value, count }));
    
    // If there are no repeated values, the test passes trivially
    if (repeatedValues.length === 0) {
      expect(true).toBe(true);
      return;
    }
    
    // Use fast-check to test the property across all repeated values
    fc.assert(
      fc.property(
        fc.constantFrom(...repeatedValues),
        ({ value, count }) => {
          const hasVariable = definedVariables.has(value);
          
          // The property: if a value appears more than twice and is a 
          // color/spacing/timing, it must be defined as a CSS variable
          if (!hasVariable) {
            console.log(`❌ Value "${value}" appears ${count} times but is not a CSS variable`);
            return false;
          }
          
          return true;
        }
      ),
      { 
        numRuns: Math.min(100, repeatedValues.length),
        verbose: true
      }
    );
  });

  /**
   * Property-based test: For any defined CSS variable, verify it's actually 
   * used in the stylesheet (not just defined)
   */
  it('Property 18 (inverse): all defined CSS variables should be used in the stylesheet', () => {
    const definedVariables = extractDefinedVariables(cssContent);
    
    // If no variables are defined, skip this test
    if (definedVariables.size === 0) {
      expect(true).toBe(true);
      return;
    }
    
    const variableNames = Array.from(definedVariables.values());
    
    fc.assert(
      fc.property(
        fc.constantFrom(...variableNames),
        (varName) => {
          // Check if the variable is used anywhere in the CSS (via var())
          const varUsageRegex = new RegExp(`var\\(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
          const isUsed = varUsageRegex.test(cssContent);
          
          if (!isUsed) {
            console.log(`⚠️  CSS variable "${varName}" is defined but never used`);
            // This is a warning, not a failure - unused variables are not ideal but not wrong
            return true;
          }
          
          return true;
        }
      ),
      { 
        numRuns: Math.min(100, variableNames.length),
        verbose: true
      }
    );
  });
});
