UPDATE  project_controller
SET when_data = $3, do_data = $4, require_data = $5
WHERE id = $1 AND project_id = $2
;