export type BranchId =
  | 'root'
  | 'spacex'
  | 'tesla'
  | 'neuralink'
  | 'xai'
  | 'optimus'
  | 'x_platform'
  | 'boring';

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

export interface ExplorationState {
  expandedNodes: Set<string>;
  exploredNodes: Set<string>;
  bookmarkedNodes: string[];
}

export interface BranchProgress {
  totalNodes: number;
  exploredNodes: number;
  deepestDepth: number;
  fullyExplored: boolean;
}
