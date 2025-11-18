CREATE DATABASE IF NOT EXISTS expense_tracker;

USE expense_tracker;

CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO expenses (name, amount, category, date, description) VALUES
('Grocery Shopping', 45.50, 'Food', '2024-11-10', 'Weekly groceries from supermarket'),
('Bus Fare', 5.00, 'Transport', '2024-11-12', 'Daily commute'),
('Movie Ticket', 12.00, 'Entertainment', '2024-11-13', 'Weekend movie');
