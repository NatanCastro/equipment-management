UPDATE history
  SET
  title = ?,
  description = ?,
  updated_at = datetime('now')
  WHERE id = ?
RETURNING *;
