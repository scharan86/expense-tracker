<?php
$host = 'localhost';
$dbname = 'expense_tracker';
$username = 'expense_user';
$password = 'scharan';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8");
} catch (Exception $e) {
    die("Database connection error: " . $e->getMessage());
}
?>
