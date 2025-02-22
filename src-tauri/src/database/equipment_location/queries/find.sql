SELECT * FROM equipment_location WHERE
(name IS NOT NULL AND name LIKE '%' || ? || '%') AND
(description IS NOT NULL AND description LIKE '%' || ? || '%')
