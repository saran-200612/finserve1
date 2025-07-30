# FinanceTracker - Personal Financial Management

A comprehensive web application for tracking personal finances, managing expenses, and monitoring budget limits.

## Features

### Core Functionality
- **Monthly Income Tracking**: Set and track monthly salary/income
- **Expense Management**: Add expenses with categories, dates, and notes
- **SMS Auto-Detection**: Automatically detect expenses from bank/wallet SMS messages
- **Smart Categorization**: AI-powered expense categorization from transaction messages
- **Budget Limits**: Set spending limits for each category with alerts
- **Data Visualization**: Charts showing expense trends and category breakdowns
- **Export Functionality**: Download financial data as CSV files

### Categories
Default expense categories include:
- Loans
- Fuel
- Grocery
- Electricity
- Snacks
- Healthcare
- Mobile/DTH Recharge
- Others (custom categories supported)

### Budget Alerts
- Real-time alerts when category spending exceeds set limits
- Visual progress bars showing budget utilization
- Overspend notifications with exact amounts

### SMS Auto-Detection Features
- **Permission Management**: Request and manage SMS access permissions
- **Transaction Parsing**: Extract amount, merchant, and transaction details from SMS
- **Smart Categorization**: Suggest categories based on merchant and transaction type
- **User Confirmation**: Prompt user to confirm or modify detected expenses
- **Pending Review**: Queue detected expenses for user approval

### Dashboard Features
- Monthly income, expenses, and balance overview
- Interactive charts for expense trends and category breakdown
- Current month financial summary
- Quick access to all major functions
- Real-time SMS expense detection notifications

## Technical Implementation

### Frontend
- **React 18**: Component-based UI framework
- **TailwindCSS**: Utility-first styling
- **Chart.js**: Data visualization
- **Lucide Icons**: Modern icon library

### Data Storage
- **LocalStorage**: Client-side data persistence
- **JSON Format**: Structured data storage

### Architecture
- **Component-based**: Modular, reusable components
- **Utility Functions**: Separated business logic
- **Error Handling**: Comprehensive error boundaries

## File Structure
```
├── index.html              # Main entry point
├── app.js                 # Main application logic
├── components/            # React components
│   ├── Header.js         # Navigation header
│   ├── Dashboard.js      # Main dashboard
│   ├── ExpenseForm.js    # Expense entry form
│   ├── BudgetManager.js  # Budget management
│   ├── ExpenseChart.js   # Expense trend chart
│   ├── CategoryChart.js  # Category breakdown chart
│   ├── AlertSystem.js    # Budget alerts
│   └── SMSDetector.js    # SMS expense detection
└── utils/                # Utility functions
    ├── storage.js        # LocalStorage operations
    ├── calculations.js   # Financial calculations
    ├── exportUtils.js    # Data export functions
    └── smsParser.js      # SMS parsing and categorization
```

## Usage

1. **Set Monthly Income**: Click "Set Income" to establish your monthly budget baseline
2. **Enable SMS Detection**: Click "Enable SMS Access" to allow automatic expense detection
3. **Auto Expense Detection**: App will detect transactions from bank/wallet SMS and suggest categories
4. **Review Detected Expenses**: Confirm or modify automatically detected expenses
5. **Manual Expense Entry**: Use "Add Expense" to record spending with categories and notes
6. **Manage Budgets**: Set spending limits for each category in "Budget Manager"
7. **Monitor Progress**: View dashboard charts and budget status
8. **Export Data**: Download financial reports as CSV files

## Future Enhancements
- SMS integration for automatic expense tracking
- PDF export functionality
- Cloud storage options
- Multi-user support with authentication
- Advanced reporting and analytics