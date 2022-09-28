class Wolf extends Animal {
  constructor(x, y) {
    super(x, y, WOLF_SPEED);
  }
  eat() {
    this.health -= WOLF_HUNGARY_SPEED;
    if (this.health < 0) this.health = 0;
    //    if(this.health>WOLF_HUNGARY) return; // no need to eat
    const sp = sheep.find(
      (sp) =>
        Math.abs(sp.getX() - this.x) <= WOLF_EATEN_DISTANCE &&
        Math.abs(sp.getY() - this.y) <= WOLF_EATEN_DISTANCE
    );
    if (!sp) return; // nothing to eat.
    sp.eaten();
    this.health = 100;
  }
  born() {
    if (this.age < 20 || this.health < WOLF_HUNGARY) return;
    if (randNum() < WOLF_BORN_RATE) {
      const wf = new Wolf(getColNum(this.x + 2), getRowNum(this.y + 2));
      wolf.push(wf);
    }
  }
  die() {
    if (this.health <= 0) {
      if (randNum() < WOLF_DIE_RATE) {
        this.alive = false;
      }
    }
  }
  moveAround() {
    super.moveAround();
    if (this.health < WOLF_HUNGARY) {
      const sp = sheep.find(
        (sp) =>
          Math.abs(sp.getX() - this.x) <= WOLF_SEARCH_DISTANCE &&
          Math.abs(sp.getY() - this.y) <= WOLF_SEARCH_DISTANCE
      );
      if (!sp) return; // find nothing.

      const xdiff = sp.getX() - this.x;
      const ydiff = sp.getY() - this.y;
      if (Math.abs(xdiff) > Math.abs(ydiff)) {
        if (xdiff > 0) this.direction = 0;
        else this.direction = 1;
      } else {
        if (ydiff > 0) this.direction = 2;
        else this.direction = 3;
      }
    }
  }
}
function drawWolfs() {
  wolf = wolf.filter((wf) => wf.isAlive());
  wolf.forEach((wf) => {
    runWolf(wf);
    drawWolf(wf);
  });
}
function drawWolf(wf) {
  push();
  const health = wf.getHealth();
  const x = wf.getX() + UV_OFFSET;
  const y = wf.getY() + UV_OFFSET;
  let mid = 150;
  fill(mid + 100 - health, mid + health - 100, mid + health - 100);
  stroke(0);

  triangle(x - 3, y + 2, x + 3, y + 2, x, y - 4);
  pop();
}

function runWolf(wf) {
  wf.moveAround();
  wf.eat();
  wf.grow();
  if (wolf.length < MAX_WOLF_DENSITY * UV_HIGH * UV_WIDE) wf.born();
  wf.die();
}

const initWolf = () => {
  for (let i = 0; i < INIT_WOLF_NUM; ++i) {
    let wf = new Wolf(randNum(UV_WIDE), randNum(UV_HIGH));
    wolf.push(wf);
  }
};
