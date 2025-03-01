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
    let service_tag = new_equipment_dto.service_tag.clone();
    let name = new_equipment_dto.name.clone();
    let description = new_equipment_dto.description.clone();
    let location_id = new_equipment_dto.location_id.clone();
    build_query_with_params(
        INSERT_EQUIPMENT_QUERY,
        [id, service_tag, name, description, location_id],
    )
    .fetch_one(pool)
    .await
}

pub async fn find_equipment(
    pool: &SqlitePool,
    find_equipment_dto: &FindEquipmentDto,
) -> QueryResult<Vec<EquipmentWithLocationDto>> {
    let service_tag = find_equipment_dto.service_tag.clone().unwrap_or_default();
    let name = find_equipment_dto.name.clone().unwrap_or_default();
    let description = find_equipment_dto.description.clone().unwrap_or_default();
    let location_id = find_equipment_dto.location_id.clone().unwrap_or_default();

    println!("service_tag: {:?}", service_tag);
    println!("name: {:?}", name);
    println!("description: {:?}", description);
    println!("location_id: {:?}", location_id);

    build_query_with_params(
        FIND_EQUIPMENT_QUERY,
        [
            service_tag,
            name,
            description,
            location_id.clone(),
            location_id,
        ],
    )
    .fetch_all(pool)
    .await
}

pub async fn find_one_equipment(
    pool: &SqlitePool,
    find_one_equipment_dto: &FindOneEquipmentDto,
) -> QueryResult<Equipment> {
    let id = find_one_equipment_dto.id.clone();
    build_query_with_params(FIND_ONE_EQUIPMENT_QUERY, [id])
        .fetch_one(pool)
        .await
}

pub async fn update_equipment(
    pool: &SqlitePool,
    update_equipment_dto: &UpdateEquipmentDto,
) -> QueryResult<Equipment> {
    let id = update_equipment_dto.id.clone();
    let service_tag = update_equipment_dto.service_tag.clone();
    let name = update_equipment_dto.name.clone();
    let description = update_equipment_dto.description.clone();
    let location_id = update_equipment_dto.location_id.clone();
    build_query_with_params(
        UPDATE_EQUIPMENT_QUERY,
        [service_tag, name, description, location_id, id],
    )
    .fetch_one(pool)
    .await
}

pub async fn delete_equipment(
    pool: &SqlitePool,
    delete_equipment_dto: &DeleteEquipmentDto,
) -> QueryResult<()> {
    let id = delete_equipment_dto.id.clone();
    build_query_with_params(DELETE_EQUIPMENT_QUERY, [id])
        .fetch_one(pool)
        .await
}
