--Drops current tables in DB and re-adds tables over again on Server restart

DROP TABLE IF EXISTS 
    status,
    users, 
    groups, 
    project, 
    project_idea, 
    project_user_field, 
    project_feature, 
    project_view, 
    project_controller, 
    project_endpoint, 
    req_endpoint, 
    res_endpoint, 
    project_schema, 
    schema_type, 
    project_schema_table, 
    user_group, 
    group_project, 
    user_project, 
    roles, 
    tracker;

--Please keep the order of the CREATE TABLE inserts the same

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name TEXT
 );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT unique,
    first_name TEXT,
    last_name TEXT,
    email TEXT unique, 
    password TEXT,
    status_id int references status(id)
 );

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    created_by int references users(id),
    name TEXT,
    status_id int references status(id)
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name TEXT,
    author_id int references users(id),
    status_id int references status(id)
);

--Project Fields--

CREATE TABLE project_idea (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    idea_data TEXT
);

CREATE TABLE project_user_field (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    target_demo_data TEXT,
    skill_data TEXT,
    description_data TEXT
);

CREATE TABLE project_feature (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    feature_data TEXT
);


CREATE TABLE project_view (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    name TEXT,
    image_url TEXT
);


CREATE TABLE project_controller (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    when_data TEXT,
    do_data TEXT,
    require_data TEXT
);


CREATE TABLE req_endpoint (
    id SERIAL PRIMARY KEY,
    key_data TEXT,
    value_data TEXT
);

CREATE TABLE res_endpoint (
    id SERIAL PRIMARY KEY,
    key_data TEXT,
    value_data TEXT
);

CREATE TABLE project_endpoint (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    url_data TEXT,
    is_get BOOLEAN default TRUE,
    is_post BOOLEAN default FALSE,
    is_update BOOLEAN default FALSE,
    is_delete BOOLEAN default FALSE,
    req_endpoint_id int references req_endpoint(id),
    res_endpoint_id int references res_endpoint(id)
);

CREATE TABLE schema_type ( 
    id SERIAL PRIMARY KEY, 
    type_data TEXT 
); 

CREATE TABLE project_schema_table (
    id SERIAL PRIMARY KEY, 
    table_name TEXT 
);

CREATE TABLE project_schema(
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    table_name_id int references project_schema_table(id),
    column_name TEXT,
    schema_type_id int references schema_type(id),
    size_data TEXT,
    is_primary_key BOOLEAN default FALSE,
    is_foreign_key BOOLEAN default FALSE,
    is_serial BOOLEAN default FALSE,
    is_not_null BOOLEAN default FALSE,
    is_unique BOOLEAN default FALSE
);

--end of project fields

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
    project_id int references project(id)
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


-----------Start of Test user info---------------

--Status Table

INSERT INTO status ( name )
VALUES ('active');

INSERT INTO status ( name )
VALUES ('inactive');

INSERT INTO status ( name )
VALUES ('deleted');

