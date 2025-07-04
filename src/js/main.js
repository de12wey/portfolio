import { ParticleSystem } from "./parsystem";

window.addEventListener('load', async () => {
    document.getElementById('dark-toggle').addEventListener('click', toggleDarkMode);

    setUpParticles();
});

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

function setUpParticles() {
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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


