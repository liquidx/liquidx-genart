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


function draw() {
  clear();
  background(COLORS.white);
  noFill();
  
  
  var deg = (t % period) / period * TWO_PI;
  push();
  rotate(PI/4);
  translate(0, - CANVAS.height / 2);
  
  for (var i = -12; i < lineCount + 12; i++) {
    var startX = 0;
    var startY = gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;
    //var endY = startY + CANVAS.height / 4; 

    var wavePeriod = 4 + 2 * sin(deg);
    var yoffset = wavePeriod;

    strokeWeight(4);
    stroke(COLORS.darkgrey);
    beginShape();
    curveVertex(startX, startY);
    for (var n = 0; n < 64; n++) {
      var cx = startX + (endX - startX) * n;
      // don't understand this control point, worth exploring more.
      var cy = startY +  50 * sin(n / 8 * TWO_PI * 2 + deg);
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
