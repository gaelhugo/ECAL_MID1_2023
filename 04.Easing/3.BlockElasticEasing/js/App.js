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
    this.all_blocks = [];
    this.setup();
  }

  setup() {
    // this.circle = new Circle(100, 100, 50, this.ctx);
    const blockWidth = Math.ceil((window.innerWidth / 25) * this.pixelRatio);
    for (let i = 0; i < 25; i++) {
      const block = new Block(
        i * blockWidth,
        0,
        blockWidth,
        window.innerHeight * this.pixelRatio,
        i * 10.8,

        this.ctx
      );
      this.all_blocks.push(block);
    }
    document.addEventListener("mousemove", this.move.bind(this));
    this.draw();
  }

  draw() {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.all_blocks.forEach((block) => {
      block.draw();
    });

    requestAnimationFrame(this.draw.bind(this));
  }

  move(e) {
    this.all_blocks.forEach((block) => {
      if (
        block.checkiftouched(
          e.clientX * this.pixelRatio,
          e.clientY * this.pixelRatio
        )
      ) {
        block.reset(e.clientY);
      }
    });
  }
}

window.onload = function () {
  new App();
};
