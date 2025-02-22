use dto::{
    DeleteEquipmentLocationDto, FindEquipmentLocationDto, FindOneEquipmentLocationDto,
    NewEquipmentLocationDto, UpdateEquipmentLocationDto,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use uuid::Uuid;

use super::{build_query_with_params, QueryResult};

pub mod dto;

const INSERT_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/insert.sql");
const UPDATE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/delete.sql");
const FIND_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/find_one.sql");

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct EquipmentLocation {
    pub id: String,
    pub name: String,
    pub description: String,
    pub created_at: String,
    pub updated_at: String,
}

pub async fn insert_equipment_location(
    pool: &SqlitePool,
    new_equipment_location_dto: &NewEquipmentLocationDto,
) -> QueryResult<EquipmentLocation> {
    build_query_with_params(
        INSERT_EQUIPMENT_LOCATION_QUERY,
        [
            Uuid::new_v4().to_string(),
            new_equipment_location_dto.name.clone(),
            new_equipment_location_dto.description.clone(),
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn find_equipment_location(
    pool: &SqlitePool,
    find_equipment_location_dto: &FindEquipmentLocationDto,
) -> QueryResult<Vec<EquipmentLocation>> {
    build_query_with_params(
        FIND_EQUIPMENT_LOCATION_QUERY,
        [
            find_equipment_location_dto.name.clone().unwrap_or_default(),
            find_equipment_location_dto
                .description
                .clone()
                .unwrap_or_default(),
        ],
    )
    .fetch_all(pool)
    .await
}

pub async fn find_one_equipment_location(
    pool: &SqlitePool,
    find_one_equipment_location_dto: &FindOneEquipmentLocationDto,
) -> QueryResult<EquipmentLocation> {
    build_query_with_params(
        FIND_ONE_EQUIPMENT_LOCATION_QUERY,
        [find_one_equipment_location_dto.id.clone()],
    )
    .fetch_one(pool)
    .await
}

pub async fn update_equipment_location(
    pool: &SqlitePool,
    update_equipment_location_dto: &UpdateEquipmentLocationDto,
) -> QueryResult<EquipmentLocation> {
    build_query_with_params(
        UPDATE_EQUIPMENT_LOCATION_QUERY,
        [
            update_equipment_location_dto.name.clone(),
            update_equipment_location_dto.description.clone(),
            update_equipment_location_dto.id.clone(),
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn delete_equipment_location(
    pool: &SqlitePool,
    delete_equipment_location_dto: &DeleteEquipmentLocationDto,
) -> QueryResult<()> {
    build_query_with_params(
        DELETE_EQUIPMENT_LOCATION_QUERY,
        [delete_equipment_location_dto.id.clone()],
    )
    .fetch_one(pool)
    .await
}
