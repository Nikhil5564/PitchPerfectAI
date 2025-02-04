import React from 'react';
import { StatCard } from './StatCard';

interface SeasonalStatsProps {
  prospectStats: {
    name: string;
    age: number;
    battingAverage: number;
    homeRuns: number;
    rbi: number;
  };
  historicalComps: Array<{
    name: string;
    batting_avg: number;
    home_runs: number;
    rbi: number;
    age: number;
  }>;
}

export const SeasonalStats: React.FC<SeasonalStatsProps> = ({
  prospectStats,
  historicalComps
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-navy-light p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Current Season</h4>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="AVG"
              value={prospectStats.battingAverage.toFixed(3)}
              className="bg-navy"
            />
            <StatCard
              title="HR"
              value={prospectStats.homeRuns}
              className="bg-navy"
            />
            <StatCard
              title="RBI"
              value={prospectStats.rbi}
              className="bg-navy"
            />
            <StatCard
              title="Age"
              value={prospectStats.age}
              className="bg-navy"
            />
          </div>
        </div>

        {historicalComps.map((comp, index) => (
          <div key={index} className="bg-navy-light p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">{comp.name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="AVG"
                value={comp.batting_avg.toFixed(3)}
                className="bg-navy"
              />
              <StatCard
                title="HR"
                value={comp.home_runs}
                className="bg-navy"
              />
              <StatCard
                title="RBI"
                value={comp.rbi}
                className="bg-navy"
              />
              <StatCard
                title="Age"
                value={comp.age}
                className="bg-navy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}