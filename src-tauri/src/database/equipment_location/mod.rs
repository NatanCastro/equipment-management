use crate::dtos::equipment_location::{
    DeleteEquipmentLocationDto, FindEquipmentLocationDto, FindOneEquipmentLocationDto,
    NewEquipmentLocationDto, UpdateEquipmentLocationDto,
};
use crate::models::equipment_location::EquipmentLocation;
use sqlx::SqlitePool;
use uuid::Uuid;

use super::{build_query_with_params, QueryResult};

const INSERT_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/insert.sql");
const UPDATE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/delete.sql");
const FIND_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_EQUIPMENT_LOCATION_QUERY: &str = include_str!("./queries/find_one.sql");

pub async fn insert_equipment_location(
    pool: &SqlitePool,
    new_equipment_location_dto: &NewEquipmentLocationDto,
) -> QueryResult<EquipmentLocation> {
    build_query_with_params(
        INSERT_EQUIPMENT_LOCATION_QUERY,
        [
            &Uuid::new_v4().to_string(),
            &new_equipment_location_dto.name,
            &new_equipment_location_dto.description,
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
            &find_equipment_location_dto.name,
            &find_equipment_location_dto.description,
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
        [&find_one_equipment_location_dto.id],
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
            &update_equipment_location_dto.name,
            &update_equipment_location_dto.description,
            &update_equipment_location_dto.id,
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
        [&delete_equipment_location_dto.id],
    )
    .fetch_one(pool)
    .await
}
