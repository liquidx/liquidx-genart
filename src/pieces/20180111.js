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
var lineCount = 12;
var gridSpacing = parseInt(CANVAS.width / lineCount);

function draw() {
  clear();
  background(ORANGE.black);
  noFill();
  
  strokeWeight(4);
  strokeCap(PROJECT);
  
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height /2  / lineCount;
  var order = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0];
  
  for (var i = 0; i < lineCount; i++) {
    var n = order[i];
    var h1 = CANVAS.height / 2;
    
    var x1 = margin + spacing * n;
    var y1 = margin;
    var x2 = x1;
    var y2 = h1 + y1;

    var cx1 = x1 + 50 * (i - lineCount / 3) * sin(deg);
    var cy1 = y1 + 200 * (i - lineCount / 3) * sin(deg);
    
    var cx2 = x2 + 50 * (i - lineCount / 3) * cos(deg);
    var cy2 = y2 + 200 * (i - lineCount / 3) * cos(deg);

    // Set up the color.
    var c = color(ORANGE.primary);
    c.setAlpha(255 - i * 20);
    stroke(c);
    curve(cx1, cy1, x1, y1, x2, y2, cx2, cy2);
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
