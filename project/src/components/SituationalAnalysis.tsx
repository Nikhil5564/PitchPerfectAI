import React from 'react';
import { StatCard } from './StatCard';

interface SituationalAnalysisProps {
  data: {
    risp: {
      avg: number;
      ops: number;
      clutchIndex: number;
    };
    highLeverage: {
      avg: number;
      ops: number;
      clutchIndex: number;
    };
    platoonSplits: {
      vsRight: {
        avg: number;
        ops: number;
      };
      vsLeft: {
        avg: number;
        ops: number;
      };
    };
  };
}

export const SituationalAnalysis: React.FC<SituationalAnalysisProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">High Pressure Situations</h4>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="RISP AVG"
              value={data.risp.avg.toFixed(3)}
              description={`OPS: ${data.risp.ops.toFixed(3)}`}
              className="bg-navy"
            />
            <StatCard
              title="Clutch Index"
              value={data.risp.clutchIndex.toFixed(2)}
              description="Performance in key moments"
              className="bg-navy"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">High Leverage</h4>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="HL AVG"
              value={data.highLeverage.avg.toFixed(3)}
              description={`OPS: ${data.highLeverage.ops.toFixed(3)}`}
              className="bg-navy"
            />
            <StatCard
              title="Clutch Index"
              value={data.highLeverage.clutchIndex.toFixed(2)}
              description="Late game performance"
              className="bg-navy"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Platoon Splits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy p-4 rounded-lg">
            <h5 className="text-md font-medium mb-3">vs RHP</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">AVG</span>
                <span>{data.platoonSplits.vsRight.avg.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">OPS</span>
                <span>{data.platoonSplits.vsRight.ops.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="bg-navy p-4 rounded-lg">
            <h5 className="text-md font-medium mb-3">vs LHP</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">AVG</span>
                <span>{data.platoonSplits.vsLeft.avg.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">OPS</span>
                <span>{data.platoonSplits.vsLeft.ops.toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};