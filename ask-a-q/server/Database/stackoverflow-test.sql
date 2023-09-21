drop database if exists travel_threads_test;
create database travel_threads_test;
use travel_threads_test;

-- create tables and relationships for testing
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

delimiter //
create procedure set_known_good_state()
begin

	delete from answer;
    alter table answer auto_increment = 1;
	delete from question;
    alter table question auto_increment = 1;
	delete from app_user_role;
	delete from app_user;
	alter table app_user auto_increment = 1;
	delete from app_role;
    alter table app_role auto_increment = 1;



	insert into category (category_name) values
    ("General Travel Questions"),
    ("Destination-specific"),
    ("Travel Planning and Tips"),
    ("Accommodation and Transportation"),
    ("Travel Experiences and Stories");

    insert into app_role (`name`) values
		('USER'),
		('ADMIN');

	insert into app_user (username, password_hash, enabled) values
		('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
		('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);


	insert into app_user_role (app_user_id, app_role_id) values
		(1, 2),
		(2, 1);

    insert into question (question_title, question_input, app_user_id, category_id) values
	('Test Question Title 1', 'Question 1 Input', 1, 1),
	('Test Question Title 2', 'Question 2 Input', 2, 2);

	insert into answer (answer_input, app_user_id, question_id) values
		('Answer 1 Input', 2, 1),
		('Answer 2 Input', 1, 2),
		('Answer 2 Input', 1, 2);



end //
-- 4. Change the statement terminator back to the original.
delimiter ;

SELECT * FROM app_role;