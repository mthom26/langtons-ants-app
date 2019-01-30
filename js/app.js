import { Universe, Cell, Ant, AntColor, AntFacing } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

import { CELL_SIZE } from './constants';
import drawGrid from './render/drawGrid';
import drawCells from './render/drawCells';
import drawAnts from './render/drawAnts';

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

const canvas = document.getElementById('universeCanvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;
const ctx = canvas.getContext('2d');

const oneTickButton = document.getElementById('oneTickButton');
oneTickButton.addEventListener('click', (event) => {
  universe.tick()
  drawGrid(ctx, width, height);
  drawCells(ctx, universe, memory, width, height);
  drawAnts(ctx, universe);
});

const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', (event) => {
  isPaused() ? play() : pause();
});

let animationId = null;

const renderLoop = () => {
  universe.tick();
  drawGrid(ctx, width, height);
  drawCells(ctx, universe, memory, width, height);
  drawAnts(ctx, universe);
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

playPauseButton.textContent = 'Play';
drawGrid(ctx, width, height);
drawCells(ctx, universe, memory, width, height);
drawAnts(ctx, universe);
