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
    cells: Vec<Cell>,
    ants: Vec<Ant>
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        let width = 64;
        let height = 64;

        let cells = (0..(width * height))
            .map(|_| { Cell::Black })
            .collect();
        
        let ants = vec![Ant{
            current_row: 7,
            current_col: 9,
            color: AntColor::Yellow,
            facing: AntFacing::Down
        }, Ant {
            current_row: 27,
            current_col: 54,
            color: AntColor::Yellow,
            facing: AntFacing::Down
        }, Ant {
            current_row: 33,
            current_col: 61,
            color: AntColor::Yellow,
            facing: AntFacing::Down
        }];

        Universe {
            width,
            height,
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
}