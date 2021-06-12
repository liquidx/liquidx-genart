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
  background(COLORS.black);
  noFill();
  
  strokeWeight(4);
  strokeCap(PROJECT);
  
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2  / lineCount;
  var lineHeight = CANVAS.height / 2;
  var order = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0];
  
  var amount = 50;
  
  for (var i = 0; i < lineCount; i++) {
    var n = order[i];
    var h1 = CANVAS.height / 2;
    
    var x1 = margin + spacing * n;
    var y1 = margin;
    var x2 = margin + spacing * n;
    var y2 = margin + lineHeight;


    // Set up the color.
    var c = color(ORANGE.primary);
    c.setAlpha(255 - i * 20);
    stroke(c);

    beginShape();
    for (var a = 0; a <  n * 5; a++) {
      var sinoffset = sin(deg + a * TWO_PI/amount);
      var x = x1 + spacing / 2 * sinoffset;
      var y = y1 + a * (lineHeight / amount)
      if (a == 0) {
        vertex(x, y);
      } else {
        bezierVertex(x, y, x - 1 , y, x, y);
      }
    }
    endShape();
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
