DROP DATABASE if exists bookworm;

CREATE DATABASE bookworm
DEFAULT CHARACTER set utf8
COLLATE utf8_hungarian_ci;

use bookworm;

CREATE TABLE books(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(255),
    author VARCHAR(255)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user'
);

INSERT INTO users (username,email,password,role)
VALUES
("admin","admin@admin.hu","$argon2i$v=19$m=16,t=2,p=1$MERDNmhDb09FaEVsOHg0YQ$vhnGEje4mdpwGNymOY44eQ","admin");