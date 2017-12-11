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
VALUES
    ('active'),
    ('inactive'),
    ('deleted')
;

--User Table

INSERT INTO users ( username, password, email, first_name, last_name, status_id )
VALUES
    ('RealChosenOne', 'Reyismydaughter', 'luke@alliance.org', 'Luke', 'Skywalker', 1),
    ('HansPrincess', 'ivealwaysknown', 'leia@alliance.org', 'Leia', 'Organa', 1),
    ('iShotfirst', '12parsecs', 'igotabadfeeling@alliance.org', 'Han', 'Solo', 1),
    ('beepbeepboop', 'boopboopbop', 'artoo@alliance.org', 'R2', 'D2', 1),
    ('HumanCyborgRelations', 'beepboopsbuddy', 'dontwipemybrain@alliance.org', 'C3', 'PO', 1),
    ('DarthSidious', 'goodgood', 'emperor@empire.org', 'Sheev', 'Palpatine', 1),
    ('DarthVader', 'deathstar4eva', 'vader@empire.org', 'Anakin', 'Skywalker', 1),
    ('badassbountyhunter', 'iDiedTooSoon', 'boba@empire.org', 'Boba', 'Fett', 1),
    ('commandingOfficer3', 'dontchokeme', 'tarkin@empire.org', 'Wilhuff', 'Tarkin', 1),
    ('YoDaMan', 'thereisnotry', 'yoda@jedi.org', 'Minch', 'Yoda', 1),
    ('KenobiTheWan', 'maulsux', 'ben@jedi.org', 'Obi-Wan', 'Kenobi', 1),
    ('pepperspray', 'whatifitwaspurple', 'mace@jedi.org', 'Mace', 'Windu', 1),
    ('deathcheat', 'forceghost1', 'jinn@jedi.org', 'Qui-gon', 'Jinn', 1),
    ('Slave1Owner', 'ihaveanarmy', 'jango@cis.org', 'Jango', 'Fett', 1),
    ('gunray', 'isthatlegal', 'gunray@cis.org', 'Newt', 'Gunray', 1),
    ('DarthTyranus', 'iamsaruman', 'thecount@cis.org', 'Christopher', 'Dooku', 1),
    ('DarthMaul', 'imstillalive', 'dualsaber@cis.org', 'Talzin', 'Maul', 1),
    ('JediHunter', 'machinething', 'thegeneral@cis.org', 'Haroj', 'Grievous', 1)
;

--Groups

INSERT INTO groups ( name, created_by, status_id )
VALUES
    ('The Rebel Alliance', 2, 1),
    ('The First Galactic Empire', 6, 1),
    ('The Jedi Order', 6, 1),
    ('Confederacy of Independent Systems', 15, 1)
;

--Projects

INSERT INTO project ( name, author_id, status_id )
VALUES
    ('Defeat the Empire', 2, 1),
    ('Destroy the Rebels', 6, 1),
    ('Preserve the Republic', 10, 1),
    ('Achieve Independence', 15, 1)
;

---------------------------------Test Project Fields

    --Ideas

INSERT INTO project_idea ( project_id, idea_data )
VALUES
    (1, 'Blow up Bigger Death Star'),
    (1, 'Blow up Death Star'),
    (2, 'Finish Construction on Bigger Death Star'),
    (2, 'Destroy the rebel base on Yavin 4'),
    (2, 'Commission a Grand Army of the Republic'),
    (3, 'Eliminate the Sith threat'),
    (3, 'Apply force when needed'),
    (4, 'Establish strong military presence in the outer ring'),
    (4, 'Coerce the Senate to give us independence')
;

    --User Field

