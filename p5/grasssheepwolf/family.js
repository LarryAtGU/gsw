class Family {
  constructor(dst) {
    this.members = [];
    this.maxnum = dst * UV_HIGH * UV_WIDE;
  }
  run() {
    this.members = this.members.filter((mb) => mb.isAlive());
    let canBorn = false;
    let newBorn = [];
    if (this.members.length < this.maxnum) {
      canBorn = true;
    }

    this.members.forEach((mb) => {
      mb.moveAround();
      mb.eat();
      mb.grow();
      if (canBorn) {
        let newMem = mb.born();
        if (newMem != null) {
          newBorn.push(newMem);
        }
      }
      mb.die();
      this.drawMember(mb);
    });
    if (newBorn.length > 0) this.members = this.members.concat(newBorn);
  }
  getMemberNumber() {
    return this.members.length;
  }
  getMembers() {
    return this.members;
  }
}

class SheepFamily extends Family {
  constructor() {
    super(MAX_SHEEP_DENSITY);
  }
  drawMember(sp) {
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
  initFamily() {
    for (let i = 0; i < INIT_SHEEP_NUM; ++i) {
      let sp = new Sheep(randNum(UV_WIDE), randNum(UV_HIGH));
      this.members.push(sp);
    }
  }
}

class wolfFamily extends Family {
  constructor() {
    super(MAX_SHEEP_DENSITY);
  }
  drawMember(wf) {
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
  initFamily() {
    for (let i = 0; i < INIT_WOLF_NUM; ++i) {
      let wf = new Wolf(randNum(UV_WIDE), randNum(UV_HIGH));
      this.members.push(wf);
    }
  }
}
