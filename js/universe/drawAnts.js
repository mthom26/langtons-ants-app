import { AntColor } from '../../crate/pkg';
import { PURPLE_COLOR, YELLOW_COLOR } from '../constants';
import { CELL_SIZE } from '../config';

const drawAnts = (ctx, universe) => {
  // get_ant_data() returns an array where every three itmes corresponds to 
  // an ant, [ ant_1_row, ant_1_col, ant_1_color, ant_2_row ...]
  const antData = universe.get_ant_data();
  
  ctx.beginPath();
  
  for(let i = 0; i < antData.length; i+=3) {
    if(antData[i+2] === AntColor.Purple) {
      ctx.fillStyle = PURPLE_COLOR;
    } else {
      ctx.fillStyle = YELLOW_COLOR;
    }
    ctx.fillRect(
      antData[i+1] * (CELL_SIZE + 1) + 1,
      antData[i] * (CELL_SIZE + 1) + 1,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  ctx.stroke();
};

export default drawAnts;