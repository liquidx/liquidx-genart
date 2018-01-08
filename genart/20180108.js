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
  
  strokeWeight(gridSpacing / 4);
  strokeCap(PROJECT);
  
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height /2  / lineCount;
  var strokeMax = 4;
  
  for (var i = 0; i < lineCount; i++) { 
    var linePercent = i / (lineCount - 1);
    var w1 = CANVAS.width / 2 * linePercent;
    var x1 = margin; // (CANVAS.width - w1) / 2;
    var y1 = margin + spacing * i;
    var x2 = x1 + w1;
    stroke(ORANGE.primary);
    strokeWeight(strokeMax);
    line(x1 - sin(deg) * 8 * i, y1, x2, y1);
    
    stroke(ORANGE.secondary);
    strokeWeight(strokeMax);
    line(x2, y1, x2, margin - sin(deg) * 8 * i);
                
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
