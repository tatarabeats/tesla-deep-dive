import type { StoryScene } from "../types/story";

// Colors
const GOLD = "rgba(255, 225, 140, 0.9)";
const CYAN = "rgba(80, 200, 255, 0.9)";
const RED = "rgba(255, 90, 80, 0.9)";
const PURPLE = "rgba(180, 130, 255, 0.9)";
const GREEN = "rgba(80, 220, 140, 0.9)";
const WARM = "rgba(200, 180, 150, 0.9)";
const TEXT = "rgba(232, 220, 200, 0.9)";

export const storyScenes: StoryScene[] = [
  // ============================================================
  // PROLOGUE — 感情をつかむ
  // ============================================================
  {
    id: "open-1",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "宇宙は暗い。",
    accentColor: TEXT,
  },
  {
    id: "open-2",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "138億年の歴史の中で、",
    subText: "知的生命が確認された惑星は——地球だけ。",
    accentColor: TEXT,
  },
  {
    id: "open-elon",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon-portrait.webp",
    text: "なぜ、この男は急いでいるのか？",
    accentColor: GOLD,
  },
  {
    id: "open-thesis",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/root.webp",
    text: "答えは6つある。",
    subText: "6つの脅威。6つの会社。1つの信念。",
    stat: "6",
    statLabel: "つの事業が世界を救う",
    accentColor: GOLD,
  },

  // ============================================================
  // CHAPTER 1 — 単一惑星への依存
  // ============================================================
  {
    id: "ch1-threat",
    type: "chapter-title",
    chapter: 1,
    imageUrl: "images/single-planet.webp",
    text: "脅威 01",
    subText: "単一惑星への依存",
    accentColor: CYAN,
  },
  {
    id: "ch1-fear",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "地球は過去5回、\nほぼ全ての生命を失った。",
    subText: "6回目がいつ来るかは、誰にも分からない。",
    accentColor: CYAN,
  },
  {
    id: "ch1-crisis",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis.webp",
    text: "2008年。3回連続爆発。",
    subText: "チームは泣いていた。「次が最後のチャンスだ」",
    stat: "3回",
    statLabel: "連続失敗。全財産を賭けた、最後の1機",
    accentColor: CYAN,
  },
  {
    id: "ch1-solution",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction-risk.webp",
    text: "4回目——成功した。",
    subText: "人類は初めて、民間企業のロケットで宇宙に届いた。",
    badge: "SpaceX",
    stat: "138億年",
    statLabel: "宇宙の歴史。人類は今、初めて複数惑星への道を開いた",
    accentColor: CYAN,
  },

  {
    id: "ch1-data",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "ロケットを、\n回収して再使用する。",
    subText:
      "Falcon 9は同じブースターを20回以上再利用した記録を持つ。宇宙のコストが、劇的に下がった。",
    stat: "20回+",
    statLabel: "Falcon 9ブースターの最大再使用記録",
    accentColor: CYAN,
  },

  // ============================================================
  // CHAPTER 2 — 化石燃料への依存
  // ============================================================
  {
    id: "ch2-threat",
    type: "chapter-title",
    chapter: 2,
    imageUrl: "images/fossil-fuel.webp",
    text: "脅威 02",
    subText: "化石燃料への依存",
    accentColor: RED,
  },
  {
    id: "ch2-fear",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "毎年374億トン。",
    subText: "人類が大気に吐き出し続けるCO₂。この星を、ゆっくり殺している。",
    stat: "374億",
    statLabel: "トン/年 — 人類のCO₂排出量",
    accentColor: RED,
  },
  {
    id: "ch2-ev",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/ev-transition.webp",
    text: "ガソリン車を、EVに変える。",
    badge: "Tesla",
    stat: "4倍+",
    statLabel: "EVはガソリン車より4倍以上エネルギー効率が高い",
    accentColor: RED,
  },
  {
    id: "ch2-storage",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/energy-storage.webp",
    text: "次に、電気を貯める。",
    badge: "Tesla Energy",
    stat: "114%",
    statLabel: "2024年のTesla Energy出荷量は前年比114%増",
    accentColor: RED,
  },

  {
    id: "ch2-data",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "電気は、\n貯められるようになった。",
    subText:
      "Tesla Megapack 1基は、家庭1,000軒分の電力を蓄えられる。太陽光+蓄電池が電力網を変える。",
    stat: "1,000軒",
    statLabel: "Megapack 1基あたりの給電能力（一般家庭換算）",
    accentColor: RED,
  },

  // ============================================================
  // CHAPTER 3 — 知能の限界
  // ============================================================
  {
    id: "ch3-threat",
    type: "chapter-title",
    chapter: 3,
    imageUrl: "images/intelligence-limits.webp",
    text: "脅威 03",
    subText: "知能の限界",
    accentColor: PURPLE,
  },
  {
    id: "ch3-fear",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "5年以内に、\nAIは全人類を超える。",
    subText: "制御できない超知能は、人類最大のリスクになりうる。",
    accentColor: PURPLE,
  },
  {
    id: "ch3-drama",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "2015年。イーロンはOpenAIを共同設立した。",
    subText: "2018年、彼は去った。「安全に向き合っていない」",
    badge: "OpenAI → xAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-xai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "ならば、自ら作る。",
    subText: "「宇宙の本質を理解する」AIを。",
    badge: "xAI",
    stat: "200,000基",
    statLabel: "世界最大のAIスーパーコンピュータ「Colossus」のGPU数",
    accentColor: PURPLE,
  },
  {
    id: "ch3-neuralink",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/brain-interface.webp",
    text: "脳とAIを、直接つなぐ。",
    badge: "Neuralink",
    stat: "1,024ch",
    statLabel: "脳に埋め込むN1チップ — 思考でコンピュータを操作する",
    accentColor: PURPLE,
  },

  {
    id: "ch3-data",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "脳とコンピュータの\n接続が、始まった。",
    subText:
      "2024年1月、人類初のNeuralinkチップ移植が行われた。患者は今、思考だけでPCを操作している。",
    stat: "初",
    statLabel: "2024年1月 — 人類で初めてN1チップを脳に移植した患者の記録",
    accentColor: PURPLE,
  },

  // ============================================================
  // CHAPTER 4 — 人口・労働力の減少
  // ============================================================
  {
    id: "ch4-threat",
    type: "chapter-title",
    chapter: 4,
    imageUrl: "images/population-decline.webp",
    text: "脅威 04",
    subText: "人口・労働力の減少",
    accentColor: GREEN,
  },
  {
    id: "ch4-fear",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "韓国の出生率、0.75。",
    subText: "世界中で子どもが生まれなくなっている。働く人が、いなくなる。",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-robot.webp",
    text: "人間以外の労働力を作ればいい。",
    badge: "Tesla Optimus",
    stat: "$20,000〜",
    statLabel: "車より安い。24時間働ける。危険も退屈も引き受ける",
    accentColor: GREEN,
  },
  {
    id: "ch4-auto",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/autonomous-transport.webp",
    text: "運転手のいない物流。",
    badge: "Tesla",
    stat: "24時間",
    statLabel: "自律走行は止まらない。ドライバー不要の物流",
    accentColor: GREEN,
  },

  {
    id: "ch4-data",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "2030年代、工場では\nOptimusが働いている。",
    subText:
      "2024年末、TeslaはOptimus Gen2の工場試験を開始。長期目標は車より安い価格での量産。",
    stat: "$10,000",
    statLabel: "Optimusの長期目標価格 — 多くの国の月収以下",
    accentColor: GREEN,
  },

  // ============================================================
  // CHAPTER 5 — 移動の非効率
  // ============================================================
  {
    id: "ch5-threat",
    type: "chapter-title",
    chapter: 5,
    imageUrl: "images/mobility-inefficiency.webp",
    text: "脅威 05",
    subText: "人類の時間浪費",
    accentColor: WARM,
  },
  {
    id: "ch5-fear",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "アメリカ人は渋滞で、\n年間51時間を失っている。",
    subText: "渋滞は「移動の問題」ではない。人類の時間を奪う、静かな脅威だ。",
    stat: "51時間",
    statLabel: "アメリカ人が年間渋滞で失う時間 — INRIX 2023",
    accentColor: WARM,
  },
  {
    id: "ch5-boring",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/underground-network.webp",
    text: "地下に、もう一つの交通網を作る。",
    badge: "The Boring Company",
    stat: "1/10",
    statLabel: "トンネル掘削コストを従来の10分の1に",
    accentColor: WARM,
  },

  {
    id: "ch5-data",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "地下に作れば、\n信号も渋滞もない。",
    subText:
      "Las Vegas Convention Center Loopは従来の地下鉄の4分の1のコストで建設された。",
    stat: "1/4",
    statLabel: "Vegas Loopの建設コスト — 従来地下鉄との比較",
    accentColor: WARM,
  },

  // ============================================================
  // CHAPTER 6 — 情報と金融の断絶
  // ============================================================
  {
    id: "ch6-threat",
    type: "chapter-title",
    chapter: 6,
    imageUrl: "images/info-finance-gap.webp",
    text: "脅威 06",
    subText: "情報と金融の断絶",
    accentColor: TEXT,
  },
  {
    id: "ch6-fear",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "22億人が、まだ\nインターネットに繋がっていない。",
    subText: "13億人が、銀行口座を持てない。",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/global-connectivity.webp",
    text: "空から、世界を繋ぐ。",
    badge: "Starlink",
    stat: "9,400基+",
    statLabel: "軌道上の衛星が、地球のどこにでもネットを届ける",
    accentColor: TEXT,
  },
  {
    id: "ch6-x",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/free-speech-platform.webp",
    text: "検閲のない、声の広場を作る。",
    badge: "X",
    stat: "6億人",
    statLabel: "月間アクティブユーザー — 世界最大級の言論プラットフォーム",
    accentColor: TEXT,
  },

  {
    id: "ch6-data",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "いまも13億人が、\n銀行口座を持てずにいる。",
    subText:
      "スマートフォンがあれば、銀行はいらない。X Moneyは送金・支払い・貯蓄を一つのアプリに。",
    stat: "13億人",
    statLabel: "世界の金融サービスから取り残された人々 — X Moneyのターゲット",
    accentColor: TEXT,
  },

  // ============================================================
  // EPILOGUE
  // ============================================================
  {
    id: "epilogue-still",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon-portrait.webp",
    text: "この男は今も、急いでいる。",
    subText: "地球が終わる前に。意識の灯が消える前に。",
    accentColor: GOLD,
  },
  {
    id: "epilogue",
    type: "epilogue",
    chapter: null,
    imageUrl: "images/root.webp",
    text: "意識の灯を、消さないために。",
    elonQuote:
      "Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.",
    elonQuoteJp:
      "意識はとても稀で、貴重なものだ。意識の灯を守るために、できることは全てやるべきだ。",
    accentColor: GOLD,
  },
];
