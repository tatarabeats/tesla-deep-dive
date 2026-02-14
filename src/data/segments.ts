import type { SegmentData } from '../types/tesla';

export const segmentData: SegmentData[] = [
  {
    segment: 'automotive',
    label: '🚗 Automotive（車両販売・リース・クレジット）',
    periods: [
      { period: 'Q1 23', revenue: 19878, grossMargin: 19.3 },
      { period: 'Q2 23', revenue: 21268, grossMargin: 18.1 },
      { period: 'Q3 23', revenue: 19625, grossMargin: 18.7 },
      { period: 'Q4 23', revenue: 21563, grossMargin: 17.6 },
      { period: 'Q1 24', revenue: 17378, grossMargin: 17.4 },
      { period: 'Q2 24', revenue: 19878, grossMargin: 18.5 },
      { period: 'Q3 24', revenue: 20016, grossMargin: 19.8 },
      { period: 'Q4 24', revenue: 23429, grossMargin: 18.2 },
    ],
  },
  {
    segment: 'energy',
    label: '⚡ Energy Generation & Storage',
    periods: [
      { period: 'Q1 23', revenue: 1529, grossMargin: 11.0 },
      { period: 'Q2 23', revenue: 1509, grossMargin: 18.4 },
      { period: 'Q3 23', revenue: 1559, grossMargin: 24.4 },
      { period: 'Q4 23', revenue: 1438, grossMargin: 23.9 },
      { period: 'Q1 24', revenue: 1635, grossMargin: 24.6 },
      { period: 'Q2 24', revenue: 3014, grossMargin: 24.9 },
      { period: 'Q3 24', revenue: 2376, grossMargin: 30.5 },
      { period: 'Q4 24', revenue: 3060, grossMargin: 26.8 },
    ],
  },
  {
    segment: 'services',
    label: '🔧 Services & Other',
    periods: [
      { period: 'Q1 23', revenue: 1837, grossMargin: 3.7 },
      { period: 'Q2 23', revenue: 2150, grossMargin: 4.0 },
      { period: 'Q3 23', revenue: 2166, grossMargin: 5.2 },
      { period: 'Q4 23', revenue: 2166, grossMargin: 4.1 },
      { period: 'Q1 24', revenue: 2288, grossMargin: 5.5 },
      { period: 'Q2 24', revenue: 2608, grossMargin: 6.3 },
      { period: 'Q3 24', revenue: 2790, grossMargin: 8.1 },
      { period: 'Q4 24', revenue: 2949, grossMargin: 7.2 },
    ],
  },
];
