use database::{setup_db, Db};
use handlers::equipment_handlers::*;
use logger::Logger;
use tauri::Manager;

pub mod database;
pub mod handlers;
pub mod logger;

pub struct AppContext {
    pub pool: Db,
    pub logger: Logger,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            create_equipment,
            find_equipments,
            find_one_equipment,
            update_equipment,
            delete_equipment
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
