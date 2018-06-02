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


function pulse(value, frequency, intensity) {
  const v = Math.atan(Math.sin(value * Math.PI * frequency) * intensity);
  return (v + Math.PI / 2) / Math.PI;
}

function drawLines(
  width = CANVAS.width,
  height = CANVAS.height,
  originX = 0,
  originY = 0,
  lineCount = 24, 
  lineCountBuffer = 16, 
  degOffset = 0, 
  strokeWidth = 8) {
  var deg = (t % period) / period * TWO_PI;

  var spacingY = parseInt(height / lineCount);

  var localDeg = deg + degOffset;
  
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = originX;
    var startY = originY + spacingY * i + spacingY / 2;
    var endX = startX + width ;
    var endY = startY + spacingY * (i + 8) + spacingY / 2;

    var wavePeriod = 4 + 2 * sin(localDeg);

    strokeWeight(strokeWidth);
    stroke(COLORS.darkgrey);
    beginShape();
    curveVertex(startX, startY);
    var stops = 64;
    var xIncr = width / stops;
    var amplitude = spacingY / 4 * sin(localDeg + i * PI / stops);
    //var amplitude = pulse(spacingY / 4, 1/4, spacingY);
    
    for (var n = 0; n < stops + 2; n++) {
      var cx = startX + n * xIncr;
      var cy = startY + amplitude * sin(n * PI / 4 + localDeg + (i + n) * PI / 8); //sin(n / 8 * TWO_PI * 2 + localDeg);
      curveVertex(cx, cy);
    }
    //curveVertex(endX, endY);
    endShape();
    
  }
}

function draw() {
  clear();
  background(COLORS.white);
  noFill();
  
  var deg = (t % period) / period * TWO_PI;

  
  drawLines(width=CANVAS.width, 
            height=CANVAS.height,
            originX = 0,
            originY = 0,
            lineCount = 24,
            lineCountBuffer = 0,
            degOffset = 0,
            strokeWidth = 12);
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
