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
    this.ctx.strokeStyle = "white";
    this.setup();
  }

  setup() {
    this.points = [];
    this.totalLines = 30;
    this.subdivisions = 30;
    this.space = window.innerWidth / 1.2 / this.subdivisions;
    this.width = this.space * this.subdivisions;
    this.topLeft = {
      x: this.canvas.width / 2 - this.width / 2,
      y: this.canvas.height / 2 - (this.totalLines * this.space) / 2,
    };
    // build grid
    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {
        const x = i * this.space + this.topLeft.x;
        let y = j * this.space + this.topLeft.y;
        const distanceToCenter = Math.abs(x - this.canvas.width / 2);
        const variance = Math.max(this.width / 4 - distanceToCenter, 0);
        const random = Math.random();
        y += random * -variance;
        const circle = new Circle(x, y, 4, this.ctx, random * -variance);
        this.points.push(circle);
      }
    }

    this.ctx.lineWidth = 2 * this.pixelRatio;

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw all points
    this.points.forEach((point) => {
      point.draw();
    });

    for (let i = 0; i < this.totalLines; i++) {
      this.ctx.beginPath();
      for (let j = 0; j < this.subdivisions - 1; j++) {
        const index = i * this.subdivisions + j;
        if (j == 0) {
          this.ctx.moveTo(this.points[index].x, this.points[index].y);
        }
        // replace that line with a quadratic curve
        this.ctx.lineTo(this.points[index + 1].x, this.points[index + 1].y);
      }
      this.ctx.save();
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.fill();
      this.ctx.restore();
      this.ctx.stroke();
      this.ctx.closePath();
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
