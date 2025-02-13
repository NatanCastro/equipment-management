use super::{build_query_with_params, QueryResult};
use dto::{
    DeleteEquipmentDto, FindEquipmentDto, FindOneEquipmentDto, NewEquipmentDto, UpdateEquipmentDto,
};
use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqlitePool;
use uuid::Uuid;

pub mod dto;

const INSERT_EQUIPMENT_QUERY: &str = include_str!("./queries/insert.sql");
const UPDATE_EQUIPMENT_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_EQUIPMENT_QUERY: &str = include_str!("./queries/delete.sql");
const FIND_EQUIPMENT_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_EQUIPMENT_QUERY: &str = include_str!("./queries/find_one.sql");

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct Equipment {
    pub id: String,
    pub service_tag: String,
    pub name: String,
    pub description: String,
    pub created_at: String,
    pub updated_at: String,
}

pub async fn insert_equipment(
    pool: &SqlitePool,
    new_equipment_dto: &NewEquipmentDto,
) -> QueryResult<Equipment> {
    build_query_with_params(
        INSERT_EQUIPMENT_QUERY,
        [
            Uuid::new_v4().to_string(),
            new_equipment_dto.service_tag.clone(),
            new_equipment_dto.name.clone(),
            new_equipment_dto.description.clone(),
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn find_equipment(
    pool: &SqlitePool,
    find_equipment_dto: &FindEquipmentDto,
) -> QueryResult<Vec<Equipment>> {
    build_query_with_params(
        FIND_EQUIPMENT_QUERY,
        [
            find_equipment_dto.service_tag.clone().unwrap_or_default(),
            find_equipment_dto.name.clone().unwrap_or_default(),
            find_equipment_dto.description.clone().unwrap_or_default(),
        ],
    )
    .fetch_all(pool)
    .await
}

pub async fn find_one_equipment(
    pool: &SqlitePool,
    find_one_equipment_dto: &FindOneEquipmentDto,
) -> QueryResult<Equipment> {
    build_query_with_params(
        FIND_ONE_EQUIPMENT_QUERY,
        [find_one_equipment_dto.id.clone()],
    )
    .fetch_one(pool)
    .await
}

pub async fn update_equipment(
    pool: &SqlitePool,
    update_equipment_dto: &UpdateEquipmentDto,
) -> QueryResult<Equipment> {
    build_query_with_params(
        UPDATE_EQUIPMENT_QUERY,
        [
            update_equipment_dto.service_tag.clone(),
            update_equipment_dto.name.clone(),
            update_equipment_dto.description.clone(),
            update_equipment_dto.id.clone(),
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn delete_equipment(
    pool: &SqlitePool,
    delete_equipment_dto: &DeleteEquipmentDto,
) -> QueryResult<()> {
    build_query_with_params(DELETE_EQUIPMENT_QUERY, [delete_equipment_dto.id.clone()])
        .fetch_one(pool)
        .await
}
