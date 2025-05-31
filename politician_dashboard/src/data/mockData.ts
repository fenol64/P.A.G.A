import { Candidate, RegionStrength, EngagementTag, DashboardSummary } from '../types/types';

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Alexander Smith',
    party: 'Progressive',
    state: 'California',
    region: 'West',
    supporters: 45000,
    events: 32,
    engagementRate: 78,
    tags: ['Youth', 'Urban', 'Environmentalists', 'Technology']
  },
  {
    id: '2',
    name: 'Maria Johnson',
    party: 'Progressive',
    state: 'New York',
    region: 'Northeast',
    supporters: 38000,
    events: 28,
    engagementRate: 72,
    tags: ['Urban', 'Minorities', 'Labor Unions']
  },
  {
    id: '3',
    name: 'Sarah Turner',
    party: 'Centrist',
    state: 'Florida',
    region: 'Southeast',
    supporters: 42000,
    events: 35,
    engagementRate: 65,
    tags: ['Seniors', 'Suburban', 'Moderates']
  },
  {
    id: '4',
    name: 'Robert Wilson',
    party: 'Progressive',
    state: 'Washington',
    region: 'West',
    supporters: 31000,
    events: 25,
    engagementRate: 81,
    tags: ['Technology', 'Youth', 'Environmentalists']
  },
  {
    id: '5',
    name: 'Edward Thompson',
    party: 'Traditional',
    state: 'Texas',
    region: 'South',
    supporters: 47000,
    events: 38,
    engagementRate: 69,
    tags: ['Rural', 'Religious', 'Small Business']
  },
  {
    id: '6',
    name: 'Mary Anderson',
    party: 'Progressive',
    state: 'Illinois',
    region: 'Midwest',
    supporters: 28000,
    events: 22,
    engagementRate: 74,
    tags: ['Youth', 'Urban', 'Education']
  },
  {
    id: '7',
    name: 'John Wilson',
    party: 'Traditional',
    state: 'Michigan',
    region: 'Midwest',
    supporters: 35000,
    events: 30,
    engagementRate: 68,
    tags: ['Labor Unions', 'Suburban', 'Industry']
  },
  {
    id: '8',
    name: 'Laura Park',
    party: 'Centrist',
    state: 'Oregon',
    region: 'West',
    supporters: 33000,
    events: 27,
    engagementRate: 70,
    tags: ['Suburban', 'Moderates', 'Women']
  },
  {
    id: '9',
    name: 'Daniel Andrews',
    party: 'Traditional',
    state: 'Georgia',
    region: 'Southeast',
    supporters: 39000,
    events: 31,
    engagementRate: 66,
    tags: ['Religious', 'Suburban', 'Small Business']
  },
  {
    id: '10',
    name: 'Michelle Lee',
    party: 'Progressive',
    state: 'Massachusetts',
    region: 'Northeast',
    supporters: 29000,
    events: 24,
    engagementRate: 77,
    tags: ['Minorities', 'Urban', 'Youth']
  },
  {
    id: '11',
    name: 'Charles Brown',
    party: 'Traditional',
    state: 'Pennsylvania',
    region: 'Northeast',
    supporters: 36000,
    events: 29,
    engagementRate: 64,
    tags: ['Rural', 'Industry', 'Labor Unions']
  },
  {
    id: '12',
    name: 'Sophie Martin',
    party: 'Progressive',
    state: 'Colorado',
    region: 'West',
    supporters: 32000,
    events: 26,
    engagementRate: 75,
    tags: ['Youth', 'Environmentalists', 'Suburban']
  }
];

