let COLORS = {
  black: '#000000',
  darkgrey: '#333333',
  white: '#d0d0d0',
  red: '#B71C1C',
  orange: '#E64A19',
  orange_light: '#FF5722',
  orange_verylight: '#FF8A65',
};

let PASTELS = {
  red: '#FF6865',
  orange: '#FFA985',
  yellow: '#FFF491',
  green: '#85CC9F',
  blue: '#92D1C7'
};

let ORANGE = {
  primary: '#FF6600',
  secondary: '#C13B00',
  black: '#1B1D1E',
  grey: '#424E4F'
};

let CANVAS = {
  width: 480,
  height: 480
};

// p5.js - capture helper methods.
let CAPTURER = {
  // This is for reference on how to make frames in to a movie.
  ffmpeg_cmd: "ffmpeg -r 30 -f image2 -pattern_type glob -i canvas\\*.png -s 480x480 -vcodec libx264 -crf 5 -framerate 30 -vb 20M -pix_fmt yuv420p -tune stillimage animation.mp4",
  
  
  canvas: null,
  frameRate: 25,
  duration: 1,
  captureFrameCount: 0,
  capturedFrameIndex: 0,
  captureFrameOnClick: false,
  captureSequenceOnClick: false,
  captureFn: null,
  captureEndFn: null,
  
  init: function(canvas, frameRate, duration) {
    this.canvas = canvas;
    this.frameRate = frameRate;
    this.duration = duration;
    // use hash to start or abort capture.
    var hasCapture = window.location.hash.match(/capture/);
    if (hasCapture) {
      this.captureFrameCount = frameRate * duration;
      this.start();
    }
  },
  
  start: function() {
    this.captureFn = function(index) {
      saveCanvas(this.canvas, "canvas" + this.paddedFrameNumber(index), "png");
    };
    this.captureEndFn = function() {
      console.log("done");
      console.log(this.ffmpeg_cmd);
    }
  },
  
  paddedFrameNumber: function(seq) {
    if (seq < 10) {
      return '00' + seq;
    }
    else if (seq < 100) {
      return '0' + seq;
    }
    else {
      return seq;
    }
  },
  
  captureFrame: function() {    
    if (this.captureFrameCount && this.captureFn && this.captureEndFn) {
      this.captureFn(this.capturedFrameIndex);    
      this.capturedFrameIndex++;
      this.captureFrameCount--;
      if (this.captureFrameCount == 0) {
        this.captureEndFn();
      }
    }
  }
};
