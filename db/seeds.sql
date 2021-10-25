INSERT INTO department(department_name)
VALUES 
('engineer'),
 ('sales'),
  ('marketing'),
   ('finance'),
    ('hr');

INSERT INTO employee(first_name, last_name, email, role_id)
VALUES 
('Antonio', 'Huerta', 'Antonio@live.com', 1),
 ('Juan', 'Dela Cruz', 'JuanD@live.com', 2),
  ('Lucy', 'Smith', 'Lucy1@rock.com', 3),
   ('Jose', 'Rizal', 'RizalJ@gmail.com', 4),
    ('Mary', 'Jane', 'MJ@spidey.com', 5);

INSERT INTO role(title, salary, department_id) 
VALUES 
('Engineer', 50000, 1),
 ('Sales', 60000, 2),
  ('Marketing', 70000, 3),
   ('Finance', 80000, 4),
    ('HR', 90000, 5);