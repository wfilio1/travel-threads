drop database if exists travel_threads;
create database travel_threads;
use travel_threads;

create table category (
    category_id int primary key auto_increment,
    category_name text not null
);

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table question (
	question_id int primary key auto_increment,
	question_title text null,
	question_input text null,
    app_user_id int null,
    category_id int null,
    constraint fk_question_app_user_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_question_category_category_id
		foreign key (category_id)
		references category(category_id)
);

create table answer (
	answer_id int primary key auto_increment,
	answer_input text null,
    app_user_id int null,
    question_id int null,
    constraint fk_answer_app_user_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_answer_question_question_id
		foreign key (question_id)
		references question(question_id)
);

insert into category (category_name) values
("General Travel Questions"),
("Destination-specific"),
("Travel Planning and Tips"),
("Accommodation and Transportation"),
("Travel Experiences and Stories");

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('wendy@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('nick@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sarah@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 1),
    (5, 1);


insert into question (question_title, question_input, app_user_id, category_id) values
	("Adventure Travel in Asia", "I'm planning a backpacking trip to Asia. Any recommendations for adventure activities?", 1, 1),
	("Local Food in Italy", "What are some must-try local dishes in Italy?", 2, 2),
	("Budget Travel Tips", "Looking for tips on traveling on a budget. Any advice?", 3, 3),
	("Solo Travel Destinations", "Best destinations for solo travelers?", 4, 4),
	("Family-Friendly Activities", "Any suggestions for family-friendly activities in Orlando?", 3, 5),
    ("Hiking in the Swiss Alps", "What are the best hiking trails in the Swiss Alps?", 3, 1),
	("Exploring Paris for the First Time", "Any recommendations for first-time visitors to Paris?", 4, 2),
	("Planning a Road Trip Across the USA", "Tips for planning a cross-country road trip in the USA?", 3, 3),
	("Traveling Alone in Southeast Asia", "Is Southeast Asia safe for solo travelers?", 4, 4),
	("Memorable Family Vacation Ideas", "Looking for unique family vacation ideas. Any suggestions?", 3, 5);


insert into answer (answer_input, app_user_id, question_id) values
	("I recommend hiking in the Himalayas and exploring the temples in Cambodia!", 3, 1),
	("You must try pizza, pasta, and gelato in Italy. They are delicious!", 4, 2),
	("When traveling on a budget, consider staying in hostels and using public transportation.", 4, 3),
	("Japan and New Zealand are great options for solo travelers.", 1, 4),
	("Visit Disney World and Universal Studios in Orlando for family-friendly fun!", 2, 5),
	("The Swiss Alps offer stunning trails like the Eiger Trail and the Haute Route.", 5, 6),
	("In Paris, don't miss the Eiffel Tower, Louvre Museum, and Montmartre!", 3, 7),
	("Plan your route, pack essentials, and explore iconic landmarks on your USA road trip.", 5, 8),
	("Southeast Asia is generally safe for solo travelers, but always stay cautious.", 1, 9),
	("Consider a road trip along the California coast or a visit to national parks.", 2, 10);

SELECT * FROM app_user;

SELECT * FROM answer;
