document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const expenseName = document.getElementById('expenseName').value.trim();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    
    if (!expenseName || !amount || !category || !date) {
        showMessage('messageBox', 'Please fill in all required fields', 'error');
        return;
    }
    
    if (parseFloat(amount) <= 0) {
        showMessage('messageBox', 'Amount must be greater than 0', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('expenseName', expenseName);
    formData.append('amount', amount);
    formData.append('category', category);
    formData.append('date', date);
    formData.append('description', description);
    
    fetch('php/add_expense.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('messageBox', 'Expense added successfully', 'success');
            document.getElementById('expenseForm').reset();
            document.getElementById('date').value = getCurrentDate();
        } else {
            showMessage('messageBox', data.message || 'Failed to add expense', 'error');
        }
    })
    .catch(error => {
        showMessage('messageBox', 'Error: ' + error.message, 'error');
    });
});
