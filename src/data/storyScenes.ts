import type { StoryScene } from "../types/story";

const GOLD = "rgba(255, 225, 140, 0.9)";
const CYAN = "rgba(80, 200, 255, 0.9)";
const RED = "rgba(255, 90, 80, 0.9)";
const PURPLE = "rgba(180, 130, 255, 0.9)";
const GREEN = "rgba(80, 220, 140, 0.9)";
const WARM = "rgba(200, 180, 150, 0.9)";
const TEXT = "rgba(232, 220, 200, 0.9)";

export const storyScenes: StoryScene[] = [
  // ════════════════════════════════════════
  //  PROLOGUE
  // ════════════════════════════════════════
  {
    id: "prologue-crisis",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "今、地球は\n6つの危機を抱えている。",
    accentColor: TEXT,
  },
  {
    id: "prologue-elon",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon_mars.webp",
    text: "ある一人の男が、\n立ち上がった。",
    accentColor: GOLD,
  },
  {
    id: "prologue-thesis",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "6つの危機。6つの会社。\n1人の男の確信。",
    stat: "6",
    statLabel: "つの事業が世界を変える",
    accentColor: GOLD,
  },

  // ════════════════════════════════════════
  //  危機 01 — 単一惑星への依存
  // ════════════════════════════════════════
  {
    id: "ch1-title",
    type: "chapter-title",
    chapter: 1,
    imageUrl: "images/single-planet-v2.webp",
    text: "危機 01",
    subText: "単一惑星への依存",
    accentColor: CYAN,
  },
  {
    id: "ch1-extinction-intro",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "地球は過去5回、\nほぼ全ての命を失った。",
    accentColor: CYAN,
  },
  {
    id: "ch1-ext-ordovician",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction_ordovician.webp",
    text: "オルドビス紀末。\n海が凍りついた。",
    subText: "4億4300万年前 ── 全種の85%が絶滅。",
    accentColor: CYAN,
  },
  {
    id: "ch1-ext-devonian",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction_devonian.webp",
    text: "デボン紀末。\n海から酸素が消えた。",
    subText: "3億7500万年前 ── 全種の75%が絶滅。",
    accentColor: CYAN,
  },
  {
    id: "ch1-ext-permian",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction_permian.webp",
    text: "ペルム紀末。\n地球史上、最悪の日。",
    subText: "2億5100万年前 ── 全種の96%が絶滅。",
    stat: "96%",
    statLabel: "史上最大の大量絶滅",
    accentColor: CYAN,
  },
  {
    id: "ch1-ext-triassic",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction_triassic.webp",
    text: "三畳紀末。\n火山が気候を壊した。",
    subText: "2億年前 ── 全種の76%が絶滅。",
    accentColor: CYAN,
  },
  {
    id: "ch1-ext-cretaceous",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/extinction_cretaceous.webp",
    text: "白亜紀末。\n巨大隕石が衝突した。",
    subText: "6600万年前 ── 全種の76%が絶滅。",
    accentColor: CYAN,
  },
  {
    id: "ch1-extinction-next",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "6度目は、\nいつ来てもおかしくない。",
    accentColor: CYAN,
  },
  // イーロンと『The Case for Mars』
  {
    id: "ch1-elon-book",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/case-for-mars-book.webp",
    text: "2001年。イーロンは\n一冊の本に出会った。",
    subText:
      "『The Case for Mars』── ロバート・ズブリンが書いた、火星移住の具体的ロードマップ。",
    accentColor: CYAN,
  },
  {
    id: "ch1-elon-reads",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon-thinking.webp",
    text: "",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "今の技術でも、火星には行ける。\n問題は、ロケットを毎回\n使い捨てにしていることだ…",
        position: "right",
        delay: 0.5,
      },
      {
        text: "飛行機を毎回捨てる奴はいない。\nロケットも同じだ。",
        position: "left",
        delay: 1.4,
      },
    ],
  },
  // ロシアでのロケット購入失敗
  {
    id: "ch1-russia",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/russia-rocket-deal.webp",
    text: "まず、安いロケットを\n買おうとした。",
    subText:
      "2001年、モスクワ。ロシア製ミサイル3基、$2,100万。だがロシア側はイーロンを鼻で笑った。",
    accentColor: CYAN,
  },
  // 飛行機での「自分で作る」決断
  {
    id: "ch1-airplane",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/airplane-window.webp",
    text: "帰りの飛行機。イーロンはラップトップを開いた。",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "ロケットの原材料費は\n打ち上げ費用のたった3%だ。\n…自分で作った方が安いな。",
        position: "right",
        delay: 0.8,
      },
    ],
  },
  // SpaceX設立 + 笑われる
  {
    id: "ch1-founded",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/laughing-crowd.webp",
    text: "2002年5月6日。SpaceX設立。",
    subText:
      "「ロケットってのは国が何千億もかけて作るもんだ。民間にできるわけねぇ」",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  // Falcon 1 — 3連続爆発
  {
    id: "ch1-fail-1",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis-v2.webp",
    text: "Falcon 1 ── 1回目。",
    subText: "2006年3月24日。打ち上げ33秒、燃料ラインの腐食。爆発。",
    accentColor: CYAN,
  },
  {
    id: "ch1-fail-2",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis-v2.webp",
    text: "2回目。",
    subText: "2007年3月21日。高度289kmに到達したが、姿勢制御を喪失。",
    accentColor: CYAN,
  },
  {
    id: "ch1-fail-3",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/spacex-crisis-v2.webp",
    text: "3回目。",
    subText: "2008年8月3日。第1段と第2段が衝突。全て失った。",
    accentColor: CYAN,
  },
  // 最後の1回
  {
    id: "ch1-last-chance",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "残る資金で打てるのは、\nあと1回だけ。",
    subText: "イーロンの全財産は尽きかけていた。テスラも同時に倒産寸前だった。",
    accentColor: CYAN,
  },
  // 4回目 — 成功
  {
    id: "ch1-success-launch",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/rocket-success.webp",
    text: "2008年9月28日。\n4回目──",
    accentColor: CYAN,
  },
  {
    id: "ch1-success",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/elon-triumphant.webp",
    text: "成功。",
    subText:
      "民間企業として史上初、ロケットが軌道に到達した。\n「軌道に乗る」とは、秒速約7.9km ── 弾丸の20倍の速度で地球を周回し続けること。",
    accentColor: CYAN,
  },
  // NASA契約
  {
    id: "ch1-nasa",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "そして3ヶ月後──",
    subText:
      "2008年12月23日、クリスマスイブの前日。NASAがSpaceXに$1.6Bの契約を結んだ。国際宇宙ステーションへの輸送12回分。",
    stat: "$1.6B",
    statLabel: "NASAとの契約額",
    accentColor: CYAN,
  },
  // Falcon 9再利用
  {
    id: "ch1-reuse",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon9-landing.webp",
    text: "でもイーロンの本当の夢は、\nもっと先にあった。",
    subText: "ロケットを着陸させて、また飛ばす。飛行機と同じように。",
    stat: "20回+",
    statLabel: "Falcon 9ブースター最大再使用回数",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  {
    id: "ch1-mars-goal",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "火星への片道切符を、\n全人類が買える値段にする。",
    subText: "それがSpaceXの最終目標だ。",
    accentColor: CYAN,
  },

  // ════════════════════════════════════════
  //  BRIDGE 1→2
  // ════════════════════════════════════════
  {
    id: "bridge-1-2",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "SpaceXで宇宙を変える。\nだが地球にも、今すぐ\n解決すべき危機があった。",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  危機 02 — 化石燃料への依存
  // ════════════════════════════════════════
  {
    id: "ch2-title",
    type: "chapter-title",
    chapter: 2,
    imageUrl: "images/fossil-fuel-v2.webp",
    text: "危機 02",
    subText: "化石燃料への依存",
    accentColor: RED,
  },
  {
    id: "ch2-co2",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/co2-factory.webp",
    text: "年間374億トンのCO\u2082。",
    subText: "人類が1年間に排出する温室効果ガス。100年で気温は+1.1℃上昇した。",
    stat: "374億トン",
    statLabel: "年間CO\u2082排出量（IEA 2023）",
    accentColor: RED,
  },
  {
    id: "ch2-car-problem",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "最大の排出源のひとつが、\n自動車だ。",
    accentColor: RED,
  },
  // テスラとの出会い
  {
    id: "ch2-tesla-founding",
    type: "manga-panel",
    chapter: 2,
    imageUrl: "images/elon-young-2001.webp",
    text: "2004年。イーロンはあるスタートアップに出会った。",
    subText:
      "マーティン・エバーハードとマーク・ターペニングが設立したテスラ・モーターズ。イーロンは$650万を出資し、会長に就任した。",
    accentColor: RED,
    speechBubbles: [
      {
        text: "EVがダサいから売れないんだ。\nフェラーリより速い\n電気自動車を作ればいい。",
        position: "right",
        delay: 0.8,
      },
    ],
  },
  // Roadster
  {
    id: "ch2-roadster",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/ev-transition-v2.webp",
    text: "Tesla Roadster。\n常識を粉砕した。",
    subText: "0-100km/h 3.9秒。航続距離393km。排気ガスはゼロ。",
    badge: "Tesla",
    stat: "3.9秒",
    statLabel: "0→100km/h加速",
    accentColor: RED,
  },
  // EVへの批判
  {
    id: "ch2-criticism",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "でも批判もあった。",
    subText: "「バッテリー製造時のCO\u2082はどうするんだ？」",
    accentColor: RED,
  },
  // ライフサイクル反論
  {
    id: "ch2-lifecycle",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/ev-lifecycle-graph.webp",
    text: "製造時は40%多くCO\u2082が出る。",
    subText:
      "でも約1万7000km走れば逆転する。車の一生で見れば、EVの排出量はガソリン車の3分の1以下。",
    stat: "73%",
    statLabel: "ガソリン車比でCO\u2082削減（EU実測値）",
    accentColor: RED,
  },
  // Megapack
  {
    id: "ch2-energy-problem",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "でも車を電気で走らせるだけじゃ\n足りない。",
    subText: "太陽は夜には沈む。電気そのものを貯める方法が必要だ。",
    accentColor: RED,
  },
  {
    id: "ch2-megapack",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/megapack-aerial.webp",
    text: "街全体の電力を貯められる\nバッテリーを作る。",
    subText:
      "Megapack 1基で一般家庭130軒分の電力を貯蔵。オーストラリアではガス発電所を置き換えた。",
    badge: "Tesla Energy",
    stat: "3,900kWh",
    statLabel: "Megapack 1基の蓄電容量",
    accentColor: RED,
  },

  // ════════════════════════════════════════
  //  BRIDGE 2→3
  // ════════════════════════════════════════
  {
    id: "bridge-2-3",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "エネルギーの次に、\nイーロンが恐れたもの。",
    subText: "それは人類が生み出す「知能」そのものだった。",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  危機 03 — 制御できないAI
  // ════════════════════════════════════════
  {
    id: "ch3-title",
    type: "chapter-title",
    chapter: 3,
    imageUrl: "images/intelligence-limits-v2.webp",
    text: "危機 03",
    subText: "制御できないAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-threat",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/elon-determined.webp",
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "AIは今後数十年で、\n人類にとって最大の脅威になりうる。\n核兵器よりも危険かもしれない。",
        position: "right",
        delay: 0.5,
      },
    ],
  },
  // OpenAI設立
  {
    id: "ch3-openai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/ai-development-v2.webp",
    text: "一つの企業にAIを\n独占させちゃいけない。",
    subText: "2015年、OpenAIを非営利で設立。「人類全体のためのAI」を作る。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  // サム・アルトマン紹介
  {
    id: "ch3-altman",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman-real-1.jpg",
    text: "共同設立者、サム・アルトマン。",
    subText: "Y Combinator前CEO。天才たちを見つけて育てるのが仕事だった。",
    badge: "Sam Altman",
    accentColor: PURPLE,
  },
  // イーロンがOpenAIを去る
  {
    id: "ch3-elon-leaves",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "だが2018年、\nイーロンはOpenAIを去った。",
    subText:
      "サムやグレッグ・ブロックマンとの間で、組織の方向性を巡る対立が起きていた。",
    accentColor: PURPLE,
  },
  // ChatGPT
  {
    id: "ch3-chatgpt",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/chatgpt-screen.webp",
    text: "そして2022年11月。\nOpenAIが世界を変えた。",
    subText:
      "Netflix 3.5年。Instagram 2.5ヶ月。ChatGPTは── 5日で100万ユーザーを突破した。",
    stat: "5日",
    statLabel: "100万ユーザー到達。史上最速",
    accentColor: PURPLE,
  },
  // サム解雇
  {
    id: "ch3-altman-fired",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman-real-4.jpg",
    text: "2023年11月17日。\n突然の解雇。",
    subText:
      "取締役会がサムを解任。「一貫して率直でなかった」。秘密のQ*プロジェクトを巡る安全性の対立があったとされる。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  // 社員が動く
  {
    id: "ch3-revolt",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "だが社員が動いた。",
    subText: "770人中ほぼ全員が辞職を宣言。5日後、サムは復帰した。",
    accentColor: PURPLE,
  },
  // xAI
  {
    id: "ch3-xai",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/elon-speaking.webp",
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "OpenAIは非営利の約束を破った。\nならば、本当に真実を追求するAIを\n自分で作る。",
        position: "right",
        delay: 0.5,
      },
    ],
  },
  // Colossus
  {
    id: "ch3-colossus",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/colossus-datacenter.webp",
    text: "122日で世界最大の\nAIスパコンを建設。",
    subText: "メンフィスの廃家電工場。NVIDIA GPU 10万基を92日で20万基に倍増。",
    badge: "xAI",
    stat: "200,000基",
    statLabel: "Colossus GPU数",
    accentColor: PURPLE,
  },
  // ジェンセン・ファン
  {
    id: "ch3-jensen",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/jensen-huang-real-5.jpg",
    text: "そのGPUを作っている男。",
    subText:
      "ジェンセン・ファン、NVIDIA CEO。ChatGPTもGrokもGeminiも、全てNVIDIAのチップで動いている。AIの石油を握る男。",
    badge: "NVIDIA",
    accentColor: PURPLE,
  },
  // Neuralink
  {
    id: "ch3-neuralink",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/neuralink-patient.jpg",
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: 'AIが人間より賢くなる日が来る。\nそのとき人間が"ペット"に\nならないためには、\n脳とAIを直接つなぐしかない。',
        position: "left",
        delay: 0.5,
      },
    ],
  },
  {
    id: "ch3-neuralink-detail",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "2024年1月。人類初の\n脳チップ移植。",
    subText:
      "ノーランド・アーボウ。四肢麻痺の彼が、思考だけでカーソルを動かした。短期的には脳疾患の治療、長期的には人間の知能そのものの拡張。",
    stat: "1,024ch",
    statLabel: "N1チップの脳信号チャンネル数",
    badge: "Neuralink",
    accentColor: PURPLE,
  },

  // ════════════════════════════════════════
  //  BRIDGE 3→4
  // ════════════════════════════════════════
  {
    id: "bridge-3-4",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "AIで知能を拡張する。\nだが、もう一つの危機が\n迫っていた。",
    subText: "そもそも「働く人間」がいなくなりつつある。",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  危機 04 — 労働力の消滅
  // ════════════════════════════════════════
  {
    id: "ch4-title",
    type: "chapter-title",
    chapter: 4,
    imageUrl: "images/population-decline-v2.webp",
    text: "危機 04",
    subText: "労働力の消滅",
    accentColor: GREEN,
  },
  {
    id: "ch4-birthrate",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/empty-classroom.webp",
    text: "韓国 0.72。日本 1.20。",
    subText:
      "人口を維持するには2.1が必要。先進国はどこも下回っている。介護する人も、工場で働く人も、トラックを運転する人も、いなくなる。",
    accentColor: GREEN,
  },
  // Optimus Gen1 vs Gen2
  {
    id: "ch4-optimus-gen1",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-gen1.webp",
    text: "2022年。最初の試作機。",
    subText:
      "ゴツくて不格好。露出した配線、ぎこちない動き。でも、ここから始まった。",
    badge: "Optimus Gen1",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus-gen2",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-gen2.webp",
    text: "2024年。Gen2。\n別物になった。",
    subText: "洗練されたデザイン。卵を割らずに持てる指の精度。24時間稼働。",
    badge: "Optimus Gen2",
    stat: "$20,000",
    statLabel: "目標価格（約300万円）",
    accentColor: GREEN,
  },
  // Cybercab
  {
    id: "ch4-robotaxi",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/cybercab-real.webp",
    text: "運転手もいらなくなる。",
    subText:
      "Tesla Cybercab。ハンドルすらない完全自律ロボタクシー。24時間365日、止まらない。",
    badge: "Tesla",
    stat: "24h",
    statLabel: "自律走行に休憩時間は存在しない",
    accentColor: GREEN,
  },

  // ════════════════════════════════════════
  //  危機 05 — 渋滞で失われる時間
  // ════════════════════════════════════════
  {
    id: "ch5-title",
    type: "chapter-title",
    chapter: 5,
    imageUrl: "images/mobility-inefficiency-v2.webp",
    text: "危機 05",
    subText: "渋滞で失われる時間",
    accentColor: WARM,
  },
  {
    id: "ch5-traffic",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/traffic-jam.webp",
    text: "年間51時間。",
    subText:
      "アメリカ人が渋滞で失う時間。人生のうち何百時間も、ただブレーキを踏んでいるだけ。",
    stat: "51時間/年",
    statLabel: "渋滞で失われる時間（INRIX 2023）",
    accentColor: WARM,
  },
  // イーロンのツイート
  {
    id: "ch5-tweet",
    type: "manga-panel",
    chapter: 5,
    imageUrl: "images/elon-exhausted.webp",
    text: "2016年12月17日。",
    accentColor: WARM,
    speechBubbles: [
      {
        text: "渋滞マジでムリ。\nトンネル掘削機を買って、\n今すぐ穴掘り始めるわ。",
        position: "right",
        delay: 0.5,
      },
    ],
  },
  {
    id: "ch5-3d-city",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/underground-network-v2.webp",
    text: "ビルは上に伸びるのに、\n道路は平面のまま。",
    subText: "街は3Dなのに、交通は2Dだ。地下にもう一層作ればいい。",
    badge: "The Boring Company",
    stat: "1/10",
    statLabel: "トンネル掘削コスト（従来比）",
    accentColor: WARM,
  },
  // Vegas Loop
  {
    id: "ch5-vegas",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/vegas-loop-tunnel.webp",
    text: "ラスベガスで、\nすでに走っている。",
    subText:
      "Vegas Loop。8駅が稼働中、約16kmのトンネル。2026年には空港に接続予定。最終計画は約110km、104駅。",
    badge: "Vegas Loop",
    accentColor: WARM,
  },

  // ════════════════════════════════════════
  //  BRIDGE 5→6
  // ════════════════════════════════════════
  {
    id: "bridge-5-6",
    type: "text-only",
    chapter: null,
    imageUrl: null,
    text: "地下のトンネルの次は、空。",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  危機 06 — つながれない22億人
  // ════════════════════════════════════════
  {
    id: "ch6-title",
    type: "chapter-title",
    chapter: 6,
    imageUrl: "images/info-finance-gap-v2.webp",
    text: "危機 06",
    subText: "つながれない22億人",
    accentColor: TEXT,
  },
  // ウクライナ侵攻
  {
    id: "ch6-ukraine",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/ukraine-warzone.webp",
    text: "2022年2月。\nロシアがウクライナに侵攻。",
    subText:
      "通信インフラが破壊された。電話もネットも使えない。指揮も安否確認もできない。",
    accentColor: TEXT,
  },
  // フェドロフのツイート
  {
    id: "ch6-fedorov",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/fedorov.jpg",
    text: "ウクライナのフェドロフ副首相が\nSNSで叫んだ。",
    subText:
      "「@elonmusk あなたが火星を目指している間に、ロシアがウクライナを占領しようとしている。Starlinkの端末を送ってくれ。」",
    accentColor: TEXT,
  },
  // イーロンの即応
  {
    id: "ch6-elon-response",
    type: "manga-panel",
    chapter: 6,
    imageUrl: "images/elon-determined.webp",
    text: "10時間後。",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "Starlinkサービス、\nウクライナで起動完了。\n端末も送る。",
        position: "right",
        delay: 0.5,
      },
    ],
  },
  // Starlinkの説明
  {
    id: "ch6-starlink-explain",
    type: "text-only",
    chapter: 6,
    imageUrl: null,
    text: "Starlinkとは何か。",
    subText:
      "高度550kmに9,400基以上の小型衛星。宇宙からインターネットを届ける。砂漠でも海上でも戦場でも、空さえ見えれば繋がる。",
    accentColor: TEXT,
  },
  // Starlink衛星
  {
    id: "ch6-starlink",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/starlink-orbit.webp",
    text: "今も世界に22億人、\nネットに接続できない人がいる。",
    subText: "光ファイバーが届かない場所に、空から届ける。",
    badge: "Starlink",
    stat: "9,400基+",
    statLabel: "軌道上の衛星数",
    accentColor: TEXT,
  },
  // X / Everything App
  {
    id: "ch6-x",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/free-speech-platform-v2.webp",
    text: "声を届け、お金を届ける。",
    subText:
      "銀行口座を持てない13億人がいる。スマホ1台で送金・決済・投資ができるアプリを届けたい。イーロンは1999年にX.comを創業した。原点回帰。",
    badge: "X",
    stat: "6億人",
    statLabel: "月間アクティブユーザー",
    accentColor: TEXT,
  },

  // ════════════════════════════════════════
  //  EPILOGUE
  // ════════════════════════════════════════
  {
    id: "epilogue-still",
    type: "image-hero",
    chapter: null,
    imageUrl: "images/elon-stage.webp",
    text: "この男は、今も急いでいる。",
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
