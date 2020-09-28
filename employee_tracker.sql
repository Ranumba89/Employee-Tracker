DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;

drop table roles ;
drop table department;
drop table employees;

CREATE TABLE department (
id INTEGER AUTO_INCREMENT NOT NULL,
DNAME  VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR (30),
salary DECIMAL (10,4),
department_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
id INTEGER AUTO_INCREMENT NOT NULL,
PRIMARY KEY (id),
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO department ( DNAME)
VALUES ( "sales"), ("engineering"), ( "finance"),("legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("sales lead",10000, 1), ("salesperson",80000, 2), ("lead engineer",150000, 3), ("software engineer",120000, 4), 
("accountant",125000, 2), ("legal team lead",250000, 4), ("lawyer",190000, 3);

INSERT INTO employees (first_name, last_name, role_id )
VALUES ("Bill", "Nye",5),("Danielle", "Jones", 1), ("Mark", "Jackson", 7),("Jill", "Scott", 2),("Annibale", "Harris", 1), 
("Ray", "Charles", 7),("Kevin", "Love", 4);

select id from employees where first_name = "Kevin";
UPDATE employees
SET manager_id = 10
WHERE id = 13;

Select e.id, e.first_name, e.last_name, r.title,d.dname, r.salary, m.first_name as mgr_first_name, m.last_name as mgr_last_name from employees as e 
INNER JOIN roles as r ON r.id = e.role_id
inner join department as d on d.id = r.department_id
inner join employees as m on m.id = e.manager_id;

Select e.id, e.first_name, e.last_name, r.title,d.dname, r.salary, m.first_name as mgr_first_name, m.last_name as mgr_last_name from employees as e 
INNER JOIN roles as r ON r.id = e.role_id
inner join department as d on d.id = r.department_id
inner join employees as m on m.id = e.manager_id;

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;
