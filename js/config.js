const CELL_SIZE_MAX = 10;
const CELL_SIZE_MIN = 2;
let CELL_SIZE = 5;

const incrementCellSize = () => {
  if (CELL_SIZE < CELL_SIZE_MAX) {
    CELL_SIZE++
  }
};

const decrementCellSize = () => {
  if (CELL_SIZE > CELL_SIZE_MIN) {
    CELL_SIZE--
  }
};

export {
  CELL_SIZE,
  incrementCellSize,
  decrementCellSize
}