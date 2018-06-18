// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;
var period = targetFrameRate * loopDuration;

// tickers

function _percentage(offset) {
  if (typeof offset == 'undefined') {
    offset = 0;
  }
  return ((t + offset) % period) / period;
}

function _deg(offset) {
  return _percentage(offset) * TWO_PI;
}

function _up_down(offset) {
  var p = _percentage(offset);
  if (p < 0.5) {
    return p * 2;
  } else {
    return (1 - p) * 2;
  }
}

// draw

function drawLines(
  width = CANVAS.width,
  height = CANVAS.height,
  originX = 0,
  originY = 0,
  lineCount = 24, 
  lineCountBuffer = 0, 
  degOffset = 0, 
  strokeWidth = 8) {
    
  var deg = _deg();
    
  var localDeg = deg + degOffset;
  var spacingY = parseInt(height / lineCount);
  var baseStrokeWidth = strokeWidth;
  var totalLines = lineCount + lineCountBuffer * 2;
    
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {
    
    var startX = originX;
    var startY = originY + spacingY * i + spacingY / 2;
    var endX = startX + width ;
    var endY = startY + spacingY * (i + 8) + spacingY / 2;

    strokeWidth = baseStrokeWidth;

    stroke(COLORS.darkgrey);
    beginShape();
    strokeWeight(strokeWidth);

    var stops = 500;
    var xIncr = width / stops;
    var yIncr = (i % 2 == 0 ? 1 : -1) * spacingY / stops;
    var amplitude = spacingY / 2 + spacingY / 8 * sin(_deg(i));
    
    for (var n = 0; n < stops + 1; n++) {
      var cx = startX + n * xIncr;
      var cy = startY + amplitude * sin(n * PI / 16 + deg);
      if (n == 0) {
        vertex(cx, cy);
        continue;
      }
      
      bezierVertex(cx, cy, cx, cy -1, cx, cy);
    }
    endShape();
    
  }
}

function draw() {
  clear();
  background(COLORS.white);
  noFill();
  
  var deg = (t % period) / period * TWO_PI;

  push();
  //rotate(PI / 4);
  drawLines(width=CANVAS.width, 
            height=CANVAS.height,
            originX = 0,
            originY = 0,
            lineCount = 24,
            lineCountBuffer = 2,
            degOffset = 0,
            strokeWidth = 4);
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
