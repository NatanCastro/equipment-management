use tauri::State;

use crate::{database::record, dtos::record::NewRecordDto, models::record::Record};

#[tauri::command]
pub async fn create_record(
    state: State<'_, crate::AppContext>,
    dto: NewRecordDto,
) -> Result<Record, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match record::insert_record(pool, &dto).await {
        Ok(record) => {
            logger.info(&format!("Created record with id {}", record.id));
            Ok(record)
        }
        Err(e) => {
            let message = format!("Could not create record: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_record(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::record::FindRecordDto,
) -> Result<Vec<Record>, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match record::find_record(pool, &dto).await {
        Ok(record) => {
            logger.info(&format!("Found {} histories", record.len()));
            Ok(record)
        }
        Err(e) => {
            let message = format!("Could not find histories: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_one_record(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::record::FindOneRecordDto,
) -> Result<Record, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match record::find_one_record(pool, &dto).await {
        Ok(record) => {
            logger.info(&format!("Found record with id {}", record.id));
            Ok(record)
        }
        Err(e) => {
            let message = format!("Could not find record with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn update_record(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::record::UpdateRecordDto,
) -> Result<Record, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match record::update_record(pool, &dto).await {
        Ok(record) => {
            logger.info(&format!(
                "Updated record with id {} to {}",
                dto.id, record.id
            ));
            Ok(record)
        }
        Err(e) => {
            let message = format!("Could not update record with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn delete_record(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::record::DeleteRecordDto,
) -> Result<(), String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match record::delete_record(pool, &dto).await {
        Ok(_) => {
            logger.info(&format!("Deleted record with id {}", dto.id));
            Ok(())
        }
        Err(e) => {
            let message = format!("Could not delete record with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}
