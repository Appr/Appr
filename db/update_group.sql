UPDATE groups
    SET group_name = $2
    WHERE id = $1
;