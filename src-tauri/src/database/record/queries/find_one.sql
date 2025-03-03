SELECT
  h.id,
  h.title,
  h.description,
  e.id AS equipment_id,
  e.service_tag AS equipment_service_tag,
  h.created_at,
  h.updated_at
FROM history AS h
JOIN history_equipment AS he ON h.id = he.history_id
JOIN equipment AS e ON he.equipment_id = e.id
WHERE
  h.id = ?

