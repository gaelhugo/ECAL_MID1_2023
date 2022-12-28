class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }

  setup() {
    this.audio = new AudioTool();
    document.addEventListener("click", (e) => {
      this.audio.play(e);
    });
    this.draw();
  }
  drawFreqForm() {
    let centerY = this.canvas.height / 2;
    const offset = 380;
    const step = this.canvas.width / (this.audio.dataFrequency.length - offset);
    const scale = 3;

    this.ctx.fillStyle = "white";
    for (let i = 0; i < this.audio.dataFrequency.length - offset; i++) {
      this.ctx.fillRect(
        i * step,
        centerY,
        1,
        this.audio.dataFrequency[i] * scale
      );
    }
    for (let i = 0; i < this.audio.dataFrequency.length - offset; i++) {
      this.ctx.fillRect(
        i * step,
        centerY,
        1,
        -this.audio.dataFrequency[i] * scale
      );
    }
  }

  drawWavForm() {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    let centerY = this.canvas.height / 2;
    const step = this.canvas.width / this.audio.dataWave.length;
    const radius = 10;
    const scale = 5;
    // max value of dataWave is 255
    // to make it center, we need to subtract 255 / 2
    centerY -= (255 / 2) * scale;

    for (let i = 0; i < this.audio.dataWave.length; i++) {
      const x = i * step;
      const y = this.audio.dataWave[i] * scale + centerY;
      this.ctx.fillStyle = `hsl(${(y / this.canvas.height) * 360}, 100%, 50%)`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    }
    this.ctx.beginPath();
    for (let i = 0; i < this.audio.dataWave.length; i++) {
      const x = i * step;
      const y = this.audio.dataWave[i] * scale + centerY;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.audio.isPlaying) {
      this.audio.updateFrequency();
      this.audio.updateWaveForm();

      this.drawFreqForm();
      this.drawWavForm();

      // CIRCLE BASED ON FREQUENCY (double)
      let offset = 380;
      let offsetFreq = 40;
      let range = this.audio.dataFrequency.length - (offset + offsetFreq);
      let angle = (Math.PI * 1) / range;
      let centerX = (window.innerWidth / 2) * this.pixelRatio;
      let centerY = (window.innerHeight / 2) * this.pixelRatio;
      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      for (let i = 0; i < range; i++) {
        const freq = this.audio.dataFrequency[i + offsetFreq];
        const radius = 300 + freq * 2;
        const x = Math.cos(angle * i) * radius + centerX;
        const y = Math.sin(angle * i) * radius + centerY;

        if (i == 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      for (let i = range; i > 0; i--) {
        const freq = this.audio.dataFrequency[i + offsetFreq];
        const radius = 300 + freq * 2;
        const x = Math.cos(-angle * i) * radius + centerX;
        const y = Math.sin(-angle * i) * radius + centerY;
        this.ctx.lineTo(x, y);
      }

      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // CIRCLE BASED ON WAVE (double)
      this.ctx.fillStyle = "black";
      offset = 0;
      offsetFreq = 0;
      range = this.audio.dataWave.length - (offset + offsetFreq);
      angle = (Math.PI * 1) / range;

      this.ctx.beginPath();
      for (let i = 0; i < range; i++) {
        const freq = this.audio.dataWave[i + offsetFreq];
        const radius = 10 + freq;
        const x = Math.cos(angle * i) * radius + centerX;
        const y = Math.sin(angle * i) * radius + centerY;

        if (i == 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      for (let i = range; i > 0; i--) {
        const freq = this.audio.dataWave[i + offsetFreq];
        const radius = 10 + freq;
        const x = Math.cos(-angle * i) * radius + centerX;
        const y = Math.sin(-angle * i) * radius + centerY;
        this.ctx.lineTo(x, y);
      }

      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
