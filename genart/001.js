// The canvas.
var canvas = null;

var grid = 16;
var radius = 12;

var c_width = 480;
var c_height = 480;

var r_max = c_height / grid + 1;
var c_max = c_width / grid + 1;

// Animation
var t = 0;
var max_t = 1800;
var targetFrameRate = 10;
var loopDuration = 5;

// Capture
var saveAnimation = true;
var saveFrame = false;
var captureFrameCount = 0;
var capturedFrameIndex = 0;
var captureFn = null;
var captureEndFn = null;
//var captureFrameRate = 25;

function size_fn(r, c, t) {
  return 12;
}

function layout_fn(r, c) {
  return [0, 0];
}

function offset_fn(r, c, t) {
  var period = targetFrameRate * loopDuration; // frameRate();
  var deg = (t % period) / period * TWO_PI;
  var x = r * sin(deg);
  var y = c * cos(deg);
  return [x, y, 0];
}

function color_fn(r, c, t) {
  return 255;
}

function draw() {
  background(0);
  noStroke();
    
  for (var r = 0; r < r_max; r++) {
    for (var c = 0; c < c_max; c++) {
      var o = offset_fn(r, c, t);      
      var l = layout_fn(r, c);
      var size = size_fn(r, c ,t);
   
      var lighter = 128;
      fill(lighter, 0, 0);      
      ellipse(c * grid + l[0] + o[0], 
              r * grid + l[1] + o[1], 
              size, size);
    }
  }
  
  for (var r = 0; r < r_max; r++) {
    for (var c = 0; c < c_max; c++) {
      var size = size_fn(r, c ,t);
      fill(255);
      ellipse(c * grid,
              r * grid,
              size, size);      
    }
  }
  
  // increment
  t = t + 1;
  
  // capture
  if (captureFrameCount && captureFn && captureEndFn) {
    captureFn(capturedFrameIndex);    
    capturedFrameIndex++;
    captureFrameCount--;
    if (captureFrameCount == 0) {
      captureEndFn();
    }
  }

  if (t > max_t) {
    noLoop();
  }
}

function touchEnded() {
  if (saveAnimation) {
    // saveFrames("out", "png", 1, 25, function(data) {
    //  imageFrames.push(data);
    //  });   
    captureFrameCount = targetFrameRate * loopDuration;
    startCapture();
    //saveFrames("out", "png", 1, targetFrameRate);
  }
  //saveCanvas(canvas, "canvas", "png");  
}

function setup() {
  canvas = createCanvas(c_width, c_height);
  canvas.parent("container");
  frameRate(targetFrameRate);
  // noLoop();
}

function startCapture() {
  captureFn = function(index) {
    saveCanvas(canvas, "canvas" + index, "png");
  };
  captureEndFn = function() {
    console.log("done");
  }
}

// function startCapture() {
//   var gif = new GIF({
//     workers: 2,
//     quality: 10
//   });

//   captureFn = function() {
//     gif.addFrame(canvas.canvas, {delay: 1000/targetFrameRate});
//   };
  
//   captureEndFn = function() {
//     gif.on('finished', function(blob) {
//       console.log('finished');
//       console.log(blob);
//       window.open(URL.createObjectURL(blob));
//     });
//     gif.render();
//   };
// }
