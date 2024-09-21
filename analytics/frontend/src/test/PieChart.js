import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const PieChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const labels = chartData?.labels;
    const data = chartData?.data;

    console.log(labels)
    console.log(data)

    if (labels && data) {
      const myChartRef = chartRef.current.getContext('2d');
      console.log('Rendering chart with data:', labels, data);

      chartInstance.current = new Chart(myChartRef, {
        type: 'pie',
        data: {
          labels: labels, 
          datasets: [
            {
              data: data.data, 
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="w-[100%] h-[48%] p-4 bg-[#fff] border rounded-lg border-gray-300 flex items-center justify-center">
      <canvas ref={chartRef} className="h-[35%] w-auto" />
    </div>
  );
};
