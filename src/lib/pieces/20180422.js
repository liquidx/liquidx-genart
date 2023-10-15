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
var lineCount = 48;
var gridSpacing = parseInt(CANVAS.width / lineCount);

function draw(p5s) {
  p5s.clear();
  p5s.background(COLORS.white);
  p5s.noFill();

  var deg = ((t % period) / period) * Math.PI * 2;
  p5s.push();
  p5s.rotate(Math.PI / 4);
  p5s.translate(0, -CANVAS.height / 2);

  for (var i = -12; i < lineCount + 12; i++) {
    var startX = 0;
    var startY = gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;
    //var endY = startY + CANVAS.height / 4;

    p5s.strokeWeight(3 + 1 * Math.sin(deg) * (Math.abs(i) % 2));
    p5s.stroke(COLORS.darkgrey);
    p5s.beginShape();
    p5s.curveVertex(startX, startY);
    for (var n = 0; n < 32; n++) {
      var cx = startX + ((endX - startX) * n) / 8;
      // don't understand this control point, worth exploring more.
      var cy = startY + 20 * Math.sin((n / 8) * Math.PI * 2 * 2);
      p5s.curveVertex(cx, cy);
    }
    p5s.curveVertex(endX, endY);
    p5s.endShape();

    //line(x1, y1, CANVAS.width, y1);
    //curve(cx1, cy1, x1, y1, x2, y2, cx2, cy2);
  }
  p5s.pop();

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
