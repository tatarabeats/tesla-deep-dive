export type BranchId =
  | 'root'
  | 'single-planet'
  | 'fossil-fuel'
  | 'intelligence-limits'
  | 'population-decline'
  | 'mobility-inefficiency'
  | 'info-finance-gap';

export interface VisionNode {
  id: string;
  branchId: BranchId;
  depth: number;
  parentId: string | null;
  childrenIds: string[];
  title: string;
  subtitle?: string;
  content: NodeContent;
  icon: string;
  color: string;
  imageUrl?: string;
}

export interface NodeContent {
  mainText: string;
  elonQuote?: string;
  quoteSource?: string;
  firstPrinciple?: string;
  data?: NodeDataPoint[];
  analogy?: string;
}

export interface NodeDataPoint {
  label: string;
  value: string;
  context?: string;
}

export type TransitionDirection = 'in' | 'out' | 'jump';

export interface ExplorationState {
  currentNodeId: string;
  pathStack: string[];
  transitionDirection: TransitionDirection;
  exploredNodes: Set<string>;
  bookmarkedNodes: string[];
}
