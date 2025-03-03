use database::{setup_db, Db};
use logger::Logger;
use tauri::Manager;

pub mod database;
pub mod dtos;
pub mod handlers;
pub mod logger;
pub mod models;

pub struct AppContext {
    pub pool: Db,
    pub logger: Logger,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            handlers::create_equipment,
            handlers::find_equipments,
            handlers::find_one_equipment,
            handlers::update_equipment,
            handlers::delete_equipment,
            handlers::create_equipment_location,
            handlers::find_equipment_locations,
            handlers::find_one_equipment_location,
            handlers::update_equipment_location,
            handlers::delete_equipment_location,
            handlers::create_record,
            handlers::find_record,
            handlers::find_one_record,
            handlers::update_record,
            handlers::delete_record
        ])
        .setup(|app| {
            tauri::async_runtime::block_on(async move {
                let logger = Logger::new();
                let pool = setup_db(app, &logger).await;
                app.manage(AppContext { pool, logger });
                Ok(())
            })
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
