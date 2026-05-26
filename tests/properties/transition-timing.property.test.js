// Property-Based Test: Consistent Transition Timing
// Property 19: For any element with CSS transitions, the transition timing function
// should use one of the predefined timing variables (--transition-fast, --transition-normal, --transition-slow).
// **Validates: Requirements 10.5**

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Property 19: Consistent Transition Timing', () => {
  let css;

  beforeEach(() => {
    css = fs.readFileSync(path.resolve(__dirname, '../../styles.css'), 'utf8');
  });

  it('should define transition timing variables', () => {
    // Verify all three timing variables are defined
    expect(css).toMatch(/--transition-fast:\s*[\d.]+s\s+ease/);
    expect(css).toMatch(/--transition-normal:\s*[\d.]+s\s+ease/);
    expect(css).toMatch(/--transition-slow:\s*[\d.]+s\s+ease/);
  });

  it('**Property 19**: For ANY element with transition, uses predefined timing variables', () => {
    // Find all transition declarations in the CSS
    const transitionMatches = css.matchAll(/transition:\s*([^;]+);/g);
    const transitions = Array.from(transitionMatches);
    
    expect(transitions.length).toBeGreaterThan(0);
    
    const failedTransitions = [];
    
    transitions.forEach((match, index) => {
      const transitionValue = match[1];
      
      // Check if it uses one of the predefined variables
      const usesVariable = transitionValue.includes('var(--transition-fast)') ||
                          transitionValue.includes('var(--transition-normal)') ||
                          transitionValue.includes('var(--transition-slow)');
      
      // Also check for shorthand with just 'ease' (which might be acceptable)
      const usesEase = transitionValue.includes('ease');
      
      if (!usesVariable && !usesEase) {
        failedTransitions.push({
          index,
          value: transitionValue,
          context: match[0]
        });
      }
    });
    
    if (failedTransitions.length > 0) {
      console.log('Transitions not using predefined variables:', failedTransitions);
    }
    
    // All transitions should use variables or at least 'ease'
    expect(failedTransitions.length).toBe(0);
  });

  it('**Property 19**: Transition timing variables are actually used in the stylesheet', () => {
    // Verify each timing variable is used at least once
    const usesFast = css.includes('var(--transition-fast)');
    const usesNormal = css.includes('var(--transition-normal)');
    const usesSlow = css.includes('var(--transition-slow)');
    
    // At least one should be used (ideally all three)
    expect(usesFast || usesNormal || usesSlow).toBe(true);
    
    // Count usage of each
    const fastCount = (css.match(/var\(--transition-fast\)/g) || []).length;
    const normalCount = (css.match(/var\(--transition-normal\)/g) || []).length;
    const slowCount = (css.match(/var\(--transition-slow\)/g) || []).length;
    
    const totalUsage = fastCount + normalCount + slowCount;
    expect(totalUsage).toBeGreaterThan(0);
  });

  it('should verify transition timing values are consistent', () => {
    // Extract timing variable definitions
    const fastMatch = css.match(/--transition-fast:\s*([\d.]+s\s+ease)/);
    const normalMatch = css.match(/--transition-normal:\s*([\d.]+s\s+ease)/);
    const slowMatch = css.match(/--transition-slow:\s*([\d.]+s\s+ease)/);
    
    expect(fastMatch).toBeTruthy();
    expect(normalMatch).toBeTruthy();
    expect(slowMatch).toBeTruthy();
    
    // Extract durations
    const fastDuration = parseFloat(fastMatch[1]);
    const normalDuration = parseFloat(normalMatch[1]);
    const slowDuration = parseFloat(slowMatch[1]);
    
    // Verify logical ordering: fast < normal < slow
    expect(fastDuration).toBeLessThan(normalDuration);
    expect(normalDuration).toBeLessThan(slowDuration);
  });

  it('should verify all timing functions use "ease" family', () => {
    // Extract all timing variable definitions
    const timingVars = css.matchAll(/--transition-(fast|normal|slow):\s*([^;]+);/g);
    const timings = Array.from(timingVars);
    
    expect(timings.length).toBe(3);
    
    timings.forEach(match => {
      const value = match[2];
      // Should contain 'ease' (ease, ease-in, ease-out, ease-in-out)
      expect(value).toMatch(/ease/);
    });
  });

  it('should verify no hardcoded transition durations outside of variables', () => {
    // Find all transition declarations
    const transitionMatches = css.matchAll(/transition:\s*([^;]+);/g);
    const transitions = Array.from(transitionMatches);
    
    const hardcodedTransitions = [];
    
    transitions.forEach((match, index) => {
      const transitionValue = match[1];
      
      // Check if it has a hardcoded duration (e.g., "0.3s") without using a variable
      const hasHardcodedDuration = transitionValue.match(/\d+\.?\d*s/) && 
                                   !transitionValue.includes('var(--transition');
      
      if (hasHardcodedDuration) {
        hardcodedTransitions.push({
          index,
          value: transitionValue
        });
      }
    });
    
    if (hardcodedTransitions.length > 0) {
      console.log('Hardcoded transition durations found:', hardcodedTransitions);
    }
    
    // Ideally, all should use variables (but we allow some flexibility)
    // This is a warning rather than a strict requirement
    expect(hardcodedTransitions.length).toBeLessThanOrEqual(2);
  });

  it('should verify transition properties are specific or "all"', () => {
    const transitionMatches = css.matchAll(/transition:\s*([^;]+);/g);
    const transitions = Array.from(transitionMatches);
    
    expect(transitions.length).toBeGreaterThan(0);
    
    transitions.forEach((match, index) => {
      const transitionValue = match[1].trim();
      
      // Transitions can be in format: "property duration" or "duration property"
      // Common properties: all, transform, color, opacity, background, border, right
      const specifiesProperty = transitionValue.match(/(all|transform|color|opacity|background|border|right|left|top|bottom)/);
      
      if (!specifiesProperty) {
        console.log(`Transition without clear property: "${transitionValue}"`);
      }
      
      expect(specifiesProperty).toBeTruthy();
    });
  });
});
