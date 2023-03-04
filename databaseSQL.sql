CREATE DATABASE instagram;

USE instagram;

CREATE TABLE USERS(
id BIGINT NOT NULL Auto_Increment,
userName varchar(25) NOT NULL,
email varchar(40) NOT NULL,
password varchar(100) NOT NULL,
created_at timestamp NOT NULL default Now(),
PRIMARY KEY(id),
unique(email),
unique(userName)
);

CREATE TABLE POST(
id bigint not null auto_increment,
user_id bigint not null,
caption varchar(1000),
image_count int,
primary key(id),
foreign key(user_id) references USERS(id)
);


CREATE TABLE photos (
id bigint not null auto_increment,
user_id bigint not null,
post_id bigint not null,
image_name varchar(200),
image_location varchar(200),
primary key(id),
foreign key(user_id) references USERS(id),
foreign key(post_id) references POST(id)
);

CREATE TABLE LIKEPOST (
id bigint not null auto_increment,
user_id bigint not null,
post_id bigint not null,
primary key (id),
foreign key(user_id) references USERS(id),
foreign key(post_id) references POST(id)
);

-- SELECT * FROM USERS;
-- SELECT * from post;
-- select * from photos;
-- select * from LIKEPOST;


-- DROP Table USERS;
-- DROP table POST;
-- drop table photos;
-- drop table likepost;

-- DROP database instagram;