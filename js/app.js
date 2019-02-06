// import { Universe, Cell, Ant, AntColor, AntFacing } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

import Universe from './universe/universe';
import { CELL_SIZE, incrementCellSize, decrementCellSize } from './config';
import FpsCounter from './fps/fpsCounter';
import { zoomIn, zoomOut } from './display/zoom';

const universe = new Universe();
const fpsCounter = new FpsCounter();

let showFps = false;

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
canvas.height = (CELL_SIZE + 1) * universe.getHeight() + 1;
canvas.width = (CELL_SIZE + 1) * universe.getWidth() + 1;
const ctx = canvas.getContext('2d');

const oneTickButton = document.getElementById('oneTickButton');
oneTickButton.addEventListener('click', (event) => {
  universe.tick();
  universe.render(ctx);
});

const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', (event) => {
  isPaused() ? play() : pause();
});

const fpsToggleButton = document.getElementById('fpsToggleButton');
fpsToggleButton.addEventListener('click', (event) => {
  toggleFpsCounter();
});

const zoomInButton = document.getElementById('zoomInButton');
zoomInButton.addEventListener('click', (event) => {
  zoomIn(currentZoom, canvas, universe);
  universe.render(ctx);
});
const zoomOutButton = document.getElementById('zoomOutButton');
zoomOutButton.addEventListener('click', (event) => {
  zoomOut(currentZoom, canvas, universe);
  universe.render(ctx);
});
const currentZoom = document.getElementById('currentZoom');
currentZoom.textContent = `x${CELL_SIZE}`;

let animationId = null;

const renderLoop = () => {
  universe.tick();
  universe.render(ctx);
  showFps && fpsCounter.render();
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

const toggleFpsCounter = () => {
  console.log('fps toggle');
  if(showFps) {
    showFps = false;
    document.getElementById('fpsCounter').classList.add('hidden');
  } else {
    showFps = true;
    document.getElementById('fpsCounter').classList.remove('hidden');
  }
};

playPauseButton.textContent = 'Play';
universe.render(ctx);
