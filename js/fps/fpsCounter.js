class FpsCounter {
  constructor() {
    this.fpsLatest = document.getElementById("fpsLatest");
    this.fpsAvg = document.getElementById("avgLast100");
    this.fpsMin = document.getElementById("minLast100");
    this.fpsMax = document.getElementById("maxLast100");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = 1 / delta * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fpsLatest.textContent = `Latest: ${Math.round(fps)}`;
    this.fpsAvg.textContent = `Average: ${Math.round(mean)}`;
    this.fpsMin.textContent = `Minimum: ${Math.round(min)}`;
    this.fpsMax.textContent = `Maximum: ${Math.round(max)}`;
  }
}

export default FpsCounter;