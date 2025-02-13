-- Add migration script here

CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY NOT NULL,
    service_tag TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL default (datetime('now')),
    updated_at TEXT NOT NULL default (datetime('now'))
);
