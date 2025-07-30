function ExpenseForm({ onAddExpense }) {
  try {
    const [formData, setFormData] = React.useState({
      amount: '',
      category: '',
      date: new Date().toISOString().slice(0, 10),
      notes: ''
    });

    const [customCategory, setCustomCategory] = React.useState('');
    const [showCustomCategory, setShowCustomCategory] = React.useState(false);

    const defaultCategories = [
      'Loans', 'Fuel', 'Grocery', 'Electricity', 'Snacks', 
      'Healthcare', 'Mobile/DTH Recharge', 'Others'
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!formData.amount || !formData.category) {
        alert('Please fill in amount and category');
        return;
      }

      const finalCategory = formData.category === 'custom' ? customCategory : formData.category;
      
      if (formData.category === 'custom' && !customCategory) {
        alert('Please enter custom category name');
        return;
      }

      onAddExpense({
        ...formData,
        category: finalCategory,
        amount: parseFloat(formData.amount),
        timestamp: new Date().toISOString()
      });

      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().slice(0, 10),
        notes: ''
      });
      setCustomCategory('');
      setShowCustomCategory(false);
      
      alert('Expense added successfully!');
    };

    const handleCategoryChange = (category) => {
      setFormData({ ...formData, category });
      setShowCustomCategory(category === 'custom');
    };

    return (
      <div className="max-w-2xl mx-auto" data-name="expense-form" data-file="components/ExpenseForm.js">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Expense</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter amount"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select category</option>
                {defaultCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="custom">+ Add Custom Category</option>
              </select>
            </div>

            {showCustomCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Category Name</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name"
                  className="form-input"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes about this expense"
                rows="3"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              <div className="icon-plus text-lg"></div>
              Add Expense
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ExpenseForm component error:', error);
    return null;
  }
}