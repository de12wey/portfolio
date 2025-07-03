export class ParticleSystem {
  constructor(ctx, image) {
    this.ctx = ctx;
    this.image = image;

    this.particles = [];
    
    this.vx = { min: -5, max: -8 };
    this.vy = { min: -5, max: -8 };
    this.scale = { min: .2, max: .4 };
    this.rotation = { min: -1.5, max: 1.5 };
    this.maxLife = 5;
    this.spawn = .95;
  }

  spawnParticle() {
    this.particles.push(new Particle(
        { x: randomBetween(0, window.innerWidth), y: randomBetween(0, window.innerHeight) },
        { x: randomBetween(this.vx.min, this.vx.max), y: randomBetween(this.vy.min, this.vy.max), rotation: randomBetween(this.rotation.min, this.rotation.max) },
        randomBetween(this.scale.min, this.scale.max),
        this.maxLife
    ));
  }

  update(deltaTime) {
    if (Math.random() >= this.spawn) {
      this.spawnParticle();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].life >= this.maxLife) {
        this.particles.splice(i, 1);
      }

      this.particles[i].update(deltaTime)
    }
  }

  draw() {
    this.particles.forEach(p => p.draw(this.ctx, this.image))
  }
}

class Particle {
  constructor(pos, vel, scale, maxLife) {
    this.pos = pos;
    this.vel = vel;
    this.scale = scale;
    this.maxLife = maxLife; 
    this.life = 0
    this.alpha = 0;
    this.rotation = 0;
  }

  update(deltaTime) {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    this.rotation += this.vel.rotation * deltaTime;
    this.alpha = Math.sin((this.life * Math.PI) / this.maxLife);
    this.life += deltaTime;
  }

  draw(ctx, image) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  }
}