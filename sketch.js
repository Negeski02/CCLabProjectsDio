let scanned = [];
let house = [];
let curHouse = 0;
 
let houseX = 400;
let houseY = 250;
 
function preload() {
  let nomes = [
    "IMG_2292.jpeg",
    "IMG_2293.jpeg",
    "IMG_2294.jpeg",
    "IMG_2295.jpeg",
    "IMG_2296.jpeg",
    "IMG_2297.jpeg",
    "IMG_2298.jpeg",
    "IMG_2299.jpeg",
    "IMG_2300.jpeg"
  ];
  for (let i = 0; i < nomes.length; i++) {
    scanned.push(loadImage(nomes[i]));
  }
}
 
function setup() {
  createCanvas(1000, 600);
  eraseBg(scanned, 15);
  house = crop(scanned, 380, 60, 400, 470);
}
 
function draw() {
  background(255);
 
  // Casinha segue o mouse suavemente
  houseX = lerp(houseX, mouseX, 0.05);
  houseY = lerp(houseY, mouseY, 0.05);
 
  imageMode(CENTER);
  image(
    house[curHouse],
    houseX,
    houseY,
    house[0].width  * 0.55,
    house[0].height * 0.55
  );
  curHouse = floor((frameCount / 18) % house.length);
}
 
function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}
 
function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
}
 