INSERT INTO equipment_location (
  id,
  name,
  description
) VALUES (?, ?, ?)
RETURNING *;
