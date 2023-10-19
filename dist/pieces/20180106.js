import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 6;

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration;
  var deg = ((t % period) / period) * Math.PI * 2;
  var x = r * Math.sin(deg);
  var y = c * Math.cos(deg);
  return [x, y, 0];
}

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.black);

  var period = targetFrameRate * loopDuration;
  var rad = ((t % period) / period) * Math.PI * 2;
  var deg = parseInt((rad / Math.PI) * 2 * 360);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  var radius = CANVAS.width / 4;
  var circleSize = 16;
  var dotCount = 12;

  for (var i = 0; i < dotCount; i++) {
    var angle = (p5s.TWO_PI / dotCount) * i;
    var interval = angle - rad;
    var sat = 60;
    var l = 50;
    var c = p5s.color(COLORS.white);

    c.setAlpha(32 + (214 * (Math.sin(interval) + 1)) / 2);

    var radius1 = radius / 1.75 + Math.sin(angle) * (radius / 8);
    var x1 = center[0] + Math.sin(angle) * radius1;
    var y1 = center[1] + Math.cos(angle) * radius1;
    var size1 = 8 + (16 * (Math.sin(interval) + 1)) / 2;

    p5s.fill(c);
    p5s.noStroke();
    p5s.ellipse(x1, y1, size1, size1);
  }

  t = t + 1; // increment frame.

  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);

  p5s.blendMode(p5s.BLEND);

  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default { setup, draw };
