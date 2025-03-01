use tauri::State;

use crate::database::equipment;
use crate::dtos::equipment::{
    DeleteEquipmentDto, EquipmentWithLocationDto, FindEquipmentDto, FindOneEquipmentDto,
    NewEquipmentDto, UpdateEquipmentDto,
};
use crate::models::equipment::Equipment;

#[tauri::command]
pub async fn create_equipment(
    state: State<'_, crate::AppContext>,
    dto: NewEquipmentDto,
) -> Result<Equipment, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment::insert_equipment(pool, &dto).await {
        Ok(equipment) => {
            logger.info(&format!("Created equipment with id {}", equipment.id));
            Ok(equipment)
        }
        Err(e) => {
            let message = format!("Could not create equipment: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_equipments(
    state: State<'_, crate::AppContext>,
    dto: FindEquipmentDto,
) -> Result<Vec<EquipmentWithLocationDto>, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment::find_equipment(pool, &dto).await {
        Ok(equipments) => {
            logger.info(&format!("Found {} equipments", equipments.len()));
            Ok(equipments)
        }
        Err(e) => {
            let message = format!("Could not find equipments: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_one_equipment(
    state: State<'_, crate::AppContext>,
    dto: FindOneEquipmentDto,
) -> Result<Equipment, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment::find_one_equipment(pool, &dto).await {
        Ok(equipment) => {
            logger.info(&format!("Found equipment with id {}", equipment.id));
            Ok(equipment)
        }
        Err(e) => {
            let message = format!("Could not find equipment with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn update_equipment(
    state: State<'_, crate::AppContext>,
    dto: UpdateEquipmentDto,
) -> Result<Equipment, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment::update_equipment(pool, &dto).await {
        Ok(equipment) => {
            logger.info(&format!(
                "Updated equipment with id {} to {}",
                dto.id, equipment.id
            ));
            Ok(equipment)
        }
        Err(e) => {
            let message = format!("Could not update equipment with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn delete_equipment(
    state: State<'_, crate::AppContext>,
    dto: DeleteEquipmentDto,
) -> Result<(), String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment::delete_equipment(pool, &dto).await {
        Ok(_) => {
            logger.info(&format!("Deleted equipment with id {}", dto.id));
            Ok(())
        }
        Err(e) => {
            let message = format!("Could not delete equipment with id {}: {}", dto.id, e);
            logger.error(&message);
            Err(message)
        }
    }
}
