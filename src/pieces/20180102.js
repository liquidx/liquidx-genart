import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from '../base'
import p5 from 'p5'

// The canvas.
var canvas = null;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 4;

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration; // frameRate();
  var deg = (t % period) / period * TWO_PI;
  var x = r * sin(deg);
  var y = c * cos(deg);
  return [x, y, 0];
}

function draw() {
  background(COLORS.black);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  
  var offset_1 = offset_fn(16, 16, t);
  var color_1 = color(COLORS.orange_light);
  noStroke();
  fill(color_1);
  ellipse(center[0] + offset_1[0], center[1] + offset_1[1], size, size);
  
  var offset_2 = offset_fn(4, 4, t);
  var color_2 = color(COLORS.orange);
  noStroke();
  fill(color_2);
  ellipse(center[0] - offset_2[0], center[1] - offset_2[1], size, size);
 
  t = t + 4;  // increment frame.
  
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

// Force p5 into sketch mode.
window.setup = setup
window.draw = draw
