UPDATE project_idea
    SET idea_data = $3
    WHERE id = $2 AND project_id = $1
;