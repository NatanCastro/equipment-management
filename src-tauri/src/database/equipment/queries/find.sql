SELECT
  e.id,
  e.service_tag,
  e.name,
  e.description,
  e.equipment_location_id AS location_id,
  location.name AS location_name,
  e.created_at,
  e.updated_at
FROM equipment AS e
LEFT JOIN equipment_location AS location ON location.id = e.equipment_location_id
WHERE
(e.service_tag IS NOT NULL AND e.service_tag LIKE '%' || ? || '%') AND
(e.name IS NOT NULL AND e.name LIKE '%' || ? || '%') AND
(e.description IS NOT NULL AND e.description LIKE '%' || ? || '%') AND
(? = "all" OR e.equipment_location_id = ?)
ORDER BY e.name DESC
