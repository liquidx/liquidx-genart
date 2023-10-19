import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 30;

function draw(p5s) {
  p5s.clear();
  p5s.blendMode(p5s.ADD);
  p5s.background(COLORS.black);

  var period = targetFrameRate * loopDuration;
  var rad = ((t % period) / period) * Math.PI * 2;
  var deg = parseInt((rad / Math.PI) * 2 * 360);
  //console.log(deg);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  var radius = CANVAS.width / 4;
  var circleSize = 32;
  var dotCount = 12;

  for (var i = 0; i < dotCount; i++) {
    var angle = ((Math.PI * 2) / dotCount) * i;
    var hue = parseInt(((360 / dotCount) * i + deg) % 360);
    var sat = 60;
    var l = 50;
    var colorString = "hsl(" + hue + ", " + sat + "%, " + l + "%)";
    var c = p5s.color(colorString);

    var radius1 = (radius * 3) / 4 + Math.sin(rad) * (radius / 4);
    var x1 = center[0] + Math.sin(angle + rad) * radius1;
    var y1 = center[1] + Math.cos(angle + rad) * radius1;

    var radius2 = radius / 2 + Math.cos(rad) * (radius / 4);
    var x2 = center[0] + Math.sin(angle + rad) * radius2;
    var y2 = center[1] + Math.cos(angle + rad) * radius2;

    var radius3 = radius / 4 + Math.sin(rad) * (radius / 16);
    var x3 = center[0] + Math.sin(angle + rad) * radius3;
    var y3 = center[1] + Math.cos(angle + rad) * radius3;

    p5s.fill(c);
    p5s.ellipse(x1, y1, circleSize, circleSize);
    p5s.ellipse(x2, y2, circleSize / 2, circleSize / 2);
    p5s.ellipse(x3, y3, circleSize / 4, circleSize / 4);
  }

  t = t + 1; // increment frame.

  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);

  p5s.blendMode(p5s.ADD);

  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default { setup, draw };
