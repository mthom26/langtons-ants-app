use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum AntColor {
    // Different AntColor will determine whether the ANt turns left or right
    // Purple turns right on Cell::Black, left on Cell::Green
    // Yellow turns right on Cell::Green, left on Cell::Black
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
#[derive(Clone)]
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

impl Ant {
    // Turn direction on Black Cell
    pub fn turn_black(&mut self) {
        match self.color {
            AntColor::Purple => {
                match self.facing {
                    AntFacing::Up => self.facing = AntFacing::Right,
                    AntFacing::Right => self.facing = AntFacing::Down,
                    AntFacing::Down => self.facing = AntFacing::Left,
                    AntFacing::Left => self.facing = AntFacing::Up
                }
            },
            AntColor::Yellow => {
                match self.facing {
                    AntFacing::Up => self.facing = AntFacing::Left,
                    AntFacing::Right => self.facing = AntFacing::Up,
                    AntFacing::Down => self.facing = AntFacing::Right,
                    AntFacing::Left => self.facing = AntFacing::Down
                }
            }
        }
    }
    // Turn direction on Green Cell
    pub fn turn_green(&mut self) {
        match self.color {
            AntColor::Purple => {
                match self.facing {
                    AntFacing::Up => self.facing = AntFacing::Left,
                    AntFacing::Right => self.facing = AntFacing::Up,
                    AntFacing::Down => self.facing = AntFacing::Right,
                    AntFacing::Left => self.facing = AntFacing::Down
                }
            },
            AntColor::Yellow => {
                match self.facing {
                    AntFacing::Up => self.facing = AntFacing::Right,
                    AntFacing::Right => self.facing = AntFacing::Down,
                    AntFacing::Down => self.facing = AntFacing::Left,
                    AntFacing::Left => self.facing = AntFacing::Up
                }
            }
        }
    }
    // Move forward
    // TODO Handle edge of map cases
    pub fn move_forward(&mut self) {
        match self.facing {
            AntFacing::Up => self.current_row -= 1,
            AntFacing::Right => self.current_col += 1,
            AntFacing::Down => self.current_row += 1,
            AntFacing::Left => self.current_col -= 1,
        }
    }
}
