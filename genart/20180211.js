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
var count = 12;

function drawSquareLR(x, y, w, h, divisions, c) {
  stroke(c);

  var spacing = h / count;

  // center line
  line(x, y, x + w, y + h);
  
  for (var i = 1; i < divisions; i++) {

    var x1 = x + i * spacing;
    var y1 = y;
    var x2 = x + w;
    var y2 = y + h - i * spacing;
    line(x1, y1, x2, y2);
    
    x1 = x;
    y1 = y + i * spacing;
    x2 = x + w - i * spacing;
    y2 = y + h;
    line(x1, y1, x2, y2);
  }
}

function drawSquareRL(x, y, w, h, divisions, c) {
  stroke(c);

  var spacing = h / count;

  // center line
  line(x + w, y, x, y + h);
  
  for (var i = 1; i < divisions; i++) {
    var x1 = x + w - i * spacing;
    var y1 = y;
    var x2 = x;
    var y2 = y + h - i * spacing;
    line(x1, y1, x2, y2);
    
    x1 = x + w;
    y1 = y + i * spacing;
    x2 = x + i * spacing;
    y2 = y + h;
    line(x1, y1, x2, y2);
  }
}

function draw() {
  clear();
  blendMode(ADD);
  background(COLORS.black);
  strokeCap(SQUARE);
  
    
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var margin = CANVAS.height / 4;
  var lineHeight = CANVAS.height / 2;

  var subSquareWidth = CANVAS.width / 4;
  var c = color(COLORS.white);
  
  strokeWeight(2 + sin(deg));  
  noFill();
  c.setAlpha(128 + 64 * sin(deg));
  drawSquareLR(margin, margin, subSquareWidth, subSquareWidth, count, c);
  
  c.setAlpha(128 + 64 * sin(deg + PI));
  drawSquareLR(margin + subSquareWidth, margin + subSquareWidth, subSquareWidth, subSquareWidth, count, c);
  
  c.setAlpha(128 + 64 * sin(deg + HALF_PI));
  drawSquareRL(margin + subSquareWidth, margin, subSquareWidth, subSquareWidth, count, c);
  
  c.setAlpha(128 + 64 * sin(deg + PI * 1.5));  
  drawSquareRL(margin, margin + subSquareWidth, subSquareWidth, subSquareWidth, count, c);

  blendMode(DARKEST);
  noStroke();
  var csize = subSquareWidth * 2 / 3 + subSquareWidth / 3 * 1; // sin(deg);
  var cx1 = margin + subSquareWidth - csize / 2;
  
  
  fill('#333333');
  rect(cx1, cx1, csize, csize);
  
  t = t + 1;  // increment frame.
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
