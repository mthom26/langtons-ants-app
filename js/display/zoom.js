import { CELL_SIZE, incrementCellSize, decrementCellSize } from '../config';

const zoomIn = (currentZoom, canvas, universe) => {
  incrementCellSize();
  currentZoom.textContent = `x${CELL_SIZE}`;
  canvas.height = (CELL_SIZE + 1) * universe.getHeight() + 1;
  canvas.width = (CELL_SIZE + 1) * universe.getWidth() + 1;
};

const zoomOut = (currentZoom, canvas, universe) => {
  decrementCellSize();
  currentZoom.textContent = `x${CELL_SIZE}`;
  canvas.height = (CELL_SIZE + 1) * universe.getHeight() + 1;
  canvas.width = (CELL_SIZE + 1) * universe.getWidth() + 1;
};

export {
  zoomIn,
  zoomOut
}
