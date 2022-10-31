class Eye {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }

  draw(x, y) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
    //
    // calculate the angle between the eye and the mouse
    const angle = Math.atan2(y - this.y, x - this.x);
    // calculate the position of the pupil
    const pupilX = this.x + Math.cos(angle) * this.radius * 0.5;
    const pupilY = this.y + Math.sin(angle) * this.radius * 0.5;
    this.ctx.save();
    this.ctx.translate(pupilX, pupilY);
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();
  }
}
