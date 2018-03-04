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
    project_schema,
    project_schema_table,
    user_group,
    group_project,
    user_project,
    roles,
    tracker_card_order,
    tracker_list_order,
    tracker_card,
    tracker_list,
    project_backgrounds,
    avatar_gallery;

--Please keep the order of the CREATE TABLE inserts the same

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name TEXT
 );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT unique,
    avatar TEXT,
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
    background TEXT,
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
    controller_name TEXT,
    when_data TEXT,
    do_data TEXT,
    require_data TEXT
);

CREATE TABLE project_endpoint (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    endpoint_name TEXT,
    http_verb TEXT,
    url_data TEXT,
    response_data TEXT,
    request_data TEXT
);


CREATE TABLE project_schema(
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    schema_name TEXT,
    database_type TEXT,
    schema_data TEXT
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


CREATE TABLE tracker_list (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    list_name TEXT,
    list_order int
);

CREATE TABLE tracker_card (
    id SERIAL PRIMARY KEY,
    project_id int references project(id),
    card_name TEXT,
    card_data TEXT,
    card_order int,
    list_id int references tracker_list(id)
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

INSERT INTO users ( username, avatar, password, email, first_name, last_name, status_id )
VALUES
    ('RealChosenOne', 'https://randomfilmmusings.files.wordpress.com/2012/11/starwarsiv_269pyxurz.jpg', 'Reyismydaughter', 'luke@alliance.org', 'Luke', 'Skywalker', 1),
    ('HansPrincess', 'http://static.tumblr.com/8326525de0ae3af4467a279191afe30b/yrxly6x/ItHo0ikv1/tumblr_static_9e3ar048od8gk8kkk804s8gg0.jpg', 'ivealwaysknown', 'leia@alliance.org', 'Leia', 'Organa', 1),
    ('iShotfirst', 'http://screenrant.com/wp-content/uploads/Han-Solo-Shot-Greedo-First-Explained.jpg', '12parsecs', 'igotabadfeeling@alliance.org', 'Han', 'Solo', 1),
    ('beepbeepboop', 'https://i.ytimg.com/vi/8tjMM67-aao/maxresdefault.jpg', 'boopboopbop', 'artoo@alliance.org', 'R2', 'D2', 1),
    ('HumanCyborgRelations', 'http://2.bp.blogspot.com/-ovMA7ln5m3M/TfD1oWF3C0I/AAAAAAAADG4/nHa6GKWCN40/s1600/C3PO_really+shiny.jpg', 'beepboopsbuddy', 'dontwipemybrain@alliance.org', 'C3', 'PO', 1),
    ('DarthSidious', 'https://tse4.mm.bing.net/th?id=OIP.vEmsP46lePGBOZAkRtByPAHaE7&pid=Api', 'goodgood', 'emperor@empire.org', 'Sheev', 'Palpatine', 1),
    ('DarthVader', 'http://cdn.bgr.com/2015/08/darth-vader.jpg', 'deathstar4eva', 'vader@empire.org', 'Anakin', 'Skywalker', 1),
    ('badassbountyhunter', 'http://www.fanboy.com/wp-content/uploads/2014/01/bobafett.jpg', 'iDiedTooSoon', 'boba@empire.org', 'Boba', 'Fett', 1),
    ('commandingOfficer3', 'http://www.3dtotal.com/admin/new_cropper/gallery_736/2016-05-31(93600)_07_Tarkin.jpg', 'dontchokeme', 'tarkin@empire.org', 'Wilhuff', 'Tarkin', 1),
    ('YoDaMan', 'http://3.bp.blogspot.com/-EjBXTS5uf3Y/T3E35pN1QVI/AAAAAAAAD5c/B-wdtLyoyLk/s1600/2Yoda.jpg', 'thereisnotry', 'yoda@jedi.org', 'Minch', 'Yoda', 1),
    ('KenobiTheWan', 'https://www.heyuguys.com/images/2017/12/Obi-Wan-Kenobi.jpg', 'maulsux', 'ben@jedi.org', 'Obi-Wan', 'Kenobi', 1),
    ('pepperspray', 'http://nerdist.com/wp-content/uploads/2016/07/Mace-Windu.jpg', 'whatifitwaspurple', 'mace@jedi.org', 'Mace', 'Windu', 1),
    ('deathcheat', 'http://3.bp.blogspot.com/-pxyQe3o2NkE/ThpnVwYQ5iI/AAAAAAAAAB0/N1OvRBMn0rU/s1600/Qui-Goncloseup.jpg', 'forceghost1', 'jinn@jedi.org', 'Qui-gon', 'Jinn', 1),
    ('Slave1Owner', 'http://2.bp.blogspot.com/-wecvbksLwHo/TlznfMIvNWI/AAAAAAAADZA/ZaeK5tZZe_s/s1600/1488-jango-fett-430-531.jpeg', 'ihaveanarmy', 'jango@cis.org', 'Jango', 'Fett', 1),
    ('gunray', 'http://orig06.deviantart.net/22ec/f/2012/061/1/9/the_newt_and_nute_by_teq_uila-d4rivy0.png', 'isthatlegal', 'gunray@cis.org', 'Newt', 'Gunray', 1),
    ('DarthTyranus', 'https://lumiere-a.akamaihd.net/v1/images/Count-Dooku_4f552149.jpeg?region=0%2C45%2C1436%2C718', 'iamsaruman', 'thecount@cis.org', 'Christopher', 'Dooku', 1),
    ('DarthMaul', 'http://geektyrant.com/s/Darth_maul.jpg', 'imstillalive', 'dualsaber@cis.org', 'Talzin', 'Maul', 1),
    ('JediHunter', 'http://img.lum.dolimg.com/v1/images/open-uri20150608-27674-1empmi4_e1f04d9f.jpeg?region=0%2C0%2C1200%2C675', 'machinething', 'thegeneral@cis.org', 'Haroj', 'Grievous', 1)
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

INSERT INTO project ( name, background, author_id, status_id )
VALUES
    ('Defeat the Empire', 'http://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/25/17/Star-wars-5.jpg', 2, 1),
    ('Destroy the Rebels', 'https://www.walldevil.com/wallpapers/a24/star-wars-wallpaper-sandbox-cigarette-lol-house-paper-dark-smoking-light-lightnings-images-saber.jpg', 7, 1),
    ('Preserve the Republic', 'https://cdn.europosters.eu/image/1300/40110.jpg', 10, 1),
    ('Achieve Independence', 'https://images3.alphacoders.com/114/11439.jpg', 7, 1)
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
    (1, 'Test', 'https://i.ytimg.com/vi/9ak6l31HJ4c/maxresdefault.jpg'),
    (1, 'Cool Beans', 'boobs'),
    (2, 'Empire Logo', 'http://secure.cdn1.wdpromedia.com/media/rundisney/global/events/runDisney_Icons_Website_SWHM_East200x200.png'),
    (3, 'Jedi Logo', 'https://vignette.wikia.nocookie.net/starwars/images/9/9d/Jedi_symbol.svg/revision/latest/scale-to-width-down/499?cb=20080329163323'),
    (4, 'Separatist Logo', 'https://vignette.wikia.nocookie.net/starwars/images/3/34/CIS_roundel.svg/revision/latest/scale-to-width-down/500?cb=20090330010802')
;

    --Controllers

INSERT INTO project_controller ( project_id, controller_name, when_data, do_data, require_data )
VALUES
    (1, 'Alliance Logo', 'Coming out of hyperspace', 'Check for a trap', 'no backup plan'),
    (2, 'Empire Logo', 'The anger begins to flow through you', 'Let the hatred make you more powerful', 'a black outfit'),
    (3, 'Jedi Logo', 'Unsure what to do', 'Use the force', 'a calm mind'),
    (4, 'Separatist Logo', 'Jedi are attacking', 'Run into danger', 'no free will')
;

    --Endpoint

        --Actual Endpoint--

INSERT INTO project_endpoint ( project_id, endpoint_name, http_verb, url_data, response_data, request_data )
VALUES
    (1, 'Get all users', 'GET', 'api/alliance/users', 'Yo I am a gangster', 'I party like a rockstar'),
    (1, 'Meow', 'PUT', 'api/kittenmittens', 'Everyday is Caturday', 'You got to be kitten me right meow'),
    (2, 'Get all people', 'POST', 'api/alliance/users', 'I am not even a person', 'party party party'),
    (3, 'Get all homies', 'PUT', 'api/alliance/users', 'Stay gangster dawg', 'They call me 50 Shades of Cray')
;

    --Schema


INSERT INTO project_schema (project_id, schema_name, database_type, schema_data)
VALUES
    (1,'select.sql', 'SQL', 'select * from users;'),
    (2,'insert.sql', 'mongo', 'select * from cats;'),
    (1,'drop.sql', 'SQL', 'select * from dogs;')
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
    (7, 2, 1),
    (7, 4, 1),
    (8, 4, 3),
    (9, 4, 3)
;

--Tracker



INSERT INTO tracker_list ( project_id, list_name, list_order )
VALUES
    (1, 'ToDo', 1),
    (1, 'In Process', 2),
    (1, 'Backlog', 3),
    (1, 'Needs Approval', 4),
    (1, 'Done', 5),
    (2, 'ToDo' ,1),
    (2, 'In Process', 2),
    (2, 'Backlog', 3),
    (2, 'Needs Approval', 4),
    (2, 'Done', 5),
    (3, 'ToDo', 1),
    (3, 'In Process', 2),
    (3, 'Backlog', 3),
    (3, 'Needs Approval', 4),
    (3, 'Done', 5)
;

INSERT INTO tracker_card ( project_id, card_name, card_data, card_order, list_id )
VALUES
    (2, 'Find Vader', 'data', 1, 6),
    (2, 'Find the Emporer', 'data', 2, 6),
    (2, 'Use the Force', 'data', 3, 6),
    (2, 'Kill both', 'data', 4, 6),
    (2, 'Restore peace and balance ', 'data', 5, 6),
    (2, 'Find Luke', 'data', 1, 7),
    (2, 'Find the resistance', 'data', 2, 7),
    (2, 'Kill everyone', 'data', 3, 7),
    (2, 'Enslave the universe', 'data', 4, 7),
    (2, 'get home in time for lunch', 'data', 5, 7),
    (2, 'Find the Chosen One', 'data', 1, 8),
    (2, 'Bring balance to the force', 'data', 2, 8),
    (2, 'Follow the Jedi Code', 'data', 3, 8),
    (2, 'Train younglings', 'data', 4, 8),
    (2, 'Take over the universe ', 'data', 5, 8)
;














--Landons Playground
-- Project Backgrounds
    CREATE TABLE project_backgrounds (
        id SERIAL PRIMARY KEY,
        creator_name TEXT,
        background_url TEXT,
        portfolio TEXT
    );

    INSERT INTO project_backgrounds (creator_name, background_url, portfolio)
    VALUES
        ('Landon Johnson', 'https://res.cloudinary.com/landonwebdev/image/upload/v1518998907/Appr/backgrounds/Thistle-House-Utah.jpg', 'http://bit.ly/landonwjohnson-on-behance'),
        ('Landon Johnson', 'https://res.cloudinary.com/landonwebdev/image/upload/v1518998907/Appr/backgrounds/Hot-Springs-Utah.jpg', 'http://bit.ly/landonwjohnson-on-behance'),
        ('Lucas Arts', 'https://wallpapercave.com/wp/wp1810894.jpg', 'www.starwars.com'),
        ('Bungie', 'https://wallpapercave.com/wp/L5XxF4q.jpg', 'www.bungie.net'),
        ('Nintendo', 'https://i2.wp.com/pswallpapers.com/wp-content/uploads/2017/03/The-Legend-of-Zelda-Breath-of-the-Wild-1080-Main-1.jpg', 'www.nintendo.com'),
        ('Bioshock', 'https://images3.alphacoders.com/114/114869.jpg', 'www.bioshock.com')
    ;

-- Avatar Gallery

    CREATE TABLE avatar_gallery (
        id SERIAL PRIMARY KEY,
        creator_name TEXT,
        avatar_url TEXT,
        portfolio TEXT
    );

    INSERT INTO avatar_gallery (creator_name, avatar_url, portfolio)
    VALUES
        ('Landon Johnson', 'http://res.cloudinary.com/landonwebdev/image/upload/v1518998847/Appr/avatars/mastercheif_avatar.svg', 'http://bit.ly/landonwjohnson-on-behance'),
        ('Landon Johnson', 'http://res.cloudinary.com/landonwebdev/image/upload/v1518998847/Appr/avatars/link_avatar.svg', 'http://bit.ly/landonwjohnson-on-behance'),
        ('Landon Johnson', 'http://res.cloudinary.com/landonwebdev/image/upload/v1518998878/Appr/banjokazooie_avatar.svg', 'http://bit.ly/landonwjohnson-on-behance'),
        ('Landon Johnson', 'http://res.cloudinary.com/landonwebdev/image/upload/v1518999678/Appr/sonic_avatar.svg', 'http://bit.ly/landonwjohnson-on-behance')
    ;