import { COLORS, CANVAS, CAPTURER, ORANGE, PASTELS } from "../parts/base.js";

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

function draw(p5s) {
  p5s.clear();
  p5s.background(ORANGE.black);
  p5s.noFill();

  p5s.strokeWeight(16);
  p5s.strokeCap(p5s.PROJECT);

  var percent = (t % period) / period;
  var deg = percent * Math.PI * 2;
  var lineCount = 12;
  var margin = CANVAS.height / 4;
  var spacing = CANVAS.height / 2 / lineCount;
  var lineDropStages = 3;
  var finalLineDropStages = 3;
  var stagePercentage = 1 / (lineCount + lineDropStages + finalLineDropStages); // 3 extra stages to animate initial drop, 3 for final drop.
  var order = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11];

  for (var i = 0; i < lineCount; i++) {
    var n = order[i];
    var linePercent = lineDropStages * stagePercentage;
    var h1 = CANVAS.height / 2;
    var x1 = margin + spacing * n;
    var y1 = margin;

    // This line should be moving
    var activeMinPercent = i * stagePercentage;
    var activeMaxPercent = (i + lineDropStages) * stagePercentage;

    // Set up the color.
    var c = p5s.color(ORANGE.primary);
    c.setAlpha(255 - i * 20);

    if (percent > activeMaxPercent) {
      // starts but starts to fall...
      y1 =
        margin +
        (percent - activeMaxPercent) * 30 * Math.pow(lineCount - i, 0.5);
      // free fall after all pieces are there.
      if (percent > 1 - (finalLineDropStages + 2) * stagePercentage) {
        var lastStagePercentage =
          1 - (1 - percent) / ((finalLineDropStages + 2) * stagePercentage);
        y1 += 20 * lastStagePercentage * Math.pow(lineCount - i / 2, 2);
        c.setAlpha(255 - i * 20 - 100 * (1 - lastStagePercentage));
      }
    } else if (percent < activeMinPercent) {
      y1 = -CANVAS.height;
    } else {
      var fractionOfAnimation = 1 - (activeMaxPercent - percent) / linePercent;
      y1 = -h1 + Math.sin((fractionOfAnimation * Math.PI) / 2) * (margin + h1);
    }

    var y2 = h1 + y1;

    p5s.stroke(c);
    p5s.line(x1, y1, x1, y2);
  }

  t = t + 1; // increment frame.
  CAPTURER.captureFrame();
}

function setup(p5s, parentEl) {
  canvas = p5s.createCanvas(CANVAS.width, CANVAS.height);
  canvas.parent(parentEl);
  p5s.frameRate(targetFrameRate);
  CAPTURER.init(canvas, targetFrameRate, loopDuration);
}

export default { setup, draw };
