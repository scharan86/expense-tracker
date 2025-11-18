<?php
header('Content-Type: application/json');
include 'config.php';

$period = $_GET['period'] ?? 'all';

$whereClause = '';
switch($period) {
    case 'today':
        $whereClause = "WHERE date = CURDATE()";
        break;
    case 'week':
        $whereClause = "WHERE YEARWEEK(date, 1) = YEARWEEK(CURDATE(), 1)";
        break;
    case 'month':
        $whereClause = "WHERE YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE())";
        break;
    case 'year':
        $whereClause = "WHERE YEAR(date) = YEAR(CURDATE())";
        break;
    default:
        $whereClause = '';
}

$summary = [
    'total' => 0,
    'average' => 0,
    'highest' => 0,
    'lowest' => 0
];

$summaryResult = $conn->query("SELECT SUM(amount) as total, AVG(amount) as average, MAX(amount) as highest, MIN(amount) as lowest FROM expenses $whereClause");
if ($row = $summaryResult->fetch_assoc()) {
    $summary['total'] = $row['total'] ?? 0;
    $summary['average'] = $row['average'] ?? 0;
    $summary['highest'] = $row['highest'] ?? 0;
    $summary['lowest'] = $row['lowest'] ?? 0;
}

$categoryData = [];
$categoryResult = $conn->query("SELECT category, SUM(amount) as total FROM expenses $whereClause GROUP BY category ORDER BY total DESC");
while ($row = $categoryResult->fetch_assoc()) {
    $categoryData[$row['category']] = $row['total'];
}

$monthlyData = [];
$monthlyResult = $conn->query("SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total FROM expenses GROUP BY DATE_FORMAT(date, '%Y-%m') ORDER BY month DESC LIMIT 12");
while ($row = $monthlyResult->fetch_assoc()) {
    $monthlyData[] = [
        'month' => $row['month'],
        'amount' => $row['total']
    ];
}

echo json_encode([
    'success' => true,
    'summary' => $summary,
    'categoryData' => $categoryData,
    'monthlyData' => array_reverse($monthlyData)
]);

$conn->close();
?>
