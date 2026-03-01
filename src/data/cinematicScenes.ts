import type { CinematicScene } from "../types/cinematic";

// ── Elon portraits ──
const ELON = "images/elon-avatar.webp";
const ELON_A = "images/elon-real.jpg";
const ELON_B = "images/elon-celebration.webp";
const ELON_C = "images/elon-photo-3.webp";
// ELON_D reserved for future use
const ELON_E = "images/elon-photo-5.webp";
const ELON_F = "images/elon-photo-6.webp";

// ── Colors ──
const GOLD = "rgba(255, 225, 140, 0.9)";
const FIRE = "rgba(255, 100, 30, 0.95)";
const CYAN = "rgba(80, 200, 255, 0.9)";
const RED = "rgba(255, 90, 80, 0.9)";
const PURPLE = "rgba(180, 130, 255, 0.9)";
const GREEN = "rgba(80, 220, 140, 0.9)";
const WARM = "rgba(200, 180, 150, 0.9)";
const TEXT = "rgba(232, 220, 200, 0.9)";

export const cinematicScenes: CinematicScene[] = [
  // ════════════════════════════════════════
  //  PROLOGUE (2 scenes)
  // ════════════════════════════════════════
  {
    id: "prologue-crisis",
    type: "hero-statement",
    chapter: null,
    text: "今、地球には\n6つの危機がある。",
    accentColor: FIRE,
    textColor: "#ffffff",
    glitchHighlight: "6",
  },
  {
    id: "prologue-thesis",
    type: "hero-statement",
    chapter: null,
    imageUrl: ELON_A,
    text: "6つの危機。6つの会社。\n1人の男の物語。",
    subText: "たった一人で、全部解決しようとしている男がいる。",
    accentColor: GOLD,
    textColor: "#ffffff",
  },

  // ════════════════════════════════════════
  //  危機 01 — 単一惑星への依存 (6 scenes)
  // ════════════════════════════════════════
  {
    id: "ch1-title",
    type: "chapter-gate",
    chapter: 1,
    chapterNum: "危機 01",
    text: "人類が地球にしか住んでいないこと",
    imageUrl: "images/earth-blue-marble.webp",
    accentColor: CYAN,
  },
  {
    id: "ch1-extinction",
    type: "sticky-sequence",
    chapter: 1,
    accentColor: CYAN,
    scrollHeight: "500vh",
    beats: [
      {
        imageUrl: "images/extinction_ordovician.webp",
        text: "1回目。海が凍りついた。",
        subText:
          "4億4300万年前。地球全体が氷の時代に入り、海の生き物の85%が死んだ。",
      },
      {
        imageUrl: "images/extinction_devonian.webp",
        text: "2回目。海から酸素が消えた。",
        subText:
          "3億7500万年前。海の中の酸素がなくなり、魚を含む75%の生き物が死んだ。",
      },
      {
        imageUrl: "images/extinction_permian.webp",
        text: "3回目。地球の歴史で最悪の日。",
        subText:
          "2億5100万年前。火山の大噴火で地球が灼熱の星になった。生き物の96%が死んだ。",
        stat: "96%",
        statLabel: "が絶滅。地球史上最大の悲劇",
      },
      {
        imageUrl: "images/extinction_triassic.webp",
        text: "4回目。火山が気候を壊した。",
        subText:
          "2億年前。超大陸が割れ始め、あちこちで火山が噴火。生き物の76%が死んだ。",
      },
      {
        imageUrl: "images/extinction-cretaceous-real.webp",
        text: "5回目。巨大な隕石が落ちてきた。",
        subText:
          "6600万年前。直径10kmの岩が地球に激突。恐竜を含む76%の生き物が死んだ。",
      },
    ],
  },
  {
    id: "ch1-spacex-origin",
    type: "sticky-sequence",
    chapter: 1,
    accentColor: CYAN,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: ELON_E,
        text: "",
        speechBubble: {
          text: "6回目はいつ来てもおかしくない。だから人類は別の星にも住めるようにしておくべきだ。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
      {
        imageUrl: "images/case-for-mars-book.webp",
        text: "2001年。イーロンは一冊の本に出会った。",
        subText:
          "『The Case for Mars』（火星移住計画）。今の技術でも、工夫すれば火星に人が住めることを具体的に書いた本だった。",
      },
      {
        imageUrl: "images/elon-russia-meeting.webp",
        text: "まず中古のロケットを買おうとした。",
        subText:
          "2001年、ロシアに飛んだ。「ロケットを3基、31億円で売ってくれ」。でもロシア側は「こいつは素人だ」と鼻で笑って、相手にしなかった。",
      },
      {
        imageUrl: "images/falcon1-warehouse.webp",
        text: "2002年。SpaceX設立。",
        subText:
          "カリフォルニアの小さな倉庫に、たった30人が集まった。「自分たちでロケットを作る」という、とんでもない挑戦が始まった。",
      },
    ],
  },
  {
    id: "ch1-failures",
    type: "sticky-sequence",
    chapter: 1,
    accentColor: CYAN,
    scrollHeight: "500vh",
    beats: [
      {
        imageUrl: "images/falcon1-flight1.webp",
        text: "Falcon 1、1回目 — 失敗。",
        subText:
          "2006年3月。打ち上げてたった33秒で、燃料パイプの錆が原因で爆発した。",
      },
      {
        imageUrl: "images/falcon1-flight2.webp",
        text: "2回目 — 失敗。",
        subText:
          "2007年3月。高度289kmまで飛んだが、機体のバランスが崩れて制御できなくなった。",
      },
      {
        imageUrl: "images/falcon1-flight3.webp",
        text: "3回目 — 失敗。",
        subText:
          "2008年8月。ロケットの上半分と下半分が分離する瞬間にぶつかってしまった。全てが砕け散った。",
      },
      {
        imageUrl: "images/elon-photo-20.webp",
        text: "",
        speechBubble: {
          text: "これが最後のチャンスだ。失敗したら、全てが終わる。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
        subText:
          "残りのお金で打ち上げられるのは、あと1回。同時に経営していた電気自動車の会社テスラも、潰れる寸前だった。",
      },
      {
        imageUrl: "images/falcon1-flight4.webp",
        text: "4回目の打ち上げ。",
        subText: "2008年9月28日。SpaceXの全てをかけた最後のチャンス。",
      },
    ],
  },
  {
    id: "ch1-success",
    type: "climax",
    chapter: 1,
    imageUrl: ELON_B,
    text: "成功。",
    subText:
      "国でもなく、軍でもなく、たった1つの民間企業がロケットを宇宙に届けた。人類史上初めてのことだった。",
    accentColor: GOLD,
  },
  {
    id: "ch1-aftermath",
    type: "sticky-sequence",
    chapter: 1,
    accentColor: CYAN,
    scrollHeight: "300vh",
    beats: [
      {
        text: "3ヶ月後、NASAから電話が来た。",
        subText:
          "「宇宙ステーションに荷物を届けてくれないか」。12回分の輸送契約。金額は約2,400億円。",
        stat: "$1.6B",
        statLabel: "NASAとの契約額（約2,400億円）",
      },
      {
        imageUrl: "images/falcon9-landing-hq.webp",
        text: "でもイーロンの夢はもっと先にあった。",
        subText:
          "ロケットを着陸させて、もう一度飛ばす。飛行機を毎回壊す人は誰もいない。ロケットだって同じだ。そして本当にそれを実現した。",
        stat: "20回+",
        statLabel: "同じロケットの飛行回数",
      },
      {
        imageUrl: "images/elon-photo-12.webp",
        text: "",
        speechBubble: {
          text: "火星への片道切符を、誰でも買える値段にする。それがSpaceXのゴールだ。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
    ],
  },

  // ════════════════════════════════════════
  //  BRIDGE 1→2
  // ════════════════════════════════════════
  {
    id: "bridge-1-2",
    type: "bridge",
    chapter: null,
    imageUrl: "images/elon-photo-17.webp",
    accentColor: TEXT,
    speechBubble: {
      text: "宇宙への道は開けた。でも地球にも、今すぐ何とかしないといけない問題がある。",
      speaker: ELON,
      speakerName: "Elon Musk",
      emphasis: "quiet",
    },
  },

  // ════════════════════════════════════════
  //  危機 02 — 化石燃料への依存 (4 scenes)
  // ════════════════════════════════════════
  {
    id: "ch2-title",
    type: "chapter-gate",
    chapter: 2,
    chapterNum: "危機 02",
    text: "石油と石炭に頼りすぎていること",
    imageUrl: "images/fossil-fuel-real.webp",
    accentColor: RED,
  },
  {
    id: "ch2-problem-and-founding",
    type: "sticky-sequence",
    chapter: 2,
    accentColor: RED,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: "images/co2-factory-real.webp",
        text: "地球がどんどん暑くなっている。",
        subText:
          "石油や石炭を燃やすとCO₂（二酸化炭素）が出る。このガスが地球を毛布のように包んで、温度を上げている。",
        stat: "374億トン",
        statLabel: "毎年のCO₂排出量",
      },
      {
        imageUrl: "images/elon-photo-7.webp",
        text: "",
        speechBubble: {
          text: "CO₂を一番出してるのは車だ。だったら世界一カッコいい電気自動車を作ればいい。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
      {
        imageUrl: "images/elon-photo-10.webp",
        text: "2004年。小さな電気自動車の会社に出会った。",
        subText:
          "2人のエンジニアが作った「テスラ・モーターズ」。イーロンは約10億円を出して、最大の出資者になった。",
        speechBubble: {
          text: "電気自動車がダサいから売れないんだ。フェラーリより速い電気自動車を作ろう。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
    ],
  },
  {
    id: "ch2-roadster-and-criticism",
    type: "side-by-side",
    chapter: 2,
    accentColor: RED,
    sideImage: "images/tesla-roadster-real.webp",
    sidePanels: [
      {
        text: "Tesla Roadster。常識をぶち壊した。",
        subText: "ゼロから時速100kmまで、たったの——",
        stat: "3.9秒",
        statLabel: "0→100km/h 加速タイム",
        badge: "Tesla",
      },
      {
        text: "でも、こんな反論もあった。",
        subText:
          "「バッテリーを作るとき大量のCO₂が出るだろ？結局エコじゃないんじゃないか？」答えはデータにある。約1.7万km走った時点で逆転する。車の一生で比べると——",
        stat: "73%削減",
        statLabel: "ガソリン車と比べたCO₂（ICCT調べ）",
      },
    ],
  },
  {
    id: "ch2-energy-storage",
    type: "full-bleed-stat",
    chapter: 2,
    imageUrl: "images/megapack-aerial.webp",
    text: "街ひとつ分の電気を貯められる巨大バッテリー。",
    subText:
      "「Megapack（メガパック）」。昼に太陽光で貯めて、夜に使う。オーストラリアではガス発電所をまるごと置き換えた。",
    stat: "3,900kWh",
    statLabel: "Megapack 1台の蓄電量",
    badge: "Tesla Energy",
    accentColor: RED,
  },

  // ════════════════════════════════════════
  //  BRIDGE 2→3
  // ════════════════════════════════════════
  {
    id: "bridge-2-3",
    type: "bridge",
    chapter: null,
    imageUrl: "images/elon-photo-19.webp",
    accentColor: TEXT,
    speechBubble: {
      text: "エネルギーの問題は見えた。でももっと恐ろしいものがある。人間が生み出す「知能」そのものだ。",
      speaker: ELON,
      speakerName: "Elon Musk",
      emphasis: "quiet",
    },
  },

  // ════════════════════════════════════════
  //  危機 03 — 制御できないAI (5 scenes)
  // ════════════════════════════════════════
  {
    id: "ch3-title",
    type: "chapter-gate",
    chapter: 3,
    chapterNum: "危機 03",
    text: "AIを誰もコントロールできなくなること",
    imageUrl: "images/openai-real.webp",
    accentColor: PURPLE,
  },
  {
    id: "ch3-openai-founding",
    type: "sticky-sequence",
    chapter: 3,
    accentColor: PURPLE,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: ELON_F,
        text: "",
        speechBubble: {
          text: "AIは人類にとって最大の脅威になりうる。核兵器よりも危険かもしれない。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
      {
        text: "2014年。Googleが「DeepMind」を買収した。",
        subText:
          "人間のように学習するAI技術を持つ天才集団。その力がGoogleという一つの巨大企業の手に渡った。",
      },
      {
        imageUrl: "images/sam-altman-real-2.jpg",
        text: "2015年。OpenAI設立。",
        subText:
          "お金儲けが目的ではない、非営利のAI研究組織。技術は全て無料で公開するという約束だった。",
        speechBubble: {
          text: "ひとつの会社にAIを独占させてはいけない。人類全体のためのAIを、オープンに作る組織が必要だ。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
    ],
  },
  {
    id: "ch3-betrayal",
    type: "sticky-sequence",
    chapter: 3,
    accentColor: PURPLE,
    scrollHeight: "500vh",
    beats: [
      {
        imageUrl: "images/elon-photo-16.webp",
        text: "2018年。二人の意見が真っ二つに割れた。",
        subText:
          "イーロンはOpenAIを去った。自分が作った組織を、他人の手に委ねることになった。",
      },
      {
        text: "そしてOpenAIは、約束を破った。",
        subText:
          "最先端のAIを学習させるには、莫大な計算能力が必要だった。年間数百億円のコスト。非営利では資金が続かなかった。2019年、マイクロソフトから約1,500億円の出資を受け入れ、営利企業に転換した。",
      },
      {
        imageUrl: "images/chatgpt-real.webp",
        text: "史上最速の記録が生まれた。",
        subText:
          "100万人が使い始めるまでにかかった時間。Netflixは3年半。Instagramは2ヶ月半。ChatGPTは——",
        stat: "5日",
      },
      {
        imageUrl: "images/sam-altman-real-4.jpg",
        text: "2023年11月。突然のクビ宣告。",
        subText:
          "OpenAIの幹部たちが突然サムを追い出した。しかし社員770人中747人が「サムを戻せ」と署名。5日後、サムは復帰した。",
      },
      {
        imageUrl: "images/elon-photo-23.webp",
        text: "",
        speechBubble: {
          text: "OpenAIは約束を破った。なら自分の手で作る。嘘をつかない、本当に真実を追い求めるAIを。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
    ],
  },
  {
    id: "ch3-colossus",
    type: "full-bleed-stat",
    chapter: 3,
    imageUrl: "images/datacenter-real.webp",
    text: "122日で、世界最大のAIセンター。",
    subText:
      "テネシー州メンフィスの使われなくなった巨大工場を買い取った。まず122日で10万個のAIチップを稼働させ、さらに92日で倍の20万個に拡張。",
    stat: "200,000個",
    statLabel: "のAIチップを搭載（Colossus）",
    badge: "xAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-neuralink",
    type: "full-bleed-stat",
    chapter: 3,
    imageUrl: "images/noland-arbaugh-real.webp",
    text: "2024年1月。人類初の脳チップ手術。",
    subText:
      "首から下が動かないノーランドの脳に小さなチップを埋め込んだ。「動け」と念じるだけで画面のカーソルが動いた。",
    stat: "1,024",
    statLabel: "本の極細センサーが脳の信号を読み取る",
    badge: "Neuralink",
    accentColor: PURPLE,
  },

  // ════════════════════════════════════════
  //  BRIDGE 3→4
  // ════════════════════════════════════════
  {
    id: "bridge-3-4",
    type: "bridge",
    chapter: null,
    imageUrl: ELON_C,
    accentColor: TEXT,
    speechBubble: {
      text: "AIで知能を広げる。でもそもそも、もうひとつの危機が迫っている。「働く人間」がいなくなりつつある。",
      speaker: ELON,
      speakerName: "Elon Musk",
      emphasis: "quiet",
    },
  },

  // ════════════════════════════════════════
  //  危機 04 — 労働力の不足 (3 scenes)
  // ════════════════════════════════════════
  {
    id: "ch4-title",
    type: "chapter-gate",
    chapter: 4,
    chapterNum: "危機 04",
    text: "働く人がいなくなること",
    imageUrl: "images/population-decline-real.webp",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus",
    type: "sticky-sequence",
    chapter: 4,
    accentColor: GREEN,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: "images/empty-classroom.webp",
        text: "子どもが生まれていない。",
        subText:
          "人口を維持するには、女性一人あたり2.1人の子どもが必要。でも今の韓国は0.72。日本は1.20。このままでは介護する人も、工場で働く人も足りなくなる。",
      },
      {
        imageUrl: "images/elon-photo-14.webp",
        text: "",
        speechBubble: {
          text: "人が足りないなら、人の形をしたロボットを作ればいい。24時間働けて、文句も言わない。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
      {
        imageUrl: "images/optimus-gen1-hq.webp",
        text: "2023年3月。Optimus Gen 1。",
        subText:
          "まだ荒削り。むき出しの配線に、ぎこちない歩き方。でも人の形をしたロボットを大量に作るという途方もない挑戦が始まった。",
      },
    ],
  },
  {
    id: "ch4-optimus-gen2",
    type: "full-bleed-stat",
    chapter: 4,
    imageUrl: "images/optimus-gen2-hq.webp",
    text: "9ヶ月後。まるで別物になった。",
    subText:
      "Optimus Gen 2。卵を割らずに持てるほど繊細な指。体重は30%軽くなった。しかも24時間、休まず働ける。",
    stat: "$20,000",
    statLabel: "1台の目標価格（約300万円）",
    badge: "Optimus Gen2",
    accentColor: GREEN,
  },

  // ════════════════════════════════════════
  //  危機 05 — 渋滞 (3 scenes)
  // ════════════════════════════════════════
  {
    id: "ch5-title",
    type: "chapter-gate",
    chapter: 5,
    chapterNum: "危機 05",
    text: "渋滞で人生が消えていくこと",
    imageUrl: "images/traffic-jam-real.webp",
    accentColor: WARM,
  },
  {
    id: "ch5-boring",
    type: "sticky-sequence",
    chapter: 5,
    accentColor: WARM,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: "images/traffic-jam-real.webp",
        text: "年間51時間。",
        subText:
          "アメリカ人が渋滞で失っている時間。一生分だと約3,300時間。ただ動けず、人生の時間が消えていく。",
        stat: "51時間/年",
        statLabel: "渋滞で消える時間（INRIX 2023）",
      },
      {
        imageUrl: "images/elon-photo-13.webp",
        text: "",
        speechBubble: {
          text: "渋滞マジで無理。トンネルを掘る機械を買って、今すぐ穴を掘り始める。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
      {
        imageUrl: "images/tunnel-boring-real.webp",
        text: "ビルは上に伸びるのに、道路は平面のまま。",
        subText: "街は3Dなのに、交通だけ2Dだ。地下にもう一層作ればいい。",
        stat: "1/10",
        statLabel: "従来の10分の1のコストでトンネルを掘る",
      },
    ],
  },
  {
    id: "ch5-vegas",
    type: "full-bleed-stat",
    chapter: 5,
    imageUrl: "images/vegas-loop-interior.webp",
    text: "ラスベガスの地下で、もう動いている。",
    subText:
      "「Vegas Loop」。ラスベガスの地下に掘ったトンネルの中を、テスラの車が乗客を乗せて走っている。歩けば25分の距離を、2分で移動。",
    stat: "500万人+",
    statLabel: "累計利用者数（2024年末時点）",
    badge: "Vegas Loop",
    accentColor: WARM,
  },

  // ════════════════════════════════════════
  //  BRIDGE 5→6
  // ════════════════════════════════════════
  {
    id: "bridge-5-6",
    type: "bridge",
    chapter: null,
    imageUrl: "images/elon-photo-18.webp",
    accentColor: TEXT,
    speechBubble: {
      text: "地下のトンネルの次は、空だ。世界中をインターネットでつなげる。",
      speaker: ELON,
      speakerName: "Elon Musk",
      emphasis: "quiet",
    },
  },

  // ════════════════════════════════════════
  //  危機 06 — つながれない22億人 (3 scenes)
  // ════════════════════════════════════════
  {
    id: "ch6-title",
    type: "chapter-gate",
    chapter: 6,
    chapterNum: "危機 06",
    text: "ネットが届かない22億人がいること",
    imageUrl: "images/x-hq-real.webp",
    accentColor: TEXT,
  },
  {
    id: "ch6-starlink",
    type: "sticky-sequence",
    chapter: 6,
    accentColor: TEXT,
    scrollHeight: "400vh",
    beats: [
      {
        imageUrl: "images/ukraine-real.webp",
        text: "2022年2月。ロシアがウクライナに攻め込んだ。",
        subText:
          "爆撃で電話の基地局やネット回線が壊された。家族が生きているかどうかも確認できない。",
      },
      {
        imageUrl: "images/fedorov.jpg",
        text: "ウクライナの副首相がSNSで助けを求めた。",
        subText: "「@elonmusk 衛星インターネットの端末を送ってくれ。」",
      },
      {
        imageUrl: "images/elon-photo-24.webp",
        text: "10時間後。",
        speechBubble: {
          text: "Starlinkサービス、ウクライナで起動完了。端末も送る。",
          speaker: ELON,
          speakerName: "Elon Musk",
          emphasis: "hero",
        },
      },
    ],
  },
  {
    id: "ch6-starlink-stat",
    type: "full-bleed-stat",
    chapter: 6,
    imageUrl: "images/starlink-real.webp",
    text: "今も世界に22億人、ネットを使えない人がいる。",
    subText: "ネット回線を引けない場所に、宇宙から届ける。",
    stat: "9,400基+",
    statLabel: "宇宙を飛ぶ衛星の数",
    badge: "Starlink",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  EPILOGUE (2 scenes)
  // ════════════════════════════════════════
  {
    id: "epilogue-still",
    type: "hero-statement",
    chapter: null,
    imageUrl: "images/elon-stage.webp",
    text: "この男は、今も走り続けている。",
    accentColor: GOLD,
  },
  {
    id: "epilogue",
    type: "epilogue",
    chapter: null,
    imageUrl: "images/earth-blue-marble.webp",
    text: "意識の灯を、消さないために。",
    elonQuote:
      "Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.",
    elonQuoteJp:
      "意識はとても稀で、貴重なものだ。\n意識の灯を守るために、\nできることは全てやるべきだ。",
    accentColor: GOLD,
  },
];
