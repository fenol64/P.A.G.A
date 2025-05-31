export interface Candidate {
  id: string;
  name: string;
  party: string;
  state: string;
  region: string;
  supporters: number;
  events: number;
  engagementRate: number;
  tags: string[];
}

export interface RegionStrength {
  region: string;
  states: StateStrength[];
  totalCandidates: number;
  overallStrength: number;
}

export interface StateStrength {
  state: string;
  abbreviation: string;
  strength: number;
  candidates: number;
  color: string;
}

export interface EngagementTag {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DashboardSummary {
  totalCandidates: number;
  totalStates: number;
  totalRegions: number;
  avgEngagementRate: number;
  strongestRegion: string;
  weakestRegion: string;
  topTags: string[];
}