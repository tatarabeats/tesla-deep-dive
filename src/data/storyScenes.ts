import type { StoryScene } from "../types/story";

// Accent palette
const GOLD = "rgba(255, 225, 140, 0.9)";
const CYAN = "rgba(80, 200, 255, 0.9)";
const RED = "rgba(255, 90, 80, 0.9)";
const PURPLE = "rgba(180, 130, 255, 0.9)";
const GREEN = "rgba(80, 220, 140, 0.9)";
const WARM = "rgba(200, 180, 150, 0.9)";
const TEXT = "rgba(232, 220, 200, 0.9)";

export const storyScenes: StoryScene[] = [
  // ============================================================
  //  PROLOGUE — 静寂から始まる
  // ============================================================
  {
    id: "prologue-silence",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "宇宙には、音がない。",
    subText:
      "138億年の歴史を持つこの空間の中で、\n「美しい」と感じる存在が生まれた星は——たった一つ。",
    accentColor: TEXT,
  },
  {
    id: "prologue-earth",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/root.webp",
    text: "この星だけが、意識を宿した。",
    subText:
      "だが地球は過去に5度、ほぼ全ての命を失っている。\n6度目が、いつ来るかは誰にも分からない。",
    accentColor: TEXT,
  },
  {
    id: "prologue-elon",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon_nebula.webp",
    text: "一人の男が、急いでいる。",
    subText:
      "地球が抱える6つの致命的な問題。\nその全てに、この男は会社を作って立ち向かった。",
    accentColor: GOLD,
  },
  {
    id: "prologue-thesis",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "6つの危機。6つの会社。\n1人の男の、命を賭けた確信。",
    subText: "これは、その物語だ。",
    stat: "6",
    statLabel: "つの事業が世界を変える",
    accentColor: GOLD,
  },

  // ============================================================
  //  CHAPTER 1 — この星が、最後の砦だ
  // ============================================================
  {
    id: "ch1-title",
    type: "chapter-title",
    chapter: 1,
    imageUrl: "images/single-planet.webp",
    text: "Chapter 1",
    subText: "この星が、最後の砦だ",
    accentColor: CYAN,
  },
  {
    id: "ch1-extinction-intro",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "地球には「大量絶滅」と\n呼ばれる歴史が、5回ある。",
    subText:
      "隕石の衝突。火山の大噴火。氷河期——\nそのたびに、地球上の生命はほぼ全滅した。\n「ほぼ」だ。完全には死に絶えなかった。\nだから今、私たちがここにいる。",
    accentColor: CYAN,
  },
  {
    id: "ch1-timeline",
    type: "timeline",
    chapter: 1,
    imageUrl: null,
    text: "5度の大量絶滅\n──地球上の全生物種の絶滅率──",
    subText: "6度目は、いつ来てもおかしくない。",
    accentColor: CYAN,
    timelineItems: [
      {
        icon: "\u2744\uFE0F",
        era: "オルドビス紀末",
        years: "4億4300万年前",
        cause: "急激な寒冷化で海が凍結",
        percent: 85,
      },
      {
        icon: "\uD83C\uDF0A",
        era: "デボン紀末",
        years: "3億7500万年前",
        cause: "海洋から酸素が消失",
        percent: 75,
      },
      {
        icon: "\uD83D\uDD25",
        era: "ペルム紀末（史上最悪）",
        years: "2億5100万年前",
        cause: "超大規模噴火で大気が汚染",
        percent: 96,
      },
      {
        icon: "\uD83C\uDF0B",
        era: "三畳紀末",
        years: "2億年前",
        cause: "火山活動で気候が激変",
        percent: 76,
      },
      {
        icon: "\u2604\uFE0F",
        era: "白亜紀末",
        years: "6600万年前",
        cause: "巨大隕石が衝突、恐竜が消えた",
        percent: 76,
      },
    ],
  },
  {
    id: "ch1-elon-reads",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon_nebula.webp",
    text: "2001年。\n31歳のイーロン・マスクは\n一冊の本に出会った。",
    subText:
      "ロバート・ズブリンの『The Case for Mars』。\n人類が火星に移住するための、具体的なロードマップだった。",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "NASAにはこの技術がある。\nなぜ、やらないんだ？",
        position: "right",
        delay: 0.8,
      },
      {
        text: "……コストだ。ロケットが使い捨てだから高すぎるんだ。\nなら、回収して再利用すればいい。",
        position: "left",
        delay: 1.6,
      },
    ],
  },
  {
    id: "ch1-cost",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "当時、1kgの荷物を宇宙に運ぶのに\n約100万円かかった。",
    subText:
      "飛行機に乗るような金額ではない。\n人間一人を宇宙に送るだけで数十億円。\nこれでは人類は永遠に地球を出られない。\n\nだがイーロンは「問題の正体」を見つけた。\nロケットを使い捨てにしているから高い。\n問題が分かれば——解決できる。",
    stat: "¥1,000,000",
    statLabel: "1kgを軌道に運ぶコスト（従来型ロケット）",
    accentColor: CYAN,
  },
  {
    id: "ch1-founded",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/single-planet.webp",
    text: "2002年。SpaceXを設立。",
    subText:
      "NASAの技術者たちは鼻で笑った。\n「民間企業にロケットが作れるわけがない。」\n航空宇宙業界の常識だった。",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  {
    id: "ch1-failures",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "2006年。初の打ち上げ。\nFalcon 1は——33秒で爆発した。",
    subText:
      "燃料漏れ。たった33秒の飛行で全てが終わった。\n\n2007年、2回目——また爆発。\n軌道にすら届かなかった。\n資金は底をつきかけていた。",
    stat: "33秒",
    statLabel: "Falcon 1初飛行。爆発までの時間",
    accentColor: CYAN,
  },
  {
    id: "ch1-crisis",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis.webp",
    text: "2008年。3回目——また、爆発した。",
    subText:
      "「チームは泣いていた。\n次のロケットが、本当に最後の1機だった。」",
    stat: "3回連続",
    statLabel: "打ち上げ失敗。残されたロケットは、あと1機",
    accentColor: CYAN,
  },
  {
    id: "ch1-darkest",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "同じ年、テスラも倒産寸前だった。",
    subText:
      "イーロンは後にこう語った。\n\n「最後の2000万ドルを、SpaceXとテスラに半分ずつ入れた。\n正直に言うと、両方潰れると思っていた。」",
    accentColor: CYAN,
  },
  {
    id: "ch1-success",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction-risk.webp",
    text: "2008年9月28日。\n4回目——成功した。",
    subText:
      "民間企業のロケットが、人類史上初めて軌道に到達した瞬間だった。\n翌年、NASAはSpaceXと16億ドルの契約を結んだ。",
    badge: "SpaceX",
    stat: "$1.6B",
    statLabel: "NASAとの契約額（約2400億円）。民間宇宙時代の幕開け",
    accentColor: CYAN,
  },
  {
    id: "ch1-reuse",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "そして「使い捨て」の常識を壊した。",
    subText:
      "Falcon 9は同じブースターを20回以上再利用した記録を持つ。\n打ち上げコストは従来の10分の1以下に。\n\n宇宙は、手の届く場所になり始めた。",
    stat: "20回+",
    statLabel: "Falcon 9ブースター最大再使用回数",
    accentColor: CYAN,
  },

  // ============================================================
  //  CHAPTER 2 — 空を、毒で埋めている
  // ============================================================
  {
    id: "ch2-title",
    type: "chapter-title",
    chapter: 2,
    imageUrl: "images/fossil-fuel.webp",
    text: "Chapter 2",
    subText: "空を、毒で埋めている",
    accentColor: RED,
  },
  {
    id: "ch2-co2",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "人類は毎年、大気に\n374億トンのCO\u2082を吐き出している。",
    subText:
      "数字が大きすぎてピンとこないだろう。\n東京スカイツリー約100万本分の重さだ。\n毎年それだけの毒を、私たちは空に撒いている。",
    stat: "374億トン",
    statLabel: "年間CO\u2082排出量（IEA 2023年報告）",
    accentColor: RED,
  },
  {
    id: "ch2-cars",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "原因はシンプルだ。\n世界の車の99%がガソリンで走っている。",
    subText:
      "世界に約15億台の自動車がある。\nそのほぼ全てが、化石燃料を燃やして走る。\n\n解決策も、シンプルだ。\n電気で走る車を作ればいい。",
    stat: "15億台",
    statLabel: "世界の自動車台数。ほぼ全てがガソリン車",
    accentColor: RED,
  },
  {
    id: "ch2-tesla-founding",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "2003年。\nマーティン・エバーハードが\nイーロンに話を持ちかけた。",
    subText:
      "「電気自動車を作りたい。でも資金がない。」\n\nイーロンの答えは即決だった。\n「やろう。出資する。」\n\nTeslaが生まれた。",
    accentColor: RED,
  },
  {
    id: "ch2-roadster",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/ev-transition.webp",
    text: "「EVはダサい」——\nRoadsterが、その常識を粉砕した。",
    subText:
      "0-100km/h 3.9秒。フェラーリより速い。\n航続距離394km。排気ガスはゼロ。\n自動車業界が初めて震えた瞬間だった。",
    badge: "Tesla",
    stat: "3.9秒",
    statLabel: "0\u2192100km/h加速。フェラーリを超えたEV",
    accentColor: RED,
  },
  {
    id: "ch2-laughed",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "だが業界は笑った。",
    subText:
      "「テスラ？おもちゃだよ。本物の車は作れない。」\n\u2500\u2500 大手自動車メーカー幹部、2008年\n\n「EVに未来はない。バッテリーが高すぎる。」\n\u2500\u2500 トヨタ幹部、2010年\n\n15年後の今、テスラの時価総額はトヨタの3倍を超えている。",
    accentColor: RED,
  },
  {
    id: "ch2-energy",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/energy-storage.webp",
    text: "車だけでは足りない。\n電気そのものを変える。",
    subText:
      "Tesla Megapackは工場、病院、街全体に電力を供給する巨大蓄電池だ。\n太陽光で昼に作った電気を、夜まで貯めておける。\n化石燃料の発電所が、いらなくなる。",
    badge: "Tesla Energy",
    stat: "3,900kWh",
    statLabel: "Megapack 1基の蓄電容量。一般家庭130軒分の1日の電力",
    accentColor: RED,
  },

  // ============================================================
  //  CHAPTER 3 — 人間より賢い「何か」が目覚める
  // ============================================================
  {
    id: "ch3-title",
    type: "chapter-title",
    chapter: 3,
    imageUrl: "images/intelligence-limits.webp",
    text: "Chapter 3",
    subText: "人間より賢い「何か」が目覚める",
    accentColor: PURPLE,
  },
  {
    id: "ch3-ai-rise",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "チェス。囲碁。画像認識。\nAIは静かに、一つずつ人間を超えてきた。",
    subText:
      "次に超えるのは「全ての知的作業」だ。\n論文を書き、法律を解釈し、新薬を設計する。\n\n問題は——\nそれが人類の味方である保証が、どこにもないことだ。",
    accentColor: PURPLE,
  },
  {
    id: "ch3-danger",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "核兵器を思い出してほしい。",
    subText:
      "技術そのものに善悪はない。\n使い方を誤れば、文明が終わる。\n\nイーロンは「制御できないAI」を\n人類最大のリスクだと考えた。\nだから自ら、安全なAIを作ろうとした。",
    accentColor: PURPLE,
  },
  {
    id: "ch3-openai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "2015年。OpenAIを設立。",
    subText:
      "イーロンとサム・アルトマンが共同で立ち上げた。\n「AIを特定の企業に独占させない。\n人類全体のために、安全に開発する。」\nシリコンバレーの最高頭脳が集まった。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-altman",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman_ai-grid.webp",
    text: "サム・アルトマン。\nスタートアップ界の天才発掘人。",
    subText:
      "元Yコンビネーター社長。\nAirbnb、Stripe、Dropbox——\n彼が育てたスタートアップは数知れない。\nその男が「人類史上最大の技術」を作る側に回った。",
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
      "「彼らは安全性より、能力の向上を優先し始めた。\n私が設立した理由と、真逆だ。」\n\n去り際に、こう言い残した。\n「OpenAIはいずれ完全な営利企業になる。\n安全性は看板だけになる。」",
    accentColor: PURPLE,
  },
  {
    id: "ch3-chatgpt",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "2022年末、ChatGPT公開。\nたった5日で100万ユーザーを突破した。",
    subText:
      "Netflixが100万ユーザーに達するまで3年半。\nInstagramでさえ2ヶ月半。\nChatGPTは——5日。\n\n世界が変わった瞬間だった。",
    stat: "5日",
    statLabel: "100万ユーザー到達。史上最速の記録",
    accentColor: PURPLE,
  },
  {
    id: "ch3-altman-fired",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman_boardroom.webp",
    text: "2023年11月。\nサム・アルトマンが突然、解雇された。",
    subText:
      "取締役会が「信頼を失った」と発表。理由は非公開。\n世界中が震撼した。\n\n4日後、社員700人が「サムが戻らなければ辞める」と署名。\nMicrosoftが圧力をかけ、サムは復帰した。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-openai-profit",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "その後、OpenAIは\n非営利から完全な営利法人へと移行した。",
    subText:
      "イーロンは静かに言った。\n\n「2018年に言ったことが、全部起きた。」",
    accentColor: PURPLE,
  },
  {
    id: "ch3-xai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development.webp",
    text: "ならば、自分で作る。",
    subText:
      "「宇宙の本質を理解するAI」を目指し、xAIを設立。\nNVIDIAのジェンセン・ファンにこう伝えた。\n「持っているGPUを、全部くれ。」",
    badge: "xAI",
    stat: "200,000基",
    statLabel: "Colossus — 世界最大AIスパコンのGPU数",
    accentColor: PURPLE,
  },
  {
    id: "ch3-jensen",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/jensen-huang_gpu-glow.webp",
    text: "ジェンセン・ファン。\n「AIの石油」を握る男。",
    subText:
      "ChatGPT、Grok、Gemini——\n世界中のAIがNVIDIAのGPUで動いている。\n彼のトレードマークの革ジャンは\nシリコンバレーの新しいシンボルになった。",
    badge: "NVIDIA",
    accentColor: PURPLE,
  },
  {
    id: "ch3-neuralink",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/brain-interface.webp",
    text: "さらにその先へ。\n脳とAIを、直接つなぐ。",
    subText:
      "AIがどれだけ賢くなっても、\n人間との接点が「画面とキーボード」のままでは遅すぎる。\nNeuralink N1チップは、脳に直接埋め込まれる。",
    badge: "Neuralink",
    stat: "1,024ch",
    statLabel: "N1チップの脳信号読み取りチャンネル数",
    accentColor: PURPLE,
  },
  {
    id: "ch3-patient",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/neuralink-patient.jpg",
    text: "2024年1月。\n人類初の脳チップ移植が行われた。",
    subText:
      "患者のノーランド・アーバフは今、\n思考だけでチェスを指し、文章を書き、PCを操作している。\n\nこれはSFではない。\nもう、起きている。",
    badge: "Neuralink",
    accentColor: PURPLE,
  },

  // ============================================================
  //  CHAPTER 4 — 誰が、働くのか
  // ============================================================
  {
    id: "ch4-title",
    type: "chapter-title",
    chapter: 4,
    imageUrl: "images/population-decline.webp",
    text: "Chapter 4",
    subText: "誰が、働くのか",
    accentColor: GREEN,
  },
  {
    id: "ch4-birthrate",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "韓国の出生率は0.75。\n人口を維持するには2.1が必要だ。",
    subText:
      "日本は1.20。中国は1.09。\n先進国だけではない。世界中で子どもが生まれなくなっている。\n\n介護する人。工場で働く人。トラックを運転する人。\n全てが、足りなくなる。",
    accentColor: GREEN,
  },
  {
    id: "ch4-japan",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "日本では今、介護を必要とする\n高齢者が4000万人を超えようとしている。",
    subText:
      "だが介護に従事できる人は約1000万人。\n圧倒的に足りない。そしてこのギャップは、毎年広がっていく。\n\n「もし、人間と同じように動けるロボットがいたら？」",
    stat: "4,000万人",
    statLabel: "日本の介護需要（厚生労働省推計）",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus-reveal",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-robot.webp",
    text: "2022年。\nイーロンはOptimus Gen1を発表した。",
    subText:
      "会場は笑いとため息が混じった。\nよちよち歩き。手を振るのがやっと。\n人間どころか、ルンバより遅い。\n「冗談だろ？」",
    badge: "Tesla Optimus",
    accentColor: GREEN,
  },
  {
    id: "ch4-progress",
    type: "text-only",
    chapter: 4,
    imageUrl: null,
    text: "2年後のGen2。\n誰も笑っていなかった。",
    subText:
      "工場でバッテリーを仕分け、ネジを締め、荷物を運ぶ。\n指の動きは人間と変わらない精度に達した。\n\n「おもちゃ」から「労働力」へ。わずか2年。",
    accentColor: GREEN,
  },
  {
    id: "ch4-vision",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-robot.webp",
    text: "人間が足りないなら、\n人間以外の労働力を作ればいい。",
    subText:
      "目標価格は1台2万ドル（約300万円）以下。\n24時間稼働。危険な仕事も、退屈な仕事も引き受ける。\n長期的には1万ドル以下——多くの国の平均年収より安くなる。",
    badge: "Tesla Optimus",
    stat: "$20,000",
    statLabel: "Optimus目標価格（約300万円）",
    accentColor: GREEN,
  },
  {
    id: "ch4-robotaxi",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/autonomous-transport.webp",
    text: "運転手のいない物流。",
    subText:
      "Teslaのロボタクシーは眠らない。休憩もとらない。\n人間のドライバーが働ける時間をはるかに超え、24時間走り続ける。\nドライバー不足の問題を、根本から消す。",
    badge: "Tesla",
    stat: "24h",
    statLabel: "自律走行車に「休憩時間」は存在しない",
    accentColor: GREEN,
  },

  // ============================================================
  //  CHAPTER 5 — 渋滞という名の殺人
  // ============================================================
  {
    id: "ch5-title",
    type: "chapter-title",
    chapter: 5,
    imageUrl: "images/mobility-inefficiency.webp",
    text: "Chapter 5",
    subText: "渋滞という名の、緩やかな殺人",
    accentColor: WARM,
  },
  {
    id: "ch5-traffic",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "アメリカ人は渋滞で\n年間51時間を失っている。",
    subText:
      "丸2日以上。毎年、全ての国民から奪われている。\n時間は命だ。渋滞は、人類の命をゆっくり削っている。",
    stat: "51時間/年",
    statLabel: "平均的アメリカ人が渋滞で失う時間（INRIX 2023）",
    accentColor: WARM,
  },
  {
    id: "ch5-tweet",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "2016年。\nイーロンはLAの渋滞にはまっていた。",
    subText:
      "その場でツイートした。\n\n「トンネル掘削機を作る会社を設立しようと思う。」\n\n世界中が笑った。ロケットの次はトンネルか、と。\n——だが、彼は本気だった。",
    accentColor: WARM,
  },
  {
    id: "ch5-boring",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/underground-network.webp",
    text: "地下に、もう一つの\n交通網を作る。",
    subText:
      "The Boring Companyはトンネル掘削コストを従来の10分の1にまで下げた。\nLas Vegas Loopは2021年に開通。\n片道わずか2.50ドル（約375円）。信号なし、渋滞なし。",
    badge: "The Boring Company",
    stat: "1/10",
    statLabel: "従来比のトンネル掘削コスト",
    accentColor: WARM,
  },
  {
    id: "ch5-future",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "建設コストは従来の地下鉄のわずか4分の1。",
    subText:
      "次はマイアミ。テキサス。そして東京も視野に入っている。\n\n地下に作れば、信号も渋滞も存在しない。\n奪われていた時間が、人々に戻る。",
    stat: "1/4",
    statLabel: "Vegas Loop建設コスト（従来地下鉄比）",
    accentColor: WARM,
  },

  // ============================================================
  //  CHAPTER 6 — つながれない22億人
  // ============================================================
  {
    id: "ch6-title",
    type: "chapter-title",
    chapter: 6,
    imageUrl: "images/info-finance-gap.webp",
    text: "Chapter 6",
    subText: "つながれない、22億人",
    accentColor: TEXT,
  },
  {
    id: "ch6-offline",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "22億人が、\nまだインターネットに繋がっていない。",
    subText:
      "アフリカの村。中央アジアの高原。太平洋の島々。\n地理的・経済的な理由で「情報」から切り離されている。\nさらに13億人が、銀行口座すら持てない。",
    accentColor: TEXT,
  },
  {
    id: "ch6-ukraine",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/global-connectivity.webp",
    text: "2022年2月。\nロシアがウクライナに侵攻した。",
    subText:
      "通信インフラが破壊された。\nウクライナのフェドロフ副首相は、\nTwitterでイーロンに直接DMを送った。\n\n「Starlinkを送ってくれ。」",
    badge: "Starlink",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink-response",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "12時間後。\nStarlinkの端末がウクライナに届いた。",
    subText:
      "政府の手続きなし。大使館を通す必要もなし。\nDMから、たった12時間。\n\nこれが「宇宙からのインターネット」の、本当の意味だった。",
    stat: "12時間",
    statLabel: "DM送信からStarlink端末到着まで",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/global-connectivity.webp",
    text: "空から、世界をつなぐ。",
    subText:
      "9,400基以上の衛星が、今この瞬間も地球を回っている。\n砂漠でも、海の上でも、紛争地帯でも。\n空さえ見えれば、インターネットが届く。",
    badge: "Starlink",
    stat: "9,400基+",
    statLabel: "軌道上の衛星数（2024年末時点）",
    accentColor: TEXT,
  },
  {
    id: "ch6-twitter",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "同じ年。イーロンはTwitterを\n440億ドルで買収した。",
    subText:
      "「なぜそんな金を使うのか？」\n世界中が首をかしげた。\n\n「言論の自由がなければ、民主主義は死ぬ。」\nそれが、彼の答えだった。",
    stat: "$44B",
    statLabel: "Twitter（現X）買収額（約6.6兆円）",
    accentColor: TEXT,
  },
  {
    id: "ch6-x",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/free-speech-platform.webp",
    text: "検閲のない声の広場。\nそして、全員の銀行。",
    subText:
      "月間6億人が使うプラットフォーム。\nX Moneyは送金・支払い・貯蓄を一つのアプリに統合する。\nスマートフォンがあれば、銀行口座はいらない。\n13億人が、世界経済に接続される。",
    badge: "X",
    stat: "6億人",
    statLabel: "X 月間アクティブユーザー",
    accentColor: TEXT,
  },

  // ============================================================
  //  EPILOGUE — 意識の灯
  // ============================================================
  {
    id: "epilogue-still",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon_mars.webp",
    text: "この男は、今も急いでいる。",
    subText:
      "地球が終わる前に。\n意識の灯が消える前に。\n彼にとっては全てが「間に合わないかもしれない」戦いだ。",
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
      "意識はとても稀で、貴重なものだ。\n意識の灯を守るために、できることは全てやるべきだ。",
    accentColor: GOLD,
  },
];
