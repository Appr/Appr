UPDATE project_view
    SET name = $3, image_url = $4
    WHERE id = $2 AND project_id = $1
;