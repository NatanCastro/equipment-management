mod dto;

use std::collections::HashMap;

use dto::{FindHistoryResultDto, InsertHistoryResultDto, UpdateHistoryResultDto};
use uuid::Uuid;

use crate::dtos::history::{
    DeleteHistoryDto, FindHistoryDto, FindOneHistoryDto, NewHistoryDto, UpdateHistoryDto,
};

use crate::database::equipment::update_equipment;
use crate::models::history::{History, ShortEquipement};

use super::build_query_with_params;

const INSERT_HISTORY_QUERY: &str = include_str!("./queries/insert.sql");
const CREATE_JOIN_QUERY: &str = include_str!("./queries/create_join.sql");
const FIND_HISTORY_QUERY: &str = include_str!("./queries/find.sql");
const FIND_ONE_HISTORY_QUERY: &str = include_str!("./queries/find_one.sql");
const UPDATE_HISTORY_QUERY: &str = include_str!("./queries/update.sql");
const DELETE_HISTORY_QUERY: &str = include_str!("./queries/delete.sql");

async fn insert_history_equipment_join(
    pool: &sqlx::SqlitePool,
    history_id: &str,
    equipment_id: &str,
) -> Result<InsertHistoryResultDto, sqlx::Error> {
    build_query_with_params(CREATE_JOIN_QUERY, [history_id, equipment_id])
        .fetch_one(pool)
        .await
}

pub async fn insert_history(
    pool: &sqlx::SqlitePool,
    new_equipment_history_dto: &NewHistoryDto,
) -> Result<History, sqlx::Error> {
    let id = Uuid::new_v4().to_string();

    let transaction = pool.begin().await.unwrap();

    let insert_history_query_result: Result<InsertHistoryResultDto, sqlx::Error> =
        build_query_with_params(
            INSERT_HISTORY_QUERY,
            [
                &id,
                &new_equipment_history_dto.title,
                &new_equipment_history_dto.description,
            ],
        )
        .fetch_one(pool)
        .await;
    if let Err(e) = insert_history_query_result {
        transaction.rollback().await.unwrap();
        return Err(e);
    }

    for updated_equipment in &new_equipment_history_dto.updated_equipments {
        let insert_history_equipment_join_query_result =
            insert_history_equipment_join(pool, &id, &updated_equipment.id).await;
        if let Err(e) = insert_history_equipment_join_query_result {
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

    let history = insert_history_query_result.unwrap();
    return Ok(History {
        id: history.id,
        title: history.title,
        description: history.description,
        equipments: Vec::new(),
        created_at: history.created_at,
        updated_at: history.updated_at,
    });
}

fn format_find_history_query_result(rows: Vec<FindHistoryResultDto>) -> Vec<History> {
    let mut history_map: HashMap<String, History> = HashMap::new();

    for row in rows {
        let entry = history_map.entry(row.id.clone()).or_insert(History {
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

    history_map.into_values().collect()
}

fn format_find_one_history_query_result(row: FindHistoryResultDto) -> History {
    format_find_history_query_result(vec![row]).pop().unwrap()
}

pub async fn find_history(
    pool: &sqlx::SqlitePool,
    find_equipment_history_dto: &FindHistoryDto,
) -> Result<Vec<History>, sqlx::Error> {
    let result: Result<Vec<FindHistoryResultDto>, sqlx::Error> = build_query_with_params(
        FIND_HISTORY_QUERY,
        [
            &find_equipment_history_dto.title,
            &find_equipment_history_dto.description,
            &find_equipment_history_dto.equipment_id,
        ],
    )
    .fetch_all(pool)
    .await;

    result.map(format_find_history_query_result)
}

pub async fn find_one_history(
    pool: &sqlx::SqlitePool,
    find_one_history_dto: &FindOneHistoryDto,
) -> Result<History, sqlx::Error> {
    let result: Result<FindHistoryResultDto, sqlx::Error> =
        build_query_with_params(FIND_ONE_HISTORY_QUERY, [&find_one_history_dto.id])
            .fetch_one(pool)
            .await;

    match result {
        Ok(result) => Ok(format_find_one_history_query_result(result)),
        Err(e) => Err(e),
    }
}

pub async fn update_history(
    pool: &sqlx::SqlitePool,
    update_equipment_history_dto: &UpdateHistoryDto,
) -> Result<History, sqlx::Error> {
    let result: Result<UpdateHistoryResultDto, sqlx::Error> = build_query_with_params(
        UPDATE_HISTORY_QUERY,
        [
            &update_equipment_history_dto.title,
            &update_equipment_history_dto.description,
            &update_equipment_history_dto.id,
        ],
    )
    .fetch_one(pool)
    .await;

    match result {
        Ok(result) => Ok(History {
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

pub async fn delete_history(
    pool: &sqlx::SqlitePool,
    delete_equipment_history_dto: &DeleteHistoryDto,
) -> Result<(), sqlx::Error> {
    build_query_with_params(DELETE_HISTORY_QUERY, [&delete_equipment_history_dto.id])
        .fetch_one(pool)
        .await
}
