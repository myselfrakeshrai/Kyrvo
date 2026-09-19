--Test admin: test@test.com password: Test123--
INSERT OR IGNORE INTO User Values ('c71122df-18e4-4a78-a446-fbf7b8f29691', 'Test', 'Admin','123456789', 'test@test.com', '3be0d17c08b62e44a0135a16ff8599b796609e7f7c3fcaced6d3582dad0f0a4b', 'system_admin', "0", "1", '6997ae38-6255-4a05-a674-ef4b03dc3dc4', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP');


--Basic roles--
INSERT OR IGNORE INTO Roles Values ('system_admin', 'Super User', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Roles Values ('admin', 'System Admin', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Roles Values ('help_desk', 'Helpdesk user', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Roles Values ('agency', 'Agency user', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Roles Values ('agent', 'Agent user', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Roles Values ('user', 'Public user', 'Manage system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

--permissions----
INSERT OR IGNORE INTO Permissions Values ('1', 'system_admin', 'dashboard', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('2', 'system_admin', 'users',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('3', 'system_admin', 'permissions',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('4', 'system_admin', 'vehicles',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('5', 'vehicletypes', 'vehicles',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('6', 'system_admin', 'pricing',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('7', 'system_admin', 'agencies',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('8', 'system_admin', 'agents',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('9', 'system_admin', 'reservations',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('10', 'system_admin', 'cms',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('11', 'system_admin', 'roles',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('12', 'system_admin', 'features',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('13', 'system_admin', 'blogs',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('15', 'system_admin', 'events',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('16', 'system_admin', 'contactus',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('17', 'system_admin', 'collections',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Permissions Values ('18', 'system_admin', 'photoalbums',3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

--features--
INSERT OR IGNORE INTO features Values ('dashboard', 'Dashboard', 'Dashboard of the system',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('vehicles', 'Vehicles', 'Manage vehicles',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('vehicletypes', 'Vehicle types', 'Manage vehicle types',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('users', 'Users', 'Manage users',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('permissions', 'Permissions', 'Manage permissions',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('pricing', 'Pricings', 'Manage pricings',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('agencies', 'Agencies', 'Manage agencies',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('agents', 'Agents', 'Manage agents',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('reservations', 'Reservations', 'Manage reservations',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('cms', 'Content Managment', 'Manage website content',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('roles', 'User Roles', 'Manage user roles',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('features', 'App Features', 'Manage app features',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO features Values ('blogs', 'Manage blog post', 'Manage blog post',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('contactus', 'Manage Contact Us', 'Manage Contact Us',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('collections', 'Manage Collections', 'Manage Collections',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('contactus', 'Manae Contact Us', 'Manage Contact Us',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO features Values ('photoalbums', 'Photo Album', 'Manage Photo Albums',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


-- app variables--
INSERT OR IGNORE INTO Variables Values("AppName", "System Name", "Kyrvo", "Text", "App Name", "Master", CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("LogoPrimary", "Primary logo", "Primary logo", "Image", "", "Master",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("LogoSecondary", "Secondary log", "Secondary logo", "Image", "", "Master",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("PrimaryColor", "System Name", "App name", "Color", "#f00", "Master",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("SecondaryColor", "System Name", "App name", "Color", "#500", "Master",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("TertiaryColor", "System Name", "App name", "Color", "#fff", "Master",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT OR IGNORE INTO Variables Values("Slider", "System Name", "App Name", "json", '{ "slides": [{"Title": "Slider Title 1", "Subtitle": "Slider Subtitle 1", "Description": "This is the test Description", "ButtonLabel": "Goto", "TitleColor": "#000fff", "SubtitleColor": "#000fff", "Image": "https://placehold.co/1400x650", "ButtonUrl": "/button"}]}', "Master", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
