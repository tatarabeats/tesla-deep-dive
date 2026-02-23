import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { visionTreeData } from '../../data/visionTree';
import type { VisionNode, NodeDataPoint } from '../../types/visionTree';

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

// Japanese translations for common Elon quotes
const QUOTE_JP: Record<string, string> = {
  'Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.':
    '意識はとても稀で、貴重なものだ。意識の灯を守るために、できることは全てやるべきだ。',
  'There is a profound difference between single-planet & multiplanet species. If we are able to visit other stars one day, we may discover many long-dead single-planet civilizations.':
    '単一惑星種と多惑星種には根本的な違いがある。いつか他の星を訪れたとき、既に滅んだ単一惑星文明の残骸をいくつも見つけるかもしれない。',
  'If humanity is to become multi-planetary, the fundamental breakthrough that needs to occur in rocketry is a rapidly and completely reusable rocket.':
    '人類が多惑星種になるには、ロケット技術で根本的なブレークスルーが必要だ。それは、迅速かつ完全に再利用可能なロケットだ。',
  'The cost of the raw materials in a rocket is only about 2% of the typical price. So, theoretically, we could improve the cost of rocketry by a factor of 50.':
    'ロケットの原材料コストは全体のわずか2%。理論上、ロケットのコストを50分の1にできる。',
  'Nuke Mars!': '火星に核を！',
  'The overarching purpose of Tesla Motors is to help expedite the move from a mine-and-burn hydrocarbon economy towards a solar electric economy.':
    'テスラの最大の目的は、「掘って燃やす」炭化水素経済から、太陽電気経済への移行を加速すること。',
  'Almost any new technology initially has high unit cost before it can be optimized. The strategy of Tesla is to enter at the high end of the market and progressively drive down.':
    'ほぼ全ての新技術は、最初は高コスト。テスラの戦略は高級市場から参入し、段階的にコストを下げること。',
  'Autonomy will make Tesla worth more than all the other car companies combined.':
    '自動運転がテスラを、他の全自動車メーカーの合計より価値のある会社にする。',
  'The economics of robotaxi are very, very compelling. The cost per mile will be incredibly low.':
    'ロボタクシーの経済性は非常に魅力的だ。1マイルあたりのコストは驚くほど低くなる。',
  'We have this handy fusion reactor in the sky called the sun. You don\'t have to do anything; it just works.':
    '空に「太陽」という便利な核融合炉がある。何もしなくても勝手に動いてくれる。',
  'We will have AI that is smarter than any one human probably around end of next year. AI that is smarter than all humans combined is probably within five years.':
    '来年末頃にはどの個人よりも賢いAIができる。全人類の合計より賢いAIは、おそらく5年以内だ。',
  'The goal of xAI is to understand the true nature of the universe.':
    'xAIの目標は、宇宙の本質を理解すること。',
  'I think there\'s a real danger in training AI to be politically correct, or in other words, training AI to lie.':
    'AIに政治的正しさを教えること、つまりAIに嘘を教えることには、本当の危険がある。',
  'If you can\'t beat them, join them. We will have the option of merging with AI.':
    '勝てないなら、融合すればいい。AIと合体する選択肢を持つことになる。',
  'Even in a benign AI scenario, we\'ll be left behind. With a high-bandwidth brain-machine interface, we can actually go along for the ride.':
    '善意のAIのシナリオでさえ、人間は取り残される。高帯域脳-機械インターフェースがあれば、一緒についていける。',
  'Population collapse due to low birth rates is a much bigger risk to civilization than global warming.':
    '低出生率による人口崩壊は、地球温暖化よりはるかに大きな文明のリスクだ。',
  'Optimus will be more significant than the vehicle business over time.':
    'OptimusはやがてEV事業より重要になる。',
  'In the long term, I think Optimus will be worth more than everything else at Tesla combined.':
    '長期的に見て、Optimusはテスラの他の全事業を合わせたよりも価値があると思う。',
  'Human society is based on the interaction of a bipedal humanoid with two arms and ten fingers.':
    '人間社会は、二足歩行で2本の腕と10本の指を持つヒューマノイドの相互作用に基づいている。',
  'There will be universal high income -- not merely basic income. There\'ll be no shortage of goods or services.':
    '普遍的高所得（ベーシックインカムではなく）が実現する。モノもサービスも不足しなくなる。',
  'Traffic is soul-destroying. It\'s like acid on the soul, a horrible way to spend your life.':
    '渋滞は魂を蝕む。魂への酸だ。人生の最悪の過ごし方。',
  'We\'re trying to dig a hole under LA. And this is to create the beginning of what will hopefully be a 3-D network of tunnels to alleviate congestion.':
    'LA の地下にトンネルを掘っている。渋滞を解消する3Dトンネルネットワークの始まりだ。',
  'The Loop is a stepping stone toward hyperloop. The Loop is for transport within a city. Hyperloop is for transport between cities.':
    'Loopはハイパーループへの足がかり。Loopは都市内、ハイパーループは都市間の輸送。',
  'Free speech is the bedrock of a functioning democracy, and Twitter is the digital town square where matters vital to the future of humanity are debated.':
    '言論の自由は民主主義の基盤。Twitterは人類の未来に関わる議論が行われるデジタル公共広場だ。',
  'The bird is freed.': '鳥は解放された。',
  'Buying Twitter is an accelerant to creating X, the everything app.':
    'Twitter買収は、エブリシングアプリ「X」の実現を加速する。',
  'It is unknown whether we are the only civilization currently alive in the observable universe, but any chance that we are is added impetus for extending life beyond Earth.':
    '我々が観測可能な宇宙で唯一の文明かは不明だが、その可能性があるなら、地球の外に生命を広げる動機がさらに強まる。',
  'The first Neuralink product is called Telepathy. It enables control of your phone or computer, and through them almost any device, just by thinking.':
    'Neuralinkの最初の製品は「Telepathy」。思考だけで携帯やコンピューター、そしてほぼあらゆるデバイスを操作できる。',
};

