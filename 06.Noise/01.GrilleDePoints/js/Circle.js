class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.originY = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = "red";
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
