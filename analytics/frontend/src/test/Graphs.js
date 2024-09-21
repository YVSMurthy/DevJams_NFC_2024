import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graphs = ({ lineData, duration }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

    console.log("line data from graph : ", lineData)

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "Sales Price",
                        data: lineData,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        borderWidth: 2,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 20,
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [lineData]); // Re-run effect when lineData changes

    return (
        <div className="p-4 border rounded-lg bg-[#fff] border-gray-300 h-full w-full">
            <canvas ref={chartRef} className="w-full h-full" />
        </div>
    );
};

export default Graphs;
