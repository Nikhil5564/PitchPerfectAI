import { ProspectProfile, SeasonalProgression } from './types';
import { calculateDevelopmentScore, calculateInjuryRisk } from './utils';

export const generateProjectionReport = (prospect: ProspectProfile) => {
  const developmentScore = calculateDevelopmentScore(prospect);
  const injuryRisk = calculateInjuryRisk(prospect);
  
  const strengthsAndWeaknesses = analyzeStrengthsAndWeaknesses(prospect);
  const developmentPlan = createDevelopmentPlan(prospect);
  const riskFactors = assessRiskFactors(prospect, injuryRisk);
  
  return {
    developmentScore,
    injuryRisk,
    ...strengthsAndWeaknesses,
    developmentPlan,
    riskFactors
  };
};

const analyzeStrengthsAndWeaknesses = (prospect: ProspectProfile) => {
  const strengths = [];
  const weaknesses = [];
  
  // Hitting for average
  if (prospect.stats.battingAverage >= 0.300) {
    strengths.push('Plus hit tool');
  } else if (prospect.stats.battingAverage < 0.250) {
    weaknesses.push('Below average contact skills');
  }
  
  // Power
  if (prospect.stats.homeRuns >= 20) {
    strengths.push('Above average power');
  } else if (prospect.stats.homeRuns < 10) {
    weaknesses.push('Limited power potential');
  }
  
  // Plate discipline
  if (prospect.advancedStats.plateDiscipline >= 0.8) {
    strengths.push('Advanced plate discipline');
  } else if (prospect.advancedStats.plateDiscipline < 0.6) {
    weaknesses.push('Aggressive approach needs refinement');
  }
  
  return { strengths, weaknesses };
};

const createDevelopmentPlan = (prospect: ProspectProfile) => {
  const plans = [];
  
  // Hit tool development
  if (prospect.stats.battingAverage < 0.280) {
    plans.push({
      area: 'Hit Tool',
      focus: 'Contact rate improvement',
      drills: ['Two-strike approach', 'Opposite field hitting', 'High-velocity training']
    });
  }
  
  // Power development
  if (prospect.stats.homeRuns < 15) {
    plans.push({
      area: 'Power',
      focus: 'Power development',
      drills: ['Lower body strength', 'Launch angle optimization', 'Pull-side power']
    });
  }
  
  // Plate discipline
  if (prospect.advancedStats.plateDiscipline < 0.7) {
    plans.push({
      area: 'Approach',
      focus: 'Plate discipline',
      drills: ['Pitch recognition', 'Zone control', 'Take drill']
    });
  }
  
  return plans;
};

const assessRiskFactors = (prospect: ProspectProfile, injuryRisk: number) => {
  const risks = [];
  
  if (prospect.age < 18) {
    risks.push('Very young - development path uncertain');
  }
  
  if (prospect.age > 24) {
    risks.push('Late bloomer - limited upside potential');
  }
  
  if (injuryRisk > 1.2) {
    risks.push('Elevated injury risk profile');
  }
  
  if (prospect.advancedStats.consistencyRating < 0.7) {
    risks.push('Inconsistent performance patterns');
  }
  
  return risks;
};