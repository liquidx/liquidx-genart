// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;
var period = targetFrameRate * loopDuration;


function drawLines(lineCount, lineCountBuffer, degOffset = 0, strokeWidth = 8, yOffset = 0) {
  var deg = (t % period) / period * TWO_PI;
  push();


  var gridSpacing = parseInt(CANVAS.width / lineCount);

  //scale(1.5 + 0.5 * cos(deg));
  var localDeg = deg + degOffset;
  
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = 0;
    var startY = yOffset + gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;

    var wavePeriod = 4 + 2 * sin(localDeg);

    strokeWeight(strokeWidth);
    stroke(COLORS.darkgrey);
    beginShape();
    curveVertex(startX, startY);
    for (var n = 0; n < 64; n++) {
      var cx = startX + (endX - startX) * n;
      var cy = startY +  40 * sin(n / 8 * TWO_PI * 2 + localDeg);
      curveVertex(cx, cy);
    }
    curveVertex(endX, endY);
    endShape();
    
  }
  pop();
}

function draw() {
  clear();
  background(COLORS.white);
  noFill();
  
  var deg = (t % period) / period * TWO_PI;

  
  drawLines(16, 16, 0, 2 + 2 * cos(deg));
  //drawLines(16, 16, 0, 1 + 1 * cos(deg), 16);
  
  
  t = t + 1;  // increment frame.
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
