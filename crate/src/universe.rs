use wasm_bindgen::prelude::*;

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
    cells: Vec<Cell>
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        let width = 64;
        let height = 64;

        let cells = (0..(width * height))
            .map(|_| { Cell::Black })
            .collect();
        
        Universe {
            width,
            height,
            cells
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
}