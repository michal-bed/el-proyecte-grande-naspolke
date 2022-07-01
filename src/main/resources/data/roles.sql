INSERT INTO role_table (role_id, role_type) VALUES (1, 'OWNER');
INSERT INTO role_table (role_id, role_type) VALUES (2, 'EDITOR');
INSERT INTO role_table (role_id, role_type) VALUES (3, 'READER');


INSERT INTO user_table (user_id, enabled, token_expired, user_email, user_name, user_password, user_surname) VALUES
        ('80eb357d-849f-4e09-8925-57949e576f61', true, false, 'spaceavocado34@gmail.com', 'Kuba', '$2a$10$Mp01VI9lItdHIBPu8pTgj.9m9xttlkUHmvUFgjFxL3g/p4UMa0QHa', 'Bogacki');

INSERT INTO user_table (user_id, enabled, token_expired, user_email, user_name, user_password, user_surname) VALUES
    ('ab702117-f21d-4b79-bea8-a47a6cc99dc7', true, false, 'kubik3.4@wp.pl', 'Jakub', '$2a$10$Mp01VI9lItdHIBPu8pTgj.9m9xttlkUHmvUFgjFxL3g/p4UMa0QHa', 'Bogucki');
