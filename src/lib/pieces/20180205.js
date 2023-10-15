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
var countV = 8;
var gridSpacingH = parseInt(CANVAS.width / countH);
var gridSpacingV = parseInt(CANVAS.height / countV);

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.black);
  p5s.noStroke();

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / countH;
  var lineHeight = CANVAS.height / 2;

  for (var x = 2; x < countH - 1; x++) {
    for (var y = 2; y < countV - 2; y++) {
      var c = p5s.color(PASTELS.blue);
      c.setAlpha(128 + (128 * y) / (countV - 1));
      p5s.fill(c);
      var multiplier = y % 2 == 0 ? 1 : -1;
      var topY = (y * gridSpacingV * 2) / 3 - gridSpacingV * Math.sin(deg);
      var bottomY = topY + gridSpacingV * 2 + gridSpacingV * Math.sin(deg);
      var midX = x * gridSpacingH;
      var leftX =
        midX -
        ((countV - y) * gridSpacingH) / 4 -
        ((multiplier * gridSpacingH) / 4) * Math.cos(deg);
      var rightX =
        midX +
        ((countV - y) * gridSpacingH) / 4 +
        ((multiplier * gridSpacingH) / 4) * Math.sin(deg);
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
