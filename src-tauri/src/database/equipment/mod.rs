use super::{build_query_with_params, QueryResult};
use crate::dtos::equipment::{
    DeleteEquipmentDto, EquipmentWithLocationDto, FindEquipmentDto, FindOneEquipmentDto,
    NewEquipmentDto, UpdateEquipmentDto,
};
use crate::models::equipment::Equipment;
use sqlx::sqlite::SqlitePool;
use uuid::Uuid;

const INSERT_EQUIPMENT_QUERY: &str = include_str!("./queries/insert.sql");
const UPDATE_EQUIPMENT_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_EQUIPMENT_QUERY: &str = include_str!("./queries/delete.sql");
const FIND_EQUIPMENT_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_EQUIPMENT_QUERY: &str = include_str!("./queries/find_one.sql");

pub async fn insert_equipment(
    pool: &SqlitePool,
    new_equipment_dto: &NewEquipmentDto,
) -> QueryResult<Equipment> {
    let id = Uuid::new_v4().to_string();
    build_query_with_params(
        INSERT_EQUIPMENT_QUERY,
        [
            &id,
            &new_equipment_dto.service_tag,
            &new_equipment_dto.name,
            &new_equipment_dto.description,
            &new_equipment_dto.location_id,
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn find_equipment(
    pool: &SqlitePool,
    find_equipment_dto: &FindEquipmentDto,
) -> QueryResult<Vec<EquipmentWithLocationDto>> {
    build_query_with_params(
        FIND_EQUIPMENT_QUERY,
        [
            &find_equipment_dto.service_tag,
            &find_equipment_dto.name,
            &find_equipment_dto.description,
            &find_equipment_dto.location_id,
            &find_equipment_dto.location_id,
        ],
    )
    .fetch_all(pool)
    .await
}

pub async fn find_one_equipment(
    pool: &SqlitePool,
    find_one_equipment_dto: &FindOneEquipmentDto,
) -> QueryResult<Equipment> {
    build_query_with_params(FIND_ONE_EQUIPMENT_QUERY, [&find_one_equipment_dto.id])
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
            &update_equipment_dto.service_tag,
            &update_equipment_dto.name,
            &update_equipment_dto.description,
            &update_equipment_dto.location_id,
            &update_equipment_dto.id,
        ],
    )
    .fetch_one(pool)
    .await
}

pub async fn delete_equipment(
    pool: &SqlitePool,
    delete_equipment_dto: &DeleteEquipmentDto,
) -> QueryResult<()> {
    build_query_with_params(DELETE_EQUIPMENT_QUERY, [&delete_equipment_dto.id])
        .fetch_one(pool)
        .await
}
