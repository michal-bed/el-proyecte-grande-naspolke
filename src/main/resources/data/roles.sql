INSERT INTO role_table (role_id, role_type) VALUES (1, 'OWNER');
INSERT INTO role_table (role_id, role_type) VALUES (2, 'EDITOR');
INSERT INTO role_table (role_id, role_type) VALUES (3, 'READER');

INSERT INTO user_table (user_id, enabled, token_expired, user_email, user_name, user_password, user_surname) VALUES
    ('5bd0f8e1-adf1-4c4d-ac6f-119ece595f3d', true, false, 'kubik3.4@wp.pl', 'Jakub', '$2a$10$RGZ46hYsi6S0W09jyfYqweMk1SYlUloUW3vVfrZqvfo6mZphWQXq2', 'Bogacki');

--1234 -> hasło
