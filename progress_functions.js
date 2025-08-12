import { data, start_new_pokemon } from "./index.js";
import { add_golden_pixels, add_completes } from "./pixel_functions.js";
import { increment_poke_num } from "./poke_num_functions.js";

// Function to ensure pixels text is updated
export function update_progress() {
  if (data.progress === data.total_possible_progress) {
    data.complete = true;
  }

  if (data.complete) {
    data.progress_amount_element.textContent = `Progress: Complete!`;
    when_complete();
  } else {
    data.progress_amount_element.textContent = `Progress: ${data.progress}/${data.total_possible_progress}`;
  }
}

// Function to add pixels
export function add_progress(amount) {
  data.progress += amount;
  update_progress();
}

// Function to subtract pixels
export function subtract_progress(amount) {
  data.progress -= amount;
  update_progress();
}

// What happens when the pokemon are complete
function when_complete() {
  // Increment the poke num
  increment_poke_num();
  // Increment the golden pixels
  add_golden_pixels(1);
  // Increment the completes
  add_completes(1);
  // Start the next
  start_new_pokemon(data.poke_num);
}
