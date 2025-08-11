// Alpha constants
OPAQUE = 255;
TRANSLUCENT = 128;
TRANSPARENT = 0;

// Fields
// The header storing the amount of pixels
let pixel_amount_element;

// Global-ish variables
// Number of pixels the player has
let pixels = 0;

// Each pixel's clickability status
let pixel_clickability = [];

// A list of clickable indices.
let clickable_indices = [];

// Wait till page loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize fields
  initialize_fields();

  // Load sprites into the holder
  load_into_holder();

  // Color the pixels in the canvas
  draw_image_in_canvas(1, 0.5);

  // Add canvas click listener
  intialize_canvas_click_listener();

  // Add autopainter click listener
  intialize_autopainter_click_listener();
});

// Function to initialize autopainter buy button listener
function intialize_autopainter_click_listener() {
  // Get the button itself
  const auto_painter_buy_button = document.getElementById("buy-autoclicker");

  // Find the canvas
  const canvas = document.getElementById("painting-grid");
  // Get the context
  const ctx = canvas.getContext("2d");

  // Add the listener
  auto_painter_buy_button.addEventListener("click", () => {
    setInterval(function () {
      on_canvas_clicked_index(ctx, clickable_indices[0] * 4);
    }, 100);
  });
}

// Function to populate the clickable pixels array
function populate_clickable_pixels(image_data) {
  // Create the width * height array
  pixel_clickability = new Array(image_data.width * image_data.height);

  // Go through it all
  for (let i = 0; i < pixel_clickability.length; i++) {
    // Get the alpha of the current pixel
    const alpha = image_data.data[i * 4 + 3];

    // Perform clickable test once
    const clickable = alpha !== 0;

    // Set whether its clickable or not
    pixel_clickability[i] = clickable;

    // Push it to the list
    if (clickable) {
      clickable_indices.push(i);
    }
  }
}

// Function to convert x and y and width to an index
function get_index(image_data, x, y) {
  // Get the location (y * width + x) * 4, because rgba for each pixel, y is skipping rows.
  return (y * image_data.width + x) * 4;
}

// Function to initialize fields
function initialize_fields() {
  // Initialize the pixel amount header
  pixel_amount_element = document.getElementById("pixel-amount");
  update_pixels();
}

// Function for on canvas clicked, but like, with index as a paremeter
function on_canvas_clicked_index(ctx, index) {
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
    set_pixel_alpha(image_data, index, OPAQUE);

    // Confirm changes
    confirm_changes(ctx, image_data, 0, 0);

    // Make sure it doesn't get reclicked
    set_unclickable(index);

    // Add a pixel
    add_pixels(1);
  }
}

// Function holding all events that happen when the canvas is clicked.
function on_canvas_clicked(ctx, x, y) {
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

// Function to set pixels as clicked
function set_unclickable(index) {
  const corr_index = index / 4;

  // Update the clickability array
  pixel_clickability[corr_index] = false;

  // Remove from the clickable indices array
  const pos = clickable_indices.indexOf(corr_index);

  // As long as it exists, that is
  if (pos !== -1) {
    clickable_indices.splice(pos, 1);
  }

  //console.log(clickable_indices);
}

// Function to ensure pixels text is updated
function update_pixels() {
  pixel_amount_element.textContent = `Pixels: ${pixels}`;
}

// Function to add pixels
function add_pixels(amount) {
  pixels += amount;
  update_pixels();
}

// Function to subtract pixels
function subtract_pixels(amount) {
  pixels -= amount;
  update_pixels();
}

// Function to check for clickability
function is_clickable(index) {
  return pixel_clickability[index / 4];
}

// Function to confirm image_data changes
function confirm_changes(ctx, image_data, dx, dy) {
  ctx.putImageData(image_data, dx, dy);
}

// Function to change rgba
function setPixelRGBA(image_data, index, red, green, blue, alpha) {
  setPixelRed(image_data, index, red);
  setPixelBlue(image_data, index, blue);
  setPixelGreen(image_data, index, green);
  set_pixel_alpha(image_data, index, alpha);
}

// Function to change pixel r
function setPixelRed(image_data, index, red) {
  image_data.data[index + 0] = red;
}

// Function to change pixel g
function setPixelGreen(image_data, index, green) {
  image_data.data[index + 1] = green;
}

// Function to change pixel b
function setPixelBlue(image_data, index, blue) {
  image_data.data[index + 2] = blue;
}

// Function to change pixel alpha
function set_pixel_alpha(image_data, index, alpha) {
  image_data.data[index + 3] = alpha;
}

// Function to initialize the canvas listener
function intialize_canvas_click_listener() {
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
function draw_image_in_canvas(poke_num, alpha_value) {
  // Just load the first for now.
  const img = new Image();
  img.src = `sprites/%23${poke_num}.png`;

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

    // Populate the clickable pixels array
    populate_clickable_pixels(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
  };
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
    img.src = `sprites/${i}.png`;
    // Add it as a child to the holder
    sprites_holder.appendChild(img);
  }
}
