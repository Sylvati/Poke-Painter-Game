// Wait till page loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load sprites into the holder
  load_into_holder();

  // Make the pixels in the canvas
  add_pixels_to_canvas();

  // Color the pixels in the canvas
  color_pixels_in_canvas(1);
});

// Function to color the pixels in the canvas
function color_pixels_in_canvas(poke_num) {
  // Just load the first for now.
  const img = new Image();
  img.src = `sprites/%23${poke_num}.png`;

  // When the image finishes loading
  img.onload = () => {
    // Create a fake canvas to use
    const fake_canvas = document.createElement("canvas");
    // Make the canvas the right size
    fake_canvas.width = img.width;
    fake_canvas.height = img.height;
    // Get the canvas' context
    const fake_canvas_2d = fake_canvas.getContext("2d");
    // Draw the image
    fake_canvas_2d.drawImage(img, 0, 0);
    // Get the pixel data
    const img_data = fake_canvas_2d.getImageData(0, 0, img.width, img.height);
    // Turn it into raw data
    const raw_data = img_data.data;
    console.log(raw_data);

    // Find the canvas
    const sprite_canvas = document.getElementById("painting-grid");

    // Loop through 40x30 times
    for (
      let pixel_number = 0;
      pixel_number < sprite_canvas.children.length;
      pixel_number++
    ) {
      const pixel = sprite_canvas.children[pixel_number];

      const r = raw_data[pixel_number * 4 + 0];
      const g = raw_data[pixel_number * 4 + 1];
      const b = raw_data[pixel_number * 4 + 2];
      const a = raw_data[pixel_number * 4 + 3];

      pixel.style.backgroundColor = `rgba(${r},${g},${b},${a / 255})`;
    }
  };
}

// Function to create the pixels in the canvas
function add_pixels_to_canvas() {
  // Find the canvas
  const sprite_canvas = document.getElementById("painting-grid");

  // Loop through 40x30 times
  for (let x = 0; x < 40; x++) {
    for (let y = 0; y < 30; y++) {
      // Make a new pixel
      const pixel = document.createElement("div");
      // Edit it
      pixel.className = "pixel";
      // Make a new color box
      const color_box = document.createElement("div");
      // Edit it
      color_box.className = "color-box";
      // Add it as a child to the pixel
      pixel.appendChild(color_box);
      // Add it as a child to the canvas
      sprite_canvas.appendChild(pixel);
    }
  }
}

// Function to load the sprites into the holder
function load_into_holder() {
  // Find the sprites holder
  const sprites_holder = document.getElementById("sprites-holder");

  // 1 - 151
  for (let i = 1; i <= 151; i += 1) {
    // Make a new img
    const img = document.createElement("img");
    // Set the src
    img.src = `sprites/%23${i}.png`;
    // Add it as a child to the holder
    sprites_holder.appendChild(img);
  }
}