--User Table

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('RealChosenOne', 'Reyismydaughter', 'a@a.com', 'Luke', 'Skywalker', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('DarthVader', 'deathstar4eva', 'b@b.com', 'Anekin', 'Skywalker', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('beepbeepboop', 'boopboopbop', 'c@c.com', 'R2', 'D2', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('HansPrincess', 'sololove', 'd@d.com', 'Leia', 'Organa', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('YoDaMan', 'thereisnotry', 'e@e.com', 'Minch', 'Yoda', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('EmperorsNewGroove', 'password123', 'f@f.com', 'Sheev', 'Palpatine', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('iShotfirst', '12parsecs', 'g@g.com', 'Han', 'Solo', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('HumanCyborgRelations', 'beepboopsbuddy', 'h@h.com', 'C3', 'PO', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('KenobiTheWan', 'password123', 'i@i.com', 'Obi-Wan', 'Kenobi', '1');

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES ('badassbountyhunter', 'iDiedTooSoon', 'j@j.com', 'Boba', 'Fett', '1');

--Groups

INSERT INTO groups ( name, created_by, status_id )
VALUES ('Good Guys', '1', '1');

INSERT INTO groups (  name, created_by, status_id )
VALUES ('Dark Side', '6', '1');

INSERT INTO groups ( name, created_by, status_id )
VALUES ('Droids', '3', '1');

--Projects

INSERT INTO project ( name, author_id, status_id )
VALUES ('Save the Galaxy', '1', '1');

INSERT INTO project ( name, author_id, status_id )
VALUES ('DeathStar', '2', '1');

---------------------------------Test Project Fields

    --Ideas

INSERT INTO project_idea ( project_id, idea_data )
VALUES
    ('1', 'Enslave the Galaxy'),
    ('1', 'Construct Bigger Death Star'),
    ('1', 'Construct Death Star'),
    ('1', 'Execute Order 66'),
    ('1', 'Turn Anakin Skywalker to the Dark Side'),
    ('1', 'Commission a Grand Army of the Republic'),
    ('1', 'Become Supreme Chancellor of the Republic'),
    ('2', 'Save the Galaxy'),
    ('2', 'Blow up Bigger Death Star'),
    ('2', 'Have Bothans get clearance codes'),
    ('2', 'Rescue Han Solo'),
    ('2', 'Complete Jedi Training'),
    ('2', 'Blow up Death Star'),
    ('2', 'Get off this Rock')
;

    --User Field

INSERT INTO project_user_field ( project_id, target_demo_data, skill_data, description_data )
VALUES ('1', '18+ years old', 'preferrably was trained in the jedi arts before the age of 10, or sympethetic to the rebellion cause', 'the good guys');

INSERT INTO project_user_field ( project_id, target_demo_data, skill_data, description_data )
VALUES ('2', 'Old enough to be angry', 'Loyalty to your sith leader, as well as a lust for hatred and killing the innocent', 'the dark side');
    
    --Features

INSERT INTO project_feature ( project_id, feature_data )
VALUES ('1', 'Protecting the people, saving the galaxy, getting chicks... outside your own bloodline...');

INSERT INTO project_feature ( project_id, feature_data )
VALUES ('2', 'Gain ultimate power in the universe');

    --Views

INSERT INTO project_view ( project_id, name, image_url )
VALUES ('1', 'Good Guys Logo', 'https://i.ytimg.com/vi/9ak6l31HJ4c/maxresdefault.jpg');

INSERT INTO project_view ( project_id, name, image_url )
VALUES ('2', 'Dark Side Logo', 'http://secure.cdn1.wdpromedia.com/media/rundisney/global/events/runDisney_Icons_Website_SWHM_East200x200.png');

    --Controllers

INSERT INTO project_controller ( project_id, when_data, do_data, require_data )
VALUES ('1', 'The anger begins to flow through you', 'Just stop being angry', 'Force Sensitivity');

INSERT INTO project_controller ( project_id, when_data, do_data, require_data)
VALUES ('2', 'The anger begins to flow through you', 'Let the hatred make you more powerful', 'A black outfit');

    --Endpoint

        --Req Data--

INSERT INTO req_endpoint ( key_data, value_data )
VALUES ('Group 1 Key', 'REQ Value');

INSERT INTO req_endpoint ( key_data, value_data )
VALUES ('Group 2 Key', 'REQ Value');

        --Res Data--

INSERT INTO res_endpoint ( key_data, value_data )
VALUES ('Group 1 Key', 'RES Value');

INSERT INTO res_endpoint ( key_data, value_data )
VALUES ('Group 2 Key', 'RES Value');

        --Actual Endpoint--

INSERT INTO project_endpoint ( project_id, url_data, is_get, is_post, is_update, is_delete, req_endpoint_id, res_endpoint_id )
VALUES ('1', 'api/lightside', TRUE, FALSE, FALSE, FALSE, '1', '1');

INSERT INTO project_endpoint ( project_id, url_data, is_get, is_post, is_update, is_delete, req_endpoint_id, res_endpoint_id )
VALUES ('2', 'api/darkside', TRUE, FALSE, FALSE, FALSE, '2', '2');

    --Schema

        --Schema Table Name--
INSERT INTO project_schema_table ( table_name )
VALUES ('Rebellion');

INSERT INTO project_schema_table ( table_name )
VALUES ('DarkSide');

        --Schema Type--

INSERT INTO schema_type ( type_data )
VALUES ('Date');

INSERT INTO schema_type ( type_data )
VALUES ('Integer');

INSERT INTO schema_type ( type_data )
VALUES ('Text');

INSERT INTO schema_type ( type_data )
VALUES ('Varchar');

INSERT INTO schema_type ( type_data )
VALUES ('Char');


        --Actual Schema--    

INSERT INTO project_schema ( project_id, table_name_id, column_name, schema_type_id, size_data, is_primary_key, is_foreign_key, is_serial, is_not_null, is_unique)
VALUES ('1', '1', 'Jedi Masters', '3', 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE);

INSERT INTO project_schema ( project_id, table_name_id, column_name, schema_type_id, size_data, is_primary_key, is_foreign_key, is_serial, is_not_null, is_unique)
VALUES ('2', '2', 'Sith Lords', '4', 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE);

--------------------------------End of Project Test fields

--user_groups

INSERT INTO user_group ( user_id, group_id )
VALUES ('1', '1');

INSERT INTO user_group ( user_id, group_id )
VALUES ('2', '2');

INSERT INTO user_group ( user_id, group_id )
VALUES ('3', '3');

INSERT INTO user_group ( user_id, group_id )
VALUES ('4', '1');

INSERT INTO user_group ( user_id, group_id )
VALUES ('5', '1');

INSERT INTO user_group ( user_id, group_id )
VALUES ('6', '2');

INSERT INTO user_group ( user_id, group_id )
VALUES ('7', '1');

INSERT INTO user_group ( user_id, group_id )
VALUES ('8', '3');

INSERT INTO user_group ( user_id, group_id )
VALUES ('9', '1');

INSERT INTO user_group ( user_id, group_id )
VALUES ('10', '2');

--Roles

INSERT INTO roles ( roles )
VALUES ('admin');

INSERT INTO roles ( roles )
VALUES ('can_write');

INSERT INTO roles ( roles )
VALUES ('can_read');

--Group Projects

INSERT INTO group_project (group_id, project_id)
VALUES ('1','1');

INSERT INTO group_project (group_id, project_id)
VALUES ('3','1');

INSERT INTO group_project (group_id, project_id)
VALUES ('2','2');

--User Projects

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('1','1','2');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('2','1','3');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('3','1','3');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('4','1','2');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('5','1','2');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('7','1','2');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('8','1','3');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('9','1','2');


INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('2','2','1');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('6','2','1');

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES ('10','2','3');

--Tracker for Group 1

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','1', '1', 'views and routes', 'test views and routes tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','1', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','4', '3', 'test front end', 'test FE tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','4', '4', 'create end points', 'test endpoint tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','5', '5', 'move staged data from service to server', 'test server staged data tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','5', '6', 'test endpoints with postman', 'test postman tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','7', '7', 'test FE with server', 'test FE w/ server tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','7', '8', 'replace staged data with queries', 'test query tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','9', '9', 'test full stack w/ postman ', 'test full stack tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','9', '10', 'test end to end', 'test end to end tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('1','1', '11', 'get site hosted', 'test site hosted tracker data');

--Tracker for Group 2

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','2', '1', 'views and routes', 'test views and routes tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','2', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','2', '3', 'test front end', 'test FE tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','6', '4', 'create end points', 'test endpoint tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','6', '5', 'move staged data from service to server', 'test server staged data tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','6', '6', 'test endpoints with postman', 'test postman tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','10', '7', 'test FE with server', 'test FE w/ server tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','10', '8', 'replace staged data with queries', 'test query tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','10', '9', 'test full stack w/ postman ', 'test full stack tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','6', '10', 'test end to end', 'test end to end tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('2','2', '11', 'get site hosted', 'test site hosted tracker data');

--Tracker for Group 3

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '1', 'views and routes', 'test views and routes tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '3', 'test front end', 'test FE tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '4', 'create end points', 'test endpoint tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '5', 'move staged data from service to server', 'test server staged data tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','3', '6', 'test endpoints with postman', 'test postman tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','8', '7', 'test FE with server', 'test FE w/ server tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','8', '8', 'replace staged data with queries', 'test query tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','8', '9', 'test full stack w/ postman ', 'test full stack tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','8', '10', 'test end to end', 'test end to end tracker data');

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES ('3','8', '11', 'get site hosted', 'test site hosted tracker data');