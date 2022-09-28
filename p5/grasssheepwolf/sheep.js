class Sheep extends Animal {
  constructor(x, y) {
    super(x, y, SHEEP_SPEED);
  }
  eat() {
    const x = this.x;
    const y = this.y;
    const searchArea = [
      [getColNum(x + 1), y],
      [getColNum(x - 1), y],
      [x, getRowNum(y + 1)],
      [x, getRowNum(y - 1)],
      [x, y],
    ];
    let needfood = SHEEP_EAT_VOL;
    while (needfood > 0 && searchArea.length > 0) {
      const [xx, yy] = searchArea.pop();
      let food = grass[yy][xx];
      if (food > needfood) {
        food -= needfood;
        needfood = 0;
      } else {
        needfood -= food;
        food = 0;
      }
      grass[yy][xx] = food;
    }
    if (needfood > 0) {
      this.health -= needfood / 5;
      if (this.health < 0) this.health = 0;
    } else {
      this.health += 10;
      if (this.health > 100) this.health = 100;
    }
  }
  eaten() {
    this.alive = false;
  }

  born() {
    if (this.age < 10 || this.health < 100) return;
    if (randNum() < SHEEP_BORN_RATE) {
      const sp = new Sheep(getColNum(this.x + 2), getRowNum(this.y + 2));
      sheep.push(sp);
    }
  }
  die() {
    if (this.age > SHEEP_LIFE || this.healty == 0) {
      if (randNum() < SHEEP_DIE_RATE) this.alive = false;
    }
  }
  moveAround() {
    super.moveAround();
    if (randNum() < SHEEP_CHANGE_DIR_RATE) this.direction = randNum(4);
  }
}

function drawSheeps() {
  sheep = sheep.filter((sp) => sp.isAlive());
  sheep.forEach((sp) => {
    runSheep(sp);
    drawSheep(sp);
  });
}
function runSheep(sp) {
  sp.moveAround();
  sp.eat();
  sp.grow();
  if (sheep.length < MAX_SHEEP_DENSITY * UV_HIGH * UV_WIDE)
    // not no many sheep
    sp.born();
  sp.die();
}
function drawSheep(sp) {
  push();
  const age = sp.getAge();
  let d = 2;
  if (age > 5) d = 3;
  if (age > 10) d = 4;
  if (age > 20) d = 5;
  if (age > 30) d = 6;
  const health = sp.getHealth();
  let c = 55 + health * 2;
  fill(c);
  stroke(0);
  circle(sp.getX() + UV_OFFSET, sp.getY() + UV_OFFSET, d);
  pop();
}
const initSheep = () => {
  for (let i = 0; i < INIT_SHEEP_NUM; ++i) {
    let sp = new Sheep(randNum(UV_WIDE), randNum(UV_HIGH));
    sheep.push(sp);
  }
};
