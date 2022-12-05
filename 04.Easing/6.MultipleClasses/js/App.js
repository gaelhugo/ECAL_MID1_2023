/**
 *  EASING REF:
 *  https://easings.net/#
 */

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
    this.circle = new Tete(100, 100, 200, this.ctx);
    document.addEventListener("click", this.click.bind(this));
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.circle.draw();
    requestAnimationFrame(this.draw.bind(this));
  }

  click(e) {
    this.circle.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );
  }
}

window.onload = function () {
  new App();
};
