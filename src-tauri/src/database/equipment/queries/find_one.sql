SELECT
  e.id,
  e.service_tag,
  e.name,
  e.description,
  e.location_id,
  location.name AS location_name,
  e.created_at,
  e.updated_at
FROM equipment AS e WHERE id = ?
LEFT JOIN equipment_location AS location ON location.id = e.location_id;
