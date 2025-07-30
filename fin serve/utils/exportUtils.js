// Export Utilities

function exportToCSV(expenses, monthlyIncome) {
  try {
    const headers = ['Date', 'Category', 'Amount', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        expense.category,
        expense.amount,
        `"${expense.notes || ''}"`
      ].join(','))
    ].join('\n');

    // Add summary at the top
    const summary = [
      'Financial Summary',
      `Monthly Income,${monthlyIncome}`,
      `Total Expenses,${expenses.reduce((sum, exp) => sum + exp.amount, 0)}`,
      `Balance,${monthlyIncome - expenses.reduce((sum, exp) => sum + exp.amount, 0)}`,
      '',
      'Detailed Expenses'
    ].join('\n');

    const finalContent = summary + '\n' + csvContent;
    
    const blob = new Blob([finalContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finance-tracker-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert('Data exported successfully!');
  } catch (error) {
    console.error('Export error:', error);
    alert('Error exporting data. Please try again.');
  }
}

function exportToPDF(expenses, monthlyIncome) {
  try {
    // Create a simple HTML report for printing
    const currentMonth = new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = monthlyIncome - totalExpenses;
    
    const reportHTML = `
      <html>
        <head>
          <title>Financial Report - ${currentMonth}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { margin-bottom: 30px; }
            .summary-item { margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Financial Report</h1>
            <h2>${currentMonth}</h2>
          </div>
          
          <div class="summary">
            <h3>Summary</h3>
            <div class="summary-item">Monthly Income: ₹${monthlyIncome.toLocaleString()}</div>
            <div class="summary-item">Total Expenses: ₹${totalExpenses.toLocaleString()}</div>
            <div class="summary-item">Balance: ₹${balance.toLocaleString()}</div>
          </div>
          
          <h3>Expense Details</h3>
          <table>
            <thead>
              <tr><th>Date</th><th>Category</th><th>Amount</th><th>Notes</th></tr>
            </thead>
            <tbody>
              ${expenses.map(exp => `
                <tr>
                  <td>${exp.date}</td>
                  <td>${exp.category}</td>
                  <td>₹${exp.amount.toLocaleString()}</td>
                  <td>${exp.notes || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    newWindow.document.write(reportHTML);
    newWindow.document.close();
    newWindow.print();
  } catch (error) {
    console.error('PDF export error:', error);
    alert('Error generating PDF. Please try again.');
  }
}