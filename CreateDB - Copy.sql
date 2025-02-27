USE itstore;

CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT, -- ใช้ AUTO_INCREMENT สำหรับ PK
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT, -- ใช้ AUTO_INCREMENT สำหรับ PK
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(255)
);

CREATE TABLE Orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT, -- ใช้ AUTO_INCREMENT สำหรับ PK
  user_id INT NOT NULL, -- Foreign Key to Users
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('processing', 'completed', 'cancelled') DEFAULT 'processing',
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE -- เมื่อผู้ใช้ถูกลบ คำสั่งซื้อที่เชื่อมโยงจะถูกลบด้วย
);

CREATE TABLE OrderDetails (
  order_detail_id INT PRIMARY KEY AUTO_INCREMENT, -- ใช้ AUTO_INCREMENT สำหรับ PK
  order_id INT NOT NULL, -- Foreign Key to Orders
  product_id INT NOT NULL, -- Foreign Key to Products
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE, -- เมื่อคำสั่งซื้อถูกลบ รายละเอียดคำสั่งซื้อนี้จะถูกลบด้วย
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
