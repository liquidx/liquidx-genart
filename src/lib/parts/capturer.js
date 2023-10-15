class Capturer {
  constructor(
    canvas,
    width,
    height,
    frameRate = 30,
    frameCount = 120,
    name = "animation"
  ) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.frameRate = frameRate;
    this.frameCount = frameCount;
    this.captureName = name;
    this.recordedBlobs = [];

    this.mimeType = "video/webm"; // only works on chrome.
    this.bitsPerSecond = 10 * 1000 * 1000;
    this.captureDelay = 2; // dunno why there's a 2 frame delay in capturing.
  }

  activateLink(elem, callback) {
    let self = this; // binding hack
    elem.addEventListener("click", (e) => {
      if (callback) {
        callback();
      }
      self.enableCapture();
      self.start();
      e.preventDefault();
      return false;
    });
  }

  enableCapture() {
    this.started = false;
    this.stream = null;
    this.mediaRecorder = null;
    this.captureFrameRemaining = this.frameCount + this.captureDelay;
    this.stream = this.canvas.captureStream(this.frameRate);
  }

  start() {
    if (this.stream && !this.started) {
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.mimeType,
        videoBitsPerSecond: this.bitsPerSecond,
      });
      this.mediaRecorder.onstop = this.onStop.bind(this);
      this.mediaRecorder.ondataavailable = this.onDataAvailable.bind(this);
      this.mediaRecorder.start();
      // Hack to pass only the filename in to the onStop function.
      this.mediaRecorder.fileName = this.captureName + ".webm";
      this.started = true;
    }
  }

  onStop() {
    const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = this.captureName + ".webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  captureFrame() {
    if (this.mediaRecorder && this.captureFrameRemaining > 0) {
      this.captureFrameRemaining--;
      if (this.captureFrameRemaining == 0) {
        this.mediaRecorder.stop();
      }
    }
  }
}

export default Capturer;
