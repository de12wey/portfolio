import { getCssVar, randomBetween } from "./utils";

class ParticleSystem {
	constructor(ctx) {
		this.ctx = ctx;
		this.particles = [];

		this.vx = { min: -45, max: 45 };
		this.vy = { min: -45, max: 45 };
		this.scale = { min: 3, max: 4 };
		this.maxLife = .5;

		this.lastTime = 0;
		this.delay = 10; 

		this.lastX = null;
		this.lastY = null;

		window.addEventListener('mousemove', (e) => this.spawnOnMovement(e));
		window.addEventListener('touchmove', (e) => this.spawnOnMovement(e));
		window.addEventListener('touchstart', (e) => { this.lastX = null; this.lastY = null; });
	}


	spawnOnMovement(event) {
		const now = performance.now();
		if (now - this.lastTime < this.delay) return;
		this.lastTime = now;

		const e = event.touches ? event.touches[0] : event;
		const x = e.pageX;
		const y = e.pageY;

		if (this.lastX !== null && this.lastY !== null) {
			const dx = x - this.lastX;
			const dy = y - this.lastY;
			const distance = Math.hypot(dx, dy);
			const steps = Math.max(1, Math.floor(distance / 10));

			for (let i = 0; i < steps; i++) {
				const t = i / steps;
				const px = this.lastX + dx * t;
				const py = this.lastY + dy * t;
			 	this.spawnParticle(px, py);
			}
		}

		this.lastX = x;
		this.lastY = y;
	}

	spawnParticle(x, y) {
		this.particles.push(new Particle(
			{ x: x, y: y },
			{ x: randomBetween(this.vx.min, this.vx.max), y: randomBetween(this.vy.min, this.vy.max) },
			randomBetween(this.scale.min, this.scale.max),
			this.maxLife,
		));
	}

	update(deltaTime) {
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
		this.rotation = 90;
		this.sides = 4;
		this.outlined = true;
		this.color = getCssVar('--txt-color');
	}

	update(deltaTime) {
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;
		this.alpha = Math.min(Math.sin((this.life * Math.PI) / this.maxLife), .85);
		this.scale = Math.sin((this.life * Math.PI) / this.maxLife) * this.maxScale;
		this.life += deltaTime;
	}

	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		drawPolygon(ctx, this.pos.x, this.pos.y, this.scale, this.sides, this.rotation, this.color);
		ctx.restore();
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

	function resetMouseTracking() {
		particleSystem.lastX = null;
		particleSystem.lastY = null;
	}
	
	window.addEventListener("mouseout", (event) => {
		if (!event.relatedTarget && !event.toElement) resetMouseTracking();
	});

	window.addEventListener("contextmenu", resetMouseTracking);

	document.addEventListener("visibilitychange", () => {
		if (document.hidden) resetMouseTracking();
	});

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