UPDATE equipment SET 
    service_tag = ?,
    name = ?,
    description = ?,
    location_id = ?,
    updated_at = datetime('now')
WHERE id = ?;
