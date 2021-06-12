import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from '../base'
import p5 from 'p5'

// The canvas.
var canvas = null;

// Animation
var t = 0;
var a = 0;
var max_t = 1800;
var targetFrameRate = 30;
var loopDuration = 6;

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

  var period = targetFrameRate * loopDuration;
  var rad = (t % period) / period * TWO_PI;
  var deg = parseInt(rad / TWO_PI * 360);
  //console.log(deg);

  
  var center = [CANVAS.width / 2, CANVAS.height / 2];
  var size = CANVAS.width / 2;
  var radius = CANVAS.width / 4;
  var circleSize = 32;
  var dotCount = 12;
  
  for (var i = 0; i < dotCount; i++) {
    var angle = TWO_PI / dotCount * i;
    var hue = parseInt((360 / dotCount * i + deg) % 360);
    var sat = 60;
    var l = 50;
    var colorString = 'hsl(' + hue + ', ' + sat + '%, ' + l + '%)';
    var c = color(colorString);
    
    var radius1 = radius * 3 / 4 + sin(rad) * (radius / 4);
    var x1 = center[0] + sin(angle + rad) * radius1
    var y1 = center[1] + cos(angle + rad) * radius1;

    var radius2 = (radius / 2) + cos(rad) * (radius / 4)
    var x2 = center[0] + sin(angle + rad) * radius2;
    var y2 = center[1] + cos(angle + rad) * radius2;

    var radius3 = (radius / 4) + sin(rad) * (radius / 16);
    var x3 = center[0] + sin(angle + rad) * radius3;
    var y3 = center[1] + cos(angle + rad) * radius3;

    fill(c);
    ellipse(x1, y1, circleSize, circleSize);
    ellipse(x2, y2, circleSize / 2, circleSize / 2);
    ellipse(x3, y3, circleSize / 4, circleSize / 4);    
  }

  
  t = t + 1;  // increment frame.

  
  CAPTURER.captureFrame();
}


function setup() {
  canvas = createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  
  blendMode(ADD);
  
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

// Force p5 into sketch mode.
window.setup = setup
window.draw = draw
