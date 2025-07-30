const ChartJS = window.Chart;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [monthlyIncome, setMonthlyIncome] = React.useState(0);
    const [expenses, setExpenses] = React.useState([]);
    const [budgetLimits, setBudgetLimits] = React.useState({});
    const [alerts, setAlerts] = React.useState([]);

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = () => {
      const savedIncome = getMonthlyIncome();
      const savedExpenses = getExpenses();
      const savedBudgets = getBudgetLimits();
      
      setMonthlyIncome(savedIncome);
      setExpenses(savedExpenses);
      setBudgetLimits(savedBudgets);
      
      checkBudgetAlerts(savedExpenses, savedBudgets);
    };

    const checkBudgetAlerts = (expenseList, budgets) => {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyExpenses = expenseList.filter(exp => exp.date.startsWith(currentMonth));
      const categoryTotals = calculateCategoryTotals(monthlyExpenses);
      
      const newAlerts = [];
      Object.keys(budgets).forEach(category => {
        const spent = categoryTotals[category] || 0;
        const limit = budgets[category];
        
        if (spent > limit) {
          newAlerts.push({
            id: Date.now() + Math.random(),
            category,
            limit,
            spent,
            overspent: spent - limit,
            type: 'budget_exceeded'
          });
        }
      });
      
      setAlerts(newAlerts);
    };

    const addExpense = (expense) => {
      const newExpenses = [...expenses, { ...expense, id: Date.now() }];
      setExpenses(newExpenses);
      saveExpenses(newExpenses);
      checkBudgetAlerts(newExpenses, budgetLimits);
    };

    const updateBudgetLimit = (category, limit) => {
      const newBudgets = { ...budgetLimits, [category]: limit };
      setBudgetLimits(newBudgets);
      saveBudgetLimits(newBudgets);
      checkBudgetAlerts(expenses, newBudgets);
    };

    const updateIncome = (income) => {
      setMonthlyIncome(income);
      saveMonthlyIncome(income);
    };

    const dismissAlert = (alertId) => {
      setAlerts(alerts.filter(alert => alert.id !== alertId));
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="container mx-auto px-4 py-6">
          <AlertSystem alerts={alerts} onDismiss={dismissAlert} />
          
          {currentView === 'dashboard' && (
            <Dashboard 
              monthlyIncome={monthlyIncome}
              expenses={expenses}
              budgetLimits={budgetLimits}
              onUpdateIncome={updateIncome}
            />
          )}
          
          {currentView === 'expenses' && (
            <ExpenseForm onAddExpense={addExpense} />
          )}
          
          {currentView === 'budget' && (
            <BudgetManager 
              budgetLimits={budgetLimits}
              onUpdateLimit={updateBudgetLimit}
              expenses={expenses}
            />
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);