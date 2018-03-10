UPDATE users
    SET status_id = 1
    WHERE id = $1
;