class Animal {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.health = 100;
    this.direction = randNum(4);
    this.alive = true;
    this.speed = s;
  }
  isAlive() {
    return this.alive;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getHealth() {
    return this.health;
  }
  getAge() {
    return this.age;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  grow() {
    this.age++;
  }

  moveAround() {
    switch (this.direction) {
      case 0:
        this.x = getColNum(this.x + this.speed);
        break;
      case 1:
        this.x = getColNum(this.x - this.speed);
        break;
      case 2:
        this.y = getRowNum(this.y + this.speed);
        break;
      case 3:
        this.y = getRowNum(this.y - this.speed);
        break;
    }
  }
}
