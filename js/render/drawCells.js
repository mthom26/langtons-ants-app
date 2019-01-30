import { Cell } from '../../crate/pkg';

import { GREEN_COLOR, BLACK_COLOR, CELL_SIZE } from '../constants';

const drawCells = (ctx, universe, memory, width, height) => {
  // Convert a (row, column) pair into an index to retrieve required Cell
  const getIndex = (row, column) => {
    return row * width + column;
  };

  const cellsPtr = universe.get_cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
  
  ctx.beginPath();

  // Green cells.
  ctx.fillStyle = GREEN_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (cells[idx] !== Cell.Green) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
  // Black cells.
  ctx.fillStyle = BLACK_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);
      if (cells[idx] !== Cell.Black) {
        continue;
      }

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

export default drawCells;