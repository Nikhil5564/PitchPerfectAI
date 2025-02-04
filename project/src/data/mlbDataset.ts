// MLB Dataset Types
export interface PlayerStats {
  player_id: string;
  name: string;
  position: string;
  age: number;
  batting_avg: number;
  home_runs: number;
  rbi: number;
  ops: number;
  war: number;
  season: number;
  games_played: number;
  hits: number;
  doubles: number;
  triples: number;
  walks: number;
  strikeouts: number;
  stolen_bases: number;
  slugging_pct: number;
  on_base_pct: number;
  fielding_pct?: number;
  career_progression?: CareerProgression[];
  // Advanced metrics
  wOBA?: number;
  wRC_plus?: number;
  babip?: number;
  iso_power?: number;
  contact_rate?: number;
  plate_discipline?: number;
  clutch_rating?: number;
  // New metrics
  spray_chart?: SprayData;
  zone_contact?: ZoneData;
  pitch_values?: PitchValues;
  situational_stats?: SituationalStats;
}

interface SprayData {
  pull_pct: number;
  center_pct: number;
  oppo_pct: number;
  ground_ball_pct: number;
  line_drive_pct: number;
  fly_ball_pct: number;
}

interface ZoneData {
  inside: number;
  outside: number;
  high: number;
  low: number;
  heart: number;
}

interface PitchValues {
  fastball: number;
  breaking: number;
  offspeed: number;
}

interface SituationalStats {
  risp_avg: number;
  late_close_avg: number;
  ahead_avg: number;
  behind_avg: number;
  platoon_split: number;
}

interface CareerProgression {
  season: number;
  age: number;
  batting_avg: number;
  home_runs: number;
  rbi: number;
  ops: number;
  war: number;
  wOBA?: number;
  wRC_plus?: number;
  clutch_rating?: number;
  // New progression metrics
  consistency_rating?: number;
  development_pace?: number;
  injury_risk?: number;
}

// Expanded historical dataset with more complete player data
export const historicalPlayers: PlayerStats[] = [
  {
    player_id: "troutmi01",
    name: "Mike Trout",
    position: "Center Field",
    age: 20,
    batting_avg: 0.326,
    home_runs: 30,
    rbi: 83,
    ops: 0.963,
    war: 10.5,
    season: 2012,
    games_played: 139,
    hits: 182,
    doubles: 27,
    triples: 8,
    walks: 67,
    strikeouts: 139,
    stolen_bases: 49,
    slugging_pct: 0.564,
    on_base_pct: 0.399,
    fielding_pct: 0.988,
    wOBA: 0.409,
    wRC_plus: 167,
    babip: 0.383,
    iso_power: 0.238,
    contact_rate: 0.78,
    plate_discipline: 0.85,
    clutch_rating: 1.2,
    spray_chart: {
      pull_pct: 0.45,
      center_pct: 0.35,
      oppo_pct: 0.20,
      ground_ball_pct: 0.30,
      line_drive_pct: 0.40,
      fly_ball_pct: 0.30
    },
    zone_contact: {
      inside: 0.85,
      outside: 0.75,
      high: 0.82,
      low: 0.78,
      heart: 0.92
    },
    pitch_values: {
      fastball: 15.2,
      breaking: 8.4,
      offspeed: 6.7
    },
    situational_stats: {
      risp_avg: 0.345,
      late_close_avg: 0.312,
      ahead_avg: 0.338,
      behind_avg: 0.298,
      platoon_split: 0.042
    },
    career_progression: [
      {
        season: 2011,
        age: 19,
        batting_avg: 0.220,
        home_runs: 5,
        rbi: 16,
        ops: 0.672,
        war: 0.7,
        wOBA: 0.287,
        wRC_plus: 87,
        clutch_rating: 0.5,
        consistency_rating: 0.65,
        development_pace: 0.8,
        injury_risk: 0.15
      },
      {
        season: 2012,
        age: 20,
        batting_avg: 0.326,
        home_runs: 30,
        rbi: 83,
        ops: 0.963,
        war: 10.5,
        wOBA: 0.409,
        wRC_plus: 167,
        clutch_rating: 1.2,
        consistency_rating: 0.85,
        development_pace: 1.2,
        injury_risk: 0.12
      }
    ]
  }
  // Add more complete player data...
];

