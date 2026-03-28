let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  dancer = new MonkeyDancer(width / 2, height / 2);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class MonkeyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.t = 0;

    // Body bounce
    this.bounceY = 0;
    this.bodyTilt = 0;

    // Arm & leg angles
    this.leftArmAngle = 0;
    this.rightArmAngle = 0;
    this.leftLegAngle = 0;
    this.rightLegAngle = 0;

    // Head wiggle
    this.headWiggle = 0;

    // Ear flap
    this.earFlap = 0;

    // Eye blink
    this.blinkTimer = 0;
    this.isBlinking = false;

    // Tail wave
    this.tailAngle = 0;

    // Colors (self-contained, no globals)
    this.bodyColor  = [139, 90, 43];
    this.faceColor  = [210, 160, 110];
    this.darkBrown  = [80, 40, 10];
  }

  update() {
    this.t += 0.07;

    // Body bounce (up-down bop)
    this.bounceY = sin(this.t * 2) * 12;

    // Body tilt side to side
    this.bodyTilt = sin(this.t * 2) * 0.18;
 // Arms flailing wildly (funny floss-like motion)
    this.leftArmAngle  = sin(this.t * 2 + PI) * 1.4 - 0.5;
    this.rightArmAngle = sin(this.t * 2)       * 1.4 + 0.5;

    // Legs kicking alternately
    this.leftLegAngle  = sin(this.t * 2) * 0.6;
    this.rightLegAngle = sin(this.t * 2 + PI) * 0.6;

    // Head wiggle (extra silly)
    this.headWiggle = sin(this.t * 3) * 0.25;

    // Ear flap
    this.earFlap = sin(this.t * 4) * 0.3;

    // Tail wave
    this.tailAngle = sin(this.t * 2.5) * 0.8;

    // Blink every ~2 seconds
    this.blinkTimer++;
    if (this.blinkTimer > 90) {
      this.isBlinking = true;
      if (this.blinkTimer > 95) {
        this.isBlinking = false;
        this.blinkTimer = 0;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y + this.bounceY);
    rotate(this.bodyTilt);

    // --- Tail ---
    push();
    translate(0, 30);
    rotate(this.tailAngle + 0.3);
    noFill();
    stroke(...this.bodyColor);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < 12; i++) {
      let a = i * 0.25 + this.tailAngle;
      let r = 20 + i * 4;
         vertex(cos(a) * r * 0.5, r);
    }
    endShape();
    pop();

    // --- Left leg ---
    push();
    translate(-18, 40);
    rotate(this.leftLegAngle);
    fill(...this.bodyColor); noStroke();
    rect(-7, 0, 14, 38, 7);
    // foot
    fill(...this.darkBrown);
    ellipse(0, 42, 18, 10);
    pop();

    // --- Right leg ---
    push();
    translate(18, 40);
    rotate(this.rightLegAngle);
    fill(...this.bodyColor); noStroke();
    rect(-7, 0, 14, 38, 7);
    fill(...this.darkBrown);
    ellipse(0, 42, 18, 10);
    pop();

    // --- Body ---
    fill(...this.bodyColor); noStroke();
    ellipse(0, 20, 70, 80);

    // Belly patch
    fill(...this.faceColor);
    ellipse(0, 25, 40, 50);

    // --- Left arm (flailing) ---
    push();
    translate(-35, 5);
    rotate(this.leftArmAngle);
    fill(...this.bodyColor); noStroke();
    rect(-7, 0, 14, 45, 7);
    // hand
    fill(...this.faceColor);
    ellipse(0, 52, 18, 16);
    pop();

    // --- Right arm (flailing) ---
    push();
    translate(35, 5);
    rotate(this.rightArmAngle);
    fill(...this.bodyColor); noStroke();
    rect(-7, 0, 14, 45, 7);
    fill(...this.faceColor);
    ellipse(0, 52, 18, 16);
    pop();

    // --- Head ---
    push();
    translate(0, -38);
    rotate(this.headWiggle);

    // Left ear (flapping)
    push();
    translate(-32, 0);
    rotate(-0.2 + this.earFlap);
    fill(...this.bodyColor); noStroke();
    ellipse(0, 0, 24, 22);
    fill(...this.faceColor);
    ellipse(0, 0, 14, 13);
    pop();

    // Right ear (flapping)
    push();
    translate(32, 0);
    rotate(0.2 - this.earFlap);
    fill(...this.bodyColor); noStroke();
    ellipse(0, 0, 24, 22);
    fill(...this.faceColor);
    ellipse(0, 0, 14, 13);
    pop();

    // Head shape
    fill(...this.bodyColor); noStroke();
    ellipse(0, 0, 65, 62);

    // Face patch
    fill(...this.faceColor);
    ellipse(2, 6, 44, 40);

    // Eyes
    fill(255); noStroke();
    ellipse(-13, -4, 16, this.isBlinking ? 2 : 14);
    ellipse(13, -4, 16, this.isBlinking ? 2 : 14);
    if (!this.isBlinking) {
      fill(30);
      ellipse(-12, -4, 8, 8);
      ellipse(14, -4, 8, 8);
      // Pupils gleam
      fill(255);
      ellipse(-10, -6, 3, 3);
      ellipse(16, -6, 3, 3);
    }

    // Eyebrows (expressive!)
    stroke(this.darkBrown[0], this.darkBrown[1], this.darkBrown[2]);
    strokeWeight(2.5); noFill();
    let browWiggle = sin(this.t * 3) * 4;
    line(-20, -14 + browWiggle, -6, -16 + browWiggle);
    line(6,  -16 + browWiggle, 20, -14 + browWiggle);

    // Nose
    fill(...this.darkBrown); noStroke();
    ellipse(0, 8, 16, 10);
    fill(80, 30, 5);
    ellipse(-4, 9, 5, 4);
    ellipse(4, 9, 5, 4);

    // Mouth (big goofy grin that changes)
    noFill();
    stroke(...this.darkBrown);
    strokeWeight(2);
    let mouthOpen = abs(sin(this.t * 2)) * 10;
    arc(0, 17, 26, 14 + mouthOpen, 0, PI);

    // Tongue (pops out rhythmically)
    if (sin(this.t * 2) > 0.7) {
      fill(220, 80, 100); noStroke();
      ellipse(0, 23, 12, 10);
    }

    pop(); // end head

    pop(); // end dancer
  }
}
 
