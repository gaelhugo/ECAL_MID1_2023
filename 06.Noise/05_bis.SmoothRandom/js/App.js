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
    this.ctx.lineWidth = 3;
    this.setup();
  }

  setup() {
    this.grid = [];
    const gridWidth = 40;
    const gridHeight = 60;
    const offsetX = 30;
    const offsetY = 30;
    const circleSize = 5;

    const topLeft = {
      x: this.canvas.width / 2 - (gridWidth * offsetX) / 2,
      y: this.canvas.height / 2 - (gridHeight * offsetY) / 2,
    };

    for (let j = 0; j < gridHeight; j++) {
      for (let i = 0; i < gridWidth; i++) {
        let circleX = offsetX * i + topLeft.x;
        let circleY = offsetY * j + topLeft.y;

        const distanceToCenter = Math.abs(this.canvas.width / 2 - circleX);
        let variance = (gridWidth * offsetX) / 4 - distanceToCenter;
        variance = Math.max(variance, 0);
        console.log(variance);

        const random = (Math.random() * variance) / 2;

        circleY -= random;

        const circle = new Circle(circleX, circleY, circleSize, this.ctx);
        this.grid.push(circle);
      }
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "white";
    this.grid.forEach((circle, index) => {
      // circle.draw();
      const circleX = circle.x;
      const circleY = circle.y;

      if (index % 40 == 0) {
        this.ctx.save();
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.grid[index].x, this.grid[index].y);
      } else {
        if (index % 40 < 39) {
          const cx = (this.grid[index].x + this.grid[index + 1].x) / 2;
          const cy = (this.grid[index].y + this.grid[index + 1].y) / 2;
          this.ctx.quadraticCurveTo(
            this.grid[index].x,
            this.grid[index].y,
            cx,
            cy
          );
        }
      }
    });

    this.ctx.save();
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fill();
    this.ctx.restore();
    this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
