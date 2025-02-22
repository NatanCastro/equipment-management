UPDATE equipment_location SET
    name = ?,
    description = ?,
    updated_at = datetime('now')
WHERE id = ?;
