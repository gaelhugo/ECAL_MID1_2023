class Letter {
  constructor(x, y, fontSize, ctx, index) {
    this.x = x;
    this.y = y;
    this.radius = fontSize;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.replacement_color = "rgb(255,255,255)";
    this.letter = "x";
    this.angle = index * 0.045;
    this.angle2 = index * 0.033;
    this.height_distance = 100;
  }

  update() {
    this.angle += 3;
    this.angle2++;
    this.calculatedX =
      this.x + Math.cos(this.angle * (Math.PI / 180)) * this.height_distance;
    this.calculatedY =
      this.y + Math.sin(this.angle2 * (Math.PI / 180)) * this.height_distance;
    this.height_distance = Math.cos(this.angle * (Math.PI / 180)) * 100;
  }

  draw() {
    const luminosity_percentage = this.detectLuminance();
    if (luminosity_percentage > 0.25) {
      this.ctx.fillStyle = this.color;
      this.ctx.save();
      this.ctx.translate(this.calculatedX, this.calculatedY);
      // draw letter x
      this.ctx.font = `${this.radius * luminosity_percentage * 3}px sans-serif`;
      this.ctx.fillText(this.letter, 0, 0);

      // this.ctx.beginPath();
      // this.ctx.arc(0, 0, this.radius * luminosity_percentage, 0, 2 * Math.PI);
      // this.ctx.fill();
      // this.ctx.closePath();
      this.ctx.restore();
    }
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
