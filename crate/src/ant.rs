use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AntColor {
    Purple,
    Yellow
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AntFacing {
    Up,
    Right,
    Down,
    Left
}

#[wasm_bindgen]
pub struct Ant {
    pub current_row: u32,
    pub current_col: u32,
    pub color: AntColor,
    pub facing: AntFacing
}

#[wasm_bindgen]
impl Ant {
    pub fn new(row: u32, col: u32, color: AntColor, facing: AntFacing) -> Ant {
        Ant {
            current_row: row,
            current_col: col,
            color,
            facing
        }
    }
}
