use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Deserialize, Serialize, Clone, Debug)]
pub struct EquipmentWithLocationDto {
    pub id: String,
    pub service_tag: String,
    pub name: String,
    pub description: String,
    pub location_id: String,
    pub location_name: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewEquipmentDto {
    pub service_tag: String,
    pub name: String,
    pub description: String,
    pub location_id: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct UpdateEquipmentDto {
    pub id: String,
    pub service_tag: String,
    pub name: String,
    pub description: String,
    pub location_id: String,
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
    pub location_id: Option<String>,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct FindOneEquipmentDto {
    pub id: String,
}
