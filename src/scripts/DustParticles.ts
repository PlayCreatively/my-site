class Particle {
  pos: { x: number; y: number; z: number };
  size: number;
  vel: { x: number; y: number };
  opacity: number;

  constructor(
    pos = { x: 0, y: 0, z: 1 },
    size = 2,
    vel = { x: 0.02, y: -0.04 }
  ) {
    this.pos = pos;
    this.size = size;
    this.vel = vel;
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
    const edgeCloseness =
      getEdgeCloseness(this.pos.x, width, 10) *
      getEdgeCloseness(this.pos.x, 0, 10) *
      getEdgeCloseness(this.pos.y, height, 10) *
      getEdgeCloseness(this.pos.y, 0, 10);

    this.opacity = edgeCloseness * (1 - this.size / 80) * 0.3;
  }
}

function getEdgeCloseness(val: number, edge: number, length: number): number {
  let perc = Math.abs(val - edge) / length;
  perc = Math.min(perc, 1);
  return perc;
}

const width = window.innerWidth,
  height = window.innerHeight;

function random() {
  return Math.random() - Math.random();
}
function getRandomParticle() {
  return new Particle(
    {
      x: width * Math.random() + 10,
      y: height * Math.random() + 10,
      z: 3 * Math.random() + 1,
    },
    Math.random() * 70 + 10,
    {
      x: random() * 0.1,
      y: random() * 0.1,
    }
  );
}

let particles: Particle[] = new Array(100);
for (let i = 0; i < particles.length; i++) {
  particles[i] = getRandomParticle();
}

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#FF8C00";

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();

    ctx.globalAlpha = particles[i].opacity;
    // ctx.filter = `blur(${particles[i].pos.z}px)`;
    const count = (4 * particles[i].size) / 80 + 1;
    for (let o = 0; o < count; o++) {
      ctx.beginPath();

      //TODO: draw gradiant circle http://jsfiddle.net/r8Kqy/48/
      ctx.arc(
        particles[i].pos.x,
        particles[i].pos.y,
        particles[i].size * (o / count),
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.fill();
    }
  }
};
export { Particle, draw };
