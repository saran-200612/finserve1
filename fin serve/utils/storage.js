// Local Storage Utilities
const STORAGE_KEYS = {
  MONTHLY_INCOME: 'financeTracker_monthlyIncome',
  EXPENSES: 'financeTracker_expenses',
  BUDGET_LIMITS: 'financeTracker_budgetLimits'
};

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

// Monthly Income Functions
function saveMonthlyIncome(income) {
  saveToStorage(STORAGE_KEYS.MONTHLY_INCOME, income);
}

function getMonthlyIncome() {
  return getFromStorage(STORAGE_KEYS.MONTHLY_INCOME, 0);
}

// Expenses Functions
function saveExpenses(expenses) {
  saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
}

function getExpenses() {
  return getFromStorage(STORAGE_KEYS.EXPENSES, []);
}

// Budget Limits Functions
function saveBudgetLimits(budgets) {
  saveToStorage(STORAGE_KEYS.BUDGET_LIMITS, budgets);
}

function getBudgetLimits() {
  return getFromStorage(STORAGE_KEYS.BUDGET_LIMITS, {});
}