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
var period = targetFrameRate * loopDuration;

// Grid
var lineCount = 12;
var gridSpacing = parseInt(CANVAS.width / lineCount);

function draw() {
  clear();
  background(ORANGE.black);
  noFill();
  
  strokeWeight(gridSpacing / 4);
  
  var deg = (t % period) / period * TWO_PI;
  
  for (var i = 0; i < lineCount; i++) {
    var x1 = 0;
    var y1 = gridSpacing * i + gridSpacing / 2;
    var x2 = CANVAS.width;
    var y2 = gridSpacing * i + gridSpacing / 2;

    var cx1 = x1 + 50 * (i - lineCount / 2) * sin(deg);
    var cy1 = y1 + 200 * (i - lineCount / 2) * sin(deg);
    
    var cx2 = x2 + 50 * (i - lineCount / 2) * cos(deg);
    var cy2 = y2 + 200 * (i - lineCount / 2) * cos(deg);
    
    if (i % 2) {
      stroke(ORANGE.primary);
    } else {
      stroke(ORANGE.secondary);
    }
    //line(x1, y1, CANVAS.width, y1);
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
