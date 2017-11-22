UPDATE  USERS
SET first_name = $2, last_name = $3, email = $4, password = $5, username = $6
WHERE id = $1
;