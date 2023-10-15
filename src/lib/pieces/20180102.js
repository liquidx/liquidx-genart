import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 4;

function offset_fn(p5s, r, c, t) {
  var period = targetFrameRate * loopDuration; // p5s.frameRate();
  var deg = ((t % period) / period) * p5s.TWO_PI;
  var x = r * p5s.sin(deg);
  var y = c * p5s.cos(deg);
  return [x, y, 0];
}

function draw(p5s) {
  p5s.background(COLORS.black);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;

  var offset_1 = offset_fn(p5s, 16, 16, t);
  var color_1 = p5s.color(COLORS.orange_light);
  p5s.noStroke();
  p5s.fill(color_1);
  p5s.ellipse(center[0] + offset_1[0], center[1] + offset_1[1], size, size);

  var offset_2 = offset_fn(p5s, 4, 4, t);
  var color_2 = p5s.color(COLORS.orange);
  p5s.noStroke();
  p5s.fill(color_2);
  p5s.ellipse(center[0] - offset_2[0], center[1] - offset_2[1], size, size);

  t = t + 4; // increment frame.

  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);

  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default { setup, draw };
