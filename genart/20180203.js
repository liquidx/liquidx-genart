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
var countH = 4;
var countV = 4;
var gridSpacing = parseInt(CANVAS.width / countH);

function draw() {
  clear();
  background(COLORS.black);
  noStroke();
  
    
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2  / countH;
  var lineHeight = CANVAS.height / 2;
  
  for (var x = 1; x < countH; x++) {
    for (var y = 0; y < countV - 1; y++) {
      var c = color(PASTELS.blue);
      c.setAlpha(128 + 128 * y / countV);
      fill(c);
      var topY = y * gridSpacing * 2 / 3 - gridSpacing * sin(deg);
      var bottomY = topY + gridSpacing * 2 + gridSpacing * sin(deg);
      var midX = x * gridSpacing;
      var leftX = midX - (countV - y) * gridSpacing / 2 - gridSpacing / 2 * cos(deg);
      var rightX = midX + (countV - y) * gridSpacing / 2 - gridSpacing / 2 * cos(deg);
      triangle(midX, topY, leftX, bottomY, rightX, bottomY);
    }
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
