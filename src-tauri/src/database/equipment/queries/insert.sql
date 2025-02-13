INSERT INTO equipment (
  id,
  service_tag,
  name,
  description
) VALUES (?1, ?2, ?3, ?4)
RETURNING *;
