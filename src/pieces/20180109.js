import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from '../base'
import p5 from 'p5'

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
var lineCount = 12;
var gridSpacing = parseInt(CANVAS.width / lineCount);

function draw() {
  clear();
  background(ORANGE.black);
  noFill();
  
  strokeWeight(16);
  strokeCap(PROJECT);
  
  var percent = (t % period) / period;
  var deg = percent * TWO_PI;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height /2  / lineCount;
  var lineDropStages = 3;
  var finalLineDropStages = 3;
  var stagePercentage = 1 / (lineCount +  lineDropStages + finalLineDropStages);  // 3 extra stages to animate initial drop, 3 for final drop.
  
  for (var i = 0; i < lineCount; i++) { 
    var linePercent = lineDropStages * stagePercentage;
    var h1 = CANVAS.height / 2;
    var x1 = margin + spacing * i;
    var y1 = margin;
    
    // This line should be moving
    var activeMinPercent = i * stagePercentage;
    var activeMaxPercent = (i + lineDropStages) * stagePercentage;
    
    if (percent > activeMaxPercent) {
      // starts but starts to fall...
      y1 = margin + (percent - activeMaxPercent) * 10 * (lineCount - i);
      // free fall after all pieces are there.
      if (percent > 1 - (finalLineDropStages * stagePercentage)) {
        var lastStagePercentage = 1 - ((1 - percent) / (finalLineDropStages * stagePercentage));
        y1 += CANVAS.height * lastStagePercentage * (lineCount - i);
      }
    } else if (percent < activeMinPercent) {
      y1 = -CANVAS.height;
    } else {
      var fractionOfAnimation = 1 - ((activeMaxPercent - percent) / linePercent);
      y1 = -h1 + sin(fractionOfAnimation * PI / 2) * (margin + h1);
    }
  
    var y2 = h1 + y1;
    
    stroke(ORANGE.primary);
    line(x1, y1, x1, y2);
    
    
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

// Force p5 into sketch mode.
window.setup = setup
window.draw = draw
