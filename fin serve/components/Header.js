function Header({ currentView, setCurrentView }) {
  try {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'chart-bar' },
      { id: 'expenses', label: 'Add Expense', icon: 'plus-circle' },
      { id: 'budget', label: 'Budget Manager', icon: 'target' }
    ];

    return (
      <header className="bg-white shadow-sm border-b border-gray-200" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-dollar-sign text-xl text-white"></div>
              </div>
              <h1 className="text-xl font-bold text-gradient">FinanceTracker</h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                    currentView === item.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'text-[var(--gray-600)] hover:bg-[var(--gray-100)]'
                  }`}
                >
                  <div className={`icon-${item.icon} text-lg`}></div>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}