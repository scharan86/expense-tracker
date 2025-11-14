function loadDashboardData() {
    fetch('php/get_dashboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('totalExpenses').textContent = formatCurrency(data.totalExpenses);
                document.getElementById('monthExpenses').textContent = formatCurrency(data.monthExpenses);
                document.getElementById('todayExpenses').textContent = formatCurrency(data.todayExpenses);
                document.getElementById('totalEntries').textContent = data.totalEntries;
                
                displayRecentExpenses(data.recentExpenses);
                displayCategoryBreakdown(data.categoryBreakdown);
            }
        })
        .catch(error => {
            console.error('Error loading dashboard:', error);
        });
}

function displayRecentExpenses(expenses) {
    const container = document.getElementById('recentExpenses');
    
    if (!expenses || expenses.length === 0) {
        container.innerHTML = '<p class="no-data">No expenses recorded yet. Start by adding your first expense.</p>';
        return;
    }
    
    container.innerHTML = '';
    expenses.forEach(expense => {
        const expenseDiv = document.createElement('div');
        expenseDiv.className = 'expense-item';
        expenseDiv.innerHTML = `
            <div class="expense-info">
                <h4>${expense.name}</h4>
                <p>${formatDate(expense.date)} - ${expense.category}</p>
            </div>
            <div class="expense-amount">${formatCurrency(expense.amount)}</div>
        `;
        container.appendChild(expenseDiv);
    });
}

function displayCategoryBreakdown(categories) {
    const container = document.getElementById('categoryBreakdown');
    
    if (!categories || Object.keys(categories).length === 0) {
        container.innerHTML = '<p class="no-data">No data available</p>';
        return;
    }
    
    container.innerHTML = '';
    for (const [category, amount] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-item';
        categoryDiv.innerHTML = `
            <span class="category-name">${category}</span>
            <span class="category-amount">${formatCurrency(amount)}</span>
        `;
        container.appendChild(categoryDiv);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboardData);
