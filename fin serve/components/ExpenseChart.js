function ExpenseChart({ expenses }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstanceRef = React.useRef(null);

    React.useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        
        // Destroy existing chart
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Prepare data for last 6 months
        const monthlyData = getMonthlyExpenseData(expenses);
        
        chartInstanceRef.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: monthlyData.labels,
            datasets: [{
              label: 'Monthly Expenses',
              data: monthlyData.data,
              borderColor: 'rgb(37, 99, 235)',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '₹' + value.toLocaleString();
                  }
                }
              }
            }
          }
        });
      }

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [expenses]);

    return (
      <div className="relative h-64" data-name="expense-chart" data-file="components/ExpenseChart.js">
        <canvas ref={chartRef}></canvas>
      </div>
    );
  } catch (error) {
    console.error('ExpenseChart component error:', error);
    return <div className="text-center text-gray-500 py-8">Chart unavailable</div>;
  }
}
