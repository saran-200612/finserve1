function Dashboard({ monthlyIncome, expenses, budgetLimits, onUpdateIncome }) {
  try {
    const [showIncomeModal, setShowIncomeModal] = React.useState(false);
    const [incomeInput, setIncomeInput] = React.useState(monthlyIncome);

    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
    const totalExpenses = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = monthlyIncome - totalExpenses;
    const categoryTotals = calculateCategoryTotals(monthlyExpenses);

    const handleIncomeUpdate = () => {
      onUpdateIncome(parseFloat(incomeInput) || 0);
      setShowIncomeModal(false);
    };

    const exportData = () => {
      exportToCSV(expenses, monthlyIncome);
    };

    return (
      <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.js">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
          <div className="flex gap-3">
            <button onClick={exportData} className="btn-secondary">
              <div className="icon-download text-lg"></div>
              Export Data
            </button>
            <button onClick={() => setShowIncomeModal(true)} className="btn-primary">
              <div className="icon-edit text-lg"></div>
              Set Income
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-[var(--success-color)]">₹{monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-trending-up text-xl text-green-600"></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-[var(--danger-color)]">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="icon-trending-down text-xl text-red-600"></div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-[var(--success-color)]' : 'text-[var(--danger-color)]'}`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                balance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <div className={`icon-wallet text-xl ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Monthly Expense Trends</h3>
            <ExpenseChart expenses={expenses} />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
            <CategoryChart categoryTotals={categoryTotals} />
          </div>
        </div>

        {showIncomeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Set Monthly Income</h3>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                placeholder="Enter monthly income"
                className="form-input mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowIncomeModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={handleIncomeUpdate} className="btn-primary flex-1">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return null;
  }
}