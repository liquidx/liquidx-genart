import _ from "lodash";

const _onePolyCircle = (s, context, cell, seq, contextTransform) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  let widthTransform = cellContext.cellWidthTransform || 0;
  let heightTransform = cellContext.cellHeightTransform || 0;
  let widthScale = cellContext.scaleWidth || 1;
  let heightScale = cellContext.scaleHeight || 1;

  s.noStroke();
  s.push();
  s.translate(cell.x + cell.w / 2, cell.y + cell.h / 2);
  s.fill(cellContext.foreground);
  s.ellipse(
    0,
    0,
    cell.w * widthScale + widthTransform,
    cell.h * heightScale + heightTransform
  );
  s.pop();
};

const _onePolySquare = (s, context, cell, seq, contextTransform) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  let squareWidth = cell.w;
  if (typeof cellContext.cellWidth !== "undefined") {
    squareWidth = cellContext.cellWidth;
  }

  s.noStroke();
  s.push();
  s.translate(cell.x + cell.w / 2, cell.y + cell.h / 2);
  s.fill(cellContext.foreground);

  s.square(0, 0, squareWidth, cellContext.corner);
  s.pop();
};

const _onePolyTriangleSimple = (s, context, cell, seq, contextTransform) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  let shiftX = (cellContext.cellVaryX || 0) + cellContext.timeShiftX;
  let shiftY = (cellContext.cellVaryY || 0) + cellContext.timeShiftY;

  s.push();
  s.translate(cell.x, cell.y);
  if (cellContext.stroke) {
    s.strokeWeight(2);
    s.stroke(cellContext.foreground);
    s.noFill();
  } else {
    s.fill(cellContext.foreground);
    s.noStroke();
  }
  if (cellContext.triangleType == "tl-tr-bl") {
    s.triangle(
      seq.x * shiftX,
      cellContext.cellInset,
      cell.w - cellContext.cellInset,
      seq.y * shiftY,
      seq.y * shiftY,
      cell.h - cellContext.cellInset
    );
  } else if (cellContext.triangleType == "tm-br-bl") {
    s.triangle(
      cell.w / 2,
      (seq.x * shiftX) % (cell.h - cellContext.cellInset),
      cell.w - cellContext.cellInset,
      cell.h - ((seq.y * shiftY) % (cell.h - cellContext.cellInset)),
      cellContext.cellInset,
      cell.h - ((seq.x * shiftX) % (cell.h - cellContext.cellInset))
    );
  }
  s.pop();
};

const _onePolyTriangleEqualiteral = (
  s,
  context,
  cell,
  seq,
  contextTransform
) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  s.push();
  s.translate(cell.x + cell.w / 2, cell.y + cell.h / 2);
  s.rotate(s.TWO_PI * cellContext.t);
  s.rotate(s.TWO_PI * cellContext.cellVaryX * seq.percentX);
  s.rotate(s.TWO_PI * cellContext.cellVaryY * seq.percentY);

  if (cellContext.stroke) {
    s.strokeWeight(2);
    s.stroke(cellContext.foreground);
    s.noFill();
  } else {
    s.fill(cellContext.foreground);
    s.noStroke();
  }

  s.beginShape();
  let radius = Math.min(cell.w / 2, cell.h / 2) - cellContext.cellInset;
  let ax = 0;
  let ay = -radius;
  let bx = ax * s.cos(s.TWO_PI / 3) - ay * s.sin(s.TWO_PI / 3);
  let by = ax * s.sin(s.TWO_PI / 3) + ay * s.cos(s.TWO_PI / 3);
  let cx = ax * s.cos((s.TWO_PI * 2) / 3) - ay * s.sin((s.TWO_PI * 2) / 3);
  let cy = ax * s.sin((s.TWO_PI * 2) / 3) + ay * s.cos((s.TWO_PI * 2) / 3);
  s.vertex(ax, ay);
  s.vertex(bx, by);
  s.vertex(cx, cy);
  s.endShape(s.CLOSE);

  s.pop();
};

const _onePolyParallelogram = (s, context, cell, seq, contextTransform) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  let shiftX = cellContext.shiftX || 0;
  let shiftY = cellContext.shiftY || 0;
  let widthMultiplier = cellContext.widthMultiplier || 1;

  s.push();
  s.translate(cell.x, cell.y);
  if (cellContext.stroke) {
    s.strokeWeight(2);
    s.stroke(cellContext.foreground);
    s.noFill();
  } else {
    s.fill(cellContext.foreground);
    s.noStroke();
  }

  let drawableWidth = cell.w - 2 * cellContext.cellInset;
  let drawableHeight = cell.h - 2 * cellContext.cellInset;
  let paraWidth = (drawableWidth / 3) * widthMultiplier;

  s.quad(
    cellContext.cellInset + shiftY + shiftX,
    cellContext.cellInset,
    cellContext.cellInset + paraWidth + shiftY + shiftX,
    cellContext.cellInset,
    cell.w - cellContext.cellInset - shiftY - shiftX,
    cellContext.cellInset + drawableHeight,
    cell.w - cellContext.cellInset - paraWidth - shiftY - shiftX,
    cellContext.cellInset + drawableHeight
  );
  s.pop();
};

const _onePolyConcentricCircle = (s, context, cell, seq, contextTransform) => {
  let cellContext = context;
  if (contextTransform) {
    cellContext = contextTransform(_.clone(cellContext), cell, seq);
  }

  let strokeCount = cellContext.strokeCount || 1;
  let circleRadius = cellContext.circleRadius || Math.min(cell.w, cell.h);

  s.push();
  s.translate(cell.x, cell.y);

  let ringRadiusIncrement = circleRadius / strokeCount / 2;
  let strokeWidth = circleRadius / strokeCount / 2;

  if (cellContext.stroke) {
    s.strokeWeight(strokeWidth);
    s.stroke(cellContext.foreground);
    s.noFill();
  } else {
    s.fill(cellContext.foreground);
    s.noStroke();
  }

  let radiusShift = 0;
  if (cellContext.animate) {
    radiusShift = (s.sin(s.TWO_PI * cellContext.t) + 1) * -ringRadiusIncrement;
  }

  for (let i = 1; i <= strokeCount; i++) {
    // Strokes are outer strokes, to make circles appear the same size, subtract
    // the stroke width from the radius to use.
    s.circle(
      cell.w / 2,
      cell.w / 2,
      radiusShift + ringRadiusIncrement * (i * 4) - strokeWidth
    );
  }
  s.pop();
};

export { _onePolyCircle as onePolyCircle };
export { _onePolySquare as onePolySquare };
export { _onePolyTriangleSimple as onePolyTriangleSimple };
export { _onePolyTriangleEqualiteral as onePolyTriangleEqualiteral };
export { _onePolyParallelogram as onePolyParallelogram };
export { _onePolyConcentricCircle as onePolyConcentricCircle };
