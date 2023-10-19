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
var countH = 4;
var countV = 4;
var gridSpacing = parseInt(CANVAS.width / countH);

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.black);
  p5s.noStroke();

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / countH;
  var lineHeight = CANVAS.height / 2;

  for (var x = 1; x < countH; x++) {
    for (var y = 0; y < countV - 1; y++) {
      var c = p5s.color(PASTELS.blue);
      c.setAlpha(128 + (128 * y) / countV);
      p5s.fill(c);
      var topY = (y * gridSpacing * 2) / 3 - gridSpacing * Math.sin(deg);
      var bottomY = topY + gridSpacing * 2 + gridSpacing * Math.sin(deg);
      var midX = x * gridSpacing;
      var leftX =
        midX -
        ((countV - y) * gridSpacing) / 2 -
        (gridSpacing / 2) * Math.cos(deg);
      var rightX =
        midX +
        ((countV - y) * gridSpacing) / 2 -
        (gridSpacing / 2) * Math.cos(deg);
      p5s.triangle(midX, topY, leftX, bottomY, rightX, bottomY);
    }
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
