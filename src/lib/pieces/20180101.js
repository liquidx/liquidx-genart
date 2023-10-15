import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

var grid = 16;
var radius = 12;

var r_max = CANVAS.width / grid + 1;
var c_max = CANVAS.height / grid + 1;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;

function size_fn(r, c, t) {
  return 12;
}

function layout_fn(r, c) {
  return [0, 0];
}

function offset_fn(p5s, r, c, t) {
  var period = targetFrameRate * loopDuration; // p5s.frameRate();
  var deg = ((t % period) / period) * p5s.TWO_PI;
  var x = r * p5s.sin(deg);
  var y = c * p5s.cos(deg);
  return [x, y, 0];
}

function color_fn(r, c, t) {
  return 255;
}

function draw(p5s) {
  p5s.background(COLORS.black);
  p5s.noStroke();

  for (var r = 0; r < r_max; r++) {
    for (var c = 0; c < c_max; c++) {
      var o = offset_fn(p5s, r, c, t);
      var l = layout_fn(r, c);
      var size = size_fn(r, c, t);

      p5s.fill(COLORS.red);
      p5s.ellipse(c * grid + l[0] + o[0], r * grid + l[1] + o[1], size, size);
    }
  }

  for (var r = 0; r < r_max; r++) {
    for (var c = 0; c < c_max; c++) {
      var size = size_fn(r, c, t);
      p5s.fill(COLORS.white);
      p5s.ellipse(c * grid, r * grid, size, size);
    }
  }

  t = t + 2; // increment frame.

  CAPTURER.captureFrame();
  if (t > max_t) {
    p5s.noLoop();
  }
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default {
  setup,
  draw,
};
