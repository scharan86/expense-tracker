function generateReport() {
    const period = document.getElementById('reportPeriod').value;
    
    fetch(`php/get_report.php?period=${period}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayReportSummary(data.summary);
                displayCategoryReport(data.categoryData);
                displayMonthlyTrend(data.monthlyData);
            }
        })
        .catch(error => {
            console.error('Error generating report:', error);
        });
}

function displayReportSummary(summary) {
    document.getElementById('reportTotal').textContent = formatCurrency(summary.total);
    document.getElementById('reportAverage').textContent = formatCurrency(summary.average);
    document.getElementById('reportHighest').textContent = formatCurrency(summary.highest);
    document.getElementById('reportLowest').textContent = formatCurrency(summary.lowest);
}

function displayCategoryReport(categoryData) {
    const container = document.getElementById('categoryReport');
    
    if (!categoryData || Object.keys(categoryData).length === 0) {
        container.innerHTML = '<p class="no-data">No data available for this period</p>';
        return;
    }
    
    const maxAmount = Math.max(...Object.values(categoryData));
    container.innerHTML = '';
    
    for (const [category, amount] of Object.entries(categoryData)) {
        const percentage = (amount / maxAmount) * 100;
        const barDiv = document.createElement('div');
        barDiv.className = 'category-bar-item';
        barDiv.innerHTML = `
            <div class="category-bar-header">
                <span class="category-bar-name">${category}</span>
                <span class="category-bar-amount">${formatCurrency(amount)}</span>
            </div>
            <div class="category-bar-fill" style="width: ${percentage}%"></div>
        `;
        container.appendChild(barDiv);
    }
}

function displayMonthlyTrend(monthlyData) {
    const container = document.getElementById('monthlyTrend');
    
    if (!monthlyData || monthlyData.length === 0) {
        container.innerHTML = '<p class="no-data">No monthly data available</p>';
        return;
    }
    
    const maxAmount = Math.max(...monthlyData.map(m => m.amount));
    container.innerHTML = '';
    
    monthlyData.forEach(month => {
        const percentage = (month.amount / maxAmount) * 100;
        const monthDiv = document.createElement('div');
        monthDiv.className = 'category-bar-item';
        monthDiv.innerHTML = `
            <div class="category-bar-header">
                <span class="category-bar-name">${month.month}</span>
                <span class="category-bar-amount">${formatCurrency(month.amount)}</span>
            </div>
            <div class="category-bar-fill" style="width: ${percentage}%"></div>
        `;
        container.appendChild(monthDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    generateReport();
});
