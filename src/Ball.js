class Ball {
  constructor(initialX, initialY, initialAngle, radius) {
    this.x = initialX;
    this.y = initialY;
    this.angle = initialAngle;
    this.radius = radius;
    this.speed = 0;
    this.vAngle = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(-0.5*this.radius, -1.5*this.radius, 1*this.radius, 3*this.radius);
    ctx.fillRect(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
    ctx.fillRect(-1.5*this.radius, -0.5*this.radius, 3*this.radius, 1*this.radius);
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
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(-0.5*this.radius, -1.5*this.radius, 1*this.radius, 3*this.radius);
    ctx.fillRect(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
    ctx.fillRect(-1.5*this.radius, -0.5*this.radius, 3*this.radius, 1*this.radius);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    
    ctx.save();
    ctx.translate(this.x, height + this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(-0.5*this.radius, -1.5*this.radius, 1*this.radius, 3*this.radius);
    ctx.fillRect(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
    ctx.fillRect(-1.5*this.radius, -0.5*this.radius, 3*this.radius, 1*this.radius);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    
    ctx.save();
    ctx.translate(width + this.x, height + this.y);
    ctx.rotate(this.angle);
    if (debug) drawCoordinates(ctx);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(-0.5*this.radius, -1.5*this.radius, 1*this.radius, 3*this.radius);
    ctx.fillRect(-this.radius, -this.radius, 2*this.radius, 2*this.radius);
    ctx.fillRect(-1.5*this.radius, -0.5*this.radius, 3*this.radius, 1*this.radius);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.angle += this.vAngle;
    this.y = (this.y + this.speed * Math.cos(this.angle) + height) % height;
    this.x = (this.x - this.speed * Math.sin(this.angle) + width) % width;
  }
}
