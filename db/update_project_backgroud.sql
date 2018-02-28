UPDATE project
    SET
        background = $2 
    WHERE id = $1
;