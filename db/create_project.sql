INSERT INTO project (name, author_id, status_id)
    VALUES
        ($1, $2, 1)
;

SELECT * FROM project
    WHERE name = $1 AND status_id = 1
;
