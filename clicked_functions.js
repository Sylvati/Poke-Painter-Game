import { get_index } from "./helper_functions.js";

import {
  is_clickable,
  set_pixel_alpha,
  confirm_changes,
  set_unclickable,
} from "./helper_functions.js";

import { add_pixels } from "./pixel_functions.js";
import { alpha_constants } from "./canvas_functions.js";
import { add_progress } from "./progress_functions.js";

// Function holding all events that happen when the canvas is clicked.
export function on_canvas_clicked(ctx, x, y) {
  // Get image data
  const image_data = ctx.getImageData(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );

  // Get index
  const index = get_index(image_data, x, y);

  // Just run the other one
  on_canvas_clicked_index(ctx, index);
}

// Function for on canvas clicked, but like, with index as a paremeter
export function on_canvas_clicked_index(ctx, index) {
  // Get image data
  const image_data = ctx.getImageData(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );

  // Get the color and alpha values
  const r = image_data.data[index + 0];
  const g = image_data.data[index + 1];
  const b = image_data.data[index + 2];
  const a = image_data.data[index + 3];

  // Log the click
  //console.log(`Clicked at canvas pixel: (${x}, ${y})`);

  // If clickable,
  if (is_clickable(index)) {
    // Set the alpha
    set_pixel_alpha(image_data, index, alpha_constants.OPAQUE);

    // Confirm changes
    confirm_changes(ctx, image_data, 0, 0);

    // Make sure it doesn't get reclicked
    set_unclickable(index);

    // Add a pixel
    add_pixels(1);
    // Add progress
    add_progress(1);
  }
}
