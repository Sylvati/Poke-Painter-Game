import { data } from "./index.js";
import { on_canvas_clicked } from "./clicked_functions.js";
import { update_progress } from "./progress_functions.js";

// Alpha constants
export const alpha_constants = {
  OPAQUE: 255,
  TRANSLUCENT: 128,
  TRANSPARENT: 0,
};

// Function to initialize the canvas listener
export function initialize_canvas_click_listener() {
  // Find the canvas
  const canvas = document.getElementById("painting-grid");
  // Get the context
  const ctx = canvas.getContext("2d");
  // Add the listener
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    on_canvas_clicked(ctx, x, y);
  });
}

// Function to color the pixels in the canvas
export function draw_image_in_canvas(poke_num, alpha_value) {
  // Its alr async, make it more like waitable
  return new Promise((resolve) => {
    // Just load the first for now.
    const img = new Image();
    img.src = `sprites/${poke_num}.png`;

    // When the image finishes loading
    img.onload = () => {
      // Create a fake canvas to use
      const canvas = document.getElementById("painting-grid");
      // Get the canvas' context
      const ctx = canvas.getContext("2d");

      // Make the canvas the right size
      canvas.width = img.width;
      canvas.height = img.height;

      // Set the global alpha value
      ctx.globalAlpha = alpha_value;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Revert it
      ctx.globalAlpha = 1;

      // Set image data
      data.image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Resolve it
      resolve();
    };
  });
}
