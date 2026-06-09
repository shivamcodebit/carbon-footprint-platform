import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

/* Register Chart.js components */
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * BreakdownChart — Doughnut chart showing emission proportions.
 * Uses Chart.js with accessible fallback text.
 */
export default function BreakdownChart({ emissions }) {
  const { travel, energy, diet } = emissions;
  const hasData = travel > 0 || energy > 0 || diet > 0;

  const data = {
    labels: ['Travel', 'Energy', 'Diet'],
    datasets: [
      {
        data: hasData ? [travel, energy, diet] : [1, 1, 1],
        backgroundColor: hasData
          ? ['rgba(59, 130, 246, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(16, 185, 129, 0.8)']
          : ['rgba(30, 41, 59, 0.5)', 'rgba(30, 41, 59, 0.5)', 'rgba(30, 41, 59, 0.5)'],
        borderColor: hasData
          ? ['rgba(59, 130, 246, 1)', 'rgba(245, 158, 11, 1)', 'rgba(16, 185, 129, 1)']
          : ['rgba(30, 41, 59, 0.8)', 'rgba(30, 41, 59, 0.8)', 'rgba(30, 41, 59, 0.8)'],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: hasData,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: '#1e293b',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} kg CO₂`,
        },
      },
    },
    animation: {
      animateRotate: true,
      duration: 800,
    },
  };

  return (
    <div className="chart-container" role="img" aria-label={
      hasData
        ? `Emission breakdown: Travel ${travel} kg, Energy ${energy} kg, Diet ${diet} kg CO₂ per month`
        : 'No emission data to display'
    }>
      <Doughnut data={data} options={options} />
    </div>
  );
}
