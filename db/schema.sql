DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    -- PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary decimal(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    -- PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    -- PRIMARY KEY (id)
);
