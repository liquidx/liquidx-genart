// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;
var period = targetFrameRate * loopDuration;


function drawLines(
  width = CANVAS.width,
  height = CANVAS.height,
  originX = 0,
  originY = 0,
  lineCount = 24, 
  lineCountBuffer = 0, 
  degOffset = 0, 
  strokeWidth = 8) {
    
  var deg = (t % period) / period * TWO_PI;
  var localDeg = deg + degOffset;
  var spacingY = parseInt(height / lineCount);
  var baseStrokeWidth = strokeWidth / 2;
  
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    var startX = originX;
    var startY = originY + spacingY * i + spacingY / 2;
    var endX = startX + width ;
    var endY = startY + spacingY * (i + 8) + spacingY / 2;

    strokeWidth = baseStrokeWidth + baseStrokeWidth * cos(i / lineCount / 1 * PI + localDeg);

    stroke(COLORS.darkgrey);
    beginShape();
    strokeWeight(strokeWidth);

    var stops = 64;
    var xIncr = width / stops;
    var amplitude = spacingY / 2 * sin(localDeg + i * PI / stops);
    
    for (var n = 0; n < stops + 1; n++) {
      var cx = startX + n * xIncr;
      var cy = startY + amplitude * sin(PI / 8 + localDeg); //sin(n / 8 * TWO_PI * 2 + localDeg);
      curveVertex(cx, cy);
      
      // start and end vertices need to be defined twice.
      if (n == 0 || n == stops) {
        curveVertex(cx, cy);
      }
     
    }
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
            strokeWidth = 6);
  
  t = t + 1;  // increment frame.
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
