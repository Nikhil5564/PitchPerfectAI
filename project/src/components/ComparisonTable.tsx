import React from 'react';

interface ComparisonTableProps {
  prospect: {
    name: string;
    age: number;
    battingAverage: number;
    homeRuns: number;
    rbi: number;
  };
  similarPlayers: Array<{
    name: string;
    batting_avg: number;
    home_runs: number;
    rbi: number;
  }>;
  metrics: Array<{
    key: string;
    label: string;
    format?: (value: number) => string;
  }>;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ prospect, similarPlayers, metrics }) => {
  const getValueByKey = (obj: any, key: string) => {
    const keyMap: { [key: string]: string } = {
      'battingAverage': 'batting_avg',
      'homeRuns': 'home_runs',
      'rbi': 'rbi'
    };
    
    return obj[key] || obj[keyMap[key]];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2 px-4">Metric</th>
            <th className="text-left py-2 px-4">{prospect.name}</th>
            {similarPlayers.map((player) => (
              <th key={player.name} className="text-left py-2 px-4">
                {player.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.key} className="border-b border-gray-700">
              <td className="py-2 px-4 text-gray-300">{metric.label}</td>
              <td className="py-2 px-4">
                {metric.format
                  ? metric.format(getValueByKey(prospect, metric.key))
                  : getValueByKey(prospect, metric.key)}
              </td>
              {similarPlayers.map((player) => (
                <td key={player.name} className="py-2 px-4">
                  {metric.format
                    ? metric.format(getValueByKey(player, metric.key))
                    : getValueByKey(player, metric.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};