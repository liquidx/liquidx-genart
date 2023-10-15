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
var count = 12;

function drawSquareLR(p5s, x, y, w, h, divisions, c) {
  p5s.stroke(c);

  var spacing = h / count;

  // center line
  p5s.line(x, y, x + w, y + h);

  for (var i = 1; i < divisions; i++) {
    var x1 = x + i * spacing;
    var y1 = y;
    var x2 = x + w;
    var y2 = y + h - i * spacing;
    p5s.line(x1, y1, x2, y2);

    x1 = x;
    y1 = y + i * spacing;
    x2 = x + w - i * spacing;
    y2 = y + h;
    p5s.line(x1, y1, x2, y2);
  }
}

function drawSquareRL(p5s, x, y, w, h, divisions, c) {
  p5s.stroke(c);

  var spacing = h / count;

  // center line
  p5s.line(x + w, y, x, y + h);

  for (var i = 1; i < divisions; i++) {
    var x1 = x + w - i * spacing;
    var y1 = y;
    var x2 = x;
    var y2 = y + h - i * spacing;
    p5s.line(x1, y1, x2, y2);

    x1 = x + w;
    y1 = y + i * spacing;
    x2 = x + i * spacing;
    y2 = y + h;
    p5s.line(x1, y1, x2, y2);
  }
}

function draw(p5s) {
  p5s.clear();
  p5s.blendMode(p5s.ADD);
  p5s.background(COLORS.black);
  p5s.strokeCap(p5s.SQUARE);

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var margin = CANVAS.height / 4;
  var lineHeight = CANVAS.height / 2;

  var subSquareWidth = CANVAS.width / 4;
  var c = p5s.color(COLORS.white);

  p5s.strokeWeight(2 + Math.sin(deg));
  p5s.noFill();
  c.setAlpha(128 + 64 * Math.sin(deg));
  drawSquareLR(p5s, margin, margin, subSquareWidth, subSquareWidth, count, c);

  c.setAlpha(128 + 64 * Math.sin(deg + Math.PI));
  drawSquareLR(
    p5s,
    margin + subSquareWidth,
    margin + subSquareWidth,
    subSquareWidth,
    subSquareWidth,
    count,
    c
  );

  c.setAlpha(128 + 64 * Math.sin(deg + Math.PI / 2));
  drawSquareRL(
    p5s,
    margin + subSquareWidth,
    margin,
    subSquareWidth,
    subSquareWidth,
    count,
    c
  );

  c.setAlpha(128 + 64 * Math.sin(deg + Math.PI * 1.5));
  drawSquareRL(
    p5s,
    margin,
    margin + subSquareWidth,
    subSquareWidth,
    subSquareWidth,
    count,
    c
  );

  p5s.blendMode(p5s.DARKEST);
  p5s.noStroke();
  var csize = (subSquareWidth * 2) / 3 + (subSquareWidth / 3) * 1; // Math.sin(deg);
  var cx1 = margin + subSquareWidth - csize / 2;

  p5s.fill("#333333");
  p5s.rect(cx1, cx1, csize, csize);

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
