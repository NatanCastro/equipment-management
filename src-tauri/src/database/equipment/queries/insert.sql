INSERT INTO equipment (
  id,
  service_tag,
  name,
  description,
  location_id
) VALUES (?, ?, ?, ?, ?)
RETURNING *;
