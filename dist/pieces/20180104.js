import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration;
  var deg = ((t % period) / period) * Math.PI * 2;
  var x = r * Math.sin(deg);
  var y = c * Math.cos(deg);
  return [x, y, 0];
}

function draw(p5s) {
  p5s.clear();
  p5s.blendMode(p5s.ADD);
  p5s.background(COLORS.black);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;

  // red
  var offset_3 = offset_fn(-4, 8, t);
  var color_3 = p5s.color(255, 32, 32);
  color_3.setAlpha(192);
  p5s.noStroke();
  p5s.fill(color_3);
  p5s.ellipse(center[0] + offset_3[0], center[1] + offset_3[1], size, size);

  // green
  var offset_1 = offset_fn(4, -8, t);
  var color_1 = p5s.color(32, 255, 32);
  color_1.setAlpha(192);
  p5s.noStroke();
  p5s.fill(color_1);
  p5s.ellipse(center[0] + offset_1[0], center[1] + offset_1[1], size, size);

  // blue
  var offset_2 = offset_fn(8, 4, t + 60);
  var color_2 = p5s.color(32, 32, 255);
  color_2.setAlpha(192);
  p5s.noStroke();
  p5s.fill(color_2);
  p5s.ellipse(center[0] + offset_2[0], center[1] + offset_2[1], size, size);

  var offset_eclipse = offset_fn(2, 2, t);
  p5s.blendMode(p5s.MULTIPLY);
  p5s.fill(COLORS.black);
  p5s.ellipse(
    center[0] + offset_eclipse[0],
    center[1] + offset_eclipse[1],
    size,
    size
  );

  t = t + 2; // increment frame.

  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);

  p5s.blendMode(p5s.ADD);

  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default { setup, draw };
