import {
  draw_image_in_canvas,
  initialize_canvas_click_listener,
} from "./canvas_functions.js";

import { initialize_fields } from "./helper_functions.js";

import { initialize_autopainter_click_listener } from "./autopainter.js";

import { load_into_holder } from "./misc_functions.js";

import { update_progress } from "./progress_functions.js";

// Data that can be shared semi-globally
export let data = {
  // Pixels
  pixels: 0,
  pixel_clickability: [],
  clickable_indices: [],
  pixel_amount_element: null,
  // Golden Pixels
  golden_pixels: 0,
  golden_pixel_amount_element: null,
  // Completes
  completes: 0,
  completes_amount_element: null,
  // Progress
  progress: 0,
  progress_amount_element: null,
  total_possible_progress: 0,
  complete: false,
  // Other vars
  poke_num: 1,
  image_data: null,
};

// Wait till page loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize fields
  initialize_fields();

  // Load sprites into the holder
  // load_into_holder();

  // Start the first pokemon
  start_new_pokemon(data.poke_num);

  // Add canvas click listener
  initialize_canvas_click_listener();

  // Add autopainter click listener
  initialize_autopainter_click_listener();
});

// Function to encompass all that must be done when a new pokemon is added
export function start_new_pokemon(poke_num) {
  // Set progress
  data.progress = 0;
  // Reset progress
  data.complete = false;
  // Color the pixels in the canvas
  draw_image_in_canvas(poke_num, 0.5).then(() => {
    // Populate the clickable pixels array
    populate_clickable_pixels(data.image_data);
    // Set max progress
    data.total_possible_progress = data.clickable_indices.length;
    update_progress();
  });
}

// Function to populate the clickable pixels array
function populate_clickable_pixels(image_data) {
  // Make room
  data.pixel_clickability.length = image_data.width * image_data.height;
  // Clear it out
  data.clickable_indices.length = 0;

  // Go through it all
  for (let i = 0; i < data.pixel_clickability.length; i++) {
    // Get the alpha of the current pixel
    const alpha = image_data.data[i * 4 + 3];

    // Perform clickable test once
    const clickable = alpha !== 0;

    // Set whether its clickable or not
    data.pixel_clickability[i] = clickable;

    // Push it to the list
    if (clickable) {
      data.clickable_indices.push(i);
    }
  }
}
