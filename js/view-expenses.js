let allExpenses = [];

function loadExpenses() {
    fetch('php/get_expenses.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allExpenses = data.expenses;
                displayExpenses(allExpenses);
            }
        })
        .catch(error => {
            console.error('Error loading expenses:', error);
        });
}

function displayExpenses(expenses) {
    const tbody = document.getElementById('expenseTableBody');
    const totalElement = document.getElementById('filteredTotal');
    
    if (!expenses || expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No expenses found. Add your first expense to get started.</td></tr>';
        totalElement.textContent = '0.00';
        return;
    }
    
    let total = 0;
    tbody.innerHTML = '';
    
    expenses.forEach(expense => {
        total += parseFloat(expense.amount);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(expense.date)}</td>
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${expense.description || '-'}</td>
            <td>
                <button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    totalElement.textContent = formatCurrency(total);
}

function filterExpenses() {
    const categoryFilter = document.getElementById('filterCategory').value;
    let filtered = allExpenses;
    
    if (categoryFilter) {
        filtered = allExpenses.filter(exp => exp.category === categoryFilter);
    }
    
    filtered = sortExpenses(filtered);
    displayExpenses(filtered);
}

function sortExpenses(expenses) {
    const sortBy = document.getElementById('sortBy').value;
    const sorted = [...expenses];
    
    switch(sortBy) {
        case 'date-desc':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount-desc':
            sorted.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
            break;
        case 'amount-asc':
            sorted.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
            break;
    }
    
    return sorted;
}

function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    const formData = new FormData();
    formData.append('id', id);
    
    fetch('php/delete_expense.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadExpenses();
        } else {
            alert('Failed to delete expense');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

document.getElementById('filterCategory').addEventListener('change', filterExpenses);
document.getElementById('sortBy').addEventListener('change', filterExpenses);

document.addEventListener('DOMContentLoaded', loadExpenses);
