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
var countV = 8;
var gridSpacingH = parseInt(CANVAS.width / countH);
var gridSpacingV = parseInt(CANVAS.height / countV);

function draw() {
  clear();
  background(COLORS.black);
  noStroke();
  
    
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2  / countH;
  var lineHeight = CANVAS.height / 2;
  var colors = [PASTELS.red, PASTELS.orange, PASTELS.yellow, PASTELS.green];
  
  for (var x = 2; x < countH - 1; x++) {
    for (var y = 2; y < countV - 2; y++) {
      var c = color(colors[y-2]);
      // c.setAlpha(128 + 128 * y / (countV - 1));
      fill(c);
      var multiplier = y % 2 == 0 ? 1 : -1;
      var topY = y * gridSpacingV * 2 / 3 - gridSpacingV * sin(deg);
      var bottomY = topY + gridSpacingV * 2 + gridSpacingV * sin(deg);
      var midX = x * gridSpacingH + 0.5 * gridSpacingH / 4 * sin(deg);
      var leftX = midX - (countV - y) * gridSpacingH / 4 - multiplier * gridSpacingH / 4 * cos(deg);
      var rightX = midX + (countV - y) * gridSpacingH / 4 + multiplier *  gridSpacingH / 4 * sin(deg);
      triangle(midX, bottomY, leftX, topY, rightX, topY);
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
