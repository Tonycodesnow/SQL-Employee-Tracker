INSERT INTO departments(department_name)
VALUES 
('engineer'),
 ('sales'),
  ('marketing'),
   ('finance'),
    ('hr');

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES 
('Antonio', 'Huerta', 1, 2),
('Juan', 'DelaCruz', 2, 0),
('Lucy', 'Smith', 3, 3),
('Jose', 'Rizal', 4, 1),
('Mary', 'Jane', 5, 0);

INSERT INTO roles(title, salary, department_id) 
VALUES 
('Engineer', 50000, 1),
 ('Sales', 60000, 2),
  ('Marketing', 70000, 3),
   ('Finance', 80000, 4),
    ('HR', 90000, 5);