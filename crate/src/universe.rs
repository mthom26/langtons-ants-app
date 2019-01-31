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
    pub fn new() -> Universe {
        let width = 64;
        let height = 64;
        let current_tick = 0;

        let cells = (0..(width * height))
            .map(|_| { Cell::Black })
            .collect();
        
        let ants = vec![Ant{
            current_row: 32,
            current_col: 32,
            color: AntColor::Purple,
            facing: AntFacing::Left
        }];

        Universe {
            width,
            height,
            current_tick,
            cells,
            ants
        }
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

    pub fn get_ant_positions(&self) -> Vec<u32> {
        // Return an array of positions to the javascript
        // each pair of values corresponds to an ant
        // TODO Add the AntColor as a third item
        let mut ant_pos: Vec<u32> = Vec::new();
        for ant in self.ants.iter() {
            ant_pos.push(ant.current_row);
            ant_pos.push(ant.current_col);
        }
        ant_pos
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
}

impl Universe {
    // Convert a (row, column) pair into an index to retrieve required Cell
    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }
}