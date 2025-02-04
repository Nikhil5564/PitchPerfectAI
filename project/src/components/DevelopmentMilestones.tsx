import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';

interface Milestone {
  age: number;
  title: string;
  metrics: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface DevelopmentMilestonesProps {
  milestones: Milestone[];
}

export const DevelopmentMilestones: React.FC<DevelopmentMilestonesProps> = ({ milestones }) => {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'upcoming':
        return <ArrowRight className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-yellow-500';
      case 'upcoming':
        return 'border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className={`relative flex items-start space-x-4 pb-6 ${
            index < milestones.length - 1 ? 'border-l-2 border-gray-700 ml-3' : ''
          }`}
        >
          <div
            className={`absolute left-0 w-6 h-6 rounded-full border-2 bg-navy flex items-center justify-center transform -translate-x-2 ${getStatusColor(
              milestone.status
            )}`}
          >
            {getStatusIcon(milestone.status)}
          </div>
          <div className="flex-1 ml-6">
            <div className="bg-navy-light p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">{milestone.title}</h4>
                <span className="text-sm text-gray-400">Age {milestone.age}</span>
              </div>
              <div className="space-y-2">
                {milestone.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <span className="text-red-500">•</span>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};