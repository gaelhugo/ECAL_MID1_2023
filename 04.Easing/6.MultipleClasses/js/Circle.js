class Circle {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    // this.target = {
    //   x: x,
    //   y: y,
    // };
    // this.origin = {
    //   x: this.target.x,
    //   y: this.target.y,
    // };
    this.radius = radius;
    this.originRadius = radius;
    this.targetRadius = radius;

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
    this.color = "black";
  }

  draw() {
    //check si on est arrivé à destination
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale

    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
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
  resetAndGo(target) {
    this.t = 0;
    // this.origin = {
    //   x: this.target.x,
    //   y: this.target.y,
    // };
    // this.target = {
    //   x,
    //   y,
    // };

    this.originRadius = this.radius;
    this.targetRadius = target;
    console.log("RESET AND GO");
  }

  /**
   * function de calcul de l'animation
   */
  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.bounceOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    // this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    // this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.radius =
      this.originRadius + (this.targetRadius - this.originRadius) * ease;
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
