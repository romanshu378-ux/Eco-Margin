USE ecomargin_db;

-- 1. Seed Admins (Password is 'Ecomargin@2024' hashed using bcrypt)
INSERT INTO admins (name, email, password_hash, role) VALUES 
('Super Admin', 'admin2026@ecomargin.in', '$2a$12$w/00PE8GX0uB.HGPR.zTk.5p8mpTw8L/21bBHy0iGWTpwBjuuKmRm', 'superadmin');

-- 2. Seed Users
INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES 
('John', 'Doe', 'john@example.com', '$2a$12$N9uYtW7H/D5G/R0u0Q7B3Oi1A/YtFvP9mO6Q9/h3H2/L8/7xG4u5G', '+1234567890'),
('Jane', 'Smith', 'jane@example.com', '$2a$12$N9uYtW7H/D5G/R0u0Q7B3Oi1A/YtFvP9mO6Q9/h3H2/L8/7xG4u5G', '+0987654321');

-- 3. Seed Categories
INSERT INTO categories (name, slug, description) VALUES 
('Software Solutions', 'software-solutions', 'Cloud-based CSMS and mobile applications.'),
('Hardware', 'hardware', 'DC Fast Chargers and AC Destination Chargers.'),
('Services', 'services', 'Installation, maintenance, and consulting.');

-- 4. Seed Products
INSERT INTO products (category_id, name, slug, description, price) VALUES 
(1, 'EcoMargin CSMS Cloud', 'csms-cloud', 'Enterprise-grade charging station management system.', 499.00),
(2, 'EcoCharge 150kW DC', 'ecocharge-150kw', 'Ultra-fast DC charger for highways.', 25000.00),
(2, 'EcoWall 22kW AC', 'ecowall-22kw', 'Smart destination charger for retail and real estate.', 1200.00);

-- 5. Seed Blogs
INSERT INTO blogs (author_id, title, slug, content, excerpt, status) VALUES 
(1, 'The Future of V2G Technology', 'future-of-v2g', '<p>Full article content here.</p>', 'How Vehicle-to-Grid will change the energy sector.', 'published'),
(1, 'OCPP 2.0.1 Explained', 'ocpp-2-0-1-explained', '<p>Understanding the standard.</p>', 'Everything you need to know about the latest Open Charge Point Protocol.', 'published');

-- 6. Seed Gallery
INSERT INTO gallery (title, image_url, category) VALUES 
('CSMS Dashboard', '/uploads/gallery/csms.png', 'software'),
('Highway Installation', '/uploads/gallery/highway.jpg', 'hardware');

-- 7. Seed Projects
INSERT INTO projects (title, slug, client_name, scope) VALUES 
('Metro City Hub', 'metro-city-hub', 'Metro Transit Authority', '50x 150kW DC Chargers'),
('EcoRetail Network', 'ecoretail-network', 'EcoRetail Group', '120x 22kW AC Chargers');

-- 8. Seed Website Settings
INSERT INTO website_settings (setting_key, setting_value) VALUES 
('site_name', 'EcoMargin'),
('contact_email', 'hello@ecomargin.com'),
('support_phone', '+91-99999-99999'),
('social_linkedin', 'https://linkedin.com/company/ecomargin');

-- 9. Seed SEO
INSERT INTO seo (page_route, meta_title, meta_description) VALUES 
('/', 'EcoMargin | Intelligent EV Charging Platform', 'The ultimate Cloud software and mobile app ecosystem for EV charging.'),
('/products', 'Our Products | EcoMargin', 'Discover the EcoMargin CSMS Cloud and Driver App.');

-- 10. Seed Newsletter
INSERT INTO newsletter (email) VALUES 
('earlyadopter@example.com'),
('evfan@example.com');
