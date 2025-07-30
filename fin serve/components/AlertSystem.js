function AlertSystem({ alerts, onDismiss }) {
  try {
    if (!alerts || alerts.length === 0) return null;

    return (
      <div className="mb-6" data-name="alert-system" data-file="components/AlertSystem.js">
        {alerts.map(alert => (
          <div key={alert.id} className="alert-danger mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="icon-alert-triangle text-xl text-red-600"></div>
              <div>
                <p className="font-medium">Budget Exceeded: {alert.category}</p>
                <p className="text-sm">
                  Spent ₹{alert.spent.toLocaleString()} of ₹{alert.limit.toLocaleString()} 
                  (₹{alert.overspent.toLocaleString()} over budget)
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(alert.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <div className="icon-x text-lg"></div>
            </button>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('AlertSystem component error:', error);
    return null;
  }
}