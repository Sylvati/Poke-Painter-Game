// Wait till page loaded
document.addEventListener("DOMContentLoaded", () => {
  // Find the sprites holder
  const sprites_holder = document.getElementById("sprites-holder");

  // 0 - 1595
  for (let i = 0; i <= 1595; i += 1) {
    // Make a new img
    const img = document.createElement("img");
    // Set the src
    img.src = `sprites/%23${i}.png`;
    // Add it as a child to the holder
    sprites_holder.appendChild(img);
  }
});
