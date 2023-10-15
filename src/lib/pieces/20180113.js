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
  p5s.background(COLORS.black);
  p5s.noFill();

  p5s.strokeWeight(4);
  p5s.strokeCap(p5s.PROJECT);

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / lineCount;
  var lineHeight = CANVAS.height / 2;
  var order = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0];

  var amount = 50;

  for (var i = 0; i < lineCount; i++) {
    var n = order[i];
    var h1 = CANVAS.height / 2;

    var x1 = margin + spacing * n;
    var y1 = margin;
    var x2 = margin + spacing * n;
    var y2 = margin + lineHeight;

    // Set up the color.
    var c = p5s.color(ORANGE.primary);
    c.setAlpha(255 - i * 20);
    p5s.stroke(c);

    p5s.beginShape();
    for (var a = 0; a < n * 5; a++) {
      var sinoffset = Math.sin(deg + (a * Math.PI * 2) / amount);
      var x = x1 + (spacing / 2) * sinoffset;
      var y = y1 + a * (lineHeight / amount);
      if (a == 0) {
        p5s.vertex(x, y);
      } else {
        p5s.bezierVertex(x, y, x - 1, y, x, y);
      }
    }
    p5s.endShape();
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