export const regionStrengths: RegionStrength[] = [
  {
    region: 'West',
    totalCandidates: 3,
    overallStrength: 78,
    states: [
      { state: 'California', abbreviation: 'CA', strength: 85, candidates: 1, color: '#1a56db' },
      { state: 'Washington', abbreviation: 'WA', strength: 82, candidates: 1, color: '#1e429f' },
      { state: 'Oregon', abbreviation: 'OR', strength: 80, candidates: 1, color: '#2563eb' },
      { state: 'Nevada', abbreviation: 'NV', strength: 65, candidates: 0, color: '#3b82f6' }
    ]
  },
  {
    region: 'Northeast',
    totalCandidates: 3,
    overallStrength: 71,
    states: [
      { state: 'New York', abbreviation: 'NY', strength: 75, candidates: 1, color: '#1e429f' },
      { state: 'Massachusetts', abbreviation: 'MA', strength: 72, candidates: 1, color: '#3b82f6' },
      { state: 'Pennsylvania', abbreviation: 'PA', strength: 70, candidates: 1, color: '#60a5fa' }
    ]
  },
  {
    region: 'Southeast',
    totalCandidates: 2,
    overallStrength: 65,
    states: [
      { state: 'Florida', abbreviation: 'FL', strength: 68, candidates: 1, color: '#60a5fa' },
      { state: 'Georgia', abbreviation: 'GA', strength: 65, candidates: 1, color: '#93c5fd' },
      { state: 'North Carolina', abbreviation: 'NC', strength: 62, candidates: 0, color: '#93c5fd' },
      { state: 'Virginia', abbreviation: 'VA', strength: 60, candidates: 0, color: '#bfdbfe' },
      { state: 'South Carolina', abbreviation: 'SC', strength: 55, candidates: 0, color: '#dbeafe' }
    ]
  },
  {
    region: 'Midwest',
    totalCandidates: 2,
    overallStrength: 68,
    states: [
      { state: 'Illinois', abbreviation: 'IL', strength: 70, candidates: 1, color: '#60a5fa' },
      { state: 'Michigan', abbreviation: 'MI', strength: 68, candidates: 1, color: '#60a5fa' },
      { state: 'Ohio', abbreviation: 'OH', strength: 65, candidates: 0, color: '#93c5fd' },
      { state: 'Wisconsin', abbreviation: 'WI', strength: 64, candidates: 0, color: '#93c5fd' },
      { state: 'Minnesota', abbreviation: 'MN', strength: 62, candidates: 0, color: '#bfdbfe' }
    ]
  },
  {
    region: 'South',
    totalCandidates: 1,
    overallStrength: 70,
    states: [
      { state: 'Texas', abbreviation: 'TX', strength: 72, candidates: 1, color: '#3b82f6' },
      { state: 'Arizona', abbreviation: 'AZ', strength: 68, candidates: 0, color: '#60a5fa' },
      { state: 'Tennessee', abbreviation: 'TN', strength: 65, candidates: 0, color: '#93c5fd' },
      { state: 'Louisiana', abbreviation: 'LA', strength: 60, candidates: 0, color: '#bfdbfe' }
    ]
  }
];

export const engagementTags: EngagementTag[] = [
  { name: 'Youth', count: 5, percentage: 42, color: '#3b82f6' },
  { name: 'Urban', count: 4, percentage: 33, color: '#60a5fa' },
  { name: 'Suburban', count: 5, percentage: 42, color: '#2563eb' },
  { name: 'Environmentalists', count: 3, percentage: 25, color: '#34d399' },
  { name: 'Labor Unions', count: 3, percentage: 25, color: '#f59e0b' },
  { name: 'Minorities', count: 2, percentage: 17, color: '#8b5cf6' },
  { name: 'Religious', count: 2, percentage: 17, color: '#ec4899' },
  { name: 'Small Business', count: 2, percentage: 17, color: '#f97316' },
  { name: 'Technology', count: 2, percentage: 17, color: '#06b6d4' },
  { name: 'Industry', count: 2, percentage: 17, color: '#6366f1' },
  { name: 'Women', count: 1, percentage: 8, color: '#d946ef' },
  { name: 'Seniors', count: 1, percentage: 8, color: '#64748b' },
  { name: 'Rural', count: 2, percentage: 17, color: '#84cc16' },
  { name: 'Moderates', count: 2, percentage: 17, color: '#a855f7' },
  { name: 'Education', count: 1, percentage: 8, color: '#f43f5e' }
];

export const dashboardSummary: DashboardSummary = {
  totalCandidates: candidates.length,
  totalStates: [...new Set(candidates.map(c => c.state))].length,
  totalRegions: [...new Set(candidates.map(c => c.region))].length,
  avgEngagementRate: Math.round(candidates.reduce((sum, c) => sum + c.engagementRate, 0) / candidates.length),
  strongestRegion: 'West',
  weakestRegion: 'South',
  topTags: ['Youth', 'Urban', 'Suburban']
};

export const getCandidatesByRegion = (region: string): Candidate[] => {
  return candidates.filter(candidate => candidate.region === region);
};

export const getAllStates = (): string[] => {
  return [...new Set(regionStrengths.flatMap(region => region.states.map(state => state.state)))];
};

export const getAllRegions = (): string[] => {
  return [...new Set(regionStrengths.map(region => region.region))];
};