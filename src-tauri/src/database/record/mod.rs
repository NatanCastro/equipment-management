mod dto;

use std::collections::HashMap;

use dto::{FindRecordResultDto, InsertRecordResultDto, UpdateRecordResultDto};
use uuid::Uuid;

use crate::dtos::record::{
    DeleteRecordDto, FindOneRecordDto, FindRecordDto, NewRecordDto, UpdateRecordDto,
};

use crate::database::equipment::update_equipment;
use crate::models::record::{Record, ShortEquipement};

use super::build_query_with_params;

const INSERT_RECORD_QUERY: &str = include_str!("./queries/insert.sql");
const CREATE_JOIN_QUERY: &str = include_str!("./queries/create_join.sql");
const FIND_RECORD_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_RECORD_QUERY: &str = include_str!("./queries/find_one.sql");
const UPDATE_RECORD_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_RECORD_QUERY: &str = include_str!("./queries/delete.sql");

async fn insert_record_equipment_join(
    pool: &sqlx::SqlitePool,
    record_id: &str,
    equipment_id: &str,
) -> Result<InsertRecordResultDto, sqlx::Error> {
    build_query_with_params(CREATE_JOIN_QUERY, [record_id, equipment_id])
        .fetch_one(pool)
        .await
}

pub async fn insert_record(
    pool: &sqlx::SqlitePool,
    new_equipment_record_dto: &NewRecordDto,
) -> Result<Record, sqlx::Error> {
    let id = Uuid::new_v4().to_string();

    let transaction = pool.begin().await.unwrap();

    let insert_record_query_result: Result<InsertRecordResultDto, sqlx::Error> =
        build_query_with_params(
            INSERT_RECORD_QUERY,
            [
                &id,
                &new_equipment_record_dto.title,
                &new_equipment_record_dto.description,
            ],
        )
        .fetch_one(pool)
        .await;
    if let Err(e) = insert_record_query_result {
        transaction.rollback().await.unwrap();
        return Err(e);
    }

    for updated_equipment in &new_equipment_record_dto.updated_equipments {
        let insert_record_equipment_join_query_result =
            insert_record_equipment_join(pool, &id, &updated_equipment.id).await;
        if let Err(e) = insert_record_equipment_join_query_result {
            transaction.rollback().await.unwrap();
            return Err(e);
        }

        let update_equipment_query_result = update_equipment(pool, &updated_equipment).await;
        if let Err(e) = update_equipment_query_result {
            transaction.rollback().await.unwrap();
            return Err(e);
        }
    }

    if let Err(e) = transaction.commit().await {
        return Err(e);
    }

    let record = insert_record_query_result.unwrap();
    return Ok(Record {
        id: record.id,
        title: record.title,
        description: record.description,
        equipments: Vec::new(),
        created_at: record.created_at,
        updated_at: record.updated_at,
    });
}

fn format_find_record_query_result(rows: Vec<FindRecordResultDto>) -> Vec<Record> {
    let mut record_map: HashMap<String, Record> = HashMap::new();

    for row in rows {
        let entry = record_map.entry(row.id.clone()).or_insert(Record {
            id: row.id,
            title: row.title,
            description: row.description,
            equipments: Vec::new(),
            created_at: row.created_at,
            updated_at: row.updated_at,
        });

        entry.equipments.push(ShortEquipement {
            id: row.equipment_id,
            service_tag: row.equipment_service_tag,
        });
    }

    record_map.into_values().collect()
}

fn format_find_one_record_query_result(row: FindRecordResultDto) -> Record {
    format_find_record_query_result(vec![row]).pop().unwrap()
}

pub async fn find_record(
    pool: &sqlx::SqlitePool,
    find_equipment_record_dto: &FindRecordDto,
) -> Result<Vec<Record>, sqlx::Error> {
    let result: Result<Vec<FindRecordResultDto>, sqlx::Error> = build_query_with_params(
        FIND_RECORD_QUERY,
        [
            &find_equipment_record_dto.title,
            &find_equipment_record_dto.description,
            &find_equipment_record_dto.equipment_id,
        ],
    )
    .fetch_all(pool)
    .await;

    result.map(format_find_record_query_result)
}

pub async fn find_one_record(
    pool: &sqlx::SqlitePool,
    find_one_record_dto: &FindOneRecordDto,
) -> Result<Record, sqlx::Error> {
    let result: Result<FindRecordResultDto, sqlx::Error> =
        build_query_with_params(FIND_ONE_RECORD_QUERY, [&find_one_record_dto.id])
            .fetch_one(pool)
            .await;

    match result {
        Ok(result) => Ok(format_find_one_record_query_result(result)),
        Err(e) => Err(e),
    }
}

pub async fn update_record(
    pool: &sqlx::SqlitePool,
    update_equipment_record_dto: &UpdateRecordDto,
) -> Result<Record, sqlx::Error> {
    let result: Result<UpdateRecordResultDto, sqlx::Error> = build_query_with_params(
        UPDATE_RECORD_QUERY,
        [
            &update_equipment_record_dto.title,
            &update_equipment_record_dto.description,
            &update_equipment_record_dto.id,
        ],
    )
    .fetch_one(pool)
    .await;

    match result {
        Ok(result) => Ok(Record {
            id: result.id,
            title: result.title,
            description: result.description,
            equipments: Vec::new(),
            created_at: result.created_at,
            updated_at: result.updated_at,
        }),
        Err(e) => Err(e),
    }
}

pub async fn delete_record(
    pool: &sqlx::SqlitePool,
    delete_equipment_record_dto: &DeleteRecordDto,
) -> Result<(), sqlx::Error> {
    build_query_with_params(DELETE_RECORD_QUERY, [&delete_equipment_record_dto.id])
        .fetch_one(pool)
        .await
}
