export class ParticleSystem {
  constructor(image) {
    this.image = image;
    this.particles = [];
    
    this.vx = { min: .5, max: .8 };
    this.vy = { min: -.5, max: -.8 };
    this.scale = { min: .5, max: .8 };
    this.life = 5000;
    this.spawn = .85;
  }

  spawnParticle() {
    this.particles.push({
        pos: { x: randomBetween(0, window.innerWidth), y: randomBetween(0, window.innerHeight) },
        vel: { x: randomBetween(parsystem.vx.min, parsystem.vx.max), y: randomBetween(parsystem.vy.min, parsystem.vy.max) },
        scale: randomBetween( parsystem.scale.min, parsystem.scale.max ),
        life: parsystem.life,

        update(deltaTime) {
          this.pos.x += this.vel.x * deltaTime;
          this.pos.y += this.vel.y * deltaTime;
        },

        draw() {
          ctx.drawImage(this.image, this.pos.x, this.pos.y);
        }
    });
  }

  update(deltTime) {
    if (Math.random() >= this.spawn) {
      this.spawnParticle();
    }

    this.particles.forEach(p => p.update(deltTime))
  }

  draw(ctx) {
    this.particles.forEach(p => p.draw())
  }
}