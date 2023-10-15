/* eslint-disable no-unused-vars */

const _squareGridTranasform = (context, seqX, seqY, percentX, percentY) => {
}

const _squareGridDraw = (s, context, cell, seq, contextTransform) => {
}

const _squareGrid = (s, context, originX, originY, width, height, countX, countY, drawCell, contextTransform) => {
  let cellWidth = width / countX
  let cellHeight = height / countY

  for (let x = 0; x < countX; x++) {
    for (let y = 0; y < countY; y++) {
      let cell = {
        x: originX + x * cellWidth,
        y: originY + y * cellHeight,
        w: cellWidth,
        h: cellHeight
      }
      let seq = {
        x: x,
        y: y,
        percentX: x / countX,
        percentY: y / countY
      }
      drawCell(s, context, cell, seq, contextTransform)
    }
  }
}

const _squareGridLines = (s, context, originX, originY, width, height, countX, countY, gridColor) => {
  let cellWidth = width / countX
  let cellHeight = height / countY
  s.stroke(gridColor)
  s.strokeWeight(1)
  for (let x = 1; x < countX; x++) {
    s.line(
      x * cellWidth + originX, 
      originY, 
      x * cellWidth + originX, 
      originY + height)
  }
  for (let y = 1; y < countY; y++) {
    s.line(
      originX, 
      y * cellHeight + originY, 
      originX + width, 
      y * cellHeight + originY)
  }    
}

export { _squareGrid as squareGrid }
export { _squareGridLines as squareGridLines }
