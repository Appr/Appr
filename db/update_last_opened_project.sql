UPDATE project
    SET
        last_opened = $2 
    WHERE id = $1
;