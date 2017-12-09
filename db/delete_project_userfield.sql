DELETE FROM project_user_field
    WHERE id = $2 AND project_id = $1
;