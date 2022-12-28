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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.audio.isPlaying) {
      this.audio.updateWaveForm();
      // this.ctx.fillStyle = "white";
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
        this.ctx.fillStyle = `hsl(${
          (y / this.canvas.height) * 360
        }, 100%, 50%)`;
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
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
