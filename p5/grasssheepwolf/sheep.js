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
    if (this.age < 10 || this.health < 100) return null;
    if (randNum() < SHEEP_BORN_RATE) {
      const sp = new Sheep(getColNum(this.x + 2), getRowNum(this.y + 2));
      return sp;
      // sheep.push(sp);
    }
    return null;
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
