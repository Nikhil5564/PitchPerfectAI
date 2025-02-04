import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SprayChartProps {
  pullPct: number;
  centerPct: number;
  oppoPct: number;
}

export const SprayChart: React.FC<SprayChartProps> = ({ pullPct, centerPct, oppoPct }) => {
  const data = {
    labels: ['Pull', 'Center', 'Opposite'],
    datasets: [
      {
        data: [pullPct, centerPct, oppoPct],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-lg font-medium mb-4 text-center">Spray Chart</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};