export default function VisionTreeExplorer() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const root = visionTreeData['root'];
  const branches = root.childrenIds.map(id => visionTreeData[id]).filter(Boolean);

  const handleBranchClick = (branchId: string) => {
    setActiveBranch(branchId);
    // Scroll to top of detail
    window.scrollTo({ top: document.querySelector('.tree-explorer')?.getBoundingClientRect().top! + window.scrollY - 20, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveBranch(null);
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
          <WebtoonBranch
            key={activeBranch}
            branchId={activeBranch}
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

// ── Webtoon-style Branch View ──
function WebtoonBranch({ branchId, onBack }: {
  branchId: string;
  onBack: () => void;
}) {
  const branch = visionTreeData[branchId];
  if (!branch) return null;

  const color = getColor(branch);
  const nodes = flattenBranch(branchId);

  return (
    <motion.div
      className="wt-branch"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <button className="wt-back" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>6 Threats</span>
      </button>

      {/* Hero panel — branch intro */}
      <WebtoonHero branch={branch} color={color} />

      {/* Intro text panel */}
      <WebtoonIntro branch={branch} color={color} />

      {/* Content panels — each node is a visual "episode" */}
      {nodes.map((node) => (
        <WebtoonPanel key={node.id} node={node} branchColor={color} />
      ))}

      {/* End cap */}
      <WebtoonEndCap color={color} onBack={onBack} branchTitle={branch.title} />
    </motion.div>
  );
}

// ── Hero panel for the branch ──
function WebtoonHero({ branch, color }: { branch: VisionNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="wt-hero"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <span className="wt-hero__icon">{branch.icon}</span>
      <h2 className="wt-hero__title" style={{ color }}>{branch.title}</h2>
      {branch.subtitle && (
        <p className="wt-hero__subtitle">{branch.subtitle}</p>
      )}
      {branch.heroStat && (
        <div className="wt-hero__stat">
          <span className="wt-hero__stat-num" style={{ color }}>{branch.heroStat}</span>
          <span className="wt-hero__stat-caption">{branch.heroCaption}</span>
        </div>
      )}
    </motion.div>
  );
}

// ── Branch intro text ──
function WebtoonIntro({ branch, color }: { branch: VisionNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="wt-intro"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <p className="wt-intro__text">{branch.content.mainText}</p>

      {branch.content.elonQuote && (
        <QuoteBubble
          quote={branch.content.elonQuote}
          source={branch.content.quoteSource}
          color={color}
        />
      )}

      {branch.content.firstPrinciple && (
        <div className="wt-principle">
          <span className="wt-principle__label">🔬 First Principles</span>
          <p>{branch.content.firstPrinciple}</p>
        </div>
      )}
    </motion.div>
  );
}

// ── Each node as a webtoon panel ──
function WebtoonPanel({ node, branchColor }: {
  node: VisionNode;
  branchColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isDeep = node.depth >= 3;

  return (
    <motion.div
      ref={ref}
      className={`wt-panel ${isDeep ? 'wt-panel--deep' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 }}
    >
      {/* Panel header */}
      <div className="wt-panel__head">
        <span className="wt-panel__icon">{node.icon}</span>
        <div className="wt-panel__titles">
          <h3 className="wt-panel__title">{node.title}</h3>
          {node.heroStat && (
            <span className="wt-panel__hero-stat" style={{ color: branchColor }}>
              {node.heroStat}
            </span>
          )}
        </div>
      </div>

      {/* Hero caption */}
      {node.heroCaption && (
        <p className="wt-panel__caption">{node.heroCaption}</p>
      )}

      {/* Main text */}
      <p className="wt-panel__text">{node.content.mainText}</p>

      {/* Data points — big visual numbers */}
      {node.content.data && node.content.data.length > 0 && (
        <DataCards data={node.content.data} color={branchColor} />
      )}

      {/* Elon quote bubble */}
      {node.content.elonQuote && (
        <QuoteBubble
          quote={node.content.elonQuote}
          source={node.content.quoteSource}
          color={branchColor}
        />
      )}

      {/* First principle */}
      {node.content.firstPrinciple && (
        <div className="wt-principle">
          <span className="wt-principle__label">🔬 First Principles</span>
          <p>{node.content.firstPrinciple}</p>
        </div>
      )}

      {/* Analogy */}
      {node.content.analogy && (
        <div className="wt-analogy">
          <span className="wt-analogy__label">💡 Analogy</span>
          <p>{node.content.analogy}</p>
        </div>
      )}
    </motion.div>
  );
}

// ── Elon Quote Bubble ──
function QuoteBubble({ quote, source, color }: {
  quote: string;
  source?: string;
  color: string;
}) {
  const jpTranslation = QUOTE_JP[quote];

  return (
    <div className="wt-quote" style={{ borderColor: `${color}33` }}>
      <div className="wt-quote__en">&ldquo;{quote}&rdquo;</div>
      {jpTranslation && (
        <div className="wt-quote__jp">{jpTranslation}</div>
      )}
      {source && (
        <cite className="wt-quote__source">— Elon Musk, {source}</cite>
      )}
    </div>
  );
}

// ── Data Cards ──
function DataCards({ data, color }: { data: NodeDataPoint[]; color: string }) {
  return (
    <div className="wt-data">
      {data.map((d, i) => (
        <div key={i} className="wt-data__card">
          <span className="wt-data__value" style={{ color }}>{d.value}</span>
          <span className="wt-data__label">{d.label}</span>
          {d.context && <span className="wt-data__context">{d.context}</span>}
        </div>
      ))}
    </div>
  );
}

// ── End cap ──
function WebtoonEndCap({ color, onBack, branchTitle }: {
  color: string;
  onBack: () => void;
  branchTitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="wt-endcap"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="wt-endcap__line" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <p className="wt-endcap__text" style={{ color }}>
        — {branchTitle} —
      </p>
      <button className="wt-endcap__btn" onClick={onBack}>
        他の脅威を見る
      </button>
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
