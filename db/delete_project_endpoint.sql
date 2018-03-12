DELETE FROM project_endpoint
    WHERE id = $2
    AND project_id = $1
;