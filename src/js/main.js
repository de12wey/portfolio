import { ParticleSystem } from "./parsystem";

window.addEventListener('load', async () => {
    const particleImage = await loadImage('../../assets/img/particle.png');
    const particleSystem = new ParticleSystem(particleImage);

    let lastTimestamp = null;
    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        particleSystem.update(elapsed);
        particleSystem.draw();
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
