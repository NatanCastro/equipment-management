use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Deserialize, Serialize, Clone, Debug)]
pub struct InsertHistoryResultDto {
    pub id: String,
    pub title: String,
    pub description: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(sqlx::FromRow, Deserialize, Serialize, Clone, Debug)]
pub struct FindHistoryResultDto {
    pub id: String,
    pub title: String,
    pub description: String,
    pub equipment_id: String,
    pub equipment_name: String,
    pub equipment_service_tag: String,
    pub created_at: String,
    pub updated_at: String,
}
