import { getCssVar, randomBetween } from "./utils";

class ParticleSystem {
	constructor(ctx) {
		this.ctx = ctx;
		this.particles = [];

		this.vx = { min: -45, max: 45 };
		this.vy = { min: -45, max: 45 };
		this.scale = { min: 3, max: 4 };
		this.rotation = { min: -.2, max: .2 };
		this.maxLife = .3;

		this.lastTime = 0;
		this.delay = 10; 

		window.addEventListener('mousedown', (e) => this.spawnOnMovement(e));
		window.addEventListener('mousemove', (e) => this.spawnOnMovement(e));
		window.addEventListener('touchmove', (e) => this.spawnOnMovement(e));
	}

	spawnOnMovement(event) {
		const now = performance.now();
		if (now - this.lastTime < this.delay) return;
		this.lastTime = now;

		const e = event.touches ? event.touches[0] : event;
		const x = e.pageX;
		const y = e.pageY;
		for (let i = 0; i < 4; i++) this.spawnParticle(x, y, .3);
	}

	spawnParticle(x, y, maxLife) {
		this.particles.push(new Particle(
			{ x: x, y: y },
			{ x: randomBetween(this.vx.min, this.vx.max), y: randomBetween(this.vy.min, this.vy.max), rotation: randomBetween(this.rotation.min, this.rotation.max) },
			randomBetween(this.scale.min, this.scale.max),
			maxLife,
		));
	}

	update(deltaTime) {
		// if (Math.random() > .97) {
		// 	this.spawnParticle(randomBetween(0, window.innerWidth), randomBetween(0, window.innerHeight), 1.2)
		// }

		for (let i = this.particles.length - 1; i >= 0; i--) {
			if (this.particles[i].life >= this.particles[i].maxLife) {
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
	constructor(pos, vel, maxScale, maxLife) {
		this.pos = pos;
		this.vel = vel;
		this.maxScale = maxScale;
		this.maxLife = maxLife;
		this.life = 0
		this.alpha = 0;
		this.rotation = 0;
		this.sides = Math.round(randomBetween(3, 6));
		this.outlined = Math.random() < .5;

		this.color1 = getCssVar('--txt-color');
		this.color2 = getCssVar('--bg-color');
	}

	update(deltaTime) {
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;
		this.rotation += this.vel.rotation * deltaTime;
		this.alpha = Math.sin((this.life * Math.PI) / this.maxLife);
		this.scale = Math.sin((this.life * Math.PI) / this.maxLife) * this.maxScale;
		this.life += deltaTime;
	}

	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		drawPolygon(ctx, this.pos.x, this.pos.y, this.scale, this.sides, this.rotation, 
			this.outlined ? this.color1 : this.color2,
			this.outlined ? null : this.color1);
		ctx.restore();
		// if (this.outlined) drawPolygon(ctx, this.pos.x, this.pos.y, this.scale - 2, this.sides, this.rotation, getCssVar('--bg-color'));
	}
}

function drawPolygon(ctx, x, y, radius, sides, rotation = 0, fillStyle = 'black', strokeStyle = null) {
	if (sides < 3) return;

	const angleStep = (2 * Math.PI) / sides;

	ctx.beginPath();
	for (let i = 0; i < sides; i++) {
		const angle = i * angleStep + rotation;
		const px = x + radius * Math.cos(angle);
		const py = y + radius * Math.sin(angle);
		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
	if (strokeStyle) {
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function resizeCanvasToDisplaySize(canvas) {
	const dpr = window.devicePixelRatio || 1;
	const width = window.innerWidth;
	const height = window.innerHeight;

	canvas.width = width * dpr;
	canvas.height = height * dpr;

	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';

	const ctx = canvas.getContext('2d');
	ctx.scale(dpr, dpr);
}

export function setupParticles() {
	const canvas = document.getElementById('bg');
	const ctx = canvas.getContext('2d');

	resizeCanvasToDisplaySize(canvas);
	window.addEventListener('resize', () => {
		resizeCanvasToDisplaySize(canvas);
	});

	const particleSystem = new ParticleSystem(ctx);

	let last = performance.now();
	function animate(now) {
		const deltaTime = (now - last) / 1000;
		last = now;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particleSystem.update(deltaTime);
		particleSystem.draw();
		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
}