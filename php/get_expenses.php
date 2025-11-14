<?php
header('Content-Type: application/json');
include 'config.php';

$sql = "SELECT id, name, amount, category, date, description FROM expenses ORDER BY date DESC";
$result = $conn->query($sql);

$expenses = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $expenses[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'amount' => $row['amount'],
            'category' => $row['category'],
            'date' => $row['date'],
            'description' => $row['description']
        ];
    }
}

echo json_encode(['success' => true, 'expenses' => $expenses]);

$conn->close();
?>
