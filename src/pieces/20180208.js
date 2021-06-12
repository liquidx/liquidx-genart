import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from '../base'
import p5 from 'p5'

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
var count = 8;

function draw() {
  clear();
  background(ORANGE.grey);
  noStroke();
  
    
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2  / count;
  var lineHeight = CANVAS.height / 2;
  var colors = [PASTELS.red, PASTELS.orange, PASTELS.yellow, PASTELS.green];
  
  for (var i = 0; i < count; i++) {
    stroke(COLORS.white);
    strokeCap(SQUARE);

    strokeWeight(4+ cos(deg + i * 30) * 2);
    var x1 = margin + i * spacing;
    var y1 = margin;
    var x2 = CANVAS.width - margin;
    var y2 = CANVAS.height - margin - i * spacing;
    line(x1, y1, x2, y2);
    
    strokeWeight(4+ sin(deg + i * 30) * 2);

    x1 = margin;
    y1 = margin + i * spacing;
    x2 = CANVAS.width - margin - i * spacing;
    y2 = CANVAS.height - margin;
    line(x1, y1, x2, y2);
  }
  
 
  t = t + 1;  // increment frame.
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
