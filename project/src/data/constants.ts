export const POSITIONS = [
  'Catcher',
  'First Base',
  'Second Base',
  'Third Base',
  'Shortstop',
  'Left Field',
  'Center Field',
  'Right Field',
  'Designated Hitter'
] as const;

export const POSITION_SCARCITY: Record<string, number> = {
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

export const POSITION_INJURY_RISK: Record<string, number> = {
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

export const DEVELOPMENT_STAGES = {
  ROOKIE: 'Rookie Ball',
  LOW_A: 'Low-A',
  HIGH_A: 'High-A',
  AA: 'Double-A',
  AAA: 'Triple-A',
  MLB: 'Major League'
} as const;

export const PROJECTION_CONFIDENCE_LEVELS = {
  VERY_HIGH: { threshold: 0.9, label: 'Very High' },
  HIGH: { threshold: 0.8, label: 'High' },
  MEDIUM: { threshold: 0.6, label: 'Medium' },
  LOW: { threshold: 0.4, label: 'Low' },
  VERY_LOW: { threshold: 0.2, label: 'Very Low' }
} as const;