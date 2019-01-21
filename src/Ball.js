class Ball {
  constructor(initialX, initialY, initialAngle, radius) {
    this.x = initialX;
    this.y = initialY;
    this.angle = initialAngle;
    this.speed = 0;
    this.vAngle = 0;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.fillStyle = "chartreuse";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // add three more objects for smoother transition
    ctx.save();
    ctx.translate(width + this.x, this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.fillStyle = "chartreuse";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.save();
    ctx.translate(this.x, height + this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.fillStyle = "chartreuse";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    ctx.save();
    ctx.translate(width + this.x, height + this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.fillStyle = "chartreuse";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.angle += this.vAngle;
    // this.y = this.y + this.speed * Math.cos(this.angle);
    // this.x = this.x - this.speed * Math.sin(this.angle);
    // // this.x -= this.speed * Math.sin(this.angle);
    // 
    this.y = (this.y + this.speed * Math.cos(this.angle) + height) % height;
    this.x = (this.x - this.speed * Math.sin(this.angle) + width) % width;
  }
}
