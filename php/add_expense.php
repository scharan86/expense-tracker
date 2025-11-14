<?php
header('Content-Type: application/json');
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $expenseName = $_POST['expenseName'] ?? '';
    $amount = $_POST['amount'] ?? 0;
    $category = $_POST['category'] ?? '';
    $date = $_POST['date'] ?? '';
    $description = $_POST['description'] ?? '';
    
    if (empty($expenseName) || empty($amount) || empty($category) || empty($date)) {
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
        exit;
    }
    
    if ($amount <= 0) {
        echo json_encode(['success' => false, 'message' => 'Amount must be greater than 0']);
        exit;
    }
    
    $stmt = $conn->prepare("INSERT INTO expenses (name, amount, category, date, description) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $expenseName, $amount, $category, $date, $description);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Expense added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add expense']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
