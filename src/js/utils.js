function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function drawPolygon(ctx, x, y, radius, sides, rotation = 0, fillStyle = 'black', strokeStyle = null) {
  if (sides < 3) return; // mínimo triángulo

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

function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}