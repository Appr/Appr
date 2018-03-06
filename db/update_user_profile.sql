-- test works

UPDATE users 
    SET 
        first_name = $2,
        last_name = $3
WHERE id = $1;