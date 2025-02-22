use sqlx::{migrate::MigrateDatabase, query::QueryAs, sqlite, FromRow, Pool, Sqlite, SqlitePool};
use tauri::{App, Manager};

use crate::logger::Logger;

pub mod equipment;
pub mod equipment_location;

pub type Db = Pool<Sqlite>;

pub async fn create_connection_pool(url: &str) -> Result<Db, sqlx::Error> {
    match SqlitePool::connect(url).await {
        Ok(pool) => Ok(pool),
        Err(err) => Err(err),
    }
}

pub async fn setup_db(app: &App, logger: &Logger) -> Db {
    let reault_db: Result<Db, sqlx::Error>;
    let is_in_memory = false;
    if !is_in_memory {
        let mut path = app.path().app_data_dir().expect("failed to get data_dir");

        match std::fs::create_dir_all(path.clone()) {
            Ok(_) => {}
            Err(err) => {
                let message = format!("error creating directory {}", err);
                logger.error(&message);
                panic!("error creating directory {}", err);
            }
        };

        path.push("db.sqlite3");

        Sqlite::create_database(
            format!(
                "sqlite:{}",
                path.to_str().expect("path should be something")
            )
            .as_str(),
        )
        .await
        .map_err(|err| {
            let message = format!("failed to create database: {}", err);
            logger.error(&message);
        })
        .expect("failed to create database");

        reault_db = create_connection_pool(&path.to_str().expect("path should be something")).await
    } else {
        reault_db = create_connection_pool(":memory:").await;
    }

    match reault_db {
        Ok(db) => {
            match sqlx::migrate!("./migrations").run(&db).await {
                Ok(_) => {
                    logger.info("Database migrated successfully");
                }
                Err(e) => {
                    let message = format!("Error migrating database: {}", e);
                    logger.error(&message);
                    panic!("{}", message);
                }
            };
            db
        }
        Err(e) => {
            let message = format!("Error connecting to database: {}", e);
            logger.error(&message);
            panic!("{}", message);
        }
    }
}

pub type QueryResult<T, E = sqlx::Error> = Result<T, E>;

type SqliteQueryAs<'a, T> = QueryAs<'a, sqlx::Sqlite, T, sqlite::SqliteArguments<'a>>;

trait QueryParamT<'a>:
    sqlx::Encode<'a, sqlite::Sqlite> + sqlx::Type<sqlite::Sqlite> + Send + 'a
{
}
impl<'a, T: sqlx::Encode<'a, sqlite::Sqlite> + sqlx::Type<sqlite::Sqlite> + Send + 'a>
    QueryParamT<'a> for T
{
}

fn bind_params<'a, T, P>(
    query: SqliteQueryAs<'a, T>,
    params: impl IntoIterator<Item = P>,
) -> SqliteQueryAs<'a, T>
where
    T: for<'r> FromRow<'r, sqlite::SqliteRow>,
    P: QueryParamT<'a>,
{
    let mut query = query;
    for param in params {
        query = query.bind(param);
    }
    query
}

fn build_query_with_params<'a, T, P>(
    query: &'a str,
    params: impl IntoIterator<Item = P>,
) -> SqliteQueryAs<'a, T>
where
    T: for<'r> FromRow<'r, sqlite::SqliteRow>,
    P: QueryParamT<'a>,
{
    let query = sqlx::query_as(query);
    bind_params(query, params)
}
