<?php
header('Content-Type: application/json');
include 'config.php';

$totalExpenses = 0;
$monthExpenses = 0;
$todayExpenses = 0;
$totalEntries = 0;
$recentExpenses = [];
$categoryBreakdown = [];

$totalResult = $conn->query("SELECT SUM(amount) as total, COUNT(*) as count FROM expenses");
if ($totalRow = $totalResult->fetch_assoc()) {
    $totalExpenses = $totalRow['total'] ?? 0;
    $totalEntries = $totalRow['count'] ?? 0;
}

$currentMonth = date('Y-m');
$monthResult = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE DATE_FORMAT(date, '%Y-%m') = '$currentMonth'");
if ($monthRow = $monthResult->fetch_assoc()) {
    $monthExpenses = $monthRow['total'] ?? 0;
}

$today = date('Y-m-d');
$todayResult = $conn->query("SELECT SUM(amount) as total FROM expenses WHERE date = '$today'");
if ($todayRow = $todayResult->fetch_assoc()) {
    $todayExpenses = $todayRow['total'] ?? 0;
}

$recentResult = $conn->query("SELECT name, amount, category, date FROM expenses ORDER BY date DESC LIMIT 5");
while ($row = $recentResult->fetch_assoc()) {
    $recentExpenses[] = [
        'name' => $row['name'],
        'amount' => $row['amount'],
        'category' => $row['category'],
        'date' => $row['date']
    ];
}

$categoryResult = $conn->query("SELECT category, SUM(amount) as total FROM expenses GROUP BY category ORDER BY total DESC");
while ($row = $categoryResult->fetch_assoc()) {
    $categoryBreakdown[$row['category']] = $row['total'];
}

echo json_encode([
    'success' => true,
    'totalExpenses' => $totalExpenses,
    'monthExpenses' => $monthExpenses,
    'todayExpenses' => $todayExpenses,
    'totalEntries' => $totalEntries,
    'recentExpenses' => $recentExpenses,
    'categoryBreakdown' => $categoryBreakdown
]);

$conn->close();
?>
