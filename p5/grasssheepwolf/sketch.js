// game of life
const UV_WIDE = 500;
const UV_HIGH = 300; // the size of universe
const FIG_HIGH = 100;
const FIG_RANGE = UV_WIDE;
const UV_OFFSET = 10;

const fgL = UV_OFFSET; // figure area.
const fgT = UV_HIGH + 2 * UV_OFFSET;
const fgB = fgT + FIG_HIGH;
const fgR = fgL + FIG_RANGE;

const GRASS_MAX = 100; // the maximum value of grass in a point.
const GRASS_GROW_RATE = 5; // the higher, the higher chance to graw 100 means 100%
const GRASS_SEED_NUM = 1000;
const GRASS_SEED_RANGE = 5;
const GRASS_SEED_LEVEL = 30;
const DRAW_GRASS_SIZE = 10; // EVERY SQUARE WILL BE 10 * 10 IF IT IS 10
const MID_COLOR = 155;

const MAX_SHEEP_DENSITY = 0.01; // every piexl can have 0.01 sheep
const INIT_SHEEP_NUM = 15; // the initial sheep num
const INIT_SHEEP_GEN = 50; // sheep appear after 50 generation.
const SHEEP_CHANGE_DIR_RATE = 5; // how likely a sheep will change moving direction
const SHEEP_EAT_VOL = 50; // how much grass consumed by a sheep in each year
const SHEEP_BORN_RATE = 5; // 5 equals 5% chance to have a baby if health is good and age is right
const SHEEP_LIFE = 100; // how many years can live
const SHEEP_DIE_RATE = 20; // percentage a sheep will die if health==0
const SHEEP_SPEED = 2; // moving speed.

const MAX_WOLF_DENSITY = 0.0012; // every piexl can have maximum 0.0012 WOLF
const WOLF_HUNGARY = 80; // helth less than it start to find sheep and eat.
const WOLF_HUNGARY_SPEED = 5; // helth reduce for every round without eating
const WOLF_SPEED = 5;
const WOLF_BORN_RATE = 1;
const WOLF_EATEN_DISTANCE = 3; // how far a wolf can eat.
const WOLF_SEARCH_DISTANCE = 50; // how far a wolf can search.
const WOLF_DIE_RATE = 10;
const INIT_WOLF_NUM = 5; // the initial WOLF num
const INIT_WOLF_GEN = 100; // WOLF appear after 100 generation.

const grass = [];
// let sheep = [];
// let wolf = [];
let spF = new SheepFamily();
let wfF = new wolfFamily();
let grassTotal;
let generation;
const history = [];

const randNum = (n = 100) => {
  return Math.floor(random() * n);
};
const getRowNum = (x) => {
  return (x + UV_HIGH) % UV_HIGH;
};
const getColNum = (x) => {
  return (x + UV_WIDE) % UV_WIDE;
};
function setup() {
  createCanvas(UV_WIDE + UV_OFFSET * 2, UV_HIGH + FIG_HIGH + UV_OFFSET * 6);
  initGrass();
  generation = 0;
}
function drawBoard() {
  fill(MID_COLOR);
  rect(10, 10, UV_WIDE, UV_HIGH);
}

function calStat() {
  grassTotal = grass.reduce((ret, r) => r.reduce((res, c) => res + c, ret), 0);
  let pregrass = 0;
  if (history.length > 0) {
    pregrass = history[history.length - 1]["grassTotal"];
  }
  history.push({
    generation,
    grassTotal,
    grassGrow: grassTotal - pregrass,
    sheepNum: spF.getMemberNumber(),
    wolfNum: wfF.getMemberNumber(),
  });
  generation++;
}

function drawInfo() {
  const info = history[history.length - 1];

  push();
  stroke(0);
  text(
    "Years: " +
      info.generation +
      "Grass: " +
      info.grassTotal +
      " Sheep: " +
      info.sheepNum +
      " Wolf: " +
      info.wolfNum,
    fgL,
    fgB + UV_OFFSET * 2 + 4
  );
  pop();
}
function draw() {
  const t0 = Date.now();
  background(220);
  drawBoard();
  drawFig();
  const t01 = Date.now();

  grassGrow();
  const t02 = Date.now();

  drawGrass();

  const t1 = Date.now();
  spF.run();
  // drawSheeps();
  const t2 = Date.now();
  wfF.run();
  // drawWolfs();
  const t3 = Date.now();

  calStat();
  if (generation === INIT_SHEEP_GEN) spF.initFamily(); //initSheep();
  if (generation === INIT_WOLF_GEN) wfF.initFamily(); //initWolf();
  drawInfo();
  const t4 = Date.now();
  // console.log(
  //   "o:",
  //   t01 - t0,
  //   "gg:",
  //   t02 - t01,
  //   "dg:",
  //   t1 - t02,
  //   "s:",
  //   t2 - t1,
  //   "w:",
  //   t3 - t2,
  //   "c:",
  //   t4 - t3
  // );
  // console.log(history[history.length - 1]);
}
