class Wolf extends Animal {
  constructor(x, y) {
    super(x, y, WOLF_SPEED);
  }
  eat() {
    this.health -= WOLF_HUNGARY_SPEED;
    if (this.health < 0) this.health = 0;
    //    if(this.health>WOLF_HUNGARY) return; // no need to eat
    const sp = spF
      .getMembers()
      .find(
        (sp) =>
          Math.abs(sp.getX() - this.x) <= WOLF_EATEN_DISTANCE &&
          Math.abs(sp.getY() - this.y) <= WOLF_EATEN_DISTANCE
      );
    if (!sp) return; // nothing to eat.
    sp.eaten();
    this.health = 100;
  }
  born() {
    if (this.age < 20 || this.health < WOLF_HUNGARY) return null;
    if (randNum() < WOLF_BORN_RATE) {
      const wf = new Wolf(getColNum(this.x + 2), getRowNum(this.y + 2));
      return wf;
      // wolf.push(wf);
    }
    return null;
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
      const sp = spF
        .getMembers()
        .find(
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
