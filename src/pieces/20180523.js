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
var lineCount = 24; 
var gridSpacing = parseInt(CANVAS.width / lineCount);


function pulse(frequency, intensity) {
  const v = Math.atan(Math.sin(value * Math.PI * frequency) * intensity);
  return (v + Math.PI / 2) / Math.PI;
}

function draw() {
  clear();
  background(COLORS.white);
  noFill();
  
  
  var deg = (t % period) / period * TWO_PI;
  push();
  scale(1.5 + 0.5 * cos(deg));
  
  for (var i = -16; i < lineCount + 16; i++) {
    var startX = 0;
    var startY = gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;
    //var endY = startY + CANVAS.height / 4; 

    var wavePeriod = 4 + 2 * sin(deg);
    var yoffset = wavePeriod;

    strokeWeight(8);
    stroke(COLORS.darkgrey);
    beginShape();
    curveVertex(startX, startY);
    for (var n = 0; n < 64; n++) {
      var cx = startX + (endX - startX) * n;
      // don't understand this control point, worth exploring more.
      var cy = startY +  40 * sin(n / 8 * TWO_PI * 2 + deg);
      curveVertex(cx, cy);
    }
    curveVertex(endX, endY);
    endShape();
    
  }
  pop();
  
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
