-- Add migration script here
CREATE TABLE IF NOT EXISTS record (
    id UUID PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL default (datetime('now')),
    updated_at TEXT NOT NULL default (datetime('now'))
);

CREATE INDEX IF NOT EXISTS record_title_index ON record (title);

CREATE TABLE IF NOT EXISTS record_equipment (
    id UUID PRIMARY KEY NOT NULL,
    record_id UUID NOT NULL,
    equipment_id UUID NOT NULL,
    FOREIGN KEY (record_id) REFERENCES record (id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment (id)
);
