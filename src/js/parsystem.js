const parsystem = {
    vx: { min: .5, max: .8 },
    vy: { min: -.5, max: -.8 },
    scale: { min: .5, max: .8 },
    life: 5000,
    spawn: .85,
    texture: '../../assets/img/particle.png',
    particles: [],
};

function newParticle() {
    return {
        pos: { x: randomBetween(0, window.innerWidth), y: randomBetween(0, window.innerHeight) },
        vel: { x: randomBetween(parsystem.vx.min, parsystem.vx.max), y: randomBetween(parsystem.vy.min, parsystem.vy.max) },
        scale: randomBetween( parsystem.scale.min, parsystem.scale.max ),
        life: parsystem.life,

        update() {

        }
    };
}

let lastTimestamp = null;

export function animate(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  
  const elapsed = timestamp - lastTimestamp;
  lastTimestamp = timestamp;
  
  if (Math.random() >= parsystem.spawn) {
    parsystem.particles.push(newParticle());
  }

  requestAnimationFrame(animate);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}