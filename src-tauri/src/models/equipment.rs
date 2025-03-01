use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Equipment {
    pub id: i32,
    pub service_tag: String,
    pub name: String,
    pub description: String,
    pub location_id: i32,
    pub created_at: String,
    pub updated_at: String,
}
