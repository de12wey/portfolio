import { ParticleSystem } from "./parsystem";

window.addEventListener('load', async () => {
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particleImage = await loadImage('/assets/img/particle.png');
    const particleSystem = new ParticleSystem(ctx, particleImage);

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
});
