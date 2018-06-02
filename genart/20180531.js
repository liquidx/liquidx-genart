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


function pulse(frequency, intensity) {
  const v = Math.atan(Math.sin(value * Math.PI * frequency) * intensity);
  return (v + Math.PI / 2) / Math.PI;
}

function drawLines(lineCount, lineCountBuffer, degOffset = 0) {
  var deg = (t % period) / period * TWO_PI;
  push();


  var gridSpacing = parseInt(CANVAS.width / lineCount);

  //scale(1.5 + 0.5 * cos(deg));
  var localDeg = deg + degOffset;
  
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = 0;
    var startY = gridSpacing * i + gridSpacing / 2;
    var endX = CANVAS.width;
    var endY = gridSpacing * (i + 8) + gridSpacing / 2;
    //var endY = startY + CANVAS.height / 4; 

    var wavePeriod = 4 + 2 * sin(localDeg);
    var yoffset = wavePeriod;

    strokeWeight(8);
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
  
  drawLines(16, 16, 0); 
  drawLines(8, 16, 45);
  drawLines(4, 16, 180);
  
  t = t + 1;  // increment frame.
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
