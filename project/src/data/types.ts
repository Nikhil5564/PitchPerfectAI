// Player Statistics Types
export interface BaseStats {
  battingAverage: number;
  homeRuns: number;
  rbi: number;
  ops: number;
  war: number;
  games: number;
  hits: number;
  doubles: number;
  triples: number;
  walks: number;
  strikeouts: number;
  stolenBases: number;
  sluggingPct: number;
  onBasePct: number;
}

export interface AdvancedStats {
  wOBA: number;
  wRCPlus: number;
  babip: number;
  isoPower: number;
  contactRate: number;
  plateDiscipline: number;
  clutchRating: number;
}

export interface SprayData {
  pullPct: number;
  centerPct: number;
  oppoPct: number;
  groundBallPct: number;
  lineDrivePct: number;
  flyBallPct: number;
}

export interface ZoneData {
  inside: number;
  outside: number;
  high: number;
  low: number;
  heart: number;
}

export interface PitchValues {
  fastball: number;
  breaking: number;
  offspeed: number;
}

export interface SituationalStats {
  rispAvg: number;
  lateCloseAvg: number;
  aheadAvg: number;
  behindAvg: number;
  platoonSplit: number;
}

export interface SeasonalProgression {
  season: number;
  age: number;
  stats: BaseStats & AdvancedStats;
  consistencyRating: number;
  developmentPace: number;
  injuryRisk: number;
}

export interface ProspectProfile {
  id: string;
  name: string;
  position: string;
  age: number;
  stats: BaseStats;
  advancedStats: AdvancedStats;
  sprayData: SprayData;
  zoneData: ZoneData;
  pitchValues: PitchValues;
  situationalStats: SituationalStats;
  progression: SeasonalProgression[];
}