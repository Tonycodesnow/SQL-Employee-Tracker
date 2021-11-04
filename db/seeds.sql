INSERT INTO department (department_name)
VALUES 
('engineer'),
 ('sales'),
  ('marketing'),
   ('finance'),
    ('hr');

INSERT INTO role (title, salary, department_id) 
VALUES 
('Engineer', 90000, 1),
 ('Sales', 80000, 2),
  ('Marketing', 70000, 3),
   ('Finance', 100000, 4),
    ('HR', 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Antonio', 'Banderez', 1,NULL),
('Juan', 'DelaCruz', 2,NULL),
('Lucy', 'Smith', 3, 3),
('Jose', 'Rizal', 4, 1),
('Mary', 'Jane', 5,NULL);