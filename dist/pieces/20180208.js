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
var count = 8;

function draw(p5s) {
  p5s.clear();
  p5s.background(ORANGE.grey);
  p5s.noStroke();

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / count;
  var lineHeight = CANVAS.height / 2;
  var colors = [PASTELS.red, PASTELS.orange, PASTELS.yellow, PASTELS.green];

  for (var i = 0; i < count; i++) {
    p5s.stroke(COLORS.white);
    p5s.strokeCap(p5s.SQUARE);

    p5s.strokeWeight(4 + Math.cos(deg + i * 30) * 2);
    var x1 = margin + i * spacing;
    var y1 = margin;
    var x2 = CANVAS.width - margin;
    var y2 = CANVAS.height - margin - i * spacing;
    p5s.line(x1, y1, x2, y2);

    p5s.strokeWeight(4 + Math.sin(deg + i * 30) * 2);

    x1 = margin;
    y1 = margin + i * spacing;
    x2 = CANVAS.width - margin - i * spacing;
    y2 = CANVAS.height - margin;
    p5s.line(x1, y1, x2, y2);
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
