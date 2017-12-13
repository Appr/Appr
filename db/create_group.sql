INSERT INTO groups (created_by, name, status_id)
    VALUES ($1, $2, 1)
;

SELECT * FROM groups
    WHERE name = $2 AND status_id = 1
;