INSERT INTO project_user_field ( project_id, target_demo_data, skill_data, description_data )
VALUES
    (1, 'Jedi', 'lightsaber and dipolmacy', 'patient'),
    (1, 'Rebel', 'blaster', 'quick'),
    (1, 'Droid', 'utility', 'handy'),
    (1, 'Wookie', 'crossbow', 'powerful'),
    (2, 'Sith', 'lightsaber and intimidation', 'passionate'),
    (2, 'Stormtrooper', 'cannot hit the broad side of a transport', 'obedient'),
    (2, 'Bounty hunter', 'blaster', 'ruthless'),
    (2, 'Sellout', 'cannon fodder', 'expendable'),
    (3, 'Jedi', 'lightsaber and dipolmacy', 'patient'),
    (4, 'Droid', 'programmed', 'cheap')
;
    
    --Features

INSERT INTO project_feature ( project_id, feature_data )
VALUES
    (1, 'Saving the galaxy'),
    (1, 'Protecting the people'),
    (1, 'Getting chicks... outside your own bloodline...'),
    (2, 'Gain ultimate power in the universe'),
    (2, 'Provide cookies'),
    (3, 'Maintain peace'),
    (3, 'Establish justice'),
    (4, '$$$$$$$$$$$$$'),
    (4, 'Freedom')
;

    --Views

INSERT INTO project_view ( project_id, name, image_url )
VALUES
    (1, 'Alliance Logo', 'https://i.ytimg.com/vi/9ak6l31HJ4c/maxresdefault.jpg'),
    (2, 'Empire Logo', 'http://secure.cdn1.wdpromedia.com/media/rundisney/global/events/runDisney_Icons_Website_SWHM_East200x200.png'),
    (3, 'Jedi Logo', 'https://vignette.wikia.nocookie.net/starwars/images/9/9d/Jedi_symbol.svg/revision/latest/scale-to-width-down/499?cb=20080329163323'),
    (4, 'Separatist Logo', 'https://vignette.wikia.nocookie.net/starwars/images/3/34/CIS_roundel.svg/revision/latest/scale-to-width-down/500?cb=20090330010802')
;

    --Controllers

INSERT INTO project_controller ( project_id, when_data, do_data, require_data )
VALUES
    (1, 'Coming out of hyperspace', 'Check for a trap', 'no backup plan'),
    (2, 'The anger begins to flow through you', 'Let the hatred make you more powerful', 'a black outfit'),
    (3, 'Unsure what to do', 'Use the force', 'a calm mind'),
    (4, 'Jedi are attacking', 'Run into danger', 'no free will')
;

    --Endpoint

        --Req Data--

INSERT INTO req_endpoint ( key_data, value_data )
VALUES
    ('Group 1 Key', 'REQ Value'),
    ('Group 2 Key', 'REQ Value'),
    ('Group 3 Key', 'REQ Value'),
    ('Group 4 Key', 'REQ Value')
;

        --Res Data--

INSERT INTO res_endpoint ( key_data, value_data )
VALUES
    ('Group 1 Key', 'RES Value'),
    ('Group 2 Key', 'RES Value'),
    ('Group 3 Key', 'RES Value'),
    ('Group 4 Key', 'RES Value')
;

        --Actual Endpoint--

INSERT INTO project_endpoint ( project_id, url_data, is_get, is_post, is_update, is_delete, req_endpoint_id, res_endpoint_id )
VALUES
    (1, 'api/alliance', TRUE, FALSE, FALSE, FALSE, 1, 1),
    (2, 'api/empire', TRUE, FALSE, FALSE, FALSE, 2, 2),
    (2, 'api/jedi', TRUE, FALSE, FALSE, FALSE, 2, 2),
    (2, 'api/cis', TRUE, FALSE, FALSE, FALSE, 2, 2)
;

    --Schema

        --Schema Table Name--
INSERT INTO project_schema_table ( table_name )
VALUES
    ('Alliance'),
    ('Empire'),
    ('Jedi'),
    ('Confederacy')
;

        --Schema Type--

INSERT INTO schema_type ( type_data )
VALUES
    ('Date'),
    ('Integer'),
    ('Text'),
    ('Varchar'),
    ('Char')
;


        --Actual Schema--    

