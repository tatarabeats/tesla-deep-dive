import type { VisionNode, BranchId } from '../types/visionTree';

export const visionTreeData: Record<string, VisionNode> = {
  // ========================================
  // ROOT — 意識を守り、広げる
  // ========================================
  'root': {
    id: 'root',
    branchId: 'root',
    depth: 0,
    parentId: null,
    childrenIds: ['spacex', 'tesla', 'neuralink', 'xai', 'optimus', 'x_platform', 'boring'],
    title: '意識を守り、広げる',
    subtitle: 'Protect and Expand Consciousness',
    icon: '🌌',
    color: '--gold',
    content: {
      mainText: 'イーロン・マスクの全事業は一つの信念から生まれている。「意識は宇宙で極めて稀で貴重。その灯を消さず、広げることが最重要」。全ての会社はこの使命の異なる側面を担う。',
      elonQuote: 'Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.',
      quoteSource: 'Lex Fridman Podcast, 2021',
      analogy: '暗闇の宇宙に灯った小さなロウソク。その火を消さないこと、そして別の場所にも灯すこと。それが全ての出発点。',
    },
  },

  // ========================================
  // SPACEX — 宇宙に広がる
  // ========================================
  'spacex': {
    id: 'spacex',
    branchId: 'spacex',
    depth: 1,
    parentId: 'root',
    childrenIds: ['spacex-why-extinction'],
    title: '宇宙に広がる',
    subtitle: 'SpaceX',
    icon: '🚀',
    color: '--accent-blue',
    content: {
      mainText: '人類を多惑星種にする。地球だけに留まる文明は、一つの大災害で終わる。意識の火を宇宙に広げるための会社。',
      elonQuote: 'You want to wake up in the morning and think the future is going to be great. And that\'s what being a spacefaring civilization is all about.',
      quoteSource: 'SpaceX創業時, 2002',
    },
  },
  'spacex-why-extinction': {
    id: 'spacex-why-extinction',
    branchId: 'spacex',
    depth: 2,
    parentId: 'spacex',
    childrenIds: ['spacex-why-rare', 'spacex-why-risks'],
    title: '地球一つでは滅びるリスク',
    icon: '🌍',
    color: '--accent-blue',
    content: {
      mainText: '地球にはいつか文明を終わらせる大災害が来る。これは「起きるかどうか」ではなく「いつ起きるか」の問題。十分な時間が経てば、低確率の破滅的イベントもほぼ確実に起きる。',
      firstPrinciple: '確率論。十分長い時間軸で見れば、低確率×高インパクトの事象は必然になる。バックアップなしでは意識は消える。',
      data: [
        { label: '大量絶滅の頻度', value: '約6,200万年ごと', context: '最後は6,600万年前（恐竜絶滅）' },
      ],
    },
  },
  'spacex-why-rare': {
    id: 'spacex-why-rare',
    branchId: 'spacex',
    depth: 3,
    parentId: 'spacex-why-extinction',
    childrenIds: ['spacex-why-mars'],
    title: '意識は宇宙で極めて稀',
    icon: '✨',
    color: '--accent-blue',
    content: {
      mainText: '138億年の宇宙の歴史で、知的生命の証拠は地球だけ。もし人類が滅びたら、宇宙を理解する存在がゼロになる可能性がある。',
      elonQuote: 'It is unknown whether we are the only civilization currently alive in the observable universe, but any chance that we are is added impetus for extending life beyond Earth.',
      quoteSource: 'SpaceX Website',
      analogy: '広大な砂漠にたった一本の木。その木が枯れたら、砂漠は永遠に砂漠のまま。',
    },
  },
  'spacex-why-risks': {
    id: 'spacex-why-risks',
    branchId: 'spacex',
    depth: 3,
    parentId: 'spacex-why-extinction',
    childrenIds: [],
    title: '文明を脅かすリスクは複数同時進行',
    icon: '⚠️',
    color: '--accent-blue',
    content: {
      mainText: '小惑星衝突、超大規模噴火、核戦争、パンデミック、AI暴走、気候変動。どれか一つではなく、複数のリスクが同時に存在している。地球という一つのカゴに全ての卵を入れている状態。',
      data: [
        { label: '小惑星衝突', value: '数千万年に1回', context: '6,600万年前に恐竜を絶滅させた' },
        { label: '超大規模噴火', value: '数十万年に1回', context: 'イエローストーンは約60万年周期' },
        { label: '核戦争', value: '冷戦以来の現実的脅威', context: '全面核戦争で核の冬' },
      ],
    },
  },
  'spacex-why-mars': {
    id: 'spacex-why-mars',
    branchId: 'spacex',
    depth: 4,
    parentId: 'spacex-why-rare',
    childrenIds: ['spacex-why-rocket-cost'],
    title: 'なぜ火星？最も現実的な候補',
    icon: '🔴',
    color: '--accent-blue',
    content: {
      mainText: '太陽系で自給自足コロニーを作れる最も現実的な惑星。約24時間の自転周期、水の存在、CO2大気（植物栽培に変換可能）、地球から比較的近い。',
      firstPrinciple: '候補を物理的制約で絞る。金星は灼熱、木星衛星は遠すぎる。火星が消去法で最適解。',
      data: [
        { label: '自転周期', value: '24時間37分', context: '地球とほぼ同じ' },
        { label: '地球からの距離', value: '最短5,500万km', context: '約6-9ヶ月の旅' },
        { label: '水の存在', value: '極地に氷として確認', context: '生命維持・燃料製造に利用可能' },
      ],
    },
  },
  'spacex-why-rocket-cost': {
    id: 'spacex-why-rocket-cost',
    branchId: 'spacex',
    depth: 5,
    parentId: 'spacex-why-mars',
    childrenIds: ['spacex-why-reusable'],
    title: 'ボトルネックはロケットのコスト',
    icon: '💰',
    color: '--accent-blue',
    content: {
      mainText: '火星に行く技術は理論上存在する。問題はコスト。従来のロケットは1回の打ち上げで数億ドル。100万人を火星に送るには、打ち上げコストを100分の1以下にする必要がある。',
      firstPrinciple: 'ロケットの原材料（アルミ、チタン、炭素繊維）は総コストの約2%。残り98%は製造と使い捨ての非効率さ。',
      elonQuote: 'The cost of the raw materials in a rocket is only about 2% of the typical price. So, theoretically, we could improve the cost of rocketry by a factor of 50.',
      quoteSource: 'Wired Interview, 2012',
    },
  },
  'spacex-why-reusable': {
    id: 'spacex-why-reusable',
    branchId: 'spacex',
    depth: 6,
    parentId: 'spacex-why-rocket-cost',
    childrenIds: [],
    title: '再利用 = First Principles',
    icon: '♻️',
    color: '--accent-blue',
    content: {
      mainText: '飛行機は毎回使い捨てない。ロケットも再利用すればコストは劇的に下がる。SpaceXはFalcon 9のブースター着陸回収を実現し、Starshipでは機体全体の再利用を目指す。',
      firstPrinciple: '「前例がない」は「不可能」ではない。物理法則が許すなら、エンジニアリングの問題に過ぎない。',
      data: [
        { label: '打ち上げコスト削減', value: '約90%以上', context: 'Falcon 9再利用前 vs 後' },
        { label: 'Falcon 9再利用回数', value: '最大20回以上', context: '単一ブースターの記録' },
        { label: 'Starship目標', value: '完全再利用', context: '機体+ブースター両方を回収' },
      ],
      analogy: 'もし飛行機を毎回捨てていたら、東京からニューヨークへの航空券は数億円。再利用が全てを変える。',
    },
  },

  // ========================================
  // TESLA — エネルギー革命
  // ========================================
  'tesla': {
    id: 'tesla',
    branchId: 'tesla',
    depth: 1,
    parentId: 'root',
    childrenIds: ['tesla-why-fossil'],
    title: 'エネルギー革命',
    subtitle: 'Tesla',
    icon: '⚡',
    color: '--tesla-red',
    content: {
      mainText: '持続可能なエネルギーへの移行を加速する。化石燃料依存からの脱却は、文明存続の前提条件。',
      elonQuote: 'The overarching purpose of Tesla Motors is to help expedite the move from a mine-and-burn hydrocarbon economy towards a solar electric economy.',
      quoteSource: 'Master Plan Part 1, 2006',
    },
  },
  'tesla-why-fossil': {
    id: 'tesla-why-fossil',
    branchId: 'tesla',
    depth: 2,
    parentId: 'tesla',
    childrenIds: ['tesla-why-ev', 'tesla-why-energy-storage'],
    title: '化石燃料は文明を殺す',
    icon: '🏭',
    color: '--tesla-red',
    content: {
      mainText: '化石燃料の燃焼はCO2を排出し、気候変動を加速させる。このまま続ければ、異常気象・海面上昇・食糧危機で文明が弱体化する。火星に行く前に地球を壊してはならない。',
      firstPrinciple: '太陽は1時間で人類の年間エネルギー消費量以上を地球に届けている。問題は発電ではなく、貯蔵と配電。',
      data: [
        { label: '太陽エネルギー', value: '地球到達量 > 年間消費量', context: '1時間分の太陽光 ≈ 1年分の人類消費' },
      ],
    },
  },
  'tesla-why-ev': {
    id: 'tesla-why-ev',
    branchId: 'tesla',
    depth: 3,
    parentId: 'tesla-why-fossil',
    childrenIds: ['tesla-why-expensive-first'],
    title: 'なぜEV？輸送が化石燃料消費の21%',
    icon: '🚗',
    color: '--tesla-red',
    content: {
      mainText: '世界の化石燃料消費の約21%が輸送セクター。ガソリン車をEVに置き換えれば、この部分を電力（再生可能エネルギー）に切り替えられる。',
      data: [
        { label: '輸送の化石燃料比率', value: '約21%', context: 'Master Plan Part 3の試算' },
        { label: 'EVのエネルギー効率', value: 'ガソリン車の3-4倍', context: '電動モーターvs内燃機関' },
      ],
    },
  },
  'tesla-why-expensive-first': {
    id: 'tesla-why-expensive-first',
    branchId: 'tesla',
    depth: 4,
    parentId: 'tesla-why-ev',
    childrenIds: ['tesla-why-vertical'],
    title: 'なぜ高級車から？マスタープランの罠',
    icon: '🏎️',
    color: '--tesla-red',
    content: {
      mainText: 'EVはバッテリーが高い。最初から安い車を作ると赤字で潰れる。まず高級スポーツカー（Roadster）で利益を出し、その資金で中価格帯（Model S/X）、さらに大衆車（Model 3/Y）へ。',
      firstPrinciple: 'スケールカーブを逆算。バッテリーコストは生産量に比例して下がる。最初は少量高価格で開始し、規模拡大でコストを下げていく。',
      elonQuote: 'Almost any new technology initially has high unit cost before it can be optimized. The strategy of Tesla is to enter at the high end of the market and progressively drive down.',
      quoteSource: 'Master Plan Part 1, 2006',
    },
  },
  'tesla-why-vertical': {
    id: 'tesla-why-vertical',
    branchId: 'tesla',
    depth: 5,
    parentId: 'tesla-why-expensive-first',
    childrenIds: [],
    title: '垂直統合 = スピードとコスト',
    icon: '🏭',
    color: '--tesla-red',
    content: {
      mainText: 'バッテリー、モーター、ソフトウェア、充電インフラまで自社で作る。外部依存を減らすことで、イノベーションのスピードを上げ、コストを下げる。',
      firstPrinciple: 'サプライチェーンの各段階にマージンが乗る。自社で作れば中間マージンを排除し、設計の自由度も上がる。',
      analogy: 'アップルがiPhoneのチップを自社設計するのと同じ論理。全体を支配すれば、部分最適ではなく全体最適ができる。',
    },
  },
  'tesla-why-energy-storage': {
    id: 'tesla-why-energy-storage',
    branchId: 'tesla',
    depth: 3,
    parentId: 'tesla-why-fossil',
    childrenIds: ['tesla-why-megapack'],
    title: 'なぜ蓄電池？太陽は夜に沈む',
    icon: '🔋',
    color: '--tesla-red',
    content: {
      mainText: '太陽光・風力は間欠的。夜や風がない日にも電力が必要。大規模蓄電池が再生可能エネルギーの弱点を補完する。蓄電なくして再エネ100%はあり得ない。',
      firstPrinciple: '再生可能エネルギーの真の問題は発電量ではなく、時間のミスマッチ。蓄電池がこのギャップを埋める唯一の物理的解。',
    },
  },
  'tesla-why-megapack': {
    id: 'tesla-why-megapack',
    branchId: 'tesla',
    depth: 4,
    parentId: 'tesla-why-energy-storage',
    childrenIds: [],
    title: 'Megapack — 送電網を再定義',
    icon: '⚡',
    color: '--tesla-red',
    content: {
      mainText: '家庭用Powerwall、商業用Powerpack、そして送電網レベルのMegapack。電力会社がピーク時のガス火力発電所の代わりに巨大バッテリーを設置する。Master Plan Part 3では240TWhの蓄電池が必要と試算。',
      data: [
        { label: '必要な蓄電容量', value: '240 TWh', context: 'Master Plan Part 3の地球全体試算' },
        { label: '必要な投資', value: '約10.4兆ドル', context: '化石燃料継続の14兆ドルより安い' },
        { label: '必要な土地', value: '地球表面の0.2%未満', context: '太陽光+蓄電の全インフラ' },
      ],
    },
  },

  // ========================================
  // NEURALINK — 意識を拡張する
  // ========================================
  'neuralink': {
    id: 'neuralink',
    branchId: 'neuralink',
    depth: 1,
    parentId: 'root',
    childrenIds: ['neuralink-why-ai-gap'],
    title: '意識を拡張する',
    subtitle: 'Neuralink',
    icon: '🧠',
    color: '--accent-purple',
    content: {
      mainText: '脳とコンピューターを直接つなぐ。AIが人間を超える時代に、人間が取り残されないための技術。',
      elonQuote: 'If you can\'t beat them, join them.',
      quoteSource: 'Neuralink発表会, 2019',
    },
  },
  'neuralink-why-ai-gap': {
    id: 'neuralink-why-ai-gap',
    branchId: 'neuralink',
    depth: 2,
    parentId: 'neuralink',
    childrenIds: ['neuralink-why-bandwidth', 'neuralink-why-alignment'],
    title: 'AIが人間を超える',
    icon: '🤖',
    color: '--accent-purple',
    content: {
      mainText: 'AIは指数関数的に賢くなっている。いずれ全ての知的タスクで人間を上回る。その時、人間はどうやって relevantであり続けるのか？',
      elonQuote: 'AI will be the most transformative technology in human history. It\'s like summoning the demon.',
      quoteSource: 'MIT Symposium, 2014',
    },
  },
  'neuralink-why-bandwidth': {
    id: 'neuralink-why-bandwidth',
    branchId: 'neuralink',
    depth: 3,
    parentId: 'neuralink-why-ai-gap',
    childrenIds: ['neuralink-why-bci'],
    title: '帯域幅のボトルネック',
    icon: '📡',
    color: '--accent-purple',
    content: {
      mainText: '人間の脳は強力だが、外部とのコミュニケーション速度が極めて遅い。キーボードで打てるのは毎秒数ビット。脳内の思考速度との差が何桁もある。',
      firstPrinciple: '情報理論。入出力の帯域幅がボトルネックなら、ボトルネックを直接広げればいい。指を介さず、脳から直接データを送受信する。',
      data: [
        { label: 'タイピング速度', value: '約10ビット/秒', context: '人間の出力帯域幅' },
        { label: '脳内処理速度', value: '推定テラビット/秒', context: 'ニューロン間の情報伝達' },
      ],
      analogy: '超高速のスパコンに、28.8kbpsのダイヤルアップモデムを繋いでいるようなもの。',
    },
  },
  'neuralink-why-alignment': {
    id: 'neuralink-why-alignment',
    branchId: 'neuralink',
    depth: 3,
    parentId: 'neuralink-why-ai-gap',
    childrenIds: [],
    title: 'AI安全性の究極解',
    icon: '🔗',
    color: '--accent-purple',
    content: {
      mainText: 'AIのアライメント問題（AIを人間の価値観に従わせる）の最も根本的な解決策：人間がAIと融合すること。人間自身がAIになれば、「AIが人間に敵対する」という問題構造そのものが消える。',
      elonQuote: 'Even in a benign AI scenario, we\'ll be left behind. With a high-bandwidth brain-machine interface, we can actually go along for the ride.',
      quoteSource: 'Wait But Why Interview, 2017',
      analogy: '犬と人間の知能差。犬は人間の意図を完全には理解できない。超知能AIと人間の差がそうならないために、知能を底上げする。',
    },
  },
  'neuralink-why-bci': {
    id: 'neuralink-why-bci',
    branchId: 'neuralink',
    depth: 4,
    parentId: 'neuralink-why-bandwidth',
    childrenIds: ['neuralink-why-medical-first'],
    title: '脳コンピューターインターフェース',
    icon: '🔌',
    color: '--accent-purple',
    content: {
      mainText: '脳に超微細な電極を埋め込み、ニューロンの電気信号を直接読み書きする。思考だけでコンピューターを操作し、やがてはAIと直接対話する。',
      data: [
        { label: '電極数', value: '1,024+', context: '髪の毛より細い糸状の電極' },
        { label: '手術ロボット', value: 'R1', context: '人間の手では不可能な精密埋め込み' },
      ],
    },
  },
  'neuralink-why-medical-first': {
    id: 'neuralink-why-medical-first',
    branchId: 'neuralink',
    depth: 5,
    parentId: 'neuralink-why-bci',
    childrenIds: [],
    title: 'まず医療から — 麻痺患者を救う',
    icon: '🏥',
    color: '--accent-purple',
    content: {
      mainText: '長期ビジョンは人間の知能拡張だが、最初のステップは医療応用。脊髄損傷で手足を動かせない人が、思考だけでカーソルを動かし、メッセージを送る。FDA承認を得て人間での臨床試験が進行中。',
      firstPrinciple: '規制の現実。健康な人への埋め込みはFDAが許可しない。まず医療的必要性が高い患者で安全性と有効性を証明し、徐々に適用範囲を広げる。',
      elonQuote: 'The first applications will be to help people with brain injuries and spinal cord injuries.',
      quoteSource: 'Neuralink Show & Tell, 2022',
    },
  },

  // ========================================
  // xAI — 真実を理解する
  // ========================================
  'xai': {
    id: 'xai',
    branchId: 'xai',
    depth: 1,
    parentId: 'root',
    childrenIds: ['xai-why-safety'],
    title: '真実を理解する',
    subtitle: 'xAI / Grok',
    icon: '🔬',
    color: '--accent-orange',
    content: {
      mainText: '「宇宙の本質を理解する」AIを作る。真実を最大限に追求し、バイアスの少ないAIを目指す。',
      elonQuote: 'The goal of xAI is to understand the true nature of the universe.',
      quoteSource: 'xAI Launch, 2023',
    },
  },
  'xai-why-safety': {
    id: 'xai-why-safety',
    branchId: 'xai',
    depth: 2,
    parentId: 'xai',
    childrenIds: ['xai-why-openai-problem', 'xai-why-truth'],
    title: 'AI安全性への危機感',
    icon: '🛡️',
    color: '--accent-orange',
    content: {
      mainText: 'AIは人類史上最も変革的な技術。正しく作らなければ文明を終わらせる力を持つ。だからこそ、AI開発の方向性を一社に委ねるのは危険。',
      elonQuote: 'AI is the biggest existential threat. With artificial intelligence, we are summoning the demon.',
      quoteSource: 'MIT Symposium, 2014',
    },
  },
  'xai-why-openai-problem': {
    id: 'xai-why-openai-problem',
    branchId: 'xai',
    depth: 3,
    parentId: 'xai-why-safety',
    childrenIds: ['xai-why-competition'],
    title: 'OpenAIが変節した',
    icon: '⚖️',
    color: '--accent-orange',
    content: {
      mainText: 'イーロンは2015年にOpenAIを共同設立した。目的は「安全なAIをオープンに開発する」こと。しかしOpenAIは営利化し、クローズドになった。元の理念が裏切られたと感じ、自らAI会社を作ることを決めた。',
      data: [
        { label: 'OpenAI共同設立', value: '2015年', context: '非営利のAI安全研究所として' },
        { label: 'イーロン離脱', value: '2018年', context: '方向性の相違で取締役辞任' },
        { label: 'xAI設立', value: '2023年', context: '独自のAI開発を開始' },
      ],
    },
  },
  'xai-why-truth': {
    id: 'xai-why-truth',
    branchId: 'xai',
    depth: 3,
    parentId: 'xai-why-safety',
    childrenIds: [],
    title: '真実追求型AI',
    icon: '🎯',
    color: '--accent-orange',
    content: {
      mainText: '多くのAIは「政治的に正しい」回答をするよう訓練されている。しかし真実は政治的正しさとは別のもの。Grokは「最大限に真実を追求する」AIとして設計されている。',
      firstPrinciple: 'AIが人類の問題解決を手伝うなら、事実に基づくことが最低条件。バイアスのかかったAIは間違った判断に導く。',
      elonQuote: 'I think there\'s a real danger in training AI to be politically correct, or in other words, training AI to lie.',
      quoteSource: 'X/Twitter, 2023',
    },
  },
  'xai-why-competition': {
    id: 'xai-why-competition',
    branchId: 'xai',
    depth: 4,
    parentId: 'xai-why-openai-problem',
    childrenIds: [],
    title: 'AI開発に競争が必要',
    icon: '🏁',
    color: '--accent-orange',
    content: {
      mainText: '一社がAIを独占することは危険。複数の組織が競い合い、互いをチェックすることで、安全性が保たれる。xAIはその競争環境を作るための存在でもある。',
      analogy: '核兵器を一国だけが持つことの危険性と同じ。権力の集中は腐敗を招く。AIのパワーも分散されるべき。',
    },
  },

  // ========================================
  // OPTIMUS — 労働の解放
  // ========================================
  'optimus': {
    id: 'optimus',
    branchId: 'optimus',
    depth: 1,
    parentId: 'root',
    childrenIds: ['optimus-why-labor'],
    title: '労働の解放',
    subtitle: 'Tesla Optimus',
    icon: '🤖',
    color: '--accent-green',
    content: {
      mainText: '汎用ヒューマノイドロボットで、人間を危険で退屈な労働から解放する。経済の根本的な制約を取り払う。',
      elonQuote: 'Optimus will be more significant than the vehicle business over time.',
      quoteSource: 'Tesla Earnings Call, 2024',
    },
  },
  'optimus-why-labor': {
    id: 'optimus-why-labor',
    branchId: 'optimus',
    depth: 2,
    parentId: 'optimus',
    childrenIds: ['optimus-why-humanoid', 'optimus-why-population'],
    title: '労働力は経済の最大制約',
    icon: '⛏️',
    color: '--accent-green',
    content: {
      mainText: '世界中で少子高齢化が進み、労働力が不足している。危険な作業（採掘、建設、介護）を担う人も減っている。労働力の物理的制約を突破しなければ、経済成長も文明の発展も止まる。',
      firstPrinciple: '経済の基本方程式: GDP ≈ 労働力 × 生産性。労働力が減少するなら、生産性を桁違いに上げるか、労働力を人工的に増やすしかない。',
    },
  },
  'optimus-why-humanoid': {
    id: 'optimus-why-humanoid',
    branchId: 'optimus',
    depth: 3,
    parentId: 'optimus-why-labor',
    childrenIds: ['optimus-why-fsd-tech'],
    title: 'なぜ人間型？世界は人間用に作られている',
    icon: '🚪',
    color: '--accent-green',
    content: {
      mainText: 'ドアの高さ、階段の幅、工具の形 — 全て人間の身体に合わせて設計されている。人間と同じ形のロボットなら、既存のインフラを改造せずにそのまま使える。',
      firstPrinciple: 'インフラの再設計コストは天文学的。既存の環境に適応するロボットを作る方が、環境をロボットに合わせるより遥かに安い。',
      analogy: '新しい言語を作って全員に学ばせるより、既存の言語を話せるAIを作る方が現実的。',
    },
  },
  'optimus-why-population': {
    id: 'optimus-why-population',
    branchId: 'optimus',
    depth: 3,
    parentId: 'optimus-why-labor',
    childrenIds: [],
    title: '人口減少という静かな危機',
    icon: '📉',
    color: '--accent-green',
    content: {
      mainText: '先進国を中心に出生率が急落している。日本、韓国、中国、ヨーロッパ。人口ボーナスの逆回転が始まっている。イーロンはこれを「文明にとって最大のリスクの一つ」と繰り返し警告している。',
      elonQuote: 'Population collapse due to low birth rates is a much bigger risk to civilization than global warming.',
      quoteSource: 'X/Twitter, 2022',
      data: [
        { label: '日本の出生率', value: '約1.20', context: '人口維持に必要な2.1を大きく下回る' },
        { label: '韓国の出生率', value: '約0.72', context: '世界最低水準' },
      ],
    },
  },
  'optimus-why-fsd-tech': {
    id: 'optimus-why-fsd-tech',
    branchId: 'optimus',
    depth: 4,
    parentId: 'optimus-why-humanoid',
    childrenIds: ['optimus-why-price'],
    title: 'FSDの技術をロボットに転用',
    icon: '👁️',
    color: '--accent-green',
    content: {
      mainText: 'Teslaの自動運転(FSD)で培ったコンピュータービジョンとAIを、そのままヒューマノイドロボットに応用する。カメラで世界を認識し、リアルタイムで判断する技術は共通。',
      firstPrinciple: '自動運転車もロボットも、本質的には「カメラで見て、AIが判断して、アクチュエーターで動く」。問題の構造が同じなら、技術も共通化できる。',
      data: [
        { label: 'FSD走行距離', value: '20億マイル以上', context: '世界最大の実世界走行データ' },
        { label: 'Optimus自由度', value: '手だけで22', context: '人間の手に近い繊細さ' },
      ],
    },
  },
  'optimus-why-price': {
    id: 'optimus-why-price',
    branchId: 'optimus',
    depth: 5,
    parentId: 'optimus-why-fsd-tech',
    childrenIds: [],
    title: '目標価格2-3万ドル = 車より安い',
    icon: '💵',
    color: '--accent-green',
    content: {
      mainText: '量産効果で1体2-3万ドルを目指す。24時間働けるロボットがこの価格なら、労働のコスト構造が根本的に変わる。ロボットが生産するモノの価格は劇的に下がり、豊かさが万人に行き渡る。',
      elonQuote: 'In the long term, I think Optimus will be worth more than everything else at Tesla combined.',
      quoteSource: 'Tesla AI Day, 2022',
      analogy: '産業革命で蒸気機関が人間の筋力を代替したように、Optimusは人間の汎用労働を代替する。歴史上2度目の労働革命。',
    },
  },

  // ========================================
  // X PLATFORM — 情報の自由
  // ========================================
  'x_platform': {
    id: 'x_platform',
    branchId: 'x_platform',
    depth: 1,
    parentId: 'root',
    childrenIds: ['x-why-speech'],
    title: '情報の自由',
    subtitle: 'X (Twitter)',
    icon: '📢',
    color: '--foreground',
    content: {
      mainText: '「デジタル公共広場」を守る。民主主義が機能するには、自由な情報の流れが不可欠。',
      elonQuote: 'Free speech is the bedrock of a functioning democracy, and Twitter is the digital town square where matters vital to the future of humanity are debated.',
      quoteSource: 'Twitter買収発表, 2022',
    },
  },
  'x-why-speech': {
    id: 'x-why-speech',
    branchId: 'x_platform',
    depth: 2,
    parentId: 'x_platform',
    childrenIds: ['x-why-censorship', 'x-why-community-notes'],
    title: '言論の自由が民主主義の基盤',
    icon: '🗣️',
    color: '--foreground',
    content: {
      mainText: '人々が自由に議論できなければ、社会は権力者の都合の良い方向にしか動かない。歴史上、検閲は常に権力の道具だった。デジタル時代の公共広場を一企業が検閲するのは危険。',
      firstPrinciple: '良い意思決定には正確な情報が必要。情報がフィルタリングされると、集合的な判断力が低下する。',
    },
  },
  'x-why-censorship': {
    id: 'x-why-censorship',
    branchId: 'x_platform',
    depth: 3,
    parentId: 'x-why-speech',
    childrenIds: [],
    title: '検閲への懸念',
    icon: '🚫',
    color: '--foreground',
    content: {
      mainText: '旧Twitterは特定の政治的立場を優遇し、別の立場を抑制していたとイーロンは主張。プラットフォームが「真実の裁定者」になることの危険性。誰が検閲者を検閲するのか？',
      elonQuote: 'The bird is freed.',
      quoteSource: 'Twitter買収完了時, 2022年10月',
    },
  },
  'x-why-community-notes': {
    id: 'x-why-community-notes',
    branchId: 'x_platform',
    depth: 3,
    parentId: 'x-why-speech',
    childrenIds: [],
    title: 'コミュニティノート — 集合知による検証',
    icon: '📝',
    color: '--foreground',
    content: {
      mainText: '検閲の代わりに、ユーザー同士がファクトチェックする仕組み。異なる意見を持つユーザーが「合意」した時だけノートが表示される。権力ではなく集合知で情報の質を担保する実験。',
      firstPrinciple: '中央集権的な検閲は必ずバイアスを持つ。分散型の検証システムなら、単一の権力による歪みを防げる。',
      analogy: 'Wikipediaが一人の編集者ではなく、多数のチェックで質を保つのと同じ原理。',
    },
  },

  // ========================================
  // BORING COMPANY — インフラ革新
  // ========================================
  'boring': {
    id: 'boring',
    branchId: 'boring',
    depth: 1,
    parentId: 'root',
    childrenIds: ['boring-why-traffic'],
    title: 'インフラ革新',
    subtitle: 'The Boring Company',
    icon: '🕳️',
    color: '--muted',
    content: {
      mainText: '交通渋滞を地下トンネルで解決する。地表は2Dだが、地下は3Dに無限に拡張できる。',
      elonQuote: 'Traffic is soul-destroying. It\'s like acid on the soul.',
      quoteSource: 'TED Talk, 2017',
    },
  },
  'boring-why-traffic': {
    id: 'boring-why-traffic',
    branchId: 'boring',
    depth: 2,
    parentId: 'boring',
    childrenIds: ['boring-why-3d', 'boring-why-mars'],
    title: '渋滞は人生の無駄遣い',
    icon: '🚗',
    color: '--muted',
    content: {
      mainText: '世界中の都市で人々が毎日数時間を渋滞で失っている。この時間は二度と戻らない。道路を増やしても誘発需要で渋滞は解消しない。次元を変える必要がある。',
      data: [
        { label: '米国の年間渋滞コスト', value: '約870億ドル', context: '燃料+時間の損失' },
      ],
    },
  },
  'boring-why-3d': {
    id: 'boring-why-3d',
    branchId: 'boring',
    depth: 3,
    parentId: 'boring-why-traffic',
    childrenIds: ['boring-why-cost'],
    title: '2D→3D — 地下に無限のレイヤー',
    icon: '📐',
    color: '--muted',
    content: {
      mainText: '地表の道路は平面的で、物理的に拡張の限界がある。地下なら何層でもトンネルを重ねられる。建物が高層化したように、交通も立体化すべき。',
      firstPrinciple: '2Dの問題を2Dで解こうとしても限界がある。次元を一つ増やせば、容量は理論上無限になる。',
    },
  },
  'boring-why-cost': {
    id: 'boring-why-cost',
    branchId: 'boring',
    depth: 4,
    parentId: 'boring-why-3d',
    childrenIds: [],
    title: 'トンネル掘削コストを10分の1に',
    icon: '⛏️',
    color: '--muted',
    content: {
      mainText: '現在のトンネル工事は1マイルあたり10億ドル近い。Boring Companyは小径トンネル+連続掘削で、コストを10分の1以下に下げることを目指す。',
      firstPrinciple: 'トンネルボーリングマシンの性能は数十年間ほとんど向上していない。基本設計を見直し、カタツムリより速いマシンを作る（現状、TBMはカタツムリより遅い）。',
      analogy: 'ロケットと同じ構図。業界が「こんなもの」と思い込んでいるものを、First Principlesで10倍改善する。',
    },
  },
  'boring-why-mars': {
    id: 'boring-why-mars',
    branchId: 'boring',
    depth: 3,
    parentId: 'boring-why-traffic',
    childrenIds: [],
    title: '火星でも必要な技術',
    icon: '🔴',
    color: '--muted',
    content: {
      mainText: '火星の表面は放射線が強い。人間が住むには地下に居住空間を掘る必要がある。地球でトンネル掘削技術を磨いておけば、火星でもそのまま応用できる。',
      analogy: 'SpaceXとBoring Companyは別々に見えるが、火星コロニーという同じゴールに収束する。地上の移動はSpaceX、地下の居住はBoring Company。',
    },
  },
};

export const allNodeIds = Object.keys(visionTreeData);
export const totalNodeCount = allNodeIds.length;

export function getNode(nodeId: string): VisionNode | undefined {
  return visionTreeData[nodeId];
}

export function getChildren(nodeId: string): VisionNode[] {
  const node = visionTreeData[nodeId];
  if (!node) return [];
  return node.childrenIds.map(id => visionTreeData[id]).filter(Boolean);
}

export function getPathToNode(nodeId: string): VisionNode[] {
  const path: VisionNode[] = [];
  let current = visionTreeData[nodeId];
  while (current) {
    path.unshift(current);
    current = current.parentId ? visionTreeData[current.parentId] : undefined!;
  }
  return path;
}

export function getNodesInBranch(branchId: BranchId): VisionNode[] {
  return Object.values(visionTreeData).filter(n => n.branchId === branchId);
}

export function getBranchIds(): BranchId[] {
  return ['spacex', 'tesla', 'neuralink', 'xai', 'optimus', 'x_platform', 'boring'];
}
