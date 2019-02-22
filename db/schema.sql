CREATE DATABASE activities_db;
USE activities_db;

CREATE TABLE activities(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  activity_name VARCHAR(100),
  --format for datertime "MM-DD HH:MM"--
  datetime  VARCHAR(100),
  duration VARCHAR(100),
  PRIMARY KEY (id)
);