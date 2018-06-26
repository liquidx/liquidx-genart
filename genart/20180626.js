// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;
var period = targetFrameRate * loopDuration;

// handlers

function _lerp(start, finish, percent) {
  return start + (finish - start) * Math.max(Math.min(percent, 1.0), 0.0);
}


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

function drawLine(startX, endX, amplitude, degAmplitude, degOffset = 0) { 
  beginShape();
  var segments = 60;
  for (var i = 0; i < segments; i++) {
    var percent = i * 1.0 / (segments- 1);
    var r = _lerp(startX, endX, percent);
    var th = degAmplitude * sin(TWO_PI * _percentage() - PI * percent + degOffset);
    vertex(r * cos(th), amplitude * r * sin(th));
  }
  endShape();
}

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
  var totalLines = lineCount + lineCountBuffer * 2
    
  for (var i = -lineCountBuffer; i < lineCount + lineCountBuffer; i++) {

    var startX = originX;
    var startY = originY + spacingY * i + spacingY / 2;
    var endX = startX + width ;
    var endY = startY + spacingY * (i + 8) + spacingY / 2;
    var width = endX - startX;

    strokeWidth = baseStrokeWidth;
    strokeWeight(strokeWidth);
    stroke(COLORS.darkgrey);
    push();

    translate(width/ 2, startY);
    drawLine(startX - width / 2 - 100 , endX + 100, 0.75, 0.4, 0);
    pop();
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
            lineCountBuffer = 6,
            degOffset = 0,
            strokeWidth = 2);
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
