-- Add migration script here
CREATE IF NOT EXISTS TABLE history (
    id UUID PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL default (datetime('now')),
    updated_at TEXT NOT NULL default (datetime('now'))
);

CREATE INDEX IF NOT EXISTS history_title_index ON history (title);

CREATE TABLE IF NOT EXISTS history_equipment (
    id UUID PRIMARY KEY NOT NULL,
    history_id UUID NOT NULL,
    equipment_id UUID NOT NULL,
    FOREIGN KEY (history_id) REFERENCES history (id) ON DELETE CASCADE,
    FOREIGN KEY (equipment_id) REFERENCES equipment (id)
);
