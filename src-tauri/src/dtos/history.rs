use super::equipment::UpdateEquipmentDto;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewHistoryDto {
    pub title: String,
    pub description: String,
    pub updated_equipments: Vec<UpdateEquipmentDto>,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct UpdateHistoryDto {
    pub id: String,
    pub title: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct DeleteHistoryDto {
    pub id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindHistoryDto {
    pub title: String,
    pub description: String,
    pub equipment_id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindOneHistoryDto {
    pub id: String,
}
