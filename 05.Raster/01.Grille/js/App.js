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
    this.grid = [];
    // pour centrer la grille
    const grid_width = 20 * 100;
    const top_left = {
      x: (window.innerWidth / 2) * this.pixelRatio - grid_width / 2,
      y: (window.innerHeight / 2) * this.pixelRatio - grid_width / 2,
    };
    for (let j = 0; j < 100; j++) {
      for (let i = 0; i < 100; i++) {
        this.grid.push(
          new Circle(top_left.x + i * 20, top_left.y + j * 20, 10, this.ctx)
        );
      }
    }
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //draw all circle of the grid
    this.grid.forEach((circle) => {
      circle.draw();
    });
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
