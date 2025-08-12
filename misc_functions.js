// Function to load the sprites into the holder
export function load_into_holder() {
  // Find the sprites holder
  const sprites_holder = document.getElementById("sprites-holder");

  // 1 - 151
  for (let i = 1; i <= 151; i += 1) {
    // Make a new img
    const img = document.createElement("img");
    // Set the src
    img.src = `sprites/${i}.png`;
    // Add it as a child to the holder
    sprites_holder.appendChild(img);
  }
}
