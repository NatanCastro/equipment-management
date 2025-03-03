use super::equipment::UpdateEquipmentDto;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewRecordDto {
    pub title: String,
    pub description: String,
    pub updated_equipments: Vec<UpdateEquipmentDto>,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct UpdateRecordDto {
    pub id: String,
    pub title: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct DeleteRecordDto {
    pub id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindRecordDto {
    pub title: String,
    pub description: String,
    pub equipment_id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindOneRecordDto {
    pub id: String,
}
