function BudgetManager({ budgetLimits, onUpdateLimit, expenses }) {
  try {
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [limitAmount, setLimitAmount] = React.useState('');

    const defaultCategories = [
      'Loans', 'Fuel', 'Grocery', 'Electricity', 'Snacks', 
      'Healthcare', 'Mobile/DTH Recharge', 'Others'
    ];

    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
    const categoryTotals = calculateCategoryTotals(monthlyExpenses);

    const handleSetLimit = (e) => {
      e.preventDefault();
      
      if (!selectedCategory || !limitAmount) {
        alert('Please select category and enter limit amount');
        return;
      }

      onUpdateLimit(selectedCategory, parseFloat(limitAmount));
      setSelectedCategory('');
      setLimitAmount('');
      alert('Budget limit updated successfully!');
    };

    const getStatusColor = (category) => {
      const spent = categoryTotals[category] || 0;
      const limit = budgetLimits[category] || 0;
      
      if (!limit) return 'text-gray-500';
      if (spent > limit) return 'text-red-600';
      if (spent > limit * 0.8) return 'text-yellow-600';
      return 'text-green-600';
    };

    const getProgressPercentage = (category) => {
      const spent = categoryTotals[category] || 0;
      const limit = budgetLimits[category] || 0;
      
      if (!limit) return 0;
      return Math.min((spent / limit) * 100, 100);
    };

    return (
      <div className="space-y-6" data-name="budget-manager" data-file="components/BudgetManager.js">
        <h2 className="text-2xl font-bold text-gray-900">Budget Manager</h2>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Set Budget Limits</h3>
          
          <form onSubmit={handleSetLimit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select category</option>
                  {defaultCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit (₹)</label>
                <input
                  type="number"
                  value={limitAmount}
                  onChange={(e) => setLimitAmount(e.target.value)}
                  placeholder="Enter budget limit"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              <div className="icon-target text-lg"></div>
              Set Budget Limit
            </button>
          </form>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Current Month Budget Status</h3>
          
          <div className="space-y-4">
            {defaultCategories.map(category => {
              const spent = categoryTotals[category] || 0;
              const limit = budgetLimits[category] || 0;
              const percentage = getProgressPercentage(category);
              
              return (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{category}</span>
                    <span className={`font-semibold ${getStatusColor(category)}`}>
                      ₹{spent.toLocaleString()} / ₹{limit.toLocaleString() || '0'}
                    </span>
                  </div>
                  
                  {limit > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          spent > limit ? 'bg-red-500' : 
                          spent > limit * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                  
                  {limit === 0 && (
                    <p className="text-sm text-gray-500">No budget limit set</p>
                  )}
                  
                  {spent > limit && limit > 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      Overspent by ₹{(spent - limit).toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BudgetManager component error:', error);
    return null;
  }
}