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

  p5s.strokeWeight(gridSpacing / 4);
  p5s.strokeCap(p5s.PROJECT);

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / lineCount;
  var strokeMax = 4;

  for (var i = 0; i < lineCount; i++) {
    var linePercent = i / (lineCount - 1);
    var w1 = (CANVAS.width / 2) * linePercent;
    var x1 = margin; // (CANVAS.width - w1) / 2;
    var y1 = margin + spacing * i;
    var x2 = x1 + w1;
    p5s.stroke(ORANGE.primary);
    p5s.strokeWeight(strokeMax);
    p5s.line(x1 - Math.sin(deg) * 8 * i, y1, x2, y1);

    p5s.stroke(ORANGE.secondary);
    p5s.strokeWeight(strokeMax);
    p5s.line(x2, y1, x2, margin - Math.sin(deg) * 8 * i);
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
