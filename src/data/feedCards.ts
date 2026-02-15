export type FeedCardType = 'fact' | 'quote' | 'history' | 'news';

export interface TeslaFeedCardData {
  id: string;
  cardType: FeedCardType;
  icon: string;
  categoryLabel: string;
  title: string;
  body: string;
  highlight?: string;
  source?: string;
  relatedModule?: string;
}

export const teslaFeedCards: TeslaFeedCardData[] = [
  {
    id: 'fact-1',
    cardType: 'fact',
    icon: '📊',
    categoryLabel: 'テスラファクト',
    title: '時価総額 $1.1兆',
    body: 'テスラは世界で最も価値のある自動車メーカー。トヨタの約4倍の時価総額を持つ。',
    highlight: '$1.1兆',
    relatedModule: 'sec_filing',
  },
  {
    id: 'quote-1',
    cardType: 'quote',
    icon: '💬',
    categoryLabel: 'イーロン語録',
    title: '"我々はAIロボティクス企業だ"',
    body: '2024年Q4決算説明会でイーロン・マスクが宣言。テスラの本質はもはや自動車だけではない。',
    source: 'Q4 2024 Earnings Call',
    relatedModule: 'earnings_call',
  },
  {
    id: 'history-1',
    cardType: 'history',
    icon: '🏛️',
    categoryLabel: 'テスラ歴史',
    title: '2017: Model 3 生産地獄',
    body: '量産開始後、テスラは「生産地獄」に突入。イーロンは工場に寝泊まりし、週120時間働いた。この危機を乗り越えたことが今のテスラの強さの原点。',
    relatedModule: 'scenario',
  },
  {
    id: 'fact-2',
    cardType: 'fact',
    icon: '📊',
    categoryLabel: 'テスラファクト',
    title: 'エネルギー事業: 粗利30%超',
    body: 'Megapack（大型蓄電池）の粗利率が30%を超え、自動車事業を上回る。テスラの次の成長エンジン。',
    highlight: '30%超',
    relatedModule: 'segment',
  },
  {
    id: 'quote-2',
    cardType: 'quote',
    icon: '💬',
    categoryLabel: '投資家の知恵',
    title: '"能力の輪を知ることが最も重要"',
    body: '自分が何を知っていて、何を知らないかを理解すること。テスラ投資家にとって、これが最初の一歩。',
    source: 'ウォーレン・バフェット',
  },
  {
    id: 'news-1',
    cardType: 'news',
    icon: '📰',
    categoryLabel: 'EV市場',
    title: 'BYDがグローバル展開加速',
    body: 'BYDの2024年販売台数は380万台を突破。東南アジア・欧州で急拡大中。テスラの最大のライバル。',
    relatedModule: 'competitor',
  },
  {
    id: 'fact-3',
    cardType: 'fact',
    icon: '📊',
    categoryLabel: 'テスラファクト',
    title: 'FSD: 累計走行20億マイル',
    body: 'テスラのFull Self-Driving（完全自動運転）の累計走行距離が20億マイルを突破。データ量でWaymoを圧倒。',
    highlight: '20億マイル',
    relatedModule: 'sec_filing',
  },
  {
    id: 'history-2',
    cardType: 'history',
    icon: '🏛️',
    categoryLabel: 'テスラ歴史',
    title: '2020: S&P 500 採用',
    body: 'テスラがS&P 500に採用された日、株価は急騰。機関投資家の大量買いが始まり、テスラは「正統派」の投資先となった。',
  },
  {
    id: 'news-2',
    cardType: 'news',
    icon: '📰',
    categoryLabel: 'ロボタクシー',
    title: 'Cybercab: 2026年量産開始',
    body: 'テスラのロボタクシー「Cybercab」が2026年から量産開始予定。ハンドルもペダルもない完全自動運転車。',
    relatedModule: 'scenario',
  },
  {
    id: 'quote-3',
    cardType: 'quote',
    icon: '💬',
    categoryLabel: 'イーロン語録',
    title: '"Optimus は テスラ最大の事業になる"',
    body: 'ヒューマノイドロボット「Optimus」の市場規模は自動車を超える可能性。1台$20,000〜$25,000を目指す。',
    source: 'Q3 2024 Earnings Call',
    relatedModule: 'earnings_call',
  },
];
