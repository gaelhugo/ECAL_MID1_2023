class Circle {
  constructor(x, y, radius, ctx) {
    this.state = 0;
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.defaultRadius = radius;
    this.radius = radius;
    this.radiusWidth = radius;
    this.target_radius_width = radius;
    this.origin_radius_width = radius;

    this.ctx = ctx;
    /*
      vitesse de d'incrémentation de t
    */
    this.speed = 0.01;
    /*
      t est un compteur qui va de 0 à 1
      qui definit la portion du chemin parcouru
    */
    this.t = 0;

    this.limit = 5;
  }

  draw() {
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, this.radiusWidth, this.radius, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  /**
   *
   *  remettre le compteur t à zero
   *  réinitialiser la position du point de départ
   *  assigner la nouvelle position de destination
   */
  resetAndGo(x, y) {
    this.t = 0;
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.target = {
      x,
      y,
    };
    this.state++;
    if (this.state > this.limit) this.state = 0;
    //
    if (this.state == this.limit) {
      this.origin_radius_width = this.radius;
      this.target_radius_width = this.radius * 4;
    } else {
      this.radiusWidth = this.defaultRadius * 1.5;
      this.origin_radius_width = this.radiusWidth;
      this.target_radius_width = this.radius = this.defaultRadius;
    }
  }

  /**
   * function de calcul de l'animation
   */
  move() {
    if (this.state == this.limit) {
      //on incrémente t par la vitesse
      this.t += this.speed;
      //on calcule le facteur d'interpolation suivant le type de easing
      const ease = Easing.elasticOut(this.t);

      this.radiusWidth = this.radius =
        this.origin_radius_width +
        (this.target_radius_width - this.origin_radius_width) * ease;

      // this.radius =
      //   this.origin_radius_width +
      //   (this.target_radius_width - this.origin_radius_width) * ease;
    } else {
      //on incrémente t par la vitesse
      this.t += this.speed;
      //on calcule le facteur d'interpolation suivant le type de easing
      const ease = Easing.elasticOut(this.t);
      //nouvelle position
      // on part de la position d'origine
      // on calcul la distance totale à parcourir (v2-v1)
      // on multiplie cette distance par le facteur d'interpolation
      this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
      this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;

      this.radiusWidth =
        this.origin_radius_width +
        (this.target_radius_width - this.origin_radius_width) * ease;
    }
  }

  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
