-- test works

UPDATE users 
    SET username = $2,
        first_name = $3,
        last_name = $4
WHERE id = $1;