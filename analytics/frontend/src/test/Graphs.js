import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graphs = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: "Line Chart",
                        data: [65, 34, 34, 56, 60],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                layout: {
                    padding: 20, 
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="p-4 border rounded-lg border-gray-300 h-full w-full">
            <canvas ref={chartRef} className="w-full h-full" />
        </div>
    );
};

export default Graphs;
