SELECT * FROM equipment WHERE
(service_tag IS NOT NULL AND service_tag LIKE '%' || ? || '%') AND
(name IS NOT NULL AND name LIKE '%' || ? || '%') AND
(description IS NOT NULL AND description LIKE '%' || ? || '%')
