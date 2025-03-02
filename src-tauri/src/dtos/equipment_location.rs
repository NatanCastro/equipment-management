use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewEquipmentLocationDto {
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct UpdateEquipmentLocationDto {
    pub id: String,
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct DeleteEquipmentLocationDto {
    pub id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindEquipmentLocationDto {
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindOneEquipmentLocationDto {
    pub id: String,
}
