-- Add migration script here
CREATE TABLE equipment_location (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL default (datetime('now')),
    updated_at TEXT NOT NULL default (datetime('now'))
);

CREATE INDEX IF NOT EXISTS equipment_location_name_index ON equipment_location (name);

ALTER TABLE equipment
ADD COLUMN equipment_location_id UUID REFERENCES equipment_location (id);
