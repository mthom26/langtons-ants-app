import { Universe as rustUniverse } from '../../crate/pkg';
import { memory } from '../../crate/pkg/rust_webpack_bg';

import drawGrid from './drawGrid';
import drawCells from './drawCells';
import drawAnts from './drawAnts';

const currentTick = document.getElementById('currentTick');

class Universe {
  constructor(width, height) {
    // Set values from rust Universe
    this.universe = rustUniverse.new(width, height);
    this.width = this.universe.get_width();
    this.height = this.universe.get_height();
  }

  // Call the tick() function from rust
  tick() {
    this.universe.tick();
  }

  reset() {
    this.universe.reset();
  }
  
  // Render the current state of the universe to canvas context (ctx)
  render(ctx) {
    drawGrid(ctx, this.width, this.height);
    drawCells(ctx, this.universe, memory, this.width, this.height);
    drawAnts(ctx, this.universe);
    currentTick.textContent = this.getCurrentTick();
  }

  getWidth() {
    return this.universe.get_width();
  }

  getHeight() {
    return this.universe.get_height();
  }

  getCurrentTick() {
    return this.universe.get_current_tick();
  }

  addAnt(row, col, color, facing) {
    // TODO check if ant already exists on this square and handle it
    this.universe.add_ant(row, col, color, facing);
  }
}

export default Universe;