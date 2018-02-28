BEGIN;
    DELETE FROM tracker_card 
        WHERE list_id = $1 
        AND project_id = $2;
COMMIT;

BEGIN;
    DELETE FROM tracker_list
        WHERE id = $1
        AND project_id = $2;
COMMIT;