INSERT INTO project_schema ( project_id, table_name_id, column_name, schema_type_id, size_data, is_primary_key, is_foreign_key, is_serial, is_not_null, is_unique)
VALUES
    (1, 1, 'Rebels', 3, 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE),
    (2, 2, 'Sith Lords', 3, 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE),
    (3, 3, 'Jedi Masters', 3, 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE),
    (4, 4, 'Separatists', 3, 'No limit', FALSE, FALSE, FALSE, TRUE, FALSE)
;

--------------------------------End of Project Test fields

--user_groups

INSERT INTO user_group ( user_id, group_id )
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 2),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 3),
    (14, 4),
    (15, 4),
    (16, 4),
    (17, 4),
    (18, 4)
;

--Roles

INSERT INTO roles ( roles )
VALUES
    ('admin'),
    ('can_write'),
    ('can_read')
;

--Group Projects

INSERT INTO group_project (group_id, project_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4)
;

--User Projects

INSERT INTO user_project ( user_id, project_id, roles_id )
VALUES
    (1, 3, 3),
    (2, 3, 3),
    (3, 3, 3),
    (4, 3, 3),
    (5, 3, 3),
    (6, 4, 1),
    (7, 3, 3),
    (7, 4, 3),
    (8, 4, 3),
    (9, 4, 3)
;

--Tracker for Group 1

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES
    ('1','1', '1', 'views and routes', 'test views and routes tracker data'),
    ('1','1', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data'),
    ('1','4', '3', 'test front end', 'test FE tracker data'),
    ('1','4', '4', 'create end points', 'test endpoint tracker data'),
    ('1','5', '5', 'move staged data from service to server', 'test server staged data tracker data'),
    ('1','5', '6', 'test endpoints with postman', 'test postman tracker data'),
    ('1','7', '7', 'test FE with server', 'test FE w/ server tracker data'),
    ('1','7', '8', 'replace staged data with queries', 'test query tracker data'),
    ('1','9', '9', 'test full stack w/ postman ', 'test full stack tracker data'),
    ('1','9', '10', 'test end to end', 'test end to end tracker data'),
    ('1','1', '11', 'get site hosted', 'test site hosted tracker data')
;

--Tracker for Group 2

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES
    ('2','2', '1', 'views and routes', 'test views and routes tracker data'),
    ('2','2', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data'),
    ('2','2', '3', 'test front end', 'test FE tracker data'),
    ('2','6', '4', 'create end points', 'test endpoint tracker data'),
    ('2','6', '5', 'move staged data from service to server', 'test server staged data tracker data'),
    ('2','6', '6', 'test endpoints with postman', 'test postman tracker data'),
    ('2','10', '7', 'test FE with server', 'test FE w/ server tracker data'),
    ('2','10', '8', 'replace staged data with queries', 'test query tracker data'),
    ('2','10', '9', 'test full stack w/ postman ', 'test full stack tracker data'),
    ('2','6', '10', 'test end to end', 'test end to end tracker data'),
    ('2','2', '11', 'get site hosted', 'test site hosted tracker data')
;

--Tracker for Group 3

INSERT INTO tracker ( group_id, user_id, tracker_order, tracker_name, tracker_data) 
VALUES
    ('3','3', '1', 'views and routes', 'test views and routes tracker data'),
    ('3','3', '2', 'controllers and services with staged data in services', 'test controllers and services tracker data'),
    ('3','3', '3', 'test front end', 'test FE tracker data'),
    ('3','3', '4', 'create end points', 'test endpoint tracker data'),
    ('3','3', '5', 'move staged data from service to server', 'test server staged data tracker data'),
    ('3','3', '6', 'test endpoints with postman', 'test postman tracker data'),
    ('3','8', '7', 'test FE with server', 'test FE w/ server tracker data'),
    ('3','8', '8', 'replace staged data with queries', 'test query tracker data'),
    ('3','8', '9', 'test full stack w/ postman ', 'test full stack tracker data'),
    ('3','8', '10', 'test end to end', 'test end to end tracker data'),
    ('3','8', '11', 'get site hosted', 'test site hosted tracker data')
;