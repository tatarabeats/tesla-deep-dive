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
    text: "5回。",
    subText:
      "地球は過去に5回、ほぼ全ての生命を失った。\nそれでも命は生き延び——38億年後、知性が生まれた。",
    accentColor: TEXT,
  },
  {
    id: "open-2",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "138億年の宇宙の歴史の中で、\n知的生命が確認された星は——地球だけ。",
    subText: "この奇跡のような命を、消してはいけない。",
    accentColor: TEXT,
  },
  {
    id: "open-elon",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon_nebula.webp",
    text: "この男は、急いでいる。",
    subText: "急がなければならない理由が、6つある。",
    accentColor: GOLD,
  },
  {
    id: "open-4",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "6つの脅威。\n6つの会社。\n1人の男の確信。",
    accentColor: GOLD,
  },
  {
    id: "open-thesis",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/root.webp",
    text: "これは、その物語だ。",
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
    type: "timeline",
    chapter: 1,
    imageUrl: null,
    text: "地球は過去5回、\nほぼ全ての生命を失った。",
    subText: "6回目がいつ来るかは——誰にも分からない。",
    accentColor: CYAN,
    timelineItems: [
      {
        icon: "\u2744\uFE0F",
        era: "オルドビシア末",
        years: "4億4300万年前",
        cause: "寒冷化",
        percent: 85,
      },
      {
        icon: "\uD83C\uDF0A",
        era: "デボン紀末",
        years: "3億7500万年前",
        cause: "海洋変動",
        percent: 75,
      },
      {
        icon: "\uD83D\uDD25",
        era: "ペルム紀末",
        years: "2億5100万年前",
        cause: "大量噴火",
        percent: 96,
      },
      {
        icon: "\uD83C\uDF0B",
        era: "三畳紀末",
        years: "2億年前",
        cause: "火山活動",
        percent: 76,
      },
      {
        icon: "\u2604\uFE0F",
        era: "白亜紀末",
        years: "6600万年前",
        cause: "隕石衝突",
        percent: 76,
      },
    ],
  },
  {
    id: "ch1-elon-reads",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon_nebula.webp",
    text: "2001年。\nイーロンは一冊の本を読んだ。",
    subText: "『The Case for Mars』——人類が火星に移住するためのロードマップ。",
    accentColor: CYAN,
    speechBubbles: [
      { text: "なぜNASAはこれをやらないのか？", position: "right", delay: 0.8 },
      {
        text: "問題はコストだ。ロケットを再利用すれば解決できる。",
        position: "left",
        delay: 1.4,
      },
    ],
  },
  {
    id: "ch1-cost-problem",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "宇宙へ行くコストは、\n1kgあたり約100万円。",
    subText:
      "これでは人類は永遠に地球を出られない。\nイーロンは「これはコストの問題だ」と確信した。\n問題が分かれば、解決できる。",
    stat: "¥1,000,000",
    statLabel: "1kgを宇宙に運ぶコスト（従来ロケット）",
    accentColor: CYAN,
  },
  {
    id: "ch1-founded",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/single-planet.webp",
    text: "2002年。SpaceX設立。",
    subText:
      "「民間ロケット会社が成功するわけがない」\nNASA関係者、航空宇宙業界、全員が笑った。",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  {
    id: "ch1-failure1",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "2006年、Falcon 1\n初打ち上げ——爆発。",
    subText: "エンジンの燃料漏れ。33秒で終わった。",
    stat: "33秒",
    statLabel: "初打ち上げ、爆発までの時間",
    accentColor: CYAN,
  },
  {
    id: "ch1-failure2",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "2007年、2回目——\nまた爆発。",
    subText: "軌道に届かなかった。\n資金は底をつきかけていた。",
    accentColor: CYAN,
  },
  {
    id: "ch1-crisis",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis.webp",
    text: "2008年。3回目——爆発。",
    subText: "「チームは泣いていた。次が本当に最後の1機だ。」",
    stat: "3回",
    statLabel: "連続失敗。全財産を賭けた、最後の挑戦",
    accentColor: CYAN,
  },
  {
    id: "ch1-darkest",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "同じ年。\nテスラも倒産寸前だった。",
    subText:
      "イーロンはこう語った。\n\n「最後の2000万ドルをSpaceXとテスラに半分ずつ入れた。両方潰れると思っていた。」",
    accentColor: CYAN,
  },
  {
    id: "ch1-solution",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction-risk.webp",
    text: "2008年9月28日。\n4回目——成功した。",
    subText:
      "人類史上初めて、民間企業のロケットが軌道に到達した。\nNASAは翌年、SpaceXと16億ドルの契約を結んだ。",
    badge: "SpaceX",
    stat: "$1.6B",
    statLabel: "NASAとの契約額（約2400億円）。民間宇宙時代の幕開け",
    accentColor: CYAN,
  },
  {
    id: "ch1-data",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "ロケットを、\n回収して再使用する。",
    subText:
      "Falcon 9は同じブースターを20回以上再利用した記録を持つ。\n打ち上げコストは従来の10分の1以下になった。",
    stat: "20回+",
    statLabel: "Falcon 9ブースターの最大再使用記録（SpaceX公式）",
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
    text: "毎年、人類は大気に\n毒を撒き続けている。",
    subText: "CO₂排出量、年間374億トン。\nこの星を、ゆっくり殺している。",
    stat: "374億",
    statLabel: "トン/年 — 世界のCO₂排出量（IEA 2023）",
    accentColor: RED,
  },
  {
    id: "ch2-gasoline",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "問題はシンプルだ。\n車がガソリンで動いている。",
    subText:
      "世界に約15億台の自動車。\nその99%が化石燃料で走っている。\n\n解決策も、シンプルだ。",
    stat: "15億台",
    statLabel: "世界の自動車台数。ほぼ全てがガソリン車",
    accentColor: RED,
  },
  {
    id: "ch2-eberhard",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "2003年。\nマーティン・エバーハードが\nTeslaを設立した。",
    subText:
      "「EVを作りたいが、資金がない。」\nイーロンに話を持ち込んだ。\n\n「やろう。俺が出資する。」",
    accentColor: RED,
  },
  {
    id: "ch2-ev",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/ev-transition.webp",
    text: "2006年、Roadster発表。\n「EVはダサい」が覆された。",
    subText:
      "0-100km/h 3.9秒。航続距離394km。\nスポーツカーとしても世界トップクラス。\n自動車業界は初めて震えた。",
    badge: "Tesla",
    stat: "3.9秒",
    statLabel: "0→100km/h。フェラーリより速いEV",
    accentColor: RED,
  },
  {
    id: "ch2-industry-laughs",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "でも業界の反応は——",
    subText:
      "「テスラ？玩具だ。本物の車は作れない。」\n— 大手自動車メーカー幹部、2008年\n\n「EVに未来はない。バッテリーのコストが高すぎる。」\n— トヨタ幹部、2010年",
    accentColor: RED,
  },
  {
    id: "ch2-storage",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/energy-storage.webp",
    text: "車だけじゃない。\n電気を貯める。",
    subText:
      "Megapackは工場・病院・街全体に電力を供給する。\n太陽光と組み合わせれば、化石燃料は不要になる。",
    badge: "Tesla Energy",
    stat: "114%",
    statLabel: "2024年のTesla Energy出荷量、前年比（Tesla決算報告）",
    accentColor: RED,
  },
  {
    id: "ch2-data",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "電気は、\n貯められるようになった。",
    subText:
      "Tesla Megapack 1基の蓄電容量は3,900kWh。\n一般家庭の1日の消費（約29kWh）換算で、約130軒分を一晩賄える。\n太陽光+蓄電池が電力網を変える。",
    stat: "3,900",
    statLabel: "kWh — Megapack 2XL 1基の蓄電容量（Tesla仕様書）",
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
    text: "人工知能は今、\n人類の限界を超えようとしている。",
    subText:
      "チェス、囲碁、画像認識——AIは次々と人間を超えた。\n次は「全ての知的作業」だ。",
    accentColor: PURPLE,
  },
  {
    id: "ch3-danger",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "問題は「賢すぎるAI」が\n人類の制御を離れることだ。",
    subText:
      "核爆弾と同じだ。使い方次第で、文明を終わらせる。\nイーロンはこれを、人類最大のリスクだと考えた。",
    accentColor: PURPLE,
  },
  {
    id: "ch3-openai-founding",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "2015年。\nイーロンとサム・アルトマンが\nOpenAIを共同設立した。",
    subText:
      "「AIを特定の企業が独占させてはいけない。\n人類のために、安全に開発する。」\nシリコンバレーの最高頭脳が集まった。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-altman",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman_ai-grid.webp",
    text: "サム・アルトマン。",
    subText:
      "OpenAI CEO。元Yコンビネーター社長。\n「スタートアップ界の天才発掘人」が、\n今度は「人類最大の技術」を作ることになった。",
    badge: "Sam Altman",
    accentColor: PURPLE,
  },
  {
    id: "ch3-split",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "2018年。\nイーロンはOpenAIを去った。",
    subText:
      "「彼らは安全性より能力の向上を優先し始めた。\n私が設立した理由と真逆だ。」\n\nイーロンは去り際に言った。\n「OpenAIはいずれ、完全な営利企業になる。安全性は看板だけになる。そうなる。」",
    accentColor: PURPLE,
  },
  {
    id: "ch3-chatgpt-shock",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "ChatGPT公開。\n5日で100万ユーザー。",
    subText:
      "Netflixは3.5年かかった。\nInstagramは2.5ヶ月かかった。\nChatGPTは——5日。\n\n世界が変わった瞬間だった。",
    stat: "5日",
    statLabel: "ChatGPTが100万ユーザーに到達するまで（OpenAI発表、2022年）",
    accentColor: PURPLE,
  },
  {
    id: "ch3-altman-drama",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman_boardroom.webp",
    text: "2023年11月。\nサム・アルトマンが\n突然解雇された。",
    subText:
      "取締役会が「信頼を失った」と発表。\n理由は非公開。世界が震撼した。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-altman-returns",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "4日後。\n700人の社員が\n「辞める」と署名した。",
    subText:
      "Microsoftと主要投資家が圧力をかけた。\nサムは復帰した。その後OpenAIは非営利から完全営利法人へ移行。\n\nイーロンは言った。「2018年に言っていたことが、全部起きた。」",
    accentColor: PURPLE,
  },
  {
    id: "ch3-xai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "ならば、自ら作る。",
    subText:
      "「宇宙の本質を理解する」AIを。\nxAIはNVIDIAのジェンセン・ファンに言った。\n「持っているGPUを全部くれ。」",
    badge: "xAI",
    stat: "200,000基",
    statLabel: "Colossus — 世界最大AIスーパーコンピュータのGPU数（xAI発表）",
    accentColor: PURPLE,
  },
  {
    id: "ch3-jensen",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/jensen-huang_gpu-glow.webp",
    text: "ジェンセン・ファン（黄仁勳）。\n世界で最も重要な男の一人。",
    subText:
      "ChatGPT、Grok、Gemini——\n全てのAIがNVIDIAのGPUで動く。\n「AIの石油」を握る男。\n革ジャンは、シリコンバレーの新シンボルになった。",
    badge: "NVIDIA",
    accentColor: PURPLE,
  },
  {
    id: "ch3-neuralink",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/brain-interface.webp",
    text: "さらに先へ。\n脳とAIを、直接つなぐ。",
    subText:
      "AIが賢くなっても、人間との接点が「画面」のままでは遅すぎる。\nNeuralink N1チップは、脳に直接埋め込まれる。",
    badge: "Neuralink",
    stat: "1,024ch",
    statLabel: "N1チップの読み取りチャンネル数（Neuralink発表）",
    accentColor: PURPLE,
  },
  {
    id: "ch3-data",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/neuralink-patient.jpg",
    text: "2024年1月。\n人類初のチップ移植が行われた。",
    subText:
      "患者のノーランド・アーバフは今、\n思考だけでチェスをし、文章を書き、PCを操作している。\n\nこれはSFではない。もう起きている。",
    badge: "Neuralink",
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
    subText:
      "世界中で子どもが生まれなくなっている。\n2100年には世界人口が減少に転じる予測もある。\n働く人が、いなくなる。",
    accentColor: GREEN,
  },
  {
    id: "ch4-japan",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "日本では今、\n約1000万人が介護に従事している。",
    subText:
      "しかし介護が必要な高齢者は4000万人を超えようとしている。\n\n「もし人間と同じように動けるロボットがいたら？」",
    stat: "4,000万人",
    statLabel: "日本の介護需要（厚生労働省推計）— 人手が圧倒的に足りない",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus-reveal",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-robot.webp",
    text: "2022年。\nイーロンはOptimus Gen1を発表した。",
    subText:
      "会場は笑いとため息が混ざった。\nよちよち歩き。人間どころかルンバより遅い。\n「冗談か？」",
    badge: "Tesla Optimus",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus-progress",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "2024年。Gen2。",
    subText:
      "工場でバッテリーを仕分け、ネジを締め、荷物を運ぶ。\n指の動きは人間と変わらない。\n\n2年で、ここまで来た。",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-robot.webp",
    text: "人間以外の労働力を作ればいい。",
    subText:
      "目標価格は$20,000（約300万円）以下。\n「車より安くする。24時間働ける。\n危険な仕事も、退屈な仕事も、全部引き受ける。」",
    badge: "Tesla Optimus",
    stat: "$20,000",
    statLabel: "目標価格（約300万円）。多くの新興国の年収以下",
    accentColor: GREEN,
  },
  {
    id: "ch4-auto",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/autonomous-transport.webp",
    text: "運転手のいない物流。",
    subText:
      "Teslaのロボタクシーは眠らない。休憩もない。\n人間のドライバーが働く時間を超えて、24時間稼働する。",
    badge: "Tesla",
    stat: "24時間",
    statLabel: "自律走行は止まらない。ドライバー不要の物流（Tesla FSD実績）",
    accentColor: GREEN,
  },
  {
    id: "ch4-data",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "2030年代、工場では\nOptimusが働いている。",
    subText:
      "長期目標価格は$10,000（約150万円）以下。\n多くの新興国の年収以下で「人間と同等の労働力」が手に入る。\n\nこれは労働の再定義だ。",
    stat: "$10,000",
    statLabel: "Optimusの長期目標価格（約150万円）— Elon Musk発言",
    accentColor: GREEN,
  },

  // ============================================================
  // CHAPTER 5 — 人類の時間浪費
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
    subText:
      "毎日1時間以上、渋滞の中で過ごすことと同じだ。\n渋滞は、人類の命をゆっくり奪っている。",
    stat: "51時間",
    statLabel:
      "アメリカ人が年間渋滞で失う時間（INRIX Global Traffic Scorecard 2023）",
    accentColor: WARM,
  },
  {
    id: "ch5-tweet",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "2016年。\nイーロンはLAの渋滞にはまった。",
    subText:
      "その瞬間、ツイートした。\n\n「私はトンネル掘削機を作る会社を設立しようと思っている。」\n\n誰もが笑った。",
    accentColor: WARM,
  },
  {
    id: "ch5-boring",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/underground-network.webp",
    text: "地下に、もう一つの交通網を作る。",
    subText:
      "The Boring Companyはトンネル掘削コストを従来の10分の1に下げた。\nLas Vegas Convention Center Loopは2021年に開通。\n片道$2.50（約375円）。渋滞なし。",
    badge: "The Boring Company",
    stat: "1/10",
    statLabel: "トンネル掘削コスト（従来比）— The Boring Company発表",
    accentColor: WARM,
  },
  {
    id: "ch5-data",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "地下に作れば、\n信号も渋滞もない。",
    subText:
      "Las Vegas Loopは従来地下鉄の4分の1のコストで建設された。\n次はマイアミ、テキサス、そして東京へ。",
    stat: "1/4",
    statLabel:
      "Vegas Loopの建設コスト — 従来地下鉄との比較（The Boring Company）",
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
    subText:
      "アフリカ、中央アジア、太平洋の島々。\n地理的・経済的な理由で、「情報」から切り離されている。\n13億人が、銀行口座を持てない。",
    accentColor: TEXT,
  },
  {
    id: "ch6-ukraine",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/global-connectivity.webp",
    text: "2022年2月。\nロシアがウクライナに侵攻した。",
    subText:
      "通信インフラが破壊された。\nウクライナのミハイロ・フェドロフ副首相は、\nツイッターでイーロンに直接DMを送った。",
    badge: "Starlink",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink-response",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "12時間後。\nStarlinkの端末が\nウクライナに届いた。",
    subText:
      "政府の手続きなし。大使館なし。\nツイートからたった12時間。\n\nこれが「宇宙からのインターネット」の本当の意味だ。",
    stat: "12時間",
    statLabel: "DM送信からStarlink端末到着まで（フェドロフ副首相の証言）",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/global-connectivity.webp",
    text: "空から、世界を繋ぐ。",
    subText:
      "9,400基以上の衛星が軌道上を回っている。\n砂漠でも、海の上でも、紛争地帯でも。\n電波が届く場所に、インターネットが届く。",
    badge: "Starlink",
    stat: "9,400基+",
    statLabel: "軌道上の衛星数（SpaceX、2024年末時点）",
    accentColor: TEXT,
  },
  {
    id: "ch6-twitter-why",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "2022年。\nイーロンはTwitterを\n440億ドルで買収した。",
    subText:
      "「なぜそんな金を使うのか？」\n世界中が疑問を持った。\n\n彼の答えは「言論の自由がないと、民主主義は死ぬ」だった。",
    stat: "$44B",
    statLabel: "Twitter（現X）の買収額（約6.6兆円）— 2022年10月",
    accentColor: TEXT,
  },
  {
    id: "ch6-x",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/free-speech-platform.webp",
    text: "検閲のない、声の広場を作る。",
    subText:
      "月間アクティブユーザー6億人。\nX Moneyは2025年初頭にテキサスで正式ローンチ。\n送金・支払い・貯蓄を一つのアプリに。",
    badge: "X",
    stat: "6億人",
    statLabel: "月間アクティブユーザー（X社発表、2024年）",
    accentColor: TEXT,
  },
  {
    id: "ch6-data",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "いまも13億人が、\n銀行口座を持てずにいる。",
    subText:
      "スマートフォンがあれば、銀行はいらない。\nX Moneyが「金融から排除された人々」を世界経済に接続する。",
    stat: "13億人",
    statLabel: "世界の金融サービスから取り残された人々（World Bank 2021）",
    accentColor: TEXT,
  },

  // ============================================================
  // EPILOGUE
  // ============================================================
  {
    id: "epilogue-still",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon_mars.webp",
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
