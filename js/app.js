import { Universe, Cell } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

const universe = Universe.new();
const width = universe.get_width();
const height = universe.get_height();

const CELL_SIZE = 5;
const GRID_COLOR = '#454545';
const GREEN_COLOR = '#54c365';
const BLACK_COLOR = '#111111';

const canvas = document.getElementById('universeCanvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
const ctx = canvas.getContext('2d');

// Draw Grid
const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }
}

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
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
}

drawGrid();
drawCells();
