import { Universe, Cell, Ant, AntColor, AntFacing } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

const universe = Universe.new();
const width = universe.get_width();
const height = universe.get_height();

const getAnts = () => {
  // Currently each ant is 12 bytes long in memory
  // 4 bytes for u32 current_row
  // 4 bytes for u32 current_col
  // 1 bytes for AntColor u8 enum
  // 1 bytes for AntFacing u8 enum
  // 2 bytes extra always 0. Don't know what they are...
  const numAnts = universe.get_number_ants();
  const antSize = 12; 
  
  const antsPtr = universe.get_ants();
  const ants = new Uint8Array(memory.buffer, antsPtr, numAnts * antSize);
  console.log(ants);
}

const CELL_SIZE = 5;
const GRID_COLOR = '#454545';
const GREEN_COLOR = '#54c365';
const BLACK_COLOR = '#111111';
const PURPLE_COLOR = '#d174b8';

const canvas = document.getElementById('universeCanvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
const ctx = canvas.getContext('2d');

const oneTickButton = document.getElementById('oneTickButton');
oneTickButton.addEventListener('click', (event) => {
  universe.tick()
  drawGrid();
  drawCells();
  drawAnts();
});

const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', (event) => {
  isPaused() ? play() : pause();
});

let animationId = null;

const renderLoop = () => {
  universe.tick();
  drawGrid();
  drawCells();
  drawAnts();
  animationId = requestAnimationFrame(renderLoop);
};

const play = () => {
  playPauseButton.textContent = 'Pause';
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = 'Play';
  cancelAnimationFrame(animationId);
  animationId = null;
};

const isPaused = () => {
  return animationId === null;
};

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

// Convert a (row, column) pair into an index to retrieve required Cell
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

// Draw Ants
// TODO Check for Ant Color and render appropriate color
const drawAnts = () => {
  // get_ant_positions() returns an array with an even number of items, each
  // pair corresponds to an ant - [ant1_row, ant1_col, ant2_row, ant2_col, ...]
  const antPositions = universe.get_ant_positions();

  ctx.beginPath();
  ctx.fillStyle = PURPLE_COLOR;
  for(let i = 0; i < antPositions.length; i+=2) {
    ctx.fillRect(
      antPositions[i+1] * (CELL_SIZE + 1) + 1,
      antPositions[i] * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  ctx.stroke();
}

playPauseButton.textContent = 'Play';
drawGrid();
drawCells();
drawAnts();
