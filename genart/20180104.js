// The canvas.
var canvas = null;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 3;

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration;
  var deg = (t % period) / period * TWO_PI;
  var x = r * sin(deg);
  var y = c * cos(deg);
  return [x, y, 0];
}

function draw() {
  clear();
  blendMode(ADD);  
  background(COLORS.black);

  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  
  // red
  var offset_3 = offset_fn(-4, 8, t);
  var color_3 = color(255, 32, 32);  
  color_3.setAlpha(192);
  noStroke();
  fill(color_3);
  ellipse(center[0] + offset_3[0], center[1] + offset_3[1], size, size);
   
  // green
  var offset_1 = offset_fn(4, -8, t);
  var color_1 = color(32, 255, 32);
  color_1.setAlpha(192);
  noStroke();
  fill(color_1);
  ellipse(center[0] + offset_1[0], center[1] + offset_1[1], size, size);
  
  // blue
  var offset_2 = offset_fn(8, 4, t + 60);
  var color_2 = color(32, 32, 255);
  color_2.setAlpha(192);
  noStroke();
  fill(color_2);
  ellipse(center[0] + offset_2[0], center[1] + offset_2[1], size, size);

  var offset_eclipse = offset_fn(2, 2, t);
  blendMode(MULTIPLY);
  fill(COLORS.black);
  ellipse(center[0] + offset_eclipse[0], center[1] + offset_eclipse[1], size, size);
  
  t = t + 2;  // increment frame.
  
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  
  blendMode(ADD);
  
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}
