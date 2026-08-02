-- EcoMargin Enterprise Production Database DDL (TiDB Cloud / MySQL Compatible)
-- Database Name: ecomargin_db

CREATE DATABASE IF NOT EXISTS ecomargin_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecomargin_db;

-- 1. Website Settings Table
CREATE TABLE IF NOT EXISTS website_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  description VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Homepage Content Table
CREATE TABLE IF NOT EXISTS homepage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle TEXT,
  hero_video_url VARCHAR(500),
  hero_bg_url VARCHAR(500),
  primary_button_text VARCHAR(100) DEFAULT 'Request Quote',
  secondary_button_text VARCHAR(100) DEFAULT 'Contact Sales',
  brochure_button_text VARCHAR(100) DEFAULT 'Download Brochure',
  section_order JSON,
  section_visibility JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Product Categories Table
CREATE TABLE IF NOT EXISTS product_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Products Table (AC, LVDC, DC Fast Chargers)
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  power VARCHAR(50) NOT NULL,
  voltage VARCHAR(100),
  current VARCHAR(100),
  connector VARCHAR(100),
  protection VARCHAR(100),
  efficiency VARCHAR(50),
  dimensions VARCHAR(100),
  weight VARCHAR(50),
  warranty VARCHAR(100),
  description TEXT,
  applications TEXT,
  specifications JSON,
  images JSON,
  datasheet_pdf VARCHAR(500),
  brochure_pdf VARCHAR(500),
  video_url VARCHAR(500),
  status ENUM('Active', 'Draft') DEFAULT 'Active',
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Services Table (Turnkey EPC, AMC, Transformer)
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  icon VARCHAR(100),
  description TEXT,
  scope_details JSON,
  status ENUM('Active', 'Draft') DEFAULT 'Active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Industries Table (Highways, Fleets, Depots, Hotels)
CREATE TABLE IF NOT EXISTS industries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  image_url VARCHAR(500),
  status ENUM('Active', 'Draft') DEFAULT 'Active',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255),
  location VARCHAR(255),
  capacity VARCHAR(100),
  timeline VARCHAR(100),
  description TEXT,
  images JSON,
  status ENUM('Completed', 'In Progress') DEFAULT 'Completed',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Factory Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(100),
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Technical Downloads & Datasheets Table
CREATE TABLE IF NOT EXISTS downloads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_size VARCHAR(50),
  file_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Compliance Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuing_body VARCHAR(255),
  certificate_number VARCHAR(100),
  file_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Team Members Table
CREATE TABLE IF NOT EXISTS team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(500),
  linkedin_url VARCHAR(255),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  designation VARCHAR(255),
  comment TEXT NOT NULL,
  rating INT DEFAULT 5,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  author VARCHAR(100) DEFAULT 'EcoMargin Team',
  summary TEXT,
  content LONGTEXT,
  cover_image VARCHAR(500),
  status ENUM('Published', 'Draft') DEFAULT 'Published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 14. FAQ Table
CREATE TABLE IF NOT EXISTS faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 15. Contact CMS Info Table
CREATE TABLE IF NOT EXISTS contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  office_address TEXT,
  factory_address TEXT,
  sales_email VARCHAR(255),
  support_email VARCHAR(255),
  sales_phone VARCHAR(50),
  support_phone VARCHAR(50),
  whatsapp_number VARCHAR(50),
  maps_embed_url TEXT,
  business_hours VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 16. Enquiries & B2B Leads Table
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  product_requirement VARCHAR(255),
  quantity INT DEFAULT 1,
  message TEXT,
  source ENUM('RFQ Modal', 'Contact Form', 'Dealer Partner') DEFAULT 'RFQ Modal',
  status ENUM('New', 'Contacted', 'Qualified', 'Closed') DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 17. Careers Table
CREATE TABLE IF NOT EXISTS career (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  location VARCHAR(100) DEFAULT 'Noida Factory',
  job_type VARCHAR(50) DEFAULT 'Full Time',
  description TEXT,
  status ENUM('Active', 'Closed') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 18. Dealer Applications Table
CREATE TABLE IF NOT EXISTS dealers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  partner_type VARCHAR(100),
  status ENUM('New', 'Under Review', 'Approved', 'Rejected') DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 19. SEO Metadata Table
CREATE TABLE IF NOT EXISTS seo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_route VARCHAR(255) NOT NULL UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT,
  canonical_url VARCHAR(500),
  og_title VARCHAR(255),
  og_image VARCHAR(500),
  schema_json JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 20. Menus Structure Table
CREATE TABLE IF NOT EXISTS menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_name VARCHAR(100) NOT NULL,
  menu_items JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 21. Footer CMS Table
CREATE TABLE IF NOT EXISTS footer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_bio TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  whatsapp VARCHAR(50),
  social_links JSON,
  copyright_text VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 22. Media Library Table
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type ENUM('image', 'video', 'pdf', 'raw') NOT NULL,
  file_size VARCHAR(50),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 23. Admin Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(255),
  action VARCHAR(255) NOT NULL,
  module VARCHAR(100),
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
