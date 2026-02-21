import type { StoryScene } from '../types/story';

// Colors
const GOLD = 'rgba(255, 225, 140, 0.9)';
const CYAN = 'rgba(80, 200, 255, 0.9)';
const RED = 'rgba(255, 90, 80, 0.9)';
const PURPLE = 'rgba(180, 130, 255, 0.9)';
const GREEN = 'rgba(80, 220, 140, 0.9)';
const WARM = 'rgba(200, 180, 150, 0.9)';
const TEXT = 'rgba(232, 220, 200, 0.9)';

export const storyScenes: StoryScene[] = [
  // ============================================================
  // PROLOGUE — 感情をつかむ
  // ============================================================
  {
    id: 'open-1',
    type: 'text-only',
    chapter: null,
    imageUrl: null,
    text: '宇宙は暗い。',
    accentColor: TEXT,
  },
  {
    id: 'open-2',
    type: 'text-only',
    chapter: null,
    imageUrl: null,
    text: '138億年の歴史の中で、',
    subText: '知的生命が確認された惑星は——地球だけ。',
    accentColor: TEXT,
  },
  {
    id: 'open-3',
    type: 'text-only',
    chapter: null,
    imageUrl: null,
    text: 'その地球は今、\n6つの危機に瀕している。',
    accentColor: RED,
  },
  {
    id: 'open-thesis',
    type: 'image-hero',
    chapter: null,
    imageUrl: 'images/root.png',
    text: '1人の男が、全てに解を持っている。',
    subText: '意識を守り、広げる——',
    stat: '6',
    statLabel: 'つの脅威。6つの会社。1つの信念。',
    accentColor: GOLD,
  },

  // ============================================================
  // CHAPTER 1 — 単一惑星への依存
  // ============================================================
  {
    id: 'ch1-threat',
    type: 'chapter-title',
    chapter: 1,
    imageUrl: 'images/single-planet.png',
    text: '脅威 01',
    subText: '単一惑星への依存',
    accentColor: CYAN,
  },
  {
    id: 'ch1-fear',
    type: 'text-only',
    chapter: 1,
    imageUrl: null,
    text: '地球は過去5回、\nほぼ全ての生命を失った。',
    subText: '6回目がいつ来るかは、誰にも分からない。',
    accentColor: CYAN,
  },
  {
    id: 'ch1-bridge',
    type: 'text-only',
    chapter: 1,
    imageUrl: null,
    text: 'もし人類が地球にしかいなければ、\n全てが終わる。',
    subText: 'だから——',
    accentColor: CYAN,
  },
  {
    id: 'ch1-sol-spacex',
    type: 'image-hero',
    chapter: 1,
    imageUrl: 'images/extinction-risk.png',
    text: '人類を、2つ目の惑星に送る。',
    badge: 'SpaceX',
    stat: '138億年',
    statLabel: '知的生命が確認されたのは、この一つだけ',
    accentColor: CYAN,
  },
  {
    id: 'ch1-sol-starlink',
    type: 'image-hero',
    chapter: 1,
    imageUrl: 'images/starlink-connectivity.png',
    text: 'まず、地球全体を繋ぐ。',
    badge: 'Starlink',
    stat: '9,400基+',
    statLabel: '軌道上の衛星で、地球のどこにでもインターネットを',
    accentColor: CYAN,
  },

  // ============================================================
  // CHAPTER 2 — 化石燃料への依存
  // ============================================================
  {
    id: 'ch2-threat',
    type: 'chapter-title',
    chapter: 2,
    imageUrl: 'images/fossil-fuel.png',
    text: '脅威 02',
    subText: '化石燃料への依存',
    accentColor: RED,
  },
  {
    id: 'ch2-fear',
    type: 'text-only',
    chapter: 2,
    imageUrl: null,
    text: '毎年374億トン。',
    subText: '人類が大気に吐き出し続けるCO2。この星を、ゆっくり殺している。',
    stat: '374億',
    statLabel: 'トン/年',
    accentColor: RED,
  },
  {
    id: 'ch2-bridge',
    type: 'text-only',
    chapter: 2,
    imageUrl: null,
    text: '太陽は、人類の消費量の\n10,000倍のエネルギーを届けている。',
    subText: '問題は発電量じゃない。貯蔵と配電だ。',
    accentColor: RED,
  },
  {
    id: 'ch2-sol-ev',
    type: 'image-hero',
    chapter: 2,
    imageUrl: 'images/ev-transition.png',
    text: 'まず、走る車を電気に変える。',
    badge: 'Tesla',
    stat: '4.4倍',
    statLabel: 'EVはガソリン車より4.4倍エネルギー効率が高い',
    accentColor: RED,
  },
  {
    id: 'ch2-sol-storage',
    type: 'image-hero',
    chapter: 2,
    imageUrl: 'images/energy-storage.png',
    text: '次に、電気を貯める。',
    badge: 'Tesla Energy',
    stat: '114%',
    statLabel: '2024年のTesla Energy出荷量は前年比114%増',
    accentColor: RED,
  },
  {
    id: 'ch2-sol-solar',
    type: 'image-hero',
    chapter: 2,
    imageUrl: 'images/solar-generation.png',
    text: 'そして、太陽から直接もらう。',
    badge: 'Tesla Energy',
    stat: '10,000倍',
    statLabel: '太陽が地球に届けるエネルギーは、人類の消費の10,000倍',
    accentColor: RED,
  },
  {
    id: 'ch2-sol-mp3',
    type: 'image-hero',
    chapter: 2,
    imageUrl: 'images/master-plan-3.png',
    text: '地球全体を、持続可能エネルギーに移行する。',
    badge: 'Master Plan 3',
    stat: '240TWh',
    statLabel: '全世界を脱炭素に導くために必要な蓄電量',
    accentColor: RED,
  },

  // ============================================================
  // CHAPTER 3 — 知能の限界
  // ============================================================
  {
    id: 'ch3-threat',
    type: 'chapter-title',
    chapter: 3,
    imageUrl: 'images/intelligence-limits.png',
    text: '脅威 03',
    subText: '知能の限界',
    accentColor: PURPLE,
  },
  {
    id: 'ch3-fear',
    type: 'text-only',
    chapter: 3,
    imageUrl: null,
    text: '5年以内に、\nAIは全人類を超える。',
    subText: '人間の知能には、生物学的な上限がある。',
    accentColor: PURPLE,
  },
  {
    id: 'ch3-bridge',
    type: 'text-only',
    chapter: 3,
    imageUrl: null,
    text: '制御できない超知能は、\n人類にとって最大のリスクになりうる。',
    subText: 'だから、自ら作る。自ら融合する。',
    accentColor: PURPLE,
  },
  {
    id: 'ch3-sol-xai',
    type: 'image-hero',
    chapter: 3,
    imageUrl: 'images/ai-development.png',
    text: '「宇宙の本質を理解する」AIを作る。',
    badge: 'xAI',
    stat: '200,000基',
    statLabel: '世界最大のAIスーパーコンピュータ「Colossus」のGPU数',
    accentColor: PURPLE,
  },
  {
    id: 'ch3-sol-neuralink',
    type: 'image-hero',
    chapter: 3,
    imageUrl: 'images/brain-interface.png',
    text: '脳とAIを、直接つなぐ。',
    badge: 'Neuralink',
    stat: '1,024ch',
    statLabel: '脳に埋め込むN1チップ — 思考でコンピュータを操作する',
    accentColor: PURPLE,
  },

  // ============================================================
  // CHAPTER 4 — 人口・労働力の減少
  // ============================================================
  {
    id: 'ch4-threat',
    type: 'chapter-title',
    chapter: 4,
    imageUrl: 'images/population-decline.png',
    text: '脅威 04',
    subText: '人口・労働力の減少',
    accentColor: GREEN,
  },
  {
    id: 'ch4-fear',
    type: 'text-only',
    chapter: 4,
    imageUrl: null,
    text: '韓国の出生率、0.75。',
    subText: '世界中で子どもが生まれなくなっている。働く人が、いなくなる。',
    stat: '0.75',
    statLabel: '韓国の出生率 — 世界最低',
    accentColor: GREEN,
  },
  {
    id: 'ch4-bridge',
    type: 'text-only',
    chapter: 4,
    imageUrl: null,
    text: '労働力がなければ、\n経済も文明も止まる。',
    subText: 'なら、人間以外の労働力を作ればいい。',
    accentColor: GREEN,
  },
  {
    id: 'ch4-sol-optimus',
    type: 'image-hero',
    chapter: 4,
    imageUrl: 'images/optimus-robot.png',
    text: '汎用ヒューマノイドロボット。',
    badge: 'Tesla Optimus',
    stat: '$20,000〜',
    statLabel: '車より安い。24時間働ける。危険も退屈も引き受ける。',
    accentColor: GREEN,
  },
  {
    id: 'ch4-sol-auto',
    type: 'image-hero',
    chapter: 4,
    imageUrl: 'images/autonomous-transport.png',
    text: '運転手のいない物流。',
    badge: 'Tesla',
    stat: '16時間/日',
    statLabel: 'ロボタクシーは人間の2倍稼働する',
    accentColor: GREEN,
  },
  {
    id: 'ch4-sol-abundance',
    type: 'image-hero',
    chapter: 4,
    imageUrl: 'images/abundance-economy.png',
    text: 'その先にあるのは、豊かさの時代。',
    badge: '経済変革',
    stat: 'GDP 2倍',
    statLabel: 'ロボットが労働力不足を補い、経済が再び成長する',
    accentColor: GREEN,
  },

  // ============================================================
  // CHAPTER 5 — 移動の非効率
  // ============================================================
  {
    id: 'ch5-threat',
    type: 'chapter-title',
    chapter: 5,
    imageUrl: 'images/mobility-inefficiency.png',
    text: '脅威 05',
    subText: '移動の非効率',
    accentColor: WARM,
  },
  {
    id: 'ch5-fear',
    type: 'text-only',
    chapter: 5,
    imageUrl: null,
    text: '都市の平均速度は24km/h。',
    subText: '100年前の馬車と、ほとんど変わらない。',
    accentColor: WARM,
  },
  {
    id: 'ch5-sol-boring',
    type: 'image-hero',
    chapter: 5,
    imageUrl: 'images/underground-network.png',
    text: '地下に、もう一つの交通網を作る。',
    badge: 'The Boring Company',
    stat: '1/10',
    statLabel: 'トンネル掘削コストを従来の10分の1に',
    accentColor: WARM,
  },

  // ============================================================
  // CHAPTER 6 — 情報と金融の断絶
  // ============================================================
  {
    id: 'ch6-threat',
    type: 'chapter-title',
    chapter: 6,
    imageUrl: 'images/info-finance-gap.png',
    text: '脅威 06',
    subText: '情報と金融の断絶',
    accentColor: TEXT,
  },
  {
    id: 'ch6-fear',
    type: 'text-only',
    chapter: 6,
    imageUrl: null,
    text: '22億人が、まだ\nインターネットに繋がっていない。',
    subText: '13億人が、銀行口座を持てない。',
    accentColor: TEXT,
  },
  {
    id: 'ch6-solutions',
    type: 'multi',
    chapter: 6,
    imageUrl: null,
    text: '空から繋ぎ、声を届け、お金を届ける。',
    accentColor: TEXT,
    multiItems: [
      { imageUrl: 'images/global-connectivity.png', label: 'Starlink', stat: '9,400基+' },
      { imageUrl: 'images/free-speech-platform.png', label: 'X', stat: '6億人' },
      { imageUrl: 'images/financial-inclusion.png', label: 'X Money', stat: '13億人' },
    ],
  },

  // ============================================================
  // EPILOGUE
  // ============================================================
  {
    id: 'epilogue-bridge',
    type: 'text-only',
    chapter: null,
    imageUrl: null,
    text: '6つの脅威。\n6つの会社。',
    subText: '全ては、一つの信念から。',
    accentColor: GOLD,
  },
  {
    id: 'epilogue',
    type: 'epilogue',
    chapter: null,
    imageUrl: 'images/root.png',
    text: '意識の灯を、消さないために。',
    elonQuote: 'Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.',
    accentColor: GOLD,
  },
];
