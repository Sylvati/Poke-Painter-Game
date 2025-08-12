import { data } from "./index.js";
import { on_canvas_clicked_index } from "./clicked_functions.js";

// Function to initialize autopainter buy button listener
export function initialize_autopainter_click_listener() {
  // Get the button itself
  const auto_painter_buy_button = document.getElementById("buy-autoclicker");

  // Find the canvas
  const canvas = document.getElementById("painting-grid");
  // Get the context
  const ctx = canvas.getContext("2d");

  // Add the listener
  auto_painter_buy_button.addEventListener("click", () => {
    setInterval(function () {
      on_canvas_clicked_index(ctx, data.clickable_indices[0] * 4);
    }, 100);
  });
}
