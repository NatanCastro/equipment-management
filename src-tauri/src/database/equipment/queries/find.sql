SELECT
  e.id,
  e.service_tag,
  e.name,
  e.description,
  e.location_id,
  location.name AS location_name,
  e.created_at,
  e.updated_at
FROM equipment AS e WHERE
(service_tag IS NOT NULL AND service_tag LIKE '%' || ? || '%') AND
(name IS NOT NULL AND name LIKE '%' || ? || '%') AND
(description IS NOT NULL AND description LIKE '%' || ? || '%') AND
(? = "all" OR location_id = ?)
LEFT JOIN equipment_location AS location ON location.id = e.location_id;
