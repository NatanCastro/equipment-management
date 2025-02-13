UPDATE equipment SET 
    service_tag = ?,
    name = ?,
    description = ?,
    updated_at = datetime('now')
WHERE id = ?;
