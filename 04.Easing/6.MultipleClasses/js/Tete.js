class Tete {
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
    this.radius = radius;
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
    this.color = "white";

    // rajouter des éléments
    this.oeilGauche = new Circle(x - 80, y - 80, 20, this.ctx);
    this.oeilGauche.color = "blue";
    this.oeilDroite = new Circle(x + 80, y - 80, 20, this.ctx);
    this.oeilDroite.color = "blue";
    this.bouche = new Circle(x, y + 40, 100, this.ctx);
  }

  draw() {
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    // voir l'oeil gauche
    this.oeilGauche.draw();
    // voir l'oeil droit
    this.oeilDroite.draw();

    // voir la bouche
    this.bouche.draw();
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
    let target = null;
    let target2 = null;
    if (this.state % 2 == 0) {
      target = 100;
      target2 = 5;
    } else {
      target = 5;
      target2 = 20;
    }
    this.bouche.resetAndGo(target);
    // this.oeilDroite.resetAndGo(target2);
  }

  /**
   * function de calcul de l'animation
   */
  move() {
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

    this.oeilGauche.position.x = this.position.x - 80;
    this.oeilGauche.position.y = this.position.y - 80;
    this.oeilDroite.position.x = this.position.x + 80;
    this.oeilDroite.position.y = this.position.y - 80;
    this.bouche.position.x = this.position.x;
    this.bouche.position.y = this.position.y + 40;
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
