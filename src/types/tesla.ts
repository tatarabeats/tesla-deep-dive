export interface CompetitorData {
  company: string;
  ticker: string;
  revenue: number;
  grossMargin: number;
  operatingMargin: number;
  marketCap: number;
  peRatio: number | null;
  deliveries: number | null;
  evRevenue: number;
  lastUpdated: string;
}

export interface SegmentPeriod {
  period: string;
  revenue: number;
  grossMargin: number;
}

export interface SegmentData {
  segment: 'automotive' | 'energy' | 'services';
  label: string;
  periods: SegmentPeriod[];
}
