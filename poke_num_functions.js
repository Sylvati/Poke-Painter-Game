import { data } from "./index.js";

// Function to increment the poke num
export function increment_poke_num() {
  if (data.poke_num < 151) {
    data.poke_num += 1;
  } else {
    data.completes += 1;
    data.poke_num = 1;
  }
}
