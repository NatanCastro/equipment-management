use tauri::State;

use crate::dtos::equipment_location::{
    DeleteEquipmentLocationDto, FindEquipmentLocationDto, FindOneEquipmentLocationDto,
    NewEquipmentLocationDto, UpdateEquipmentLocationDto,
};

use crate::models::equipment_location::EquipmentLocation;

use crate::database::equipment_location;

#[tauri::command]
pub async fn create_equipment_location(
    state: State<'_, crate::AppContext>,
    dto: NewEquipmentLocationDto,
) -> Result<EquipmentLocation, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment_location::insert_equipment_location(pool, &dto).await {
        Ok(equipment_location) => {
            logger.info(&format!(
                "Created equipment location with id {}",
                equipment_location.id
            ));
            Ok(equipment_location)
        }
        Err(e) => {
            let message = format!("Could not create equipment location: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_equipment_locations(
    state: State<'_, crate::AppContext>,
    dto: FindEquipmentLocationDto,
) -> Result<Vec<EquipmentLocation>, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment_location::find_equipment_location(pool, &dto).await {
        Ok(equipment_locations) => {
            logger.info(&format!(
                "Found {} equipment locations",
                equipment_locations.len()
            ));
            Ok(equipment_locations)
        }
        Err(e) => {
            let message = format!("Could not find equipment locations: {}", e);
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn find_one_equipment_location(
    state: State<'_, crate::AppContext>,
    dto: FindOneEquipmentLocationDto,
) -> Result<EquipmentLocation, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment_location::find_one_equipment_location(pool, &dto).await {
        Ok(equipment_location) => {
            logger.info(&format!(
                "Found equipment location with id {}",
                equipment_location.id
            ));
            Ok(equipment_location)
        }
        Err(e) => {
            let message = format!(
                "Could not find equipment location with id {}: {}",
                dto.id, e
            );
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn update_equipment_location(
    state: State<'_, crate::AppContext>,
    dto: UpdateEquipmentLocationDto,
) -> Result<EquipmentLocation, String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment_location::update_equipment_location(pool, &dto).await {
        Ok(equipment_location) => {
            logger.info(&format!(
                "Updated equipment location with id {} to {}",
                dto.id, equipment_location.id
            ));
            Ok(equipment_location)
        }
        Err(e) => {
            let message = format!(
                "Could not update equipment location with id {}: {}",
                dto.id, e
            );
            logger.error(&message);
            Err(message)
        }
    }
}

#[tauri::command]
pub async fn delete_equipment_location(
    state: State<'_, crate::AppContext>,
    dto: DeleteEquipmentLocationDto,
) -> Result<(), String> {
    let pool = &state.pool;
    let logger = &state.logger;
    match equipment_location::delete_equipment_location(pool, &dto).await {
        Ok(_) => {
            logger.info(&format!("Deleted equipment location with id {}", dto.id));
            Ok(())
        }
        Err(e) => {
            let message = format!(
                "Could not delete equipment location with id {}: {}",
                dto.id, e
            );
            logger.error(&message);
            Err(message)
        }
    }
}
