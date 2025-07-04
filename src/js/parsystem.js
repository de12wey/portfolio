export class ParticleSystem {
  constructor(ctx) {
    this.ctx = ctx;
    this.particles = [];
    
    this.vx = { min: -100, max: 100 };
    this.vy = { min: -100, max: 100 };
    this.scale = { min: .1, max: .8 };
    this.rotation = { min: -.2, max: .2 };
    this.maxLife = .3;
    this.spawn = .97;

    window.addEventListener('mousemove', (event) => {
      const x = event.pageX;
      const y = event.pageY;
      this.spawnParticle(x, y)
    })
  }

  spawnParticle(x, y) {
    this.particles.push(new Particle(
        // { x: randomBetween(0, window.innerWidth), y: randomBetween(0, window.innerHeight) },
        { x: x, y: y },
        { x: randomBetween(this.vx.min, this.vx.max), y: randomBetween(this.vy.min, this.vy.max), rotation: randomBetween(this.rotation.min, this.rotation.max) },
        randomBetween(this.scale.min, this.scale.max),
        this.maxLife,
    ));
  }

  update(deltaTime) {
    // if (Math.random() >= this.spawn && this.particles.length < 8) {
    //   this.spawnParticle();
    // }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].life >= this.maxLife) {
        this.particles.splice(i, 1);
      }
      else {
        this.particles[i].update(deltaTime)
      }
    }
  }

  draw() {
    this.particles.forEach(p => p.draw(this.ctx))
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
    this.sides = Math.round(randomBetween(3, 6));
    this.a = Math.random() > .5;
  }

  update(deltaTime) {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    this.rotation += this.vel.rotation * deltaTime;
    this.alpha = Math.sin((this.life * Math.PI) / this.maxLife);
    this.life += deltaTime;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    drawPolygon(ctx, this.pos.x, this.pos.y, 8 * this.scale, this.sides, this.rotation, getCssVar('--txt-color'));
    ctx.restore();
    // if (this.a) drawPolygon(ctx, this.pos.x, this.pos.y, 8 * this.scale - 2, this.sides, this.rotation, getCssVar('--bg-color'));
  }

  changeParticleColor(rgb) {

  }
}