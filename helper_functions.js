import { data } from "./index.js";
import {
  update_golden_pixels,
  update_pixels,
  update_completes,
} from "./pixel_functions.js";

// Function to initialize fields
export function initialize_fields() {
  // Initialize the pixel amount header
  data.pixel_amount_element = document.getElementById("pixel-amount");
  update_pixels();

  // Initialize the golden pixel amount header
  data.golden_pixel_amount_element = document.getElementById(
    "golden-pixel-amount"
  );
  update_golden_pixels();

  // Initialize the complete amount header
  data.completes_amount_element = document.getElementById("complete-amount");
  update_completes();

  // Initialize the progress amount header
  data.progress_amount_element = document.getElementById("current-progress");
}

// Function to convert x and y and width to an index
export function get_index(image_data, x, y) {
  // Get the location (y * width + x) * 4, because rgba for each pixel, y is skipping rows.
  return (y * image_data.width + x) * 4;
}

// Function to check for clickability
export function is_clickable(index) {
  return data.pixel_clickability[index / 4];
}

// Function to confirm image_data changes
export function confirm_changes(ctx, image_data, dx, dy) {
  ctx.putImageData(image_data, dx, dy);
}

// Function to change rgba
export function set_pixel_RGBA(image_data, index, red, green, blue, alpha) {
  set_pixel_red(image_data, index, red);
  set_pixel_blue(image_data, index, blue);
  set_pixel_green(image_data, index, green);
  set_pixel_alpha(image_data, index, alpha);
}

// Function to change pixel r
export function set_pixel_red(image_data, index, red) {
  image_data.data[index + 0] = red;
}

// Function to change pixel g
export function set_pixel_green(image_data, index, green) {
  image_data.data[index + 1] = green;
}

// Function to change pixel b
export function set_pixel_blue(image_data, index, blue) {
  image_data.data[index + 2] = blue;
}

// Function to change pixel alpha
export function set_pixel_alpha(image_data, index, alpha) {
  image_data.data[index + 3] = alpha;
}

// Function to set pixels as clicked
export function set_unclickable(index) {
  const corr_index = index / 4;

  // Update the clickability array
  data.pixel_clickability[corr_index] = false;

  // Remove from the clickable indices array
  const pos = data.clickable_indices.indexOf(corr_index);

  // As long as it exists, that is
  if (pos !== -1) {
    data.clickable_indices.splice(pos, 1);
  }

  //console.log(data.clickable_indices);
}
