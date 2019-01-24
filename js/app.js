import { Universe, Cell } from '../crate/pkg';
import { memory } from '../crate/pkg/rust_webpack_bg';

const universe = Universe.new();
const width = universe.get_width();
const height = universe.get_height();

console.log(width, height);
