use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct ShortEquipement {
    pub id: String,
    pub service_tag: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Record {
    pub id: String,
    pub title: String,
    pub description: String,
    pub equipments: Vec<ShortEquipement>,
    pub created_at: String,
    pub updated_at: String,
}
