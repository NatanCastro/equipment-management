use tauri::State;

use crate::{dtos::history::NewHistoryDto, models::history::History};

#[tauri::command]
pub async fn create_history(
    state: State<'_, crate::AppContext>,
    dto: NewHistoryDto,
) -> Result<History, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match crate::database::history::insert_history(pool, &dto).await {
        Ok(history) => {
            logger.info(&format!("Created history with id {}", history.id));
            Ok(history)
        }
        Err(e) => {
            let message = format!("Could not create history: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_history(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::history::FindHistoryDto,
) -> Result<Vec<History>, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match crate::database::history::find_history(pool, &dto).await {
        Ok(history) => {
            logger.info(&format!("Found {} histories", history.len()));
            Ok(history)
        }
        Err(e) => {
            let message = format!("Could not find histories: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_one_history(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::history::FindOneHistoryDto,
) -> Result<History, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match crate::database::history::find_one_history(pool, &dto).await {
        Ok(history) => {
            logger.info(&format!("Found history with id {}", history.id));
            Ok(history)
        }
        Err(e) => {
            let message = format!("Could not find history with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn update_history(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::history::UpdateHistoryDto,
) -> Result<History, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match crate::database::history::update_history(pool, &dto).await {
        Ok(history) => {
            logger.info(&format!(
                "Updated history with id {} to {}",
                dto.id, history.id
            ));
            Ok(history)
        }
        Err(e) => {
            let message = format!("Could not update history with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn delete_history(
    state: State<'_, crate::AppContext>,
    dto: crate::dtos::history::DeleteHistoryDto,
) -> Result<(), String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match crate::database::history::delete_history(pool, &dto).await {
        Ok(_) => {
            logger.info(&format!("Deleted history with id {}", dto.id));
            Ok(())
        }
        Err(e) => {
            let message = format!("Could not delete history with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}
