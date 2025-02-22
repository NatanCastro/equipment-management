MIGRATIONS_DIR=src-tauri/migrations

migrate-add:
	@[ -n "$(name)" ] || (echo "Error: Please provide a migration name using 'name=your_migration_name'"; exit 1)
	sqlx migrate add $(name) --source $(MIGRATIONS_DIR) -r
