// Test setup file for Luxe & Co. Salon Website
// This file runs before all tests to set up the DOM environment

import { readFileSync } from 'fs';
import { join } from 'path';

// Load HTML and CSS files into the DOM before tests run
export function setupDOM() {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
  const css = readFileSync(join(process.cwd(), 'styles.css'), 'utf-8');
  
  // Set up the document
  document.documentElement.innerHTML = html;
  
  // Create and append style element
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
  
  return { html, css };
}

// Helper function to get computed CSS variable value
export function getCSSVariable(variableName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
}

// Helper function to check if a font is loaded/available
export function getFontFamily(element) {
  return getComputedStyle(element).fontFamily;
}
