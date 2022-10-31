class Hair {
  constructor(x, y, length, angle, ctx) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.originAngle = angle;
    this.targetAngle = angle;
    this.memoryAngle = angle;
    this.length = length;
    this.originLength = length;
    this.targetLenght = length;
    this.luminosity = 100;
    this.w = 20;
    this.ctx = ctx;
    /*
      vitesse de d'incrémentation de t
    */
    this.speed = 0.001;
    /*
      t est un compteur qui va de 0 à 1
      qui definit la portion du chemin parcouru
    */
    this.t = 0;
  }

  reset() {
    this.t = 0;
    this.originAngle = this.angle;
    let t = this.angle + (Math.PI * 2 - (this.angle % (Math.PI * 2)));
    if (this.angle % (Math.PI * 2) < Math.PI) {
      t = this.angle - (this.angle % (Math.PI * 2));
    }
    this.targetAngle = this.release ? this.memoryAngle : t;
    this.release = !this.release;
  }

  arrange() {
    this.targetAngle = this.memoryAngle;
  }

  derange() {
    this.t = 0;
    this.originAngle = this.angle;
    let t = this.angle + (Math.PI * 2 - (this.angle % (Math.PI * 2)));
    if (this.angle % (Math.PI * 2) < Math.PI) {
      t = this.angle - (this.angle % (Math.PI * 2));
    }
    this.targetAngle = t;
  }

  move() {
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.elasticOut(this.t);
    this.angle =
      this.originAngle + (this.targetAngle - this.originAngle) * ease;
    this.luminosity = this.map(ease, 0, 1, 50, 100);
  }

  draw() {
    if (Math.abs(this.targetAngle - this.angle) > 0.0001) {
      this.move();
    } else {
      this.angle = this.targetAngle;
      this.luminosity = 100;
    }
    this.ctx.fillStyle = `hsla(${this.angle},30%,${this.luminosity}%,0.3)`;

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    this.ctx.beginPath();
    this.ctx.moveTo(-this.w / 2, 0);
    this.ctx.lineTo(this.w / 2, 0);
    this.ctx.lineTo(0, this.length);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  //map number from one range to another
  map(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
}
