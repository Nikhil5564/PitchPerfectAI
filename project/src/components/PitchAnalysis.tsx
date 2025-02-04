import React from 'react';
import { RadarChart } from './RadarChart';

interface PitchAnalysisProps {
  data: {
    fastball: PitchMetrics;
    breaking: PitchMetrics;
    offspeed: PitchMetrics;
  };
}

interface PitchMetrics {
  avgExit: number;
  launchAngle: number;
  contactRate: number;
  whiffRate: number;
}

export const PitchAnalysis: React.FC<PitchAnalysisProps> = ({ data }) => {
  const radarData = {
    labels: ['Exit Velocity', 'Launch Angle', 'Contact Rate', 'Whiff Rate'],
    datasets: [
      {
        label: 'Fastball',
        data: [
          data.fastball.avgExit / 100,
          data.fastball.launchAngle / 45,
          data.fastball.contactRate,
          data.fastball.whiffRate
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      },
      {
        label: 'Breaking',
        data: [
          data.breaking.avgExit / 100,
          data.breaking.launchAngle / 45,
          data.breaking.contactRate,
          data.breaking.whiffRate
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: 'Offspeed',
        data: [
          data.offspeed.avgExit / 100,
          data.offspeed.launchAngle / 45,
          data.offspeed.contactRate,
          data.offspeed.whiffRate
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(data).map(([type, metrics]) => (
          <div key={type} className="bg-navy-light p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 capitalize">{type}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Exit Velocity</span>
                <span>{metrics.avgExit.toFixed(1)} mph</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Launch Angle</span>
                <span>{metrics.launchAngle.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact Rate</span>
                <span>{(metrics.contactRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Whiff Rate</span>
                <span>{(metrics.whiffRate * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Pitch Type Comparison</h4>
        <div className="h-80">
          <RadarChart data={radarData} />
        </div>
      </div>
    </div>
  );
};