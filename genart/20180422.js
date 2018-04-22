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
var lineCount = 48; 
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

    strokeWeight(3 + 1 * sin(deg) * (Math.abs(i) % 2));
    stroke(COLORS.darkgrey);
    beginShape();
    curveVertex(startX, startY);
    for (var n = 0; n < 32; n++) {
      var cx = startX + (endX - startX) * n/8;
      // don't understand this control point, worth exploring more.
      var cy = startY + 20 * sin(n/8 * TWO_PI * 2);
      curveVertex(cx, cy);
    }
    curveVertex(endX, endY);
    endShape();
    
    //line(x1, y1, CANVAS.width, y1);
    //curve(cx1, cy1, x1, y1, x2, y2, cx2, cy2);
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
