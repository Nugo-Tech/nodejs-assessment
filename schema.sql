CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       address VARCHAR(255),
                       city VARCHAR(255),
                       country VARCHAR(255)
);