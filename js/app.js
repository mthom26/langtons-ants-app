import { AntColor, AntFacing } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

import Universe from './universe/universe';
import { CELL_SIZE, incrementCellSize, decrementCellSize } from './config';
import FpsCounter from './fps/fpsCounter';
import { zoomIn, zoomOut } from './display/zoom';

const universe = new Universe(128, 128);
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

canvas.addEventListener('click', (event) => {
  pause();
  const boundingRect = canvas.getBoundingClientRect();
  
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), universe.height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), universe.width - 1);

  // Interact with universe here
  // TODO Add option to change AntColor and AntFacing
  universe.addAnt(row, col, antColor, antFacing);
  universe.render(ctx);
});

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

const ticksPerRenderSelect = document.getElementById('ticksPerRenderSelect');
ticksPerRenderSelect.addEventListener('change', (event) => {
  ticksPerRender = Number(event.target.value);
});

const antColorSelect = document.getElementById('antColorSelect');
antColorSelect.addEventListener('change', (event) => {
  switch (event.target.value) {
    case 'purple': antColor = AntColor.Purple; break;
    case 'yellow': antColor = AntColor.Yellow; break;
    default: console.log('Selected ant color is not valid.')
  }
});

const antFacingSelect = document.getElementById('antFacingSelect');
antFacingSelect.addEventListener('change', (event) => {
  switch (event.target.value) {
    case 'up': antFacing = AntFacing.Up; break;
    case 'right': antFacing = AntFacing.Right; break;
    case 'down': antFacing = AntFacing.Down; break;
    case 'left': antFacing = AntFacing.Left; break;
    default: console.log('Selected ant facing is not valid.')
  }
});

let animationId = null;

let ticksPerRender = 1;
let antColor = AntColor.Purple;
let antFacing = AntFacing.Left;

const renderLoop = () => {
  for(let i = 0; i < ticksPerRender; i++) {
    universe.tick();
  }
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
