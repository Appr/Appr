INSERT INTO project_schema (project_id, table_name_id, column_name, schema_type_id, size_data, is_primary_key, is_foreign_key, is_serial, is_not_null, is_unique)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
;