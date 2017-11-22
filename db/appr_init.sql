DROP TABLE IF EXISTS users, groups, project, user_group, group_project, user_project, roles, tracker;
--test
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT unique,
    first_name TEXT,
    last_name TEXT,
    email TEXT unique, 
    password TEXT
 );

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    user_id int references users(id),
    group_name TEXT
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    group_id int references groups(id),
    idea_field TEXT,
    user_field TEXT,
    features_field TEXT,
    view_field TEXT,
    controller_field TEXT,
    endpoint_field TEXT,
    schema_field TEXT
);

CREATE TABLE roles ( 
    id SERIAL PRIMARY KEY, 
    roles TEXT 
); 

CREATE TABLE user_group (
    user_id int references users(id), 
    group_id int references groups(id)
);

CREATE TABLE group_project (
    group_id int references groups(id), 
    project_id int references project(id), 
    roles_id int references roles(id)
);

CREATE TABLE user_project ( 
    user_id int references users(id), 
    project_id int references project(id), 
    roles_id int references roles(id)
);

CREATE TABLE tracker (
    id SERIAL PRIMARY KEY,
    group_id int references groups(id),
    user_id int references users(id),
    tracker_order int,
    tracker_name TEXT ,
    tracker_data TEXT
);


INSERT INTO users ( username, password, email, first_name, last_name )
VALUES ('username1234', 'password123', 'a@a.com', 'Testy', 'McTesterson');

INSERT INTO groups ( group_name )
VALUES ('Test Group');

INSERT INTO project ( group_id, idea_field, user_field, features_field, view_field, controller_field, endpoint_field, schema_field )
VALUES ('1', 'idea field', 'user field', 'features field', 'view field', 'controller field', 'endpoint field', 'schema field');

INSERT INTO user_group ( user_id, group_id )
VALUES ('1', '1');

INSERT INTO roles ( roles )
VALUES ('admin');

INSERT INTO group_project (group_id, project_id, roles_id)
VALUES ('1','1','1');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('1','1','1');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data ) 
VALUES ('1','1', '1', 'test tracker name', 'test tracker data');