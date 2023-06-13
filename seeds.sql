INSERT INTO department (id, d_name)
VALUES (1, 'Manager'),
       (2, 'Kitchen'),
       (3, 'Front Of House');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'General Manager', 90000, 1),
       (2, 'Kitchen Manager', 60000, 1),
       (3, 'Front of House Manager', 60000, 1),
       (4, 'Line Cook', 18000, 2),
       (5, 'Server', 9000, 3),
       (6, 'Host', 17000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
       (2, 'Jane', 'Doe', 2, 1),
       (3, 'Bob', 'Smith', 2, 1),
       (4, 'Mike', 'Johnson', 1, NULL),
       (5, 'Samantha', 'Lee', 6, 4),
       (6, 'Tom', 'Wilson', 6, 4),
       (7, 'Alice', 'Kim', 1, NULL),
       (8, 'Karen', 'Chen', 3, 7),
       (9, 'David', 'Brown', 3, 7);