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

function drawLines(p5s, lineCount, lineCountBuffer, degOffset = 0) {
  var deg = ((t % period) / period) * Math.PI * 2;
  p5s.push();

  var gridSpacing = parseInt(CANVAS.width / lineCount);

  //scale(1.5 + 0.5 * Math.cos(deg));
  var localDeg = deg + degOffset;

  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = 0;
    var startY = gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;
    //var endY = startY + CANVAS.height / 4;

    var wavePeriod = 4 + 2 * Math.sin(localDeg);
    var yoffset = wavePeriod;

    p5s.strokeWeight(8);
    p5s.stroke(COLORS.darkgrey);
    p5s.beginShape();
    p5s.curveVertex(startX, startY);
    for (var n = 0; n < 64; n++) {
      var cx = startX + (endX - startX) * n;
      var cy = startY + 40 * Math.sin((n / 8) * Math.PI * 2 * 2 + localDeg);
      p5s.curveVertex(cx, cy);
    }
    p5s.curveVertex(endX, endY);
    p5s.endShape();
  }
  p5s.pop();
}

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.white);
  p5s.noFill();

  drawLines(p5s, 16, 16, 0);
  drawLines(p5s, 8, 16, 45);
  drawLines(p5s, 4, 16, 180);

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
