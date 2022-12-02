class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.radius = radius;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.replacement_color = "rgb(255,255,255)";

    this.initParticleStock();
  }

  initParticleStock() {
    this.pool = [];
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      this.pool.push(new Particle(this.x, this.y, this.ctx));
    }
  }

  draw() {
    const luminosity_percentage = this.detectLuminance();

    // if (luminosity_percentage > 0.19) {
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius * luminosity_percentage, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
    // }

    if (luminosity_percentage > 0.95) {
      // show and activate a particle
      if (this.pool.length > 0) {
        const particle = this.pool.shift();
        particle.reset();
        this.particles.push(particle);
      }
    }
    this.particles.forEach((particle, index) => {
      particle.move();
      particle.draw();
      if (particle.isDead()) {
        this.pool.push(particle);
        this.particles.splice(index, 1);
      }
    });
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
