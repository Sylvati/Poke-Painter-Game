import { data } from "./index.js";

// REGULAR PIXELS

// Function to ensure pixels text is updated
export function update_pixels() {
  data.pixel_amount_element.textContent = `Pixels: ${data.pixels}`;
}

// Function to add pixels
export function add_pixels(amount) {
  data.pixels += amount;
  update_pixels();
}

// Function to subtract pixels
export function subtract_pixels(amount) {
  data.pixels -= amount;
  update_pixels();
}

// GOLDEN PIXELS

// Function to ensure pixels text is updated
export function update_golden_pixels() {
  data.golden_pixel_amount_element.textContent = `Golden Pixels: ${data.golden_pixels}`;
}

// Function to add pixels
export function add_golden_pixels(amount) {
  data.golden_pixels += amount;
  update_golden_pixels();
}

// Function to subtract pixels
export function subtract_golden_pixels(amount) {
  data.golden_pixels -= amount;
  update_golden_pixels();
}

// COMPLETES

// Function to ensure pixels text is updated
export function update_completes() {
  data.completes_amount_element.textContent = `Completes: ${data.completes}`;
}

// Function to add pixels
export function add_completes(amount) {
  data.completes += amount;
  update_completes();
}

// Function to subtract pixels
export function subtract_completes(amount) {
  data.completes -= amount;
  update_completes();
}
