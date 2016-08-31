USE hoot;

CREATE TABLE Message (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    body VARCHAR(500),
    senderId INT,
    parentMessageId INT,
    originChannelId INT,
    messageCreated timestamp DEFAULT NOW()
);

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(15),
    lastname VARCHAR(15),
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(30),
    default_channel VARCHAR(20),
    is_active VARCHAR(20),
    users_created timestamp DEFAULT NOW()
);

CREATE TABLE Channel (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE GroupRoom (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    isActive INT,
    group_created timestamp DEFAULT NOW()
);

CREATE TABLE UserGroup (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    GROUPID INT,
    group_created timestamp DEFAULT NOW()
);

CREATE TABLE Contacts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userOne VARCHAR(30),
    userTwo VARCHAR(30),
);
