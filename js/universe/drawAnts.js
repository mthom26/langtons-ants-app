import { PURPLE_COLOR, CELL_SIZE } from '../constants';

// Draw Ants
// TODO Check for Ant Color and render appropriate color
const drawAnts = (ctx, universe) => {
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
};

export default drawAnts;