function getFigY(v, t) {
  const fgT = UV_HIGH + 2 * UV_OFFSET;
  const fgB = fgT + FIG_HIGH;
  return lerp(fgB, fgT, v / t);
}
function drawFig() {
  if (history.length < 3) return;
  let start, end;
  if (generation > FIG_RANGE) {
    start = generation - FIG_RANGE;
    end = generation;
  } else {
    start = 0;
    end = generation;
  }

  const drawCurve = (nm, st, end, Top, col) => {
    stroke(col[0], col[1], col[2]);
    let s = history[st][nm];
    let y0 = getFigY(s, Top);
    let x0 = fgL;
    for (let i = st + 1; i < end - 1; ++i) {
      const y1 = getFigY(history[i][nm], Top);
      line(x0, y0, x0 + 1, y1);
      x0++;
      y0 = y1;
    }
  };
  const [gM, sM, wM] = history.reduce(
    (ret, cur, idx) => {
      if (idx < start) return ret;
      if (cur.grassTotal > ret[0]) ret[0] = cur.grassTotal;
      if (cur.sheepNum > ret[1]) ret[1] = cur.sheepNum;
      if (cur.wolfNum > ret[2]) ret[2] = cur.wolfNum;
      return ret;
    },
    [0, 0, 0]
  );

  const gT = getFigTop(gM);
  const sT = getFigTop(sM);
  const wT = getFigTop(wM);

  push();
  stroke(0);
  text("Grass", fgL, fgB + UV_OFFSET + 2);
  text("Sheep/Wolf", fgR - 70, fgB + UV_OFFSET + 2);
  text("" + gT, fgL + 2, fgT + 5);
  const str = "" + sT + "/" + wT;
  text(str, fgR - str.length * 8, fgT + 5);
  line(fgL, fgT, fgL, fgB);
  line(fgL, fgB, fgR, fgB);
  line(fgR, fgT, fgR, fgB);
  drawCurve("grassTotal", start, end, gT, [0, 200, 0]);
  drawCurve("sheepNum", start, end, sT, [255, 255, 255]);
  drawCurve("wolfNum", start, end, wT, [128, 0, 0]);
  pop();
}
function getFigTop(n) {
  let div = 1;
  let test = n;
  while (test > 10) {
    div *= 10;
    test /= 10;
  }
  return (Math.floor(n / div) + 1) * div;
}