// Advanced similarity metrics with comprehensive factors
const calculateStatisticalSimilarity = (
  prospect: {
    age: number;
    battingAverage: number;
    homeRuns: number;
    rbi: number;
    position?: string;
    ops?: number;
    war?: number;
  },
  player: PlayerStats
): number => {
  const ageFactor = 1 - (Math.abs(prospect.age - player.age) / 10);
  const avgFactor = 1 - Math.abs(prospect.battingAverage - player.batting_avg);
  const hrFactor = 1 - (Math.abs(prospect.homeRuns - player.home_runs) / 50);
  const rbiFactor = 1 - (Math.abs(prospect.rbi - player.rbi) / 100);
  
  // Enhanced similarity factors
  const opsFactor = prospect.ops ? 1 - Math.abs(prospect.ops - player.ops) : 1;
  const warFactor = prospect.war ? 1 - (Math.abs(prospect.war - player.war) / 10) : 1;
  
  // Weighted average with dynamic weights
  const weights = {
    age: 0.2,
    avg: 0.2,
    hr: 0.15,
    rbi: 0.15,
    ops: 0.15,
    war: 0.15
  };

  return (
    (ageFactor * weights.age) +
    (avgFactor * weights.avg) +
    (hrFactor * weights.hr) +
    (rbiFactor * weights.rbi) +
    (opsFactor * weights.ops) +
    (warFactor * weights.war)
  );
};

// Position grouping with role-based analysis
const positionGroups = {
  'infield': ['First Base', 'Second Base', 'Third Base', 'Shortstop'],
  'outfield': ['Left Field', 'Center Field', 'Right Field'],
  'battery': ['Pitcher', 'Catcher'],
  'utility': ['Designated Hitter']
};

const getPositionGroup = (position: string): string => {
  for (const [group, positions] of Object.entries(positionGroups)) {
    if (positions.includes(position)) {
      return group;
    }
  }
  return 'other';
};

// Enhanced advanced metrics calculation
const calculateAdvancedMetrics = (stats: {
  battingAverage: number;
  homeRuns: number;
  rbi: number;
  hits?: number;
  walks?: number;
  strikeouts?: number;
}) => {
  const sluggingPct = stats.homeRuns * 4 / (stats.hits || 100);
  const onBasePct = (stats.hits || 0 + stats.walks || 0) / (stats.hits || 100 + stats.walks || 0 + stats.strikeouts || 0);
  const wOBA = (0.69 * (stats.walks || 0) + 0.89 * (stats.hits || 0) + 1.27 * stats.rbi + 2.1 * stats.homeRuns) / 
               (stats.hits || 100 + stats.walks || 0 + stats.strikeouts || 0);
  
  return {
    sluggingPct,
    onBasePct,
    ops: sluggingPct + onBasePct,
    wOBA,
    iso_power: sluggingPct - stats.battingAverage,
    babip: ((stats.hits || 0) - stats.homeRuns) / ((stats.hits || 100) - stats.homeRuns - (stats.strikeouts || 0)),
    contact_rate: 1 - ((stats.strikeouts || 0) / (stats.hits || 100 + stats.walks || 0 + stats.strikeouts || 0))
  };
};

// Enhanced similarity algorithm with comprehensive analysis
export const findSimilarPlayers = (
  prospectStats: {
    age: number;
    position: string;
    battingAverage: number;
    homeRuns: number;
    rbi: number;
  }
): PlayerStats[] => {
  const prospectPositionGroup = getPositionGroup(prospectStats.position);
  const advancedMetrics = calculateAdvancedMetrics(prospectStats);

  return historicalPlayers
    .map(player => {
      const playerPositionGroup = getPositionGroup(player.position);
      const positionScore = prospectPositionGroup === playerPositionGroup ? 1 : 0.5;
      const statScore = calculateStatisticalSimilarity({
        ...prospectStats,
        ops: advancedMetrics.ops,
        war: player.war
      }, player);
      
      const totalScore = (statScore * 0.7) + (positionScore * 0.3);
      
      return { ...player, similarityScore: totalScore };
    })
    .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0))
    .slice(0, 5);
};

