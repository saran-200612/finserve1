// Calculation Utilities

function calculateCategoryTotals(expenses) {
  return expenses.reduce((totals, expense) => {
    const category = expense.category;
    totals[category] = (totals[category] || 0) + expense.amount;
    return totals;
  }, {});
}

function getMonthlyExpenseData(expenses) {
  const monthlyTotals = {};
  
  expenses.forEach(expense => {
    const month = expense.date.slice(0, 7); // YYYY-MM format
    monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
  });

  // Get last 6 months
  const months = [];
  const data = [];
  const currentDate = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthKey = date.toISOString().slice(0, 7);
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    months.push(monthLabel);
    data.push(monthlyTotals[monthKey] || 0);
  }

  return {
    labels: months,
    data: data
  };
}

function calculateBudgetStatus(expenses, budgetLimits) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
  const categoryTotals = calculateCategoryTotals(monthlyExpenses);
  
  const status = {};
  
  Object.keys(budgetLimits).forEach(category => {
    const spent = categoryTotals[category] || 0;
    const limit = budgetLimits[category];
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    
    status[category] = {
      spent,
      limit,
      percentage,
      isOverBudget: spent > limit,
      remaining: Math.max(0, limit - spent)
    };
  });
  
  return status;
}