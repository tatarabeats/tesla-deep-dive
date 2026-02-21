import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { visionTreeData } from '../../data/visionTree';
import type { VisionNode } from '../../types/visionTree';

// Color mapping from CSS variable names to actual colors
const COLOR_MAP: Record<string, string> = {
  '--gold': 'rgba(255, 225, 140, 0.9)',
  '--accent-blue': 'rgba(80, 200, 255, 0.9)',
  '--tesla-red': 'rgba(255, 90, 80, 0.9)',
  '--accent-purple': 'rgba(180, 130, 255, 0.9)',
  '--accent-green': 'rgba(80, 220, 140, 0.9)',
  '--muted': 'rgba(200, 180, 150, 0.9)',
  '--foreground': 'rgba(232, 220, 200, 0.9)',
};

function getColor(node: VisionNode): string {
  return COLOR_MAP[node.color] || 'rgba(232, 220, 200, 0.9)';
}

function getColorAlpha(node: VisionNode, alpha: number): string {
  const base = COLOR_MAP[node.color] || 'rgba(232, 220, 200, 0.9)';
  return base.replace(/[\d.]+\)$/, `${alpha})`);
}

export default function VisionTreeExplorer() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const root = visionTreeData['root'];
  const branches = root.childrenIds.map(id => visionTreeData[id]).filter(Boolean);

  const handleBranchClick = (branchId: string) => {
    setActiveBranch(branchId);
    setExpandedNode(null);
  };

  const handleBack = () => {
    setActiveBranch(null);
    setExpandedNode(null);
  };

  const handleNodeToggle = (nodeId: string) => {
    setExpandedNode(prev => prev === nodeId ? null : nodeId);
  };

  return (
    <section className="tree-explorer">
      {/* Header */}
      <div ref={headerRef} className="tree-explorer__header">
        <motion.div
          className="tree-explorer__divider"
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.h2
          className="tree-explorer__title"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Deep Dive
        </motion.h2>
        <motion.p
          className="tree-explorer__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {root.content.analogy}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!activeBranch ? (
          <BranchGrid
            key="grid"
            branches={branches}
            onSelect={handleBranchClick}
          />
        ) : (
          <BranchDetail
            key={activeBranch}
            branchId={activeBranch}
            expandedNode={expandedNode}
            onNodeToggle={handleNodeToggle}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>

      {/* Share Footer */}
      <ShareFooter />
    </section>
  );
}

// ── Branch Grid (root view) ──
function BranchGrid({ branches, onSelect }: {
  branches: VisionNode[];
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      className="tree-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {branches.map((branch, i) => (
        <BranchCard key={branch.id} node={branch} index={i} onClick={() => onSelect(branch.id)} />
      ))}
    </motion.div>
  );
}

