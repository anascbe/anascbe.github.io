const canvas = document.querySelector(".line-field");
const context = canvas?.getContext("2d");

function drawField() {
  if (!context) return;

  const width = window.innerWidth;
  const height = Math.min(window.innerHeight, 1200);
  const scale = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.height = `${height}px`;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, width, height);

  const center = width / 2;
  const clearance = Math.min(350, width * 0.37);

  for (let line = 0; line < 32; line += 1) {
    context.beginPath();
    context.strokeStyle = `rgba(61, 79, 78, ${line % 5 === 0 ? 0.13 : 0.065})`;
    context.lineWidth = 0.7;

    for (let step = 0; step <= 160; step += 1) {
      const y = (step / 160) * height;
      const progress = y / height;
      const side = line < 16 ? -1 : 1;
      const index = line % 16;
      const wave = Math.sin(progress * 6 + index * 0.16) * 58 + Math.sin(progress * 11 + index * 0.24) * 22;
      const x = center + side * (clearance + 32 + index * 12 + wave * (1 - progress) ** 2);

      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }

    context.stroke();
  }
}

if (context) {
  drawField();
  let resizeFrame;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(drawField);
  });
}
