class Block {
  constructor(x, y, width, height, color, ctx) {
    this.position = { x: x, y: y };
    this.width = width;
    this.height = height;
    this.targetHeight = height - height / 4;
    this.originHeight = height;
    this.ctx = ctx;
    this.speed = 0.003;
    this.saturation = 50;
    this.targetsaturation = 50;
    this.originsaturation = 50;
    this.color = color;
    this.t = 0;
  }

  checkiftouched(x, y) {
    return (
      x > this.position.x &&
      x < this.position.x + this.width &&
      y > this.position.y &&
      y < this.position.y + this.height
    );
  }

  reset(y) {
    this.t = 0;
    this.originHeight = y;
    this.height = y;
    this.originsaturation = 100;
  }

  draw() {
    if (Math.abs(this.targetHeight - this.height) > 0.1) this.calculateHeight();
    else {
      this.height = this.targetHeight;
    }
    this.ctx.fillStyle = `hsl(${this.color}, ${this.saturation}%, 50%)`; //`rgba(0,0,0,0)`;
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.beginPath();
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.closePath();

    this.ctx.restore();
  }

  calculateHeight() {
    this.t += this.speed;
    this.ease = Easing.elasticOut(this.t);
    this.height =
      this.originHeight + (this.targetHeight - this.originHeight) * this.ease;
    this.saturation =
      this.originsaturation +
      (this.targetsaturation - this.originsaturation) * this.ease;
  }
}
