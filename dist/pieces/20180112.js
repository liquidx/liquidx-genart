import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;
var period = targetFrameRate * loopDuration;

// Grid
var lineCount = 12;
var gridSpacing = parseInt(CANVAS.width / lineCount);

function draw(p5s) {
  p5s.clear();
  p5s.background(ORANGE.black);
  p5s.noFill();

  p5s.strokeWeight(4);
  p5s.strokeCap(p5s.PROJECT);

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / lineCount;
  var order = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0];

  for (var i = 0; i < lineCount; i++) {
    var n = order[i];
    var h1 = CANVAS.height / 2;

    var x1 = margin + spacing * n + 100 * Math.sin(deg);
    var y1 = margin + 100 * Math.cos(deg);
    var x2 = margin + spacing * n;
    var y2 = margin + CANVAS.height / 2;

    var cx1 = x1 + 200 * (n % 2 ? 1 : -1) * Math.sin(deg);
    var cy1 = y1 + 200 * (n % 2 ? 1 : -1) * Math.cos(deg);

    var cx2 = x2 + 200 * (n % 2 ? 1 : -1) * Math.sin(deg);
    var cy2 = y2 + 200 * (n % 2 ? 1 : -1) * Math.cos(deg);

    // Set up the color.
    var c = p5s.color(ORANGE.primary);
    c.setAlpha(255 - i * 20);
    p5s.stroke(c);
    p5s.curve(cx1, cy1, x1, y1, x2, y2, cx2, cy2);
  }

  t = t + 1; // increment frame.
  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
export default { setup, draw };