function BranchCard({ node, index, onClick }: {
  node: VisionNode;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const color = getColor(node);
  const colorBg = getColorAlpha(node, 0.06);
  const colorBorder = getColorAlpha(node, 0.15);

  return (
    <motion.button
      ref={ref}
      className="tree-card tree-card--branch"
      onClick={onClick}
      style={{
        '--card-color': color,
        '--card-bg': colorBg,
        '--card-border': colorBorder,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="tree-card__icon">{node.icon}</span>
      <span className="tree-card__threat">
        {node.subtitle || ''}
      </span>
      <h3 className="tree-card__title">{node.title}</h3>
      {node.heroStat && (
        <div className="tree-card__stat">
          <span className="tree-card__stat-num" style={{ color }}>{node.heroStat}</span>
          <span className="tree-card__stat-caption">{node.heroCaption}</span>
        </div>
      )}
      <span className="tree-card__arrow" style={{ color }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </motion.button>
  );
}

// ── Branch Detail View ──
function BranchDetail({ branchId, expandedNode, onNodeToggle, onBack }: {
  branchId: string;
  expandedNode: string | null;
  onNodeToggle: (id: string) => void;
  onBack: () => void;
}) {
  const branch = visionTreeData[branchId];
  if (!branch) return null;

  const color = getColor(branch);

  // Build flat tree: branch → its subtree in DFS order
  const nodes = flattenBranch(branchId);

  return (
    <motion.div
      className="tree-detail"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb / Back */}
      <button className="tree-detail__back" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>6 Threats</span>
      </button>

      {/* Branch header */}
      <div className="tree-detail__header">
        <span className="tree-detail__icon">{branch.icon}</span>
        <h2 className="tree-detail__title" style={{ color }}>{branch.title}</h2>
        {branch.subtitle && (
          <p className="tree-detail__subtitle">{branch.subtitle}</p>
        )}
      </div>

      {/* Branch intro */}
      <div className="tree-node tree-node--intro">
        <p className="tree-node__main-text">{branch.content.mainText}</p>
        {branch.content.elonQuote && (
          <blockquote className="tree-node__quote">
            &ldquo;{branch.content.elonQuote}&rdquo;
            {branch.content.quoteSource && (
              <cite>— Elon Musk, {branch.content.quoteSource}</cite>
            )}
          </blockquote>
        )}
      </div>

      {/* Child nodes */}
      <div className="tree-detail__nodes">
        {nodes.map((node, i) => (
          <NodeCard
            key={node.id}
            node={node}
            index={i}
            isExpanded={expandedNode === node.id}
            onToggle={() => onNodeToggle(node.id)}
            branchColor={color}
          />
        ))}
      </div>
    </motion.div>
  );
}

function NodeCard({ node, index, isExpanded, onToggle, branchColor }: {
  node: VisionNode;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  branchColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const depth = node.depth;

  return (
    <motion.div
      ref={ref}
      className={`tree-node tree-node--depth-${Math.min(depth, 4)}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <button className="tree-node__header" onClick={onToggle}>
        <span className="tree-node__icon">{node.icon}</span>
        <div className="tree-node__header-text">
          <h3 className="tree-node__title">{node.title}</h3>
          {node.heroStat && (
            <span className="tree-node__hero-stat" style={{ color: branchColor }}>
              {node.heroStat}
            </span>
          )}
        </div>
        <motion.span
          className="tree-node__chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="tree-node__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="tree-node__body-inner">
              {node.heroCaption && (
                <p className="tree-node__hero-caption">{node.heroCaption}</p>
              )}
              <p className="tree-node__main-text">{node.content.mainText}</p>

              {node.content.firstPrinciple && (
                <div className="tree-node__principle">
                  <span className="tree-node__principle-label">First Principles</span>
                  <p>{node.content.firstPrinciple}</p>
                </div>
              )}

              {node.content.data && node.content.data.length > 0 && (
                <div className="tree-node__data">
                  {node.content.data.map((d, i) => (
                    <div key={i} className="tree-node__data-row">
                      <span className="tree-node__data-label">{d.label}</span>
                      <span className="tree-node__data-value" style={{ color: branchColor }}>{d.value}</span>
                      {d.context && <span className="tree-node__data-context">{d.context}</span>}
                    </div>
                  ))}
                </div>
              )}

              {node.content.elonQuote && (
                <blockquote className="tree-node__quote">
                  &ldquo;{node.content.elonQuote}&rdquo;
                  {node.content.quoteSource && (
                    <cite>— Elon Musk, {node.content.quoteSource}</cite>
                  )}
                </blockquote>
              )}

              {node.content.analogy && (
                <div className="tree-node__analogy">
                  <span className="tree-node__analogy-label">Analogy</span>
                  <p>{node.content.analogy}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Helpers ──

function flattenBranch(branchId: string): VisionNode[] {
  const result: VisionNode[] = [];
  const branch = visionTreeData[branchId];
  if (!branch) return result;

  function dfs(nodeId: string) {
    const node = visionTreeData[nodeId];
    if (!node || node.id === branchId) return;
    result.push(node);
    for (const childId of node.childrenIds) {
      dfs(childId);
    }
  }

  for (const childId of branch.childrenIds) {
    dfs(childId);
  }

  return result;
}

// ── Share Footer ──

function ShareFooter() {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = '6つの脅威。6つの会社。1つの信念。\nイーロン・マスクのビジョンを深掘りするインタラクティブ体験。';

  const handleXShare = () => {
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank', 'width=550,height=420');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <motion.div
      ref={ref}
      className="share-footer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span className="share-footer__label">Share this experience</span>
      <div className="share-footer__buttons">
        <button className="share-footer__btn" onClick={handleXShare}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Post
        </button>
        <button className="share-footer__btn" onClick={handleCopy}>
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
      <p className="share-footer__credit">Tesla Deep Dive</p>
    </motion.div>
  );
}
