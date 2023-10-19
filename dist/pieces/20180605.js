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

function drawLines(
  p5s,
  width = CANVAS.width,
  height = CANVAS.height,
  originX = 0,
  originY = 0,
  lineCount = 24,
  lineCountBuffer = 0,
  degOffset = 0,
  strokeWidth = 8
) {
  var deg = ((t % period) / period) * Math.PI * 2;
  var localDeg = deg + degOffset;
  var spacingY = parseInt(height / lineCount);
  var baseStrokeWidth = strokeWidth / 2;

  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = originX;
    var startY = originY + spacingY * i + spacingY / 2;
    var endX = startX + width;
    var endY = startY + spacingY * (i + 8) + spacingY / 2;

    strokeWidth =
      baseStrokeWidth +
      baseStrokeWidth * Math.cos((i / lineCount / 1) * Math.PI + localDeg);

    p5s.stroke(COLORS.darkgrey);
    p5s.beginShape();
    p5s.strokeWeight(strokeWidth);

    var stops = 64;
    var xIncr = width / stops;
    var amplitude = (spacingY / 2) * Math.sin(localDeg + (i * Math.PI) / stops);

    for (var n = 0; n < stops + 1; n++) {
      var cx = startX + n * xIncr;
      var cy = startY + amplitude * Math.sin(Math.PI / 8 + localDeg); //sin(n / 8 * Math.PI * 2 * 2 + localDeg);
      p5s.curveVertex(cx, cy);

      // start and end vertices need to be defined twice.
      if (n == 0 || n == stops) {
        p5s.curveVertex(cx, cy);
      }
    }
    p5s.endShape();
  }
}

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.white);
  p5s.noFill();

  var deg = ((t % period) / period) * Math.PI * 2;

  drawLines(p5s, CANVAS.width, CANVAS.height, 0, 0, 24, 0, 0, 6);

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
