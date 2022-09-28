function drawGrass() {
  const row = UV_HIGH / DRAW_GRASS_SIZE;
  const col = UV_WIDE / DRAW_GRASS_SIZE;
  push();
  noStroke();
  for (let r = 0; r < row; ++r) {
    for (c = 0; c < col; ++c) {
      let gt = 0;
      for (let x = c * DRAW_GRASS_SIZE; x < (c + 1) * DRAW_GRASS_SIZE; ++x) {
        for (let y = r * DRAW_GRASS_SIZE; y < (r + 1) * DRAW_GRASS_SIZE; ++y) {
          gt += grass[y][x];
        }
      }
      gt = Math.floor(gt / (DRAW_GRASS_SIZE * DRAW_GRASS_SIZE));
      fill(MID_COLOR - gt, MID_COLOR + gt, MID_COLOR - gt);
      square(
        UV_OFFSET + c * DRAW_GRASS_SIZE,
        UV_OFFSET + r * DRAW_GRASS_SIZE,
        DRAW_GRASS_SIZE
      );
    }
  }
  pop();
}
function grassGrow() {
  for (let x = 0; x < UV_WIDE; ++x) {
    for (let y = 0; y < UV_HIGH; ++y) {
      if (grass[y][x] > 0 && randNum() < GRASS_GROW_RATE) {
        grass[y][getColNum(x + 1)]++;
        grass[y][getColNum(x - 1)]++;
        grass[getRowNum(y + 1)][x]++;
        grass[getRowNum(y - 1)][x]++;
      }
      if (grass[y][x] > GRASS_MAX) grass[y][x] = GRASS_MAX;
    }
  }
}
const initGrass = () => {
  for (let i = 0; i < UV_HIGH; ++i) {
    grass.push(new Array(UV_WIDE));
  }

  for (let x = 0; x < UV_WIDE; ++x) {
    for (let y = 0; y < UV_HIGH; ++y) {
      grass[y][x] = 0;
    }
  }

  for (let i = 0; i < GRASS_SEED_NUM; ++i) {
    grassSeed(
      randNum(UV_WIDE),
      randNum(UV_HIGH),
      GRASS_SEED_RANGE,
      GRASS_SEED_LEVEL
    );
  }
};
const grassSeed = (x, y, r, l) => {
  // x, y position, r: range, l: level
  for (let i = x - r; i < x + r; ++i) {
    for (let j = y - r; j < y + r; ++j) {
      grass[getRowNum(j)][getColNum(i)] =
        grass[getRowNum(j)][getColNum(i)] +
          Math.round(0.5 * l + (random() * l) / 2) ||
        Math.round(0.5 * l + (random() * l) / 2);
      if (grass[getRowNum(j)][getColNum(i)] > GRASS_MAX)
        grass[getRowNum(j)][getColNum(i)] = GRASS_MAX;
    }
  }
};
