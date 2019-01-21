var debug = true;

function create2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function drawCoordinates(ctx) {
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "chartreuse";
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 100);
  ctx.stroke();

  ctx.restore();
}

function getDistance(obj1, obj2) {
  return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
}

function cellColor(type, generationsDead = 0) {
  let alpha = 1 - generationsDead / 5;
  switch (type) {
    case "black hole":
      return `rgba(255, 255, 255, ${alpha})`;
    case "health":
      return `rgba(255, 255, 0, ${alpha})`;
    case "damage":
      return `rgba(255, 0, 0, ${alpha})`;

    default:
      return `rgba(0, 255, 0, ${alpha})`;
  }
}
