use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewEquipmentDto {
    pub service_tag: String,
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct UpdateEquipmentDto {
    pub id: String,
    pub service_tag: String,
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct DeleteEquipmentDto {
    pub id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindEquipmentDto {
    pub service_tag: Option<String>,
    pub name: Option<String>,
    pub description: Option<String>,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindOneEquipmentDto {
    pub id: String,
}