// Enhanced career projection model with comprehensive analysis
export const projectCareer = (
  prospectStats: {
    age: number;
    position: string;
    battingAverage: number;
    homeRuns: number;
    rbi: number;
  },
  similarPlayers: PlayerStats[]
): {
  peak_stats: any;
  development_curve: CareerProgression[];
  confidence_score: number;
  risk_assessment: string;
  peak_age: number;
  years_to_peak: number;
  ceiling_projection: any;
  floor_projection: any;
  development_factors: {
    early_success: number;
    skill_stability: number;
    physical_projection: number;
    position_scarcity: number;
  };
  injury_risk_factors: {
    age_factor: number;
    position_factor: number;
    workload_risk: number;
    overall_risk: number;
  };
} => {
  // Calculate peak stats with comprehensive metrics
  const peakStats = similarPlayers.reduce((acc, player) => {
    const careerPeak = player.career_progression?.reduce((peak, season) => {
      if (season.war > peak.war) {
        return season;
      }
      return peak;
    }, player.career_progression[0]);

    return {
      batting_avg: acc.batting_avg + (careerPeak?.batting_avg || player.batting_avg),
      home_runs: acc.home_runs + (careerPeak?.home_runs || player.home_runs),
      rbi: acc.rbi + (careerPeak?.rbi || player.rbi),
      ops: acc.ops + (careerPeak?.ops || player.ops),
      war: acc.war + (careerPeak?.war || player.war),
      wOBA: acc.wOBA + (player.wOBA || 0.330),
      wRC_plus: acc.wRC_plus + (player.wRC_plus || 100),
      clutch_rating: acc.clutch_rating + (player.clutch_rating || 1.0),
      consistency: acc.consistency + (careerPeak?.consistency_rating || 0.75),
      development_pace: acc.development_pace + (careerPeak?.development_pace || 1.0)
    };
  }, {
    batting_avg: 0,
    home_runs: 0,
    rbi: 0,
    ops: 0,
    war: 0,
    wOBA: 0,
    wRC_plus: 0,
    clutch_rating: 0,
    consistency: 0,
    development_pace: 0
  });

  // Average the peak stats
  const numPlayers = similarPlayers.length;
  Object.keys(peakStats).forEach(key => {
    peakStats[key as keyof typeof peakStats] /= numPlayers;
  });

  // Calculate peak age and development timeline
  const peakAges = similarPlayers.map(player => {
    const peak = player.career_progression?.reduce((max, season) => 
      season.war > max.war ? season : max
    );
    return peak?.age || player.age;
  });
  
  const peakAge = Math.round(peakAges.reduce((sum, age) => sum + age, 0) / peakAges.length);
  const yearsToPeak = peakAge - prospectStats.age;

  // Generate comprehensive development curve
  const developmentCurve: CareerProgression[] = [];
  const projectionYears = Math.max(10, yearsToPeak + 5);
  
  for (let i = 0; i < projectionYears; i++) {
    const progressFactor = Math.min(1, i / yearsToPeak);
    const declineFactor = i > yearsToPeak ? 0.97 ** (i - yearsToPeak) : 1;
    const seasonalVariation = 0.95 + Math.random() * 0.1; // Add realistic variation

    const projectedSeason = {
      season: new Date().getFullYear() + i,
      age: prospectStats.age + i,
      batting_avg: (prospectStats.battingAverage + (peakStats.batting_avg - prospectStats.battingAverage) * progressFactor) * declineFactor * seasonalVariation,
      home_runs: Math.round((Number(prospectStats.homeRuns) + (peakStats.home_runs - Number(prospectStats.homeRuns)) * progressFactor) * declineFactor * seasonalVariation),
      rbi: Math.round((Number(prospectStats.rbi) + (peakStats.rbi - Number(prospectStats.rbi)) * progressFactor) * declineFactor * seasonalVariation),
      ops: peakStats.ops * progressFactor * declineFactor * seasonalVariation,
      war: peakStats.war * progressFactor * declineFactor * seasonalVariation,
      wOBA: peakStats.wOBA * progressFactor * declineFactor * seasonalVariation,
      wRC_plus: Math.round(peakStats.wRC_plus * progressFactor * declineFactor * seasonalVariation),
      clutch_rating: peakStats.clutch_rating * progressFactor * declineFactor,
      consistency_rating: peakStats.consistency * (1 + (i / projectionYears) * 0.2), // Improve consistency over time
      development_pace: peakStats.development_pace * (1 - (i / projectionYears) * 0.1), // Slight decline in development pace
      injury_risk: 0.1 + (i / projectionYears) * 0.1 // Increasing injury risk with age
    };
    developmentCurve.push(projectedSeason);
  }

  // Calculate comprehensive confidence score
  const similarityConfidence = similarPlayers.reduce((acc, player) => acc + (player.similarityScore || 0), 0) / similarPlayers.length;
  const ageConfidence = 1 - Math.abs(prospectStats.age - 20) / 10;
  const performanceConfidence = calculateAdvancedMetrics(prospectStats).wOBA / 0.400;
  const developmentConfidence = peakStats.development_pace / 1.2;

  const confidenceScore = Math.min(
    100,
    Math.round(
      (similarityConfidence * 0.3 + 
       ageConfidence * 0.2 + 
       performanceConfidence * 0.3 +
       developmentConfidence * 0.2) * 100
    )
  );

  // Calculate ceiling and floor projections with comprehensive metrics
  const ceiling = {
    batting_avg: peakStats.batting_avg * 1.1,
    home_runs: Math.round(peakStats.home_runs * 1.2),
    rbi: Math.round(peakStats.rbi * 1.15),
    war: peakStats.war * 1.25,
    wOBA: peakStats.wOBA * 1.15,
    wRC_plus: Math.round(peakStats.wRC_plus * 1.2)
  };

  const floor = {
    batting_avg: peakStats.batting_avg * 0.9,
    home_runs: Math.round(peakStats.home_runs * 0.8),
    rbi: Math.round(peakStats.rbi * 0.85),
    war: peakStats.war * 0.75,
    wOBA: peakStats.wOBA * 0.85,
    wRC_plus: Math.round(peakStats.wRC_plus * 0.8)
  };

  // Calculate development factors
  const developmentFactors = {
    early_success: performanceConfidence,
    skill_stability: peakStats.consistency,
    physical_projection: 1 - (prospectStats.age - 18) / 10,
    position_scarcity: getPositionScarcityScore(prospectStats.position)
  };

  // Calculate injury risk factors
  const injuryRiskFactors = {
    age_factor: prospectStats.age < 23 ? 0.8 : 1.2,
    position_factor: getPositionInjuryRisk(prospectStats.position),
    workload_risk: 0.9 + (yearsToPeak * 0.05),
    overall_risk: 0
  };
  
  injuryRiskFactors.overall_risk = (
    injuryRiskFactors.age_factor * 0.3 +
    injuryRiskFactors.position_factor * 0.4 +
    injuryRiskFactors.workload_risk * 0.3
  );

  // Comprehensive risk assessment
  const riskFactors = [
    prospectStats.age < 18 ? "Very young - development path uncertain" : "",
    prospectStats.age > 24 ? "Late bloomer - limited upside potential" : "",
    similarityConfidence < 0.7 ? "Unique profile - harder to project" : "",
    performanceConfidence < 0.6 ? "Current performance below expectations" : "",
    developmentFactors.skill_stability < 0.7 ? "Inconsistent performance patterns" : "",
    injuryRiskFactors.overall_risk > 1.2 ? "Elevated injury risk profile" : ""
  ].filter(Boolean);

  const riskAssessment = riskFactors.length > 0 
    ? `Medium-High Risk: ${riskFactors.join(". ")}`
    : "Low Risk: Traditional development path expected";

  return {
    peak_stats: peakStats,
    development_curve: developmentCurve,
    confidence_score: confidenceScore,
    risk_assessment: riskAssessment,
    peak_age: peakAge,
    years_to_peak: yearsToPeak,
    ceiling_projection: ceiling,
    floor_projection: floor,
    development_factors: developmentFactors,
    injury_risk_factors: injuryRiskFactors
  };
};

// Helper function for position scarcity
function getPositionScarcityScore(position: string): number {
  const scarcityScores: { [key: string]: number } = {
    'Shortstop': 0.9,
    'Catcher': 0.85,
    'Center Field': 0.8,
    'Second Base': 0.75,
    'Third Base': 0.7,
    'Right Field': 0.65,
    'Left Field': 0.6,
    'First Base': 0.55,
    'Designated Hitter': 0.5
  };
  return scarcityScores[position] || 0.6;
}

// Helper function for position-based injury risk
function getPositionInjuryRisk(position: string): number {
  const injuryRisks: { [key: string]: number } = {
    'Catcher': 1.3,
    'Shortstop': 1.1,
    'Center Field': 1.1,
    'Second Base': 1.0,
    'Third Base': 0.9,
    'Right Field': 0.8,
    'Left Field': 0.8,
    'First Base': 0.7,
    'Designated Hitter': 0.6
  };
  return injuryRisks[position] || 1.0;
}