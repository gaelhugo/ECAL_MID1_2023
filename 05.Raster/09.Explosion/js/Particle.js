class Particle {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.life = 50;
    this.x = this.origin.x;
    this.y = this.origin.y;
    this.velocity = { x: 5 - Math.random() * 10, y: Math.random() * -10 - 5 };
    this.gravity = 0.5;
  }

  move() {
    this.life--;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  isDead() {
    return this.life <= 0;
  }

  draw() {
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
