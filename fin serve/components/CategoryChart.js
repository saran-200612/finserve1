function CategoryChart({ categoryTotals }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstanceRef = React.useRef(null);

    React.useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const categories = Object.keys(categoryTotals);
        const amounts = Object.values(categoryTotals);
        
        const colors = [
          '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
          '#8b5cf6', '#f97316', '#06b6d4', '#84cc16'
        ];

        chartInstanceRef.current = new ChartJS(ctx, {
          type: 'doughnut',
          data: {
            labels: categories,
            datasets: [{
              data: amounts,
              backgroundColor: colors.slice(0, categories.length),
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 20
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
    }, [categoryTotals]);

    return (
      <div className="relative h-64" data-name="category-chart" data-file="components/CategoryChart.js">
        <canvas ref={chartRef}></canvas>
      </div>
    );
  } catch (error) {
    console.error('CategoryChart component error:', error);
    return <div className="text-center text-gray-500 py-8">Chart unavailable</div>;
  }
}