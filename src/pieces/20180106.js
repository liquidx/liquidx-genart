import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from '../base'
import p5 from 'p5'

// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 6;

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration;
  var deg = (t % period) / period * TWO_PI;
  var x = r * sin(deg);
  var y = c * cos(deg);
  return [x, y, 0];
}

function draw() {
  clear();
  background(COLORS.black);

  var period = targetFrameRate * loopDuration;
  var rad = (t % period) / period * TWO_PI;
  var deg = parseInt(rad / TWO_PI * 360);
  
  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  var radius = CANVAS.width / 4;
  var circleSize = 16;
  var dotCount = 12;
  
  for (var i = 0; i < dotCount; i++) {
    var angle = TWO_PI / dotCount * i;
    var interval = angle - rad;
    var sat = 60;
    var l = 50;
    var c = color(COLORS.white);

    c.setAlpha(32 + 214 * (sin(interval) + 1)/2);
    
    var radius1 = radius / 1.75 + sin(angle) * (radius / 8);
    var x1 = center[0] + sin(angle) * radius1;
    var y1 = center[1] + cos(angle) * radius1;
    var size1 = 8 + 16 * (sin(interval) + 1)/2
   
    fill(c);
    noStroke();
    ellipse(x1, y1, size1, size1);
  }

  
  t = t + 1;  // increment frame.

  
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  
  blendMode(BLEND);
  
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

// Force p5 into sketch mode.
window.setup = setup
window.draw = draw
