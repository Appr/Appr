UPDATE project_user_field
    SET 
        target_demo_data = $3,
        skill_data = $4,
        description_data = $5
    WHERE id = $2 AND project_id = $1
;