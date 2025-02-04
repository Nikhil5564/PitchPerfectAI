import { ProspectProfile, BaseStats, AdvancedStats } from './types';
import { POSITION_SCARCITY, POSITION_INJURY_RISK } from './constants';

export const calculateWAR = (stats: BaseStats & AdvancedStats, position: string): number => {
  const positionAdjustment = POSITION_SCARCITY[position] || 0.6;
  const battingRuns = (stats.wOBA - 0.320) * 100;
  const baserunningRuns = (stats.stolenBases * 0.2) + ((stats.hits - stats.homeRuns) * 0.08);
  const fieldingRuns = 0; // Would need actual fielding data
  
  return (battingRuns + baserunningRuns + fieldingRuns) * positionAdjustment / 10;
};

export const calculateDevelopmentScore = (prospect: ProspectProfile): number => {
  const ageScore = 1 - (prospect.age - 18) / 10;
  const performanceScore = prospect.stats.battingAverage / 0.400;
  const powerScore = prospect.stats.homeRuns / 40;
  const disciplineScore = prospect.advancedStats.plateDiscipline;
  
  return (ageScore * 0.3 + performanceScore * 0.3 + powerScore * 0.2 + disciplineScore * 0.2);
};

export const calculateInjuryRisk = (prospect: ProspectProfile): number => {
  const ageFactor = prospect.age < 23 ? 0.8 : 1.2;
  const positionFactor = POSITION_INJURY_RISK[prospect.position] || 1.0;
  const workloadFactor = prospect.stats.games / 162;
  
  return (ageFactor * 0.3 + positionFactor * 0.4 + workloadFactor * 0.3);
};

export const formatBattingAverage = (avg: number): string => {
  return avg.toFixed(3);
};

export const formatOPS = (ops: number): string => {
  return ops.toFixed(3);
};

export const formatWRC = (wrc: number): string => {
  return `${Math.round(wrc)}`;
};