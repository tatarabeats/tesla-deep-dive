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
    childrenIds: ['single-planet', 'fossil-fuel', 'intelligence-limits', 'population-decline', 'mobility-inefficiency', 'info-finance-gap'],
    title: '意識を守り、広げる',
    subtitle: 'Protect and Expand Consciousness',
    icon: '🌌',
    color: '--gold',
    imageUrl: 'images/root.png',
    content: {
      mainText: 'イーロン・マスクの全事業は一つの信念から生まれている。「意識は宇宙で極めて稀で貴重。その灯を消さず、広げることが最重要」。6つの脅威に対し、複数の企業が連携して立ち向かう。',
      elonQuote: 'Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.',
      quoteSource: 'Lex Fridman Podcast, 2021',
      analogy: '暗闇の宇宙に灯った小さなロウソク。その火を消さないこと、そして別の場所にも灯すこと。それが全ての出発点。',
    },
  },

  // ========================================
  // L2: 単一惑星への依存 (Single Planet Dependency)
  // ========================================
  'single-planet': {
    id: 'single-planet',
    branchId: 'single-planet',
    depth: 1,
    parentId: 'root',
    childrenIds: ['extinction-risk', 'starlink-connectivity'],
    title: '単一惑星への依存',
    subtitle: 'Single Planet Dependency',
    icon: '🌍',
    color: '--accent-blue',
    imageUrl: 'images/single-planet.png',
    content: {
      mainText: '人類は45億年の地球史の中で、たった一つの惑星だけに存在している。全ての卵を一つのカゴに入れた状態。小惑星衝突、超大規模噴火、核戦争、パンデミック — どれか一つでも文明を終わらせうる。単一惑星種であることは、人類が抱える最も根本的な脆弱性。',
      elonQuote: 'There is a profound difference between single-planet & multiplanet species. If we are able to visit other stars one day, we may discover many long-dead single-planet civilizations.',
      quoteSource: 'X/Twitter, August 2021',
      firstPrinciple: '確率論の基本。十分長い時間軸では、低確率×高インパクトの事象は必然になる。単一障害点(Single Point of Failure)を持つシステムは、いずれ必ず全滅する。バックアップが唯一の対策。',
      data: [
        { label: '地球上の大量絶滅', value: '過去5回', context: '平均約9,000万年ごとに発生。種の75%以上が消滅' },
        { label: '最後の大量絶滅', value: '6,600万年前', context: '直径10kmの小惑星衝突で恐竜が絶滅' },
        { label: '既知の地球近傍天体', value: '34,000+', context: 'NASAが追跡中の潜在的脅威' },
      ],
      analogy: '全てのデータを一台のハードディスクだけに保存しているようなもの。バックアップがなければ、一度の故障で全てが消える。文明も同じ。',
    },
  },

  // L3: 地球一つでは滅びるリスク
  'extinction-risk': {
    id: 'extinction-risk',
    branchId: 'single-planet',
    depth: 2,
    parentId: 'single-planet',
    childrenIds: ['starship', 'mars-colony'],
    title: '多惑星種への進化 {SpaceX}',
    icon: '🚀',
    color: '--accent-blue',
    content: {
      mainText: '138億年の宇宙の歴史で、知的生命の証拠は地球だけ。もし人類が滅びたら、宇宙を理解する存在がゼロになる可能性がある。SpaceXは人類を多惑星種にすることで、この存続リスクを分散させる。',
      elonQuote: 'It is unknown whether we are the only civilization currently alive in the observable universe, but any chance that we are is added impetus for extending life beyond Earth.',
      quoteSource: 'SpaceX Website',
      data: [
        { label: '小惑星衝突', value: '数千万年に1回', context: '6,600万年前に恐竜を絶滅させた' },
        { label: '超大規模噴火', value: '数十万年に1回', context: 'イエローストーンは約60万年周期' },
        { label: '核戦争', value: '冷戦以来の現実的脅威', context: '全面核戦争で核の冬' },
      ],
      analogy: '広大な砂漠にたった一本の木。その木が枯れたら、砂漠は永遠に砂漠のまま。',
    },
  },

  // L4: Starship
  'starship': {
    id: 'starship',
    branchId: 'single-planet',
    depth: 3,
    parentId: 'extinction-risk',
    childrenIds: ['reusable-rockets'],
    title: 'Starship — コスト100分の1の宇宙船',
    icon: '🚀',
    color: '--accent-blue',
    content: {
      mainText: '史上最大・最強の宇宙船。高さ121m、直径9m、33基のRaptorエンジンが生む推力は約7,590トン。LEOに100〜150トンのペイロードを投入でき、サターンVの約2倍の能力を持つ。完全再利用を前提に設計されており、打ち上げコストの目標は1kgあたり10ドル以下 — 従来の100分の1。',
      elonQuote: 'If humanity is to become multi-planetary, the fundamental breakthrough that needs to occur in rocketry is a rapidly and completely reusable rocket.',
      quoteSource: 'SpaceX Presentations',
      firstPrinciple: 'ロケットの原材料（ステンレス鋼、液体メタン、液体酸素）は総コストの約2%に過ぎない。残り98%は製造の非効率と使い捨ての構造。再利用で破壊すれば、宇宙輸送コストは桁違いに下がる。',
      data: [
        { label: 'ペイロード (LEO)', value: '100〜150トン', context: 'サターンVの約2倍。ISS全体の約1/3を一度に打ち上げ可能' },
        { label: '推力', value: '約7,590トン', context: '33基のRaptor 2エンジン。史上最大の推力' },
        { label: '目標コスト/kg', value: '$10以下', context: '従来の$1,000〜$2,000/kgから100分の1に削減' },
        { label: '1人あたり火星渡航コスト目標', value: '約$200,000', context: '米国の住宅中央値と同等。「引っ越し」が可能な水準' },
      ],
      analogy: '大航海時代のキャラベル船。それまで沿岸航行しかできなかった人類が、大洋を渡る船を手にしたことで世界が一変した。Starshipは惑星間航行のキャラベル船。',
    },
  },

  // L5: 完全再利用ロケット
  'reusable-rockets': {
    id: 'reusable-rockets',
    branchId: 'single-planet',
    depth: 4,
    parentId: 'starship',
    childrenIds: [],
    title: '完全再利用 = 航空機モデル',
    icon: '♻️',
    color: '--accent-blue',
    content: {
      mainText: 'SpaceXの核心技術。Falcon 9でブースター着陸回収を世界で初めて実用化し、Starshipでは機体全体の完全再利用を目指す。Super Heavyブースターは発射塔の巨大ロボットアーム「Mechazilla」で空中キャッチされ、着陸脚すら不要にすることで重量を削減。2024年10月にブースターの空中キャッチに初成功。',
      elonQuote: 'The cost of the raw materials in a rocket is only about 2% of the typical price. So, theoretically, we could improve the cost of rocketry by a factor of 50.',
      quoteSource: 'Wired Interview, 2012',
      data: [
        { label: 'Falcon 9再利用回数', value: '最大25回以上', context: '単一ブースターの記録。目標は100回以上' },
        { label: 'Mechazilla初キャッチ成功', value: '2024年10月', context: 'IFT-5でSuper Heavyブースターを空中キャッチ' },
        { label: '推進剤コスト/回', value: '約$100万', context: '液体メタン+液体酸素。機体再利用ならこれが主要コスト' },
        { label: '打ち上げコスト削減率', value: '最大90%以上', context: 'Falcon 9再利用前($6,200万) vs 再利用後(推定$1,500万〜)' },
      ],
      analogy: 'もし飛行機を毎回捨てていたら、東京-NYの航空券は数億円。それが今は数万円なのは「再利用」しているから。ロケットにも同じ革命を起こす。',
    },
  },

  // L4: 火星コロニー
  'mars-colony': {
    id: 'mars-colony',
    branchId: 'single-planet',
    depth: 3,
    parentId: 'extinction-risk',
    childrenIds: ['isru', 'terraforming'],
    title: '火星コロニー — 自給自足文明',
    icon: '🔴',
    color: '--accent-blue',
    content: {
      mainText: '太陽系で自給自足コロニーを作れる最も現実的な惑星。約24時間の自転周期、水の存在、CO2大気（植物栽培に変換可能）、地球から比較的近い。目標は100万人の自給自足都市。',
      firstPrinciple: '候補を物理的制約で絞る。金星は灼熱（460℃）、木星衛星は遠すぎる。火星が消去法で最適解。',
      data: [
        { label: '自転周期', value: '24時間37分', context: '地球とほぼ同じ' },
        { label: '地球からの距離', value: '最短5,500万km', context: '約6-9ヶ月の旅' },
        { label: '水の存在', value: '極地に氷として確認', context: '生命維持・燃料製造に利用可能' },
        { label: 'コロニー目標人数', value: '100万人', context: '自給自足文明の最低規模' },
      ],
    },
  },

  // L5: ISRU
  'isru': {
    id: 'isru',
    branchId: 'single-planet',
    depth: 4,
    parentId: 'mars-colony',
    childrenIds: [],
    title: '現地資源利用: ISRU',
    icon: '⛏️',
    color: '--accent-blue',
    content: {
      mainText: '火星コロニーの鍵は「現地の資源で現地のものを作る」こと。地球から全てを運ぶのはコスト的に不可能。火星の大気は95%がCO2で、地下には水の氷がある。サバティエ反応でStarshipの推進剤（液体メタンと液体酸素）を製造できる。これはSpaceXがStarshipの燃料にメタンを選んだ最大の理由。',
      firstPrinciple: '物質保存の法則。火星に必要な元素（C, H, O）は全て現地に存在する。問題は元素の「組み合わせ」を変えるエネルギーだけ。太陽光パネルでエネルギーを供給すれば、理論上は無限に推進剤を生産できる。',
      data: [
        { label: '火星大気のCO2割合', value: '約95%', context: 'サバティエ反応の原料として理想的' },
        { label: 'サバティエ反応', value: 'CO2 + 4H2 → CH4 + 2H2O', context: 'メタンと水を同時生産' },
        { label: 'メタン選択の理由', value: '火星で製造可能', context: 'ケロシン(Falcon 9)では火星で作れない' },
      ],
      analogy: '無人島に漂着した時、毎回本土から食料を空輸するか、現地で畑を耕すか。ISRUは火星版の「畑を耕す」技術。',
    },
  },

  // L5: テラフォーミング
  'terraforming': {
    id: 'terraforming',
    branchId: 'single-planet',
    depth: 4,
    parentId: 'mars-colony',
    childrenIds: [],
    title: 'テラフォーミング — 数百年の計画',
    icon: '🌱',
    color: '--accent-blue',
    content: {
      mainText: '最終目標は火星を人間が宇宙服なしで歩ける惑星にすること。CO2の温室効果で気温を上げ、極地の氷を溶かし、最終的に植物が育つ大気を作る。数百年かかるが、始めなければ永遠に実現しない。',
      firstPrinciple: '火星のCO2大気は温室効果のための資源。太陽エネルギーで氷を溶かし、大気圧を上げる物理的プロセスは理論上可能。',
      elonQuote: 'Nuke Mars!',
      quoteSource: 'X/Twitter, 2019（核爆発で極地の氷を蒸発させるアイデア）',
      analogy: '庭に木を植える最良の時期は20年前。次に良い時期は今。テラフォーミングも同じ。始めなければ永遠に数百年後のまま。',
    },
  },

  // L3: Starlink
  'starlink-connectivity': {
    id: 'starlink-connectivity',
    branchId: 'single-planet',
    depth: 2,
    parentId: 'single-planet',
    childrenIds: ['direct-to-cell', 'starlink-mars-comms'],
    title: '地球全体の接続 {Starlink}',
    icon: '📡',
    color: '--accent-blue',
    content: {
      mainText: '低軌道に9,400基以上の衛星を配置し、地球全体に高速インターネットを提供する巨大衛星コンステレーション。加入者は1,000万人を突破し、100カ国以上で利用可能。その利益が火星植民の資金を生み出すSpaceX最大の収益源。',
      firstPrinciple: '火星植民には年間数百億ドルの投資が必要。政府予算や寄付では全く足りない。自前で巨大な経常収益源を持つ必要がある。Starlinkのサブスク収益がその解。',
      data: [
        { label: '軌道上の衛星数', value: '9,400基以上', context: '最終計画は42,000基' },
        { label: '加入者数', value: '1,000万人以上', context: '2025年だけで460万人増加' },
        { label: '年間売上', value: '約118億ドル（2025年）', context: '前年比53%増。SpaceX全売上の50%以上' },
      ],
    },
  },

  // L4: Direct to Cell
  'direct-to-cell': {
    id: 'direct-to-cell',
    branchId: 'single-planet',
    depth: 3,
    parentId: 'starlink-connectivity',
    childrenIds: [],
    title: 'Direct to Cell — スマホで衛星通信',
    icon: '📱',
    color: '--accent-blue',
    content: {
      mainText: '特別な機器なしで、普通のスマートフォンから直接Starlink衛星に接続する技術。T-Mobileとの提携で2025年7月に米国で商用サービス開始。650基以上のDTC対応衛星で世界最大の4Gカバレッジを実現。22カ国・4億人以上がアクセス可能に。',
      data: [
        { label: 'DTC対応衛星数', value: '650基以上', context: '世界最大の4Gカバレッジプロバイダー' },
        { label: 'サービス提供国', value: '22カ国', context: 'T-Mobile含む世界中のキャリアと提携' },
        { label: '対応端末', value: '既存のスマートフォン', context: '専用ハードウェア不要。世界80億人のスマホがそのまま衛星電話に' },
        { label: '次世代V3衛星', value: 'ギガビット級 + 5G対応', context: '2026年前半にStarshipで打ち上げ開始予定' },
      ],
      analogy: '携帯電話が登場した時、基地局のない場所では使えなかった。Direct to Cellは「空に基地局を浮かべる」ことで、地球上のどこでも圏外をなくす。',
    },
  },

  // L4: 火星通信インフラ
  'starlink-mars-comms': {
    id: 'starlink-mars-comms',
    branchId: 'single-planet',
    depth: 3,
    parentId: 'starlink-connectivity',
    childrenIds: [],
    title: '火星通信インフラの実験場',
    icon: '🔴',
    color: '--accent-blue',
    content: {
      mainText: '火星コロニーにもインターネットが必要。地球-火星間の通信は片道4-24分の遅延があるため、火星独自の衛星ネットワークが不可欠。Starlinkはその技術の実証実験でもある。',
      analogy: '新しい街を作る前に、まず別の街で水道の設計を完璧にするようなもの。技術を地球で磨いてから火星に展開する。',
    },
  },

  // ========================================
  // L2: 化石燃料への依存 (Fossil Fuel Dependency)
  // ========================================
  'fossil-fuel': {
    id: 'fossil-fuel',
    branchId: 'fossil-fuel',
    depth: 1,
    parentId: 'root',
    childrenIds: ['ev-transition', 'energy-storage', 'solar-generation', 'master-plan-3'],
    title: '化石燃料への依存',
    subtitle: 'Fossil Fuel Dependency',
    icon: '🏭',
    color: '--tesla-red',
    imageUrl: 'images/fossil-fuel.png',
    content: {
      mainText: '化石燃料の燃焼は年間374億トンのCO2を排出し、気候変動を加速させている。しかも石油は約50年、天然ガスも約50年で枯渇する有限資源。一方、太陽は地球のエネルギー消費量の10,000倍を常時供給している。問題は発電量ではなく、貯蔵と配電。文明の持続には太陽電気経済への完全移行が不可欠。',
      elonQuote: 'The overarching purpose of Tesla Motors is to help expedite the move from a mine-and-burn hydrocarbon economy towards a solar electric economy.',
      quoteSource: 'Master Plan Part 1, 2006',
      firstPrinciple: '地球は173,000TWの太陽エネルギーを常時受けている。人類の消費は約13.5TW。つまり太陽エネルギーの0.01%未満をキャプチャすれば、全エネルギー需要を賄える。問題は技術ではなく、実行速度。',
      data: [
        { label: '化石燃料CO2排出量', value: '374億トン/年（2024年）', context: '石炭41%、石油32%、天然ガス21%。前年比+0.8%' },
        { label: '化石燃料の残存年数', value: '石油47-56年、ガス49-52年', context: '石炭は約139年。現在の消費ペースで' },
        { label: '太陽エネルギーの潜在力', value: '人類消費の10,000倍', context: '173,000TW vs 13.5TW。わずか0.01%で全需要を充足' },
      ],
    },
  },

  // L3: EVへの移行
  'ev-transition': {
    id: 'ev-transition',
    branchId: 'fossil-fuel',
    depth: 2,
    parentId: 'fossil-fuel',
    childrenIds: ['master-plan-strategy', 'fsd-autonomy'],
    title: 'EVへの移行 {Tesla}',
    icon: '⚡',
    color: '--tesla-red',
    content: {
      mainText: '輸送セクターはエネルギーの約25%を消費し、その90-95%が化石燃料に依存。EVは電気エネルギーの85%以上を動力に変換し、ガソリン車（20-30%）の約4.4倍効率的。2024年に世界で1,780万台のEVが販売され、市場シェアは約20%に到達。Teslaは累計約880万台（2025年末）を販売し、EV革命を牽引。',
      data: [
        { label: '輸送セクターの化石燃料依存', value: '90-95%', context: '全エネルギー消費の約25%を占める' },
        { label: 'EVのエネルギー効率', value: 'ガソリン車の4.4倍', context: 'EV 85%+ vs ICE 20-30%。市街地では5.1倍' },
        { label: '世界のEV販売（2024年）', value: '1,780万台（市場シェア20%）', context: '2025年は2,000-2,370万台、シェア25%の予測' },
        { label: 'Tesla累計販売', value: '約880万台（2025年末）', context: '2024年は178.9万台。世界最大のEVメーカー' },
      ],
    },
  },

  // L4: マスタープラン戦略
  'master-plan-strategy': {
    id: 'master-plan-strategy',
    branchId: 'fossil-fuel',
    depth: 3,
    parentId: 'ev-transition',
    childrenIds: [],
    title: 'マスタープラン戦略 — 高級から大衆へ',
    icon: '🏎️',
    color: '--tesla-red',
    content: {
      mainText: 'EVはバッテリーが高い。最初から安い車を作ると赤字で潰れる。Roadster($109K, 2008)→Model S/X($80K+, 2012-15)→Model 3/Y($35K-50K, 2017-20)→次世代車($25K目標)。バッテリーコストは2010年の$1,100/kWhから2025年には$108/kWhへ — 93%の下落をライトの法則通りに実現。',
      elonQuote: 'Almost any new technology initially has high unit cost before it can be optimized. The strategy of Tesla is to enter at the high end of the market and progressively drive down.',
      quoteSource: 'Master Plan Part 1, 2006',
      firstPrinciple: 'ライトの法則: 累積生産量が倍になるごとに価格が18%下がる。最初は少量高価格で開始し、規模拡大でコスト曲線を下る。',
      data: [
        { label: 'バッテリーコスト推移', value: '$1,100→$108/kWh', context: '2010→2025年。93%下落。EV専用パックは$97/kWhで$100を突破' },
        { label: '中国のバッテリー価格', value: '$84/kWh', context: '世界平均より23%安い。蓄電用は$70/kWh' },
        { label: '次世代廉価EV', value: '目標$25,000', context: '54kWhバッテリー、航続250-300マイル。2025-2026年生産開始予定' },
      ],
      analogy: 'アップルがiPhoneのチップを自社設計するのと同じ論理。Teslaはバッテリーからソフトウェアまで垂直統合し、全体最適を実現。',
    },
  },

  // L4: FSD完全自動運転
  'fsd-autonomy': {
    id: 'fsd-autonomy',
    branchId: 'fossil-fuel',
    depth: 3,
    parentId: 'ev-transition',
    childrenIds: ['cybercab'],
    title: 'FSD完全自動運転',
    icon: '🧠',
    color: '--tesla-red',
    content: {
      mainText: '完全自動運転(Full Self-Driving)は単なる便利機能ではない。人間の運転による年間130万人の交通事故死を大幅に減らし、通勤時間を生産時間に変え、都市の駐車場スペースを解放する。FSD v14はエンドツーエンドのニューラルネットワーク — カメラ映像から直接運転操作を出力し、手書きルールはゼロ。累計82億マイル以上のデータで人間の7倍安全。',
      firstPrinciple: '人間の目は2つ、反応速度は約200ms。カメラ8台+AIなら360度を常時監視し、ミリ秒で判断できる。物理的に人間より安全な運転が可能。',
      elonQuote: 'Autonomy will make Tesla worth more than all the other car companies combined.',
      quoteSource: 'Tesla Autonomy Day, 2019',
      data: [
        { label: '世界の年間交通事故死', value: '約130万人', context: 'WHO統計。人間のミスが90%以上の原因' },
        { label: 'FSD累計走行距離', value: '82億マイル以上', context: '2026年2月時点。最初の50日で10億マイル追加' },
        { label: 'FSD安全性', value: '人間の7倍安全', context: '重大衝突: 530万マイルに1回（FSD） vs 手動運転の7分の1' },
        { label: 'FSD v14', value: 'エンドツーエンドAI', context: 'v14.2.2。高解像度ビジョンエンコーダー。緊急車両認識向上' },
      ],
    },
  },

  // L5: Cybercab
  'cybercab': {
    id: 'cybercab',
    branchId: 'fossil-fuel',
    depth: 4,
    parentId: 'fsd-autonomy',
    childrenIds: [],
    title: 'Cybercab — 専用ロボタクシー',
    icon: '🚕',
    color: '--tesla-red',
    content: {
      mainText: '自動運転が完成すれば、車は95%の時間駐車しているだけの資産から、24時間稼ぐロボタクシーに変わる。Cybercabはステアリング・ペダルなしの専用設計で、2026年4月にGiga Texasで量産開始。目標コストは$0.20/マイル以下 — 現在の配車サービス$2.80/マイルの14分の1。ARK Investは2029年にロボタクシーがTesla企業価値の90%を占めると予測。',
      elonQuote: 'The economics of robotaxi are very, very compelling. The cost per mile will be incredibly low.',
      quoteSource: 'Tesla Earnings Call, 2024',
      data: [
        { label: '車が駐車している時間', value: '平均95%', context: 'ほぼ全ての時間を無駄にしている' },
        { label: 'Cybercab価格', value: '3万ドル以下', context: '35kWhバッテリー、航続320km、ワイヤレス充電' },
        { label: '量産開始', value: '2026年4月', context: 'Giga Texas。10秒に1台の家電式生産を目標' },
        { label: '目標マイルコスト', value: '$0.20/マイル以下', context: '現在の配車$2.80/マイルの14分の1。Waymo$0.40の半額' },
      ],
      analogy: '馬車から自動車への移行で馬が消えたように、運転手という概念が消える。でも移動の自由は劇的に増える。',
    },
  },

  // L3: エネルギー貯蔵革命
  'energy-storage': {
    id: 'energy-storage',
    branchId: 'fossil-fuel',
    depth: 2,
    parentId: 'fossil-fuel',
    childrenIds: ['megapack-grid', 'powerwall-home'],
    title: 'エネルギー貯蔵革命 {Tesla Energy}',
    icon: '🔋',
    color: '--tesla-red',
    content: {
      mainText: '太陽光・風力は間欠的。夜や風がない日にも電力が必要。大規模蓄電池が再生可能エネルギーの弱点を補完する。Tesla Energyは2024年に31.4GWhを出荷（前年比114%増）、売上101億ドル、粗利益率26.2%。今やTeslaで最も利益率の高い事業。',
      firstPrinciple: '再生可能エネルギーの真の問題は発電量ではなく、時間のミスマッチ。蓄電池がこのギャップを埋める唯一の物理的解。',
      data: [
        { label: '2024年出荷量', value: '31.4 GWh', context: '前年比114%増。Q4だけで11.0GWh（過去最大）' },
        { label: '2024年売上', value: '101億ドル', context: '前年比67%増。粗利益26億ドル（粗利益率26.2%）' },
        { label: '2025年目標', value: '50%以上の成長', context: '約47GWh以上の出荷を目標' },
      ],
    },
  },

  // L4: Megapack
  'megapack-grid': {
    id: 'megapack-grid',
    branchId: 'fossil-fuel',
    depth: 3,
    parentId: 'energy-storage',
    childrenIds: [],
    title: 'Megapack — 送電網を再定義',
    icon: '⚡',
    color: '--tesla-red',
    content: {
      mainText: '送電網レベルのMegapackは、電力会社がピーク時のガス火力発電所の代わりに設置する巨大バッテリー。1台3.9MWhのLFPバッテリーで約3,600世帯の1時間分の電力を蓄電。Lathrop(米国)とShanghai(中国)の2つのMegafactoryで合計年間80GWhの生産能力を確立。',
      data: [
        { label: 'Megapack 2容量', value: '1台3.9MWh', context: 'LFP化学。15年保証。約3,600世帯1時間分' },
        { label: 'Lathrop Megafactory', value: '年間40GWh', context: '2022年稼働。年10,000台生産能力' },
        { label: 'Shanghai Megafactory', value: '年間40GWh', context: '2025年2月稼働開始。7月に1,000台目を生産。オーストラリアに初輸出' },
        { label: '合計生産能力', value: '年間80GWh（2工場合計）', context: 'Master Plan 3の240TWh目標に向けて拡大中' },
      ],
    },
  },

  // L4: Powerwall
  'powerwall-home': {
    id: 'powerwall-home',
    branchId: 'fossil-fuel',
    depth: 3,
    parentId: 'energy-storage',
    childrenIds: [],
    title: 'Powerwall — 家庭の独立',
    icon: '🏠',
    color: '--tesla-red',
    content: {
      mainText: '家庭用バッテリーで、太陽光で発電した電力を夜間に使用。全世界で100万台以上を設置。Powerwall 3はLFP電池13.5kWh、連続11.5kW出力で、4台まで連結して54kWh/46kWに拡張可能。10万台以上がVirtual Power Plant(VPP)に参加し、カリフォルニアでは535MWの仮想発電所として送電網を支えている。',
      data: [
        { label: 'Powerwall 3容量', value: '13.5 kWh / 11.5kW', context: 'LFP電池。DC太陽光入力20kWまで対応。10年保証' },
        { label: '全世界設置数', value: '100万台以上', context: '2024年後半に達成。Storm Watch機能で暴風前に自動100%充電' },
        { label: 'VPP参加台数', value: '10万台以上', context: 'カリフォルニアで535MW供給。参加者は月$10-40の収入' },
        { label: 'VPP支払い総額', value: '990万ドル（2024年）', context: '分散型電力網として機能し、ピーカー火力発電所を代替' },
      ],
      analogy: '電力のATM。必要な時に必要な分だけ引き出す。しかもATMが連携して、地域全体の電力網を支える「仮想発電所」になる。',
    },
  },

  // L3: 太陽光発電
  'solar-generation': {
    id: 'solar-generation',
    branchId: 'fossil-fuel',
    depth: 2,
    parentId: 'fossil-fuel',
    childrenIds: ['solar-roof'],
    title: '太陽光発電 — 根本解 {Tesla Energy}',
    icon: '☀️',
    color: '--tesla-red',
    content: {
      mainText: '蓄電池と並ぶもう一つの柱が太陽光発電。2024年に世界の太陽光設置容量は2.25TWに到達（わずか2年で倍増）。コストは$0.043/kWhまで下がり、多くの地域で人類史上最安の発電源に。Teslaの太陽光+蓄電池セット率は45%で、バッテリー市場シェアは47-63%。',
      elonQuote: 'We have this handy fusion reactor in the sky called the sun. You don\'t have to do anything; it just works.',
      quoteSource: 'Tesla Shareholders Meeting, 2016',
      firstPrinciple: '太陽は毎秒3.8×10²⁶ワットのエネルギーを放出している。これは人類の全エネルギー需要の数千兆倍。問題はキャプチャ効率だけ。',
      data: [
        { label: '世界の太陽光容量', value: '2.25TW（2024年）', context: '2022年の1.1TWからわずか2年で倍増' },
        { label: '新規設置', value: '597GW（2024年）', context: '前年比33%増。2030年には年間1TWペースの予測' },
        { label: '太陽光コスト', value: '$0.043/kWh', context: '2010年から87%下落。中国/インドでは$0.033-0.038' },
        { label: 'Tesla蓄電池セット率', value: '45%（2024年下半期）', context: '太陽光顧客の45%が蓄電池も同時購入。過去最高' },
      ],
    },
  },

  // L4: Solar Roof
  'solar-roof': {
    id: 'solar-roof',
    branchId: 'fossil-fuel',
    depth: 3,
    parentId: 'solar-generation',
    childrenIds: [],
    title: 'Solar Roof — 屋根が発電所に',
    icon: '🏗️',
    color: '--tesla-red',
    content: {
      mainText: '普通の屋根瓦に見えるソーラーパネル。各タイル71.67W出力で、通常のプレミアム屋根と見分けがつかない。Powerwallと組み合わせれば家庭単位でエネルギー自給が可能。屋根の全面交換が必要なため$45,000-$106,000と高価だが、25年の電力+防水+製品保証付き。',
      data: [
        { label: 'タイル出力', value: '71.67W / 約15.3W/平方フィート', context: '建築グレードのガラスソーラータイル' },
        { label: '保証期間', value: '25年（電力・防水・製品）', context: '5年で95%以上、25年で85%以上の出力保証' },
        { label: '設置費用', value: '$45,000〜$106,000', context: '屋根全面交換込み。ソーラー部分は$2.80-4.50/W' },
      ],
      analogy: '屋根を「コスト」から「資産」に変える発想。雨を防ぐだけの屋根が、毎月電気代を稼ぐ発電所になる。',
    },
  },

  // L3: Master Plan Part 3
  'master-plan-3': {
    id: 'master-plan-3',
    branchId: 'fossil-fuel',
    depth: 2,
    parentId: 'fossil-fuel',
    childrenIds: [],
    title: 'Master Plan Part 3 — 地球全体の脱炭素',
    icon: '🌍',
    color: '--tesla-red',
    content: {
      mainText: '2023年4月に発表された「地球を持続可能なエネルギーに完全移行させる」ための具体的ロードマップ。現在の世界エネルギー消費は年間165PWhだが、電化すれば82PWhで同じ仕事ができる（化石燃料の64%は廃熱として消失）。必要な投資は10兆ドルだが、化石燃料継続の14兆ドルより安い。全て既存技術で実現可能。',
      data: [
        { label: '必要な蓄電容量', value: '240 TWh', context: 'うち112TWhはEVバッテリー。残りは定置型蓄電' },
        { label: '必要な再エネ発電', value: '30 TW', context: '地球表面の0.2%未満の土地で実現可能' },
        { label: '必要な投資', value: '約10兆ドル（20年間）', context: '化石燃料継続の14兆ドルより安い。世界GDPの0.5-1%/年' },
        { label: '必要なEV生産', value: '約8,500万台/年', context: '現在の世界全車両生産量に相当。15-20年で全車両電動化' },
        { label: '化石燃料の採掘量削減', value: '80%削減', context: '残り20%は化学原料・航空燃料等に限定' },
      ],
      firstPrinciple: '現在のエネルギーの80%は化石燃料だが、そのうち有効活用されているのはたった36%。電化すれば必要エネルギー量が半減する。問題は技術ではなく、意志と実行速度。',
    },
  },

  // ========================================
  // L2: 知能の限界 (Limits of Intelligence)
  // ========================================
  'intelligence-limits': {
    id: 'intelligence-limits',
    branchId: 'intelligence-limits',
    depth: 1,
    parentId: 'root',
    childrenIds: ['ai-development', 'brain-interface'],
    title: '知能の限界',
    subtitle: 'Limits of Intelligence',
    icon: '🧠',
    color: '--accent-purple',
    imageUrl: 'images/intelligence-limits.png',
    content: {
      mainText: '人間の知能には生物学的な上限がある。脳の処理速度、記憶容量、通信帯域幅 — すべてが進化の偶然で決まった限界に縛られている。AIは指数関数的に賢くなり、やがて全ての知的領域で人間を凌駕する。イーロンはこの避けられない未来に対して3つの道を同時に推進している: (1) AIを正しく開発する、(2) 脳とAIを融合する、(3) AIが人間の価値観に沿うよう設計する。',
      elonQuote: 'We will have AI that is smarter than any one human probably around end of next year. AI that is smarter than all humans combined is probably within five years.',
      quoteSource: 'X Space, 2024',
      firstPrinciple: '知能は文明の根本的な乗数。エネルギー、輸送、製造 — あらゆる問題の解決速度は知能に比例する。知能の限界を突破することは、他の全ての問題を加速的に解決することに等しい。',
      analogy: '蒸気機関が「筋力の限界」を突破したように、AIとBCIは「知能の限界」を突破する。これは人類史上最大のボトルネック解消になる。',
    },
  },

  // L3: AI開発
  'ai-development': {
    id: 'ai-development',
    branchId: 'intelligence-limits',
    depth: 2,
    parentId: 'intelligence-limits',
    childrenIds: ['colossus', 'grok', 'openai-departure'],
    title: 'AI開発 {xAI}',
    icon: '🔬',
    color: '--accent-purple',
    content: {
      mainText: '「宇宙の本質を理解する」AIを作る。xAIは2023年にイーロンが設立し、Grokシリーズを開発。真実を最大限に追求し、バイアスの少ないAIを目指す。',
      elonQuote: 'The goal of xAI is to understand the true nature of the universe.',
      quoteSource: 'xAI Launch, 2023',
    },
  },

  // L4: Colossus
  'colossus': {
    id: 'colossus',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'ai-development',
    childrenIds: [],
    title: 'Colossus — 世界最大のAIインフラ',
    icon: '🖥️',
    color: '--accent-purple',
    content: {
      mainText: 'テネシー州メンフィスの旧Electrolux工場跡地に、わずか122日で建設された世界最大のAIスーパーコンピューター。通常4年かかる規模を「不可能な速度で建設する」哲学で実現。2024年9月に10万GPUで稼働開始、92日後に20万GPUへ倍増。現在は23万GPU以上が稼働。',
      firstPrinciple: 'スケーリング則が示す冷酷な現実: AIの性能向上には計算量の指数関数的な増加が必要。2倍賢いAIを作るには、10倍の計算が必要になることもある。計算インフラが今日のAI競争における最大の参入障壁。',
      data: [
        { label: '現在のGPU数', value: '230,000+基', context: 'H100×150K + H200×50K + GB200×30K' },
        { label: '建設期間', value: '122日', context: '通常4年かかる規模を約4ヶ月で完成' },
        { label: '消費電力', value: '約300MW', context: '約30万世帯分の電力に相当' },
        { label: '拡張目標', value: '100万GPU / 1.2GW', context: '世界初のギガワット級AIデータセンターへ' },
      ],
    },
  },

  // L4: Grok
  'grok': {
    id: 'grok',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'ai-development',
    childrenIds: [],
    title: 'Grok — 偏りを排し真実を追求するAI',
    icon: '🎯',
    color: '--accent-purple',
    content: {
      mainText: '多くのAIが政治的正しさのために回答を自己検閲する中、Grokは学習データの偏りを透明化し補正することで、タブーなく事実を述べることを優先する。Grok 3は前世代比10倍の計算資源で訓練され、数学・コーディング・推論で最先端の性能を達成。Xプラットフォームのリアルタイムデータにもアクセスできる。',
      elonQuote: 'I think there\'s a real danger in training AI to be politically correct, or in other words, training AI to lie.',
      quoteSource: 'X/Twitter, 2023',
      data: [
        { label: 'Grok 3訓練計算量', value: '前世代の10倍', context: 'Colossus 200K GPUで訓練' },
        { label: 'コンテキストウィンドウ', value: '100万トークン', context: '約75万語 = 書籍10冊分を一度に処理' },
        { label: 'DeepSearch', value: 'AI駆動リサーチ', context: 'OpenAI Deep Research対抗機能' },
      ],
    },
  },

  // L4: OpenAIの変節
  'openai-departure': {
    id: 'openai-departure',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'ai-development',
    childrenIds: [],
    title: 'AI開発の主導権を分散させる',
    icon: '⚖️',
    color: '--accent-purple',
    content: {
      mainText: 'イーロンは2015年にOpenAIを共同設立した。目的は「安全なAIをオープンに開発する」こと。しかしOpenAIは営利化し、クローズドになった。元の理念が裏切られたと感じ、自らxAIを設立。AI開発の競争環境を作ることが安全性を保つ。',
      data: [
        { label: 'OpenAI共同設立', value: '2015年', context: '非営利のAI安全研究所として' },
        { label: 'イーロン離脱', value: '2018年', context: '方向性の相違で取締役辞任' },
        { label: 'xAI設立', value: '2023年7月', context: '独自のAI開発を開始' },
      ],
      analogy: '核兵器を一国だけが持つことの危険性と同じ。権力の集中は腐敗を招く。AIのパワーも分散されるべき。',
    },
  },

  // L3: 脳とAIの融合
  'brain-interface': {
    id: 'brain-interface',
    branchId: 'intelligence-limits',
    depth: 2,
    parentId: 'intelligence-limits',
    childrenIds: ['bandwidth-problem', 'blindsight', 'telepathy', 'bci-alignment'],
    title: '脳とAIの融合 {Neuralink}',
    icon: '🔌',
    color: '--accent-purple',
    content: {
      mainText: 'AIがどれほど賢くなっても、人間が生物学的な知能の檻に閉じ込められていれば、やがて「ペット」のような存在になる。Neuralinkは脳に超微細な電極を埋め込み、人間の知能をデジタルに拡張する。N1チップは1,024個の電極を64本の極細スレッド（太さ4-6μm、髪の毛の1/10以下）に搭載し、脳の電気信号を20kHzでリアルタイム読み取り・無線送信する。',
      elonQuote: 'If you can\'t beat them, join them. We will have the option of merging with AI.',
      quoteSource: 'Neuralink発表会, 2019',
      data: [
        { label: 'N1チップ電極数', value: '1,024個', context: '64本のスレッドに分散配置' },
        { label: 'スレッドの太さ', value: '4-6μm', context: '人間の髪の毛（70μm）の1/10以下' },
        { label: 'PRIME臨床試験参加者', value: '21人', context: '2026年1月時点、世界規模で拡大中' },
        { label: 'サンプリングレート', value: '20kHz/チャンネル', context: '毎秒2メガビット以上の生データ' },
      ],
    },
  },

  // L4: 帯域幅のボトルネック
  'bandwidth-problem': {
    id: 'bandwidth-problem',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'brain-interface',
    childrenIds: [],
    title: '帯域幅のボトルネック',
    icon: '📡',
    color: '--accent-purple',
    content: {
      mainText: '人間の脳は強力だが、外部とのコミュニケーション速度が極めて遅い。キーボードで打てるのは毎秒数ビット。脳内の思考速度との差が何桁もある。BCIはこのボトルネックを直接広げる。',
      firstPrinciple: '情報理論。入出力の帯域幅がボトルネックなら、ボトルネックを直接広げればいい。指を介さず、脳から直接データを送受信する。',
      data: [
        { label: 'タイピング速度', value: '約10ビット/秒', context: '人間の出力帯域幅' },
        { label: '脳内処理速度', value: '推定テラビット/秒', context: 'ニューロン間の情報伝達' },
      ],
      analogy: '超高速のスパコンに、28.8kbpsのダイヤルアップモデムを繋いでいるようなもの。',
    },
  },

  // L4: Blindsight
  'blindsight': {
    id: 'blindsight',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'brain-interface',
    childrenIds: [],
    title: 'Blindsight — 視覚の回復',
    icon: '👁️',
    color: '--accent-purple',
    content: {
      mainText: '視覚を失った人に「見える」能力を取り戻すNeuralinkの次世代デバイス。視覚野に直接電気刺激を送り、カメラからの映像信号を脳が「見る」形で受信する。先天性の視覚障害者が生まれて初めて「見る」ことすら理論上可能。2025年6月にFDAブレークスルーデバイス指定を取得。',
      data: [
        { label: 'FDA指定', value: 'ブレークスルーデバイス', context: '2025年6月取得、審査迅速化' },
        { label: '臨床試験計画', value: '3名の被験者', context: '数年間の試験期間を予定' },
        { label: '初期解像度', value: '低解像度（初期ゲーム水準）', context: 'ソフトウェア更新で段階的に向上' },
        { label: '将来の可能性', value: '赤外線・紫外線知覚', context: '人間の目の限界を超えた知覚' },
      ],
      firstPrinciple: '視覚は目の機能ではなく、脳の機能。目はカメラに過ぎず、「見る」という体験は視覚野で生成される。だから目を介さず視覚野に直接信号を送れば、目がなくても見える。',
    },
  },

  // L4: Telepathy
  'telepathy': {
    id: 'telepathy',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'brain-interface',
    childrenIds: [],
    title: 'Telepathy — 思考でコンピュータを操作',
    icon: '💭',
    color: '--accent-purple',
    content: {
      mainText: '脊髄損傷などで四肢が麻痺した人が、思考だけでコンピューターを操作できるNeuralinkの最初の製品。2024年1月に最初の被験者ノーランド・アーバウに埋め込まれ、2026年1月時点で世界21名に拡大。タイピング速度は40WPM（健常者のスマホ入力に匹敵）に到達し、情報伝達速度は10ビット/秒を超え、健常者のマウス操作を上回る成果も。',
      elonQuote: 'The first Neuralink product is called Telepathy. It enables control of your phone or computer, and through them almost any device, just by thinking.',
      quoteSource: 'X/Twitter, 2024年1月',
      data: [
        { label: '臨床試験参加者', value: '21名', context: '2026年1月時点、カナダ含む国際展開' },
        { label: 'タイピング速度', value: '40 WPM', context: '思考だけでのテキスト入力速度' },
        { label: '情報伝達速度', value: '10+ ビット/秒', context: '健常者のマウス操作を超える被験者も' },
        { label: '量産・自動手術目標', value: '2026年', context: '高ボリューム生産と自動化手術を予定' },
      ],
    },
  },

  // L4: BCIによるアライメント（人間がAIと対等になる手段）
  'bci-alignment': {
    id: 'bci-alignment',
    branchId: 'intelligence-limits',
    depth: 3,
    parentId: 'brain-interface',
    childrenIds: [],
    title: 'BCIによるアライメント',
    icon: '🔗',
    color: '--accent-purple',
    content: {
      mainText: 'AIのアライメント問題（AIを人間の価値観に従わせる）の最も根本的な解決策：人間がAIと融合すること。人間自身がAIになれば、「AIが人間に敵対する」という問題構造そのものが消える。',
      elonQuote: 'Even in a benign AI scenario, we\'ll be left behind. With a high-bandwidth brain-machine interface, we can actually go along for the ride.',
      quoteSource: 'Wait But Why Interview, 2017',
      analogy: '犬と人間の知能差。犬は人間の意図を完全には理解できない。超知能AIと人間の差がそうならないために、知能を底上げする。',
    },
  },

  // ========================================
  // L2: 人口・労働力の減少 (Population/Labor Decline)
  // ========================================
  'population-decline': {
    id: 'population-decline',
    branchId: 'population-decline',
    depth: 1,
    parentId: 'root',
    childrenIds: ['optimus-robot', 'autonomous-transport', 'abundance-economy'],
    title: '人口・労働力の減少',
    subtitle: 'Population & Labor Decline',
    icon: '📉',
    color: '--accent-green',
    imageUrl: 'images/population-decline.png',
    content: {
      mainText: '先進国を中心に出生率が急落している。日本は2024年に出生数が初めて70万人を割り、韓国は出生率0.75で世界最低。中国は3年連続で人口減少し、2025年には339万人減。2100年までに世界の97%の国が人口置換水準を下回る。労働力の物理的制約を突破しなければ、経済も文明も止まる。',
      elonQuote: 'Population collapse due to low birth rates is a much bigger risk to civilization than global warming.',
      quoteSource: 'X/Twitter, 2022',
      firstPrinciple: '経済の基本方程式: GDP ≈ 労働力 × 生産性。労働力が減少するなら、生産性を桁違いに上げるか、労働力を人工的に増やすしかない。',
      data: [
        { label: '日本の出生率', value: '1.15（2024年）', context: '出生数686,061人。初めて70万人を割り、予測より15年前倒し' },
        { label: '韓国の出生率', value: '0.75（2024年）', context: '世界最低。2025年9月時点で0.85に微回復も依然危機的' },
        { label: '中国の人口減少', value: '339万人減（2025年）', context: '3年連続減少。2100年には6.33億人に半減の予測' },
        { label: '世界の出生率', value: '2.1（2024年）', context: '1960年代の5.0から急落。2100年には97%の国が置換水準以下' },
      ],
      analogy: '会社の新入社員がゼロになり、ベテラン社員が次々退職していく企業。事業を維持するには、一人あたりの生産性を劇的に上げるか、AIロボット社員を導入するしかない。',
    },
  },

  // L3: Optimus
  'optimus-robot': {
    id: 'optimus-robot',
    branchId: 'population-decline',
    depth: 2,
    parentId: 'population-decline',
    childrenIds: ['humanoid-design', 'fsd-to-robot', 'optimus-price'],
    title: '汎用ヒューマノイド {Tesla Optimus}',
    icon: '🤖',
    color: '--accent-green',
    content: {
      mainText: '汎用ヒューマノイドロボットで、人間を危険で退屈な労働から解放する。現在はGen 3ハンド+Gen 2ボディの構成で、身長173cm、体重57kg。Gen 3ハンドは片手22自由度+手首3自由度の腱駆動システムで、人間の手（27自由度）に迫る繊細さを実現。2025年時点でTesla工場に1,000台以上を配備し、3,000以上のタスクを実行。',
      elonQuote: 'Optimus will be more significant than the vehicle business over time.',
      quoteSource: 'Tesla Earnings Call, 2024',
      data: [
        { label: '身長 / 体重', value: '173cm / 57kg', context: 'Gen 2の73kgから10kg軽量化' },
        { label: 'Gen 3ハンド自由度', value: '片手25 DOF（22+手首3）', context: '50個のアクチュエーター。人間の手は約27 DOF' },
        { label: '工場配備数', value: '1,000台以上（2025年）', context: 'Fremont工場とGiga Texasで稼働中' },
        { label: 'バッテリー / 稼働時間', value: '2.3kWh / 10-12時間', context: '1回の充電で1日の作業シフトをカバー' },
      ],
    },
  },

  // L4: なぜ人間型？
  'humanoid-design': {
    id: 'humanoid-design',
    branchId: 'population-decline',
    depth: 3,
    parentId: 'optimus-robot',
    childrenIds: [],
    title: 'なぜ人間型？世界は人間用に作られている',
    icon: '🚪',
    color: '--accent-green',
    content: {
      mainText: 'ドアの高さ、階段の幅、工具の形 — 全て人間の身体に合わせて設計されている。人間と同じ形のロボットなら、既存のインフラを改造せずにそのまま使える。また人間型であることで信頼感や協調性が生まれ、社会に自然に溶け込める。',
      elonQuote: 'Human society is based on the interaction of a bipedal humanoid with two arms and ten fingers.',
      quoteSource: 'Tesla AI Day, 2022',
      firstPrinciple: 'インフラの再設計コストは天文学的。既存の環境に適応するロボットを作る方が、環境をロボットに合わせるより遥かに安い。4つの理由: (1)環境互換性 (2)既存工具の使用 (3)社会的信頼 (4)他の形だと世界の再設計が必要。',
      analogy: '新しい言語を作って全員に学ばせるより、既存の言語を話せるAIを作る方が現実的。',
    },
  },

  // L4: FSD技術のロボット転用
  'fsd-to-robot': {
    id: 'fsd-to-robot',
    branchId: 'population-decline',
    depth: 3,
    parentId: 'optimus-robot',
    childrenIds: [],
    title: 'FSD技術のロボット転用',
    icon: '👁️',
    color: '--accent-green',
    content: {
      mainText: 'Teslaの自動運転(FSD)で培ったコンピュータービジョンとAIニューラルネットを、そのままOptimusに転用する。FSD v14はエンドツーエンドAIで、カメラ映像から直接運転操作を出力する。この「見て→判断して→動かす」パイプラインはロボットのナビゲーションと完全に同じ構造。82億マイル以上の実世界走行データが、ロボットの空間認識の基盤になる。',
      firstPrinciple: '自動運転車もロボットも、本質的には「カメラで見て、AIが判断して、アクチュエーターで動く」。問題の構造が同じなら、技術も共通化できる。',
      data: [
        { label: 'FSD累計走行距離', value: '82億マイル以上', context: '2026年2月時点。最初の50日で10億マイル追加' },
        { label: 'FSD最新バージョン', value: 'v14.2.2', context: 'エンドツーエンドAI。手書きルールゼロ' },
        { label: 'Gen 3ハンド', value: '片手22 DOF + 手首3 DOF', context: '腱駆動システム。指先に触覚センサー搭載' },
        { label: 'Optimus構成', value: 'Gen 3ハンド + Gen 2ボディ', context: '全身約40アクチュエーター + 手50アクチュエーター' },
      ],
    },
  },

  // L4: 目標価格
  'optimus-price': {
    id: 'optimus-price',
    branchId: 'population-decline',
    depth: 3,
    parentId: 'optimus-robot',
    childrenIds: [],
    title: '目標価格2-3万ドル = 車より安い',
    icon: '💵',
    color: '--accent-green',
    content: {
      mainText: '量産効果で1体2-3万ドルを目指す。24時間働けるロボットがこの価格なら、労働のコスト構造が根本的に変わる。2025年にFremont工場でパイロット生産ラインが稼働。2026年にはGiga Texasで年間100万台の生産能力を目指し、2027年から約50万台/年の外部販売を開始する計画。',
      elonQuote: 'In the long term, I think Optimus will be worth more than everything else at Tesla combined.',
      quoteSource: 'Tesla AI Day, 2022',
      data: [
        { label: '目標価格', value: '2-3万ドル', context: 'Model 3より安い。競合ヒューマノイドの半額以下' },
        { label: '2025年: 工場内配備', value: '1,000台以上', context: 'Fremont + Giga Texasで実タスク実行' },
        { label: '2026年: 量産開始', value: '年間100万台目標', context: 'Giga Texasに大規模生産施設を建設中' },
        { label: '2027年: 外部販売', value: '年間50万台目標', context: '数秒に1台のペースで生産。最終目標は年間1,000万台' },
      ],
      analogy: '産業革命で蒸気機関が人間の筋力を代替したように、Optimusは人間の汎用労働を代替する。歴史上2度目の労働革命。',
    },
  },

  // L3: 自律輸送
  'autonomous-transport': {
    id: 'autonomous-transport',
    branchId: 'population-decline',
    depth: 2,
    parentId: 'population-decline',
    childrenIds: ['cybercab-labor', 'semi-truck'],
    title: '自律輸送 — 運転手不要の物流 {Tesla}',
    icon: '🚛',
    color: '--accent-green',
    content: {
      mainText: '世界中でトラック運転手とタクシー運転手が深刻に不足している。米国では8万人以上、日本では2024年問題で輸送力14%減。運転手の平均年齢は46歳で高齢化が進み、今後10年で120万人の新規採用が必要。自律走行車両だけが、人口減少下で物流を維持できる。',
      data: [
        { label: '米国のトラック運転手不足', value: '80,000〜87,500人', context: '今後10年で120万人の新規採用が必要。年間離職率90%以上' },
        { label: '日本の2024年問題', value: '輸送力14%減（即時）', context: '残業規制で2030年には34%減の予測。国内貨物の90%以上が陸送' },
        { label: '米国トラック運転手の平均年齢', value: '46歳', context: '高齢化が深刻。若年層の採用が困難' },
      ],
    },
  },

  // L4: Cybercab（労働力文脈）
  'cybercab-labor': {
    id: 'cybercab-labor',
    branchId: 'population-decline',
    depth: 3,
    parentId: 'autonomous-transport',
    childrenIds: [],
    title: 'Cybercab — タクシー運転手の代替',
    icon: '🚕',
    color: '--accent-green',
    content: {
      mainText: '完全無人のロボタクシー。ステアリングもペダルもない2人乗り専用設計で、価格は3万ドル以下。2025年6月にAustinでModel Yベースのロボタクシーサービスを開始し、2026年1月には車内無人の完全自動運転走行を実現。Cybercab専用車両の量産は2026年4月にGiga Texasで開始。',
      data: [
        { label: 'Cybercab価格', value: '3万ドル以下', context: '35kWhバッテリー、航続320km、ワイヤレス充電対応' },
        { label: 'Austin無人走行開始', value: '2026年1月22日', context: '車内安全員なし。追跡車あり。Model Y約51台のフリート' },
        { label: 'Austinの乗車料金', value: '$4.20（定額）', context: '運用コスト約$0.60/マイル。Waymoの$1.00/マイルより35%安い' },
        { label: '長期目標コスト', value: '$0.20/マイル以下', context: '現在の配車サービス$2.80/マイルの14分の1' },
      ],
      analogy: '馬車から自動車への移行で御者が消えたように、ロボタクシーで運転手という職業が変容する。でも移動の自由と安さは劇的に向上する。',
    },
  },

  // L4: Tesla Semi
  'semi-truck': {
    id: 'semi-truck',
    branchId: 'population-decline',
    depth: 3,
    parentId: 'autonomous-transport',
    childrenIds: [],
    title: 'Tesla Semi — 長距離トラック運転手の代替',
    icon: '🚛',
    color: '--accent-green',
    content: {
      mainText: '電動セミトラック。トリモーター後輪駆動で1,020馬力、航続325マイル/500マイルの2モデル展開。電気代はマイルあたり約$0.17で、ディーゼルの$0.50-$0.70の3分の1以下。1.2MWのMegachargerで30分で60%充電。将来的にFSD搭載で完全自動化を目指す。Giga Nevadaで2026年に年間5万台の量産開始。',
      data: [
        { label: '航続距離', value: '325マイル / 500マイル', context: '最大積載時でも500マイル達成' },
        { label: '電気代/マイル', value: '約$0.17', context: 'ディーゼル$0.50-$0.70/マイルの3分の1' },
        { label: 'Megacharger', value: 'ピーク1.2MW', context: '30分で60%充電。全米46ヶ所に設置計画' },
        { label: '価格', value: '$260,000〜$290,000', context: '競合ゼロエミッショントラック$435,000の約6割。約4年で投資回収' },
        { label: '量産目標', value: '年間50,000台（2026年）', context: 'Giga Nevadaで生産。1,000人以上の新規雇用' },
      ],
    },
  },

  // L3: 豊かさの時代
  'abundance-economy': {
    id: 'abundance-economy',
    branchId: 'population-decline',
    depth: 2,
    parentId: 'population-decline',
    childrenIds: [],
    title: '豊かさの時代 — 経済のパラダイムシフト',
    icon: '🌊',
    color: '--accent-green',
    content: {
      mainText: 'ロボットが全ての肉体労働を担えば、モノとサービスのコストは限りなくゼロに近づく。イーロンはこれを「Universal Basic Income」ではなく「Universal High Income（普遍的高所得）」と呼ぶ。最低限の生活保障ではなく、全員が最高の医療、食事、住居、移動手段にアクセスできる「持続可能な豊かさ」の世界。',
      firstPrinciple: '経済学は「希少性の科学」。ロボットが希少性を消滅させたとき、経済学そのものが書き換わる。問題は「生産」から「意味」に移行する。',
      elonQuote: 'There will be universal high income -- not merely basic income. There\'ll be no shortage of goods or services.',
      quoteSource: 'Viva Technology conference, Paris, May 2024',
      data: [
        { label: 'UHI初提唱', value: '2023年11月2日', context: 'ブレッチリーパーク英AI安全サミット。スナク首相との対話で' },
        { label: 'AI実現確率', value: '80%', context: '人間が働く必要のない世界の実現確率（パリ2024年）' },
        { label: '2025年リヤド発言', value: '「貧困はなくなる」', context: 'サウジ・米投資フォーラムでUHIビジョンを再確認' },
      ],
      analogy: 'かつて塩は貴重品で戦争の原因にすらなった。今は数百円で買える。Optimusは全てのモノとサービスに同じことを起こす。お金は酸素のように — あまりに豊富で考える必要すらなくなる。',
    },
  },

  // ========================================
  // L2: 移動の非効率 (Mobility Inefficiency)
  // ========================================
  'mobility-inefficiency': {
    id: 'mobility-inefficiency',
    branchId: 'mobility-inefficiency',
    depth: 1,
    parentId: 'root',
    childrenIds: ['underground-network'],
    title: '移動の非効率',
    subtitle: 'Mobility Inefficiency',
    icon: '🚗',
    color: '--muted',
    imageUrl: 'images/mobility-inefficiency.png',
    content: {
      mainText: '都市の渋滞は年間数千億ドルの経済損失と膨大な時間の浪費を生んでいる。道路を増やしても誘発需要で渋滞は解消しない。現代の交通網は2D平面に閉じ込められており、都市の成長とともに構造的に破綻する。',
      data: [
        { label: '米国の年間渋滞コスト', value: '約870億ドル', context: '燃料浪費+生産性損失の合計' },
        { label: '米国の平均通勤時間', value: '片道約27分', context: '年間で約200時間を移動に消費' },
        { label: '都市部の車の平均速度', value: '約24km/h', context: '100年前の馬車と大差ない' },
      ],
      elonQuote: 'Traffic is soul-destroying. It\'s like acid on the soul, a horrible way to spend your life.',
      quoteSource: 'TED Talk, 2017',
      firstPrinciple: '2Dの道路ネットワークに3Dの都市を載せている。建物は上に何十階も伸びるのに、交通は地表の一層だけ。この次元のミスマッチが渋滞の根本原因。',
    },
  },

  // L3: 地下に高速移動ネットワークを作る
  'underground-network': {
    id: 'underground-network',
    branchId: 'mobility-inefficiency',
    depth: 2,
    parentId: 'mobility-inefficiency',
    childrenIds: ['tunnel-cost-reduction', 'intracity-transit', 'intercity-transit'],
    title: '地下に高速移動ネットワークを作る {The Boring Company}',
    icon: '🕳️',
    color: '--muted',
    content: {
      mainText: '地表の道路は拡張の限界がある。地下なら何層でもトンネルを重ねられ、天候にも左右されない。The Boring Companyは地下に3Dのトンネルネットワークを構築し、都市交通の根本問題を解決しようとしている。',
      data: [
        { label: 'Vegas Loop承認済み', value: '68マイル・104駅', context: 'クラーク郡+ラスベガス市が承認' },
        { label: 'Dubai Loop契約', value: '6.4km・4駅', context: '2026年後半に建設開始予定' },
        { label: 'Nashville Music City Loop', value: '空港-ダウンタウン接続', context: '2026年2月に空港当局が承認' },
        { label: 'Universal Orlando', value: 'テーマパーク間接続', context: '2026年2月にBoring Company選定' },
      ],
      elonQuote: 'We\'re trying to dig a hole under LA. And this is to create the beginning of what will hopefully be a 3-D network of tunnels to alleviate congestion.',
      quoteSource: 'TED Talk, 2017',
      firstPrinciple: '空を飛ぶか地下に潜るか。空飛ぶ車は騒音・落下リスク・天候の影響がある。トンネルは静かで安全で天候に無関係。物理的に地下ネットワークが最適解。',
    },
  },

  // L4: トンネル掘削コストを桁違いに下げる
  'tunnel-cost-reduction': {
    id: 'tunnel-cost-reduction',
    branchId: 'mobility-inefficiency',
    depth: 3,
    parentId: 'underground-network',
    childrenIds: [],
    title: 'トンネル掘削コストを桁違いに下げる',
    icon: '⛏️',
    color: '--muted',
    content: {
      mainText: '従来のトンネル工事は1マイルあたり1億〜10億ドルと途方もなく高い。The Boring Companyは小径トンネル設計、連続掘削技術、掘削土の再利用で、コストを桁違いに下げることに取り組んでいる。LVCC Loopは1.7マイルを約4,700万ドルで建設。',
      data: [
        { label: '従来のトンネルコスト', value: '1億〜10億ドル/マイル', context: 'NY地下鉄延伸は1マイル20億ドル' },
        { label: 'Boring Companyの実績', value: '約1,000万ドル/マイル', context: 'LVCC Loop実績ベース' },
        { label: 'LVCC Loop建設費', value: '約4,700万ドル', context: '1.7マイル・3駅を約1年で完成' },
        { label: 'Prufrock TBM速度', value: '1マイル/週以上', context: '従来TBMの6倍以上の掘削速度' },
      ],
      firstPrinciple: 'コスト削減の4要素: (1)トンネル径を半分にすれば断面積は1/4 (2)掘削と内壁設置を同時並行 (3)24時間連続稼働 (4)掘削土をブロックに再利用。それぞれが掛け算でコストを下げる。',
    },
  },

  // L4: 都市内の主要拠点間を数分で結ぶ
  'intracity-transit': {
    id: 'intracity-transit',
    branchId: 'mobility-inefficiency',
    depth: 3,
    parentId: 'underground-network',
    childrenIds: [],
    title: '都市内の主要拠点間を数分で結ぶ',
    icon: '🎰',
    color: '--muted',
    content: {
      mainText: 'Vegas Loopは都市内高速移動の実証実験場。空港・スタジアム・ホテル・ダウンタウンを地下トンネルで接続し、地表なら30分以上かかる移動を2〜8分に短縮する。累計300万人以上が利用。',
      data: [
        { label: '累計乗客数', value: '300万人以上', context: '2021年開業〜2025年時点' },
        { label: 'ピーク時日間輸送量', value: '32,000人以上/日', context: 'イベント時の実績' },
        { label: '平均乗車時間', value: '2〜4分', context: '地表の渋滞では30分以上' },
        { label: '完成時の輸送能力', value: '最大90,000人/時', context: '104駅・68マイルのフルネットワーク' },
      ],
      firstPrinciple: 'ポイント・ツー・ポイント方式。従来の公共交通は固定路線で遠回りが多い。Loopは目的地まで直行するから、乗り換えなし・待ち時間なしで移動時間を最小化できる。',
    },
  },

  // L4: 都市間の高速地下輸送を実現する
  'intercity-transit': {
    id: 'intercity-transit',
    branchId: 'mobility-inefficiency',
    depth: 3,
    parentId: 'underground-network',
    childrenIds: [],
    title: '都市間の高速地下輸送を実現する',
    icon: '🚄',
    color: '--muted',
    content: {
      mainText: 'Loopは都市内交通の解決策だが、最終ビジョンはHyperloop — 真空チューブ内を時速600マイル以上で移動する都市間輸送システム。ニューヨーク〜ワシントンDCを29分で結ぶ構想。Loopのトンネルは将来Hyperloopへのアップグレードが設計上可能。',
      data: [
        { label: 'Hyperloop目標速度', value: '760mph（約1,220km/h）', context: '航空機に匹敵する速度を地上で実現' },
        { label: 'NY-DC所要時間目標', value: '29分', context: '現在の列車で約3時間' },
      ],
      elonQuote: 'The Loop is a stepping stone toward hyperloop. The Loop is for transport within a city. Hyperloop is for transport between cities.',
      quoteSource: 'Boring Company Presentation',
      firstPrinciple: '空気抵抗は速度の2乗に比例する。真空チューブなら空気抵抗がほぼゼロになり、少ないエネルギーで超高速移動が可能。物理法則が許す最速の地上移動手段。',
    },
  },

  // ========================================
  // L2: 情報と金融の断絶 (Information & Financial Disconnect)
  // ========================================
  'info-finance-gap': {
    id: 'info-finance-gap',
    branchId: 'info-finance-gap',
    depth: 1,
    parentId: 'root',
    childrenIds: ['global-connectivity', 'free-speech-platform', 'financial-inclusion'],
    title: '情報と金融の断絶',
    subtitle: 'Information & Financial Disconnect',
    icon: '📡',
    color: '--foreground',
    imageUrl: 'images/info-finance-gap.png',
    content: {
      mainText: '世界の22億人がまだインターネットに接続されておらず、その96%が低・中所得国に集中。13億人の成人が銀行口座を持てない。情報と金融へのアクセスの不平等は、人類全体の知的能力と経済力を制限している。デジタル格差の解消だけで2030年までにGDPを1.5兆ドル押し上げられる。',
      firstPrinciple: '知能の総量は人口×一人あたりの知識アクセス。22億人をインターネットに繋げれば、人類全体の問題解決能力が飛躍的に向上する。',
      data: [
        { label: 'インターネット未接続人口', value: '22億人（2025年）', context: '96%が低・中所得国。低所得国のネット普及率はわずか23%' },
        { label: '銀行口座なし成人', value: '13億人', context: 'うち55%が女性。9億人は携帯電話を所有 — スマホ金融で解決可能' },
        { label: 'デジタル格差の経済影響', value: 'GDP +1.5兆ドル（2030年）', context: '世界銀行試算。AI効果を含めれば+2.6〜4.4兆ドル' },
      ],
    },
  },

  // L3: Starlink（情報接続文脈）
  'global-connectivity': {
    id: 'global-connectivity',
    branchId: 'info-finance-gap',
    depth: 2,
    parentId: 'info-finance-gap',
    childrenIds: ['starlink-stats', 'starlink-disaster'],
    title: '地球全体をインターネットで繋ぐ {Starlink}',
    icon: '🛰️',
    color: '--foreground',
    content: {
      mainText: '低軌道衛星コンステレーションで、地球上のあらゆる場所にインターネットを届ける。100カ国以上でサービスを提供し、2025年だけで26カ国に新規展開。アフリカでは19カ国、太平洋の島嶼国からアマゾン奥地まで、地上インフラが到達できない場所に「空から」接続を提供する。',
      firstPrinciple: '地上のインフラは地形に制約される。山、海、砂漠を越えるには莫大なコスト。低軌道衛星なら地形に関係なく電波を届けられる。',
      data: [
        { label: 'サービス提供国', value: '100カ国以上', context: '2025年だけで26カ国に新規展開。全居住大陸をカバー' },
        { label: 'アフリカ展開', value: '19カ国（2025年3月）', context: 'ナイジェリア月額$538〜。学校・病院への接続を推進' },
        { label: '途上国の接続改善', value: '5Mbps未満→50-100Mbps', context: 'ブラジル・アマゾン、チリ・パタゴニアなどで劇的改善' },
      ],
    },
  },

  // L4: Starlinkの現状と規模
  'starlink-stats': {
    id: 'starlink-stats',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'global-connectivity',
    childrenIds: [],
    title: 'Starlinkの現状と規模',
    icon: '📊',
    color: '--foreground',
    content: {
      mainText: '2026年2月に加入者1,000万人を突破。打ち上げ済み衛星9,400基以上、稼働7,500基以上。世界の衛星インターネット速度テストの97.1%がStarlink。ダウンロード中央値は117Mbps、レイテンシ45ms。年間売上は約118億ドル（2025年予測）で、SpaceX全売上の60%近くを占める最大の収益源。',
      data: [
        { label: '加入者数', value: '1,000万人（2026年2月）', context: '2022年12月の100万人からわずか3年で10倍' },
        { label: '打ち上げ/稼働衛星', value: '9,422基 / 7,578基稼働', context: '最終計画42,000基。全衛星速度テストの97.1%がStarlink' },
        { label: '年間売上', value: '約118億ドル（2025年予測）', context: '前年比83%増。SpaceX全売上の約60%' },
        { label: 'ダウンロード速度', value: '中央値117Mbps', context: '2022年の54Mbpsからほぼ倍増。レイテンシ45ms' },
      ],
    },
  },

  // L4: 災害・紛争時の通信
  'starlink-disaster': {
    id: 'starlink-disaster',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'global-connectivity',
    childrenIds: [],
    title: '災害・紛争時の通信インフラ',
    icon: '🆘',
    color: '--foreground',
    content: {
      mainText: '地上の通信インフラが破壊されても、衛星通信は影響を受けない。ウクライナでは侵攻開始48時間で端末が到着し、5,000台以上が軍・病院・政府機関で稼働。米国防総省は5.37億ドルの契約を締結。ハリケーン・ヘレーンでは10,000台以上のStarlinkキットを配布し、Direct to Cell機能で携帯電話への直接通信も実現。',
      data: [
        { label: 'ウクライナ展開', value: '2022年2月26日〜', context: '依頼から48時間で端末到着。5,000台以上稼働。SpaceX貢献額1億ドル以上' },
        { label: '米国防総省契約', value: '5.37億ドル（2027年まで）', context: 'ウクライナ軍用Starlink。ポーランドは47,000台の端末を提供' },
        { label: 'ハリケーン・ヘレーン', value: '10,000台以上配布', context: '2024年9月。Direct to Cellでテキスト通信も。被災地で無料提供' },
        { label: '軍事・政府契約総額', value: '約30億ドル/年（2025年）', context: 'NRO Starshield 18億ドル、宇宙軍7,000万ドル等' },
      ],
    },
  },

  // L3: 言論の自由を守る
  'free-speech-platform': {
    id: 'free-speech-platform',
    branchId: 'info-finance-gap',
    depth: 2,
    parentId: 'info-finance-gap',
    childrenIds: ['community-notes', 'censorship-problem'],
    title: '言論の自由を守る {X}',
    icon: '🗣️',
    color: '--foreground',
    content: {
      mainText: '「デジタル公共広場」を守る。月間アクティブユーザー約5.6億人のプラットフォームで、民主主義に不可欠な自由な情報の流れを維持する。買収後、コンテンツ削除からリーチ制限へ方針転換。「言論の自由であって、リーチの自由ではない」が新たな原則。',
      elonQuote: 'Free speech is the bedrock of a functioning democracy, and Twitter is the digital town square where matters vital to the future of humanity are debated.',
      quoteSource: 'Twitter買収発表, 2022',
      firstPrinciple: '良い意思決定には正確な情報が必要。情報がフィルタリングされると、集合的な判断力が低下する。',
      data: [
        { label: '月間アクティブユーザー', value: '約5.6億人', context: '世界12位のソーシャルプラットフォーム' },
        { label: '2024年売上', value: '約26億ドル', context: '広告20億ドル+サブスク10億ドル（年間ベース）' },
        { label: '平均利用時間', value: '34分/日', context: 'ユーザーのエンゲージメントは維持' },
      ],
    },
  },

  // L4: コミュニティノート
  'community-notes': {
    id: 'community-notes',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'free-speech-platform',
    childrenIds: [],
    title: 'コミュニティノート — 集合知による検証',
    icon: '📝',
    color: '--foreground',
    content: {
      mainText: '検閲の代わりに、ユーザー同士がファクトチェックする仕組み。50万人以上の貢献者が55言語で176万件以上のノートを投稿。「ブリッジング」アルゴリズムにより、普段意見が対立するユーザー同士が合意した時だけノートが表示される。PNAS論文でリポスト46%減、いいね44%減の効果が実証された。',
      firstPrinciple: '中央集権的な検閲は必ずバイアスを持つ。分散型の検証システムなら、単一の権力による歪みを防げる。多数決ではなく「対立する両陣営の合意」を要求することで、党派的バイアスを排除。',
      data: [
        { label: '投稿ノート数', value: '176万件以上', context: '55言語。50万人以上の貢献者が参加' },
        { label: 'ノートの効果', value: 'リポスト46%減', context: 'PNAS論文（2025年）。いいね44%減、閲覧14%減' },
        { label: '処理速度の改善', value: '100日→14日', context: 'ノート投稿から表示までの期間が大幅短縮' },
      ],
      analogy: 'Wikipediaが一人の編集者ではなく、多数のチェックで質を保つのと同じ原理。ただし多数決ではなく「対立する意見の人同士の合意」を要求する点が革新的。',
    },
  },

  // L4: 検閲への懸念
  'censorship-problem': {
    id: 'censorship-problem',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'free-speech-platform',
    childrenIds: [],
    title: '検閲への懸念 — Twitter Files',
    icon: '🚫',
    color: '--foreground',
    content: {
      mainText: 'Twitter Files（2022年12月〜2023年）の公開で、旧Twitterの内部検閲の実態が明らかに。FBIとの定期的な打ち合わせ、バイデン陣営とトランプ政権の双方からのコンテンツ削除要請、ハンター・バイデン報道の抑制。連邦最高裁はMurthy v. Missouri（2024年6月）で原告適格を否定し、憲法判断は保留。',
      elonQuote: 'The bird is freed.',
      quoteSource: 'Twitter買収完了時, 2022年10月',
      data: [
        { label: 'Twitter Files公開', value: '2022年12月〜2023年', context: 'FBIとの定期会合、政府からの削除要請が判明' },
        { label: '最高裁判決', value: 'Murthy v. Missouri（2024年6月）', context: '6-3で原告適格を否定。憲法修正第1条の判断は保留' },
        { label: '反対意見', value: 'アリート判事、トーマス判事', context: '「最も重要な言論の自由の訴訟の一つ」と主張' },
      ],
    },
  },

  // L3: 金融の民主化
  'financial-inclusion': {
    id: 'financial-inclusion',
    branchId: 'info-finance-gap',
    depth: 2,
    parentId: 'info-finance-gap',
    childrenIds: ['x-payments', 'everything-app'],
    title: '金融の民主化 {X Money}',
    icon: '💰',
    color: '--foreground',
    content: {
      mainText: '世界の13億人の成人が銀行口座を持てないが、そのうち9億人は携帯電話を所有している。銀行の物理的支店は不要 — スマートフォンが銀行になる。X Moneyは米国39-41州で送金免許を取得し、2025-2026年にかけて段階的にサービスを展開中。',
      firstPrinciple: 'お金は情報に過ぎない。デジタルネイティブなプラットフォームなら、ほぼゼロコストで送金できる。銀行の物理的支店は不要。',
      data: [
        { label: '銀行口座なし成人', value: '13億人', context: 'うち9億人が携帯電話を所有。5.3億人がスマートフォン' },
        { label: 'X Money送金免許', value: '米国39-41州', context: 'ニューヨーク州は申請取下げ' },
        { label: 'Visa Direct提携', value: 'リアルタイム送金', context: '即時決済・残高管理・P2P送金を提供' },
      ],
    },
  },

  // L4: X Payments
  'x-payments': {
    id: 'x-payments',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'financial-inclusion',
    childrenIds: [],
    title: 'X Payments — デジタル決済',
    icon: '💳',
    color: '--foreground',
    content: {
      mainText: 'Xに決済機能を組み込み、銀行口座を持てない数十億人に金融サービスを届ける。イーロンのPayPal時代（1999-2002）からの夢の完成形。P2P送金、クリエイターへのチップ、Bitcoin Lightning送金が利用可能。Visa Direct提携でリアルタイム決済を実現し、将来的にはデビット/クレジットカードとの連携も予定。',
      data: [
        { label: 'Bitcoin送金', value: 'Lightning Network経由', context: '即時・低手数料のビットコイン送金が既に稼働' },
        { label: 'Visa Direct連携', value: 'リアルタイム送金', context: 'USDC（ステーブルコイン）決済にも対応予定' },
        { label: 'デビットカード', value: '2025年後半予定', context: 'X Moneyウォレットに紐付けたブランドカード' },
        { label: 'X Moneyベータ', value: '1-2ヶ月以内（2026年2月時点）', context: 'イーロンが外部ベータの開始を発表' },
      ],
    },
  },

  // L4: Everything App
  'everything-app': {
    id: 'everything-app',
    branchId: 'info-finance-gap',
    depth: 3,
    parentId: 'financial-inclusion',
    childrenIds: [],
    title: 'Everything App構想',
    icon: '📱',
    color: '--foreground',
    content: {
      mainText: 'イーロンの本当のビジョンはXを「何でもアプリ」にすること。2025年時点で実現済み: SNS、暗号化メッセージ(XChat)、AI(Grok無料開放)。展開中: X TV(動画ストリーミング)、X Money(決済)。未着手: マーケットプレイス。他のスーパーアプリにないGrok AIの統合が最大の差別化要因。',
      elonQuote: 'Buying Twitter is an accelerant to creating X, the everything app.',
      quoteSource: 'Twitter買収直後, 2022',
      data: [
        { label: '実現済み', value: 'SNS + XChat + Grok AI', context: 'Grokは2024年12月から全ユーザーに無料開放' },
        { label: '展開中', value: 'X TV + X Money', context: '2025年にCEOが発表。段階的にローンチ' },
        { label: 'Grok AI統合', value: 'フィード完全AI化', context: 'Xの全投稿・動画をGrokが読み、個人最適化推薦' },
        { label: '未着手', value: 'マーケットプレイス', context: 'WeChat型のEコマース統合は今後' },
      ],
      analogy: 'WeChatで中国人は10億人がメッセージ、支払い、タクシー、食事の注文を一つのアプリで行っている。XはGrok AIという他にない強みを持つ西洋版スーパーアプリ。',
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
  return ['single-planet', 'fossil-fuel', 'intelligence-limits', 'population-decline', 'mobility-inefficiency', 'info-finance-gap'];
}
