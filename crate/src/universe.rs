use wasm_bindgen::prelude::*;

use ant::{Ant, AntColor, AntFacing};

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Black,
    Green
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    current_tick: u32,
    cells: Vec<Cell>,
    ants: Vec<Ant>
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: u32, height: u32) -> Universe {
        let current_tick = 0;

        let cells = (0..(width * height))
            .map(|_| { Cell::Black })
            .collect();
        
        let ants = vec![];

        Universe {
            width,
            height,
            current_tick,
            cells,
            ants
        }
    }

    pub fn reset(&mut self) {
        self.current_tick = 0;

        let cells = (0..(self.width * self.height))
            .map(|_| { Cell::Black })
            .collect();

        self.cells = cells;
        self.ants = vec![];
    }

    pub fn get_width(&self) -> u32 {
        self.width
    }

    pub fn get_height(&self) -> u32 {
        self.height
    }

    pub fn get_cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn get_ants(&self) -> *const Ant {
        self.ants.as_ptr()
    }

    pub fn get_number_ants(&self) -> u32 {
        self.ants.len() as u32
    }

    pub fn get_ant_data(&self) -> Vec<u32> {
        // Return an array of positions and color to the javascript
        // each triplet of values corresponds to an ant
        let mut ant_data: Vec<u32> = Vec::new();
        for ant in self.ants.iter() {
            ant_data.push(ant.current_row);
            ant_data.push(ant.current_col);
            ant_data.push(ant.color as u32);
        }
        ant_data
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        let mut next_ants = self.ants.clone();

        for (index, ant) in self.ants.iter().enumerate() {
            // Get ant position and flip the cell. This is using the Cell value
            // from the old universe so if two ants are on the same Cell they
            // will flip it to the same color. Then turn ant and move.
            let id = self.get_index(ant.current_row, ant.current_col);
            match self.cells[id] {
                Cell::Black => {
                    next[id] = Cell::Green;
                    next_ants[index].turn_black();
                    next_ants[index].move_forward(self.height, self.width);
                },
                Cell::Green => {
                    next[id] = Cell::Black;
                    next_ants[index].turn_green();
                    next_ants[index].move_forward(self.height, self.width);
                }
            }
        }

        self.cells = next;
        self.ants = next_ants;
        self.current_tick += 1;
    }

    pub fn get_current_tick(&self) -> u32 {
        self.current_tick
    }

    pub fn add_ant(&mut self, row: u32, col: u32, color: AntColor, facing: AntFacing) {
        self.ants.push(Ant {
            current_row: row,
            current_col: col,
            color: color,
            facing
        })
    }

    pub fn remove_ant(&mut self, row: u32, col: u32) {
        let mut index = 0;
        for (i, ant) in self.ants.iter().enumerate() {
            if ant.current_row == row && ant.current_col == col {
                index = i;
            }
        }
        self.ants.remove(index);
    }

    pub fn check_cell(&self, row: u32, col: u32) -> bool {
        // Check if there is an ant at the given cell
        for ant in &self.ants {
            if ant.current_row == row && ant.current_col == col {
                return true;
            }
        }
        false
    }
}

impl Universe {
    // Convert a (row, column) pair into an index to retrieve required Cell
    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }
}