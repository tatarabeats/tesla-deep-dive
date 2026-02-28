import type { StoryScene } from "../types/story";

// ── Elon portraits ──
const ELON = "images/elon-avatar.webp";
const ELON_A = "images/elon-real.jpg"; // Formal portrait
const ELON_B = "images/elon-celebration.webp"; // Celebrating
const ELON_C = "images/elon-photo-3.webp"; // SpaceX press conf
const ELON_D = "images/elon-photo-4.webp"; // Tesla Battery Day
const ELON_E = "images/elon-photo-5.webp"; // Speaking at academy
const ELON_F = "images/elon-photo-6.webp"; // AI Summit 2023

// ── Colors ──
const GOLD = "rgba(255, 225, 140, 0.9)";
const FIRE = "rgba(255, 100, 30, 0.95)";
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
    accentColor: FIRE,
  },
  {
    id: "prologue-elon",
    type: "image-hero",
    chapter: null,
    imageUrl: ELON_A,
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
    textColor: "#ffffff",
    accentColor: FIRE,
  },

  // ════════════════════════════════════════
  //  危機 01 — 単一惑星への依存
  // ════════════════════════════════════════
  {
    id: "ch1-title",
    type: "chapter-title",
    chapter: 1,
    imageUrl: "images/earth-blue-marble.webp",
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
    imageUrl: "images/extinction-cretaceous-real.webp",
    text: "白亜紀末。\n巨大隕石が衝突した。",
    subText: "6600万年前 ── 全種の76%が絶滅。",
    accentColor: CYAN,
  },
  {
    id: "ch1-extinction-next",
    type: "manga-panel",
    chapter: 1,
    imageUrl: ELON_E,
    text: "",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "6度目は、いつ来てもおかしくない。\nだから人類は\n複数の惑星に住む必要がある。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // イーロンと『The Case for Mars』
  {
    id: "ch1-elon-book",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/case-for-mars-book.webp",
    text: "2001年。イーロンは\n一冊の本に出会った。",
    subText:
      "『The Case for Mars』──\n火星に人が住めることを\n具体的に示した計画書。",
    accentColor: CYAN,
  },
  {
    id: "ch1-elon-reads",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon-photo-9.webp",
    text: "",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "今の技術でも、火星には行ける。\n問題は、ロケットを毎回\n使い捨てにしていることだ…",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
      {
        text: "飛行機を毎回捨てる奴はいない。\nロケットも同じだ。",
        position: "left",
        delay: 1.4,
        speaker: ELON,
        emphasis: "hero",
        speakerName: "Elon Musk",
      },
    ],
  },
  // ロシアでのロケット購入失敗
  {
    id: "ch1-russia",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/elon-russia-meeting.webp",
    text: "まず、安いロケットを\n買おうとした。",
    subText:
      "2001年、ロシアのモスクワへ飛んだ。\n中古ロケットを3基、約31億円で売ってほしい。\nだがロシア側は\n「こいつは素人だ」と鼻で笑った。",
    accentColor: CYAN,
  },
  // 飛行機での「自分で作る」決断
  {
    id: "ch1-airplane",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon-airplane-laptop.webp",
    text: "帰りの飛行機。\nイーロンはノートパソコンを開いた。",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "ロケットの原材料費は\n打ち上げ費用のたった3%だ。\n…自分で作った方が安いな。",
        position: "right",
        delay: 0.8,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },
  // SpaceX設立
  {
    id: "ch1-founded",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon1-warehouse.webp",
    text: "2002年5月6日。\nSpaceX設立。",
    subText:
      "カリフォルニアの小さな倉庫。\nたった30人で「自分たちでロケットを作る」\nという途方もない挑戦が始まった。",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  // 業界の反応
  {
    id: "ch1-mockery",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/laughing-crowd.webp",
    text: "だが、業界はこう笑った。",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "ロケットってのは\n国が何千億もかけて作るもんだ。\nシリコンバレーの素人に\nできるわけがない。",
        position: "left",
        delay: 0.5,
        speakerName: "航空宇宙業界",
        emphasis: "quiet",
      },
    ],
  },
  // Falcon 1 — 3連続爆発
  {
    id: "ch1-fail-1",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon1-flight1.webp",
    text: "Falcon 1 ── 1回目、失敗。",
    subText:
      "2006年3月24日。\n打ち上げからたった33秒。\n燃料パイプが錆びていた。爆発。",
    accentColor: CYAN,
  },
  {
    id: "ch1-fail-2",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon1-flight2.webp",
    text: "2回目、失敗。",
    subText:
      "2007年3月21日。\n高度289kmまで飛んだ。\nだが機体のバランスが崩れ、制御不能に。",
    accentColor: CYAN,
  },
  {
    id: "ch1-fail-3",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon1-flight3.webp",
    text: "3回目、失敗。",
    subText:
      "2008年8月3日。\nロケットの上半分と下半分が\n切り離しの瞬間にぶつかった。\n全て失った。",
    accentColor: CYAN,
  },
  // 最後の1回
  {
    id: "ch1-last-chance",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon-photo-20.webp",
    text: "",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "これが最後のチャンスだ。\nこれを失敗したら、全てが終わる。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
    subText:
      "残るお金で打ち上げられるのは、あと1回だけ。\nイーロンが同時に経営していた\n電気自動車の会社「テスラ」も、\n潰れる寸前だった。",
  },
  // 4回目 — 成功
  {
    id: "ch1-success-launch",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon1-flight4.webp",
    text: "2008年9月28日。\n4回目──",
    accentColor: CYAN,
  },
  {
    id: "ch1-success",
    type: "image-hero",
    chapter: 1,
    imageUrl: ELON_B,
    text: "成功。",
    subText:
      "国でもなく、軍でもなく、\nたった一つの民間企業が\nロケットを宇宙に届けた。\n史上初の快挙だった。",
    accentColor: GOLD,
  },
  // NASA契約
  {
    id: "ch1-nasa",
    type: "text-only",
    chapter: 1,
    imageUrl: null,
    text: "そして3ヶ月後──",
    subText:
      "2008年12月23日、クリスマスイブの前日。\nNASA（アメリカ航空宇宙局）が\nSpaceXに声をかけた。\n「宇宙ステーションに荷物を届けてくれ」。\n12回分の輸送契約。",
    stat: "$1.6B",
    statLabel: "NASA契約額（約2,400億円）",
    accentColor: CYAN,
  },
  // Falcon 9再利用
  {
    id: "ch1-reuse",
    type: "image-hero",
    chapter: 1,
    imageUrl: "images/falcon9-landing-hq.webp",
    text: "でもイーロンの本当の夢は、\nもっと先にあった。",
    subText:
      "ロケットを着陸させて、もう一度飛ばす。\n飛行機を毎回壊す人はいない。\nロケットも同じだ。",
    stat: "20回+",
    statLabel: "同じロケットの再使用回数",
    badge: "SpaceX",
    accentColor: CYAN,
  },
  {
    id: "ch1-mars-goal",
    type: "manga-panel",
    chapter: 1,
    imageUrl: "images/elon-photo-12.webp",
    text: "",
    accentColor: CYAN,
    speechBubbles: [
      {
        text: "火星への往復チケットを、\n誰でも買える値段にする。\nそれがSpaceXの最終目標だ。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },

  // ════════════════════════════════════════
  //  BRIDGE 1→2
  // ════════════════════════════════════════
  {
    id: "bridge-1-2",
    type: "manga-panel",
    chapter: null,
    imageUrl: "images/elon-photo-17.webp",
    text: "",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "宇宙への道は開けた。\nだが地球にも、今すぐ\n解決すべき危機がある。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },

  // ════════════════════════════════════════
  //  危機 02 — 化石燃料への依存
  // ════════════════════════════════════════
  {
    id: "ch2-title",
    type: "chapter-title",
    chapter: 2,
    imageUrl: "images/fossil-fuel-real.webp",
    text: "危機 02",
    subText: "化石燃料への依存",
    accentColor: RED,
  },
  {
    id: "ch2-co2",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/co2-factory-real.webp",
    text: "地球が、\nじわじわ熱くなっている。",
    subText:
      "石油や石炭を燃やすと、CO₂（二酸化炭素）が出る。\nこのガスが地球を毛布のように包んで\n温度を上げている。\nこの100年で、気温はすでに+1.1℃上昇。\n人類が毎年出すCO₂の量は──",
    stat: "374億トン",
    statLabel: "年間CO₂排出量",
    accentColor: RED,
  },
  {
    id: "ch2-car-problem",
    type: "manga-panel",
    chapter: 2,
    imageUrl: "images/elon-photo-7.webp",
    text: "",
    accentColor: RED,
    speechBubbles: [
      {
        text: "最大の排出源のひとつが、自動車だ。\nだったら、世界で一番\nカッコいい電気自動車を作ればいい。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // テスラとの出会い
  {
    id: "ch2-tesla-founding",
    type: "manga-panel",
    chapter: 2,
    imageUrl: "images/elon-photo-10.webp",
    text: "2004年。\nイーロンはある小さな会社に出会った。",
    subText:
      "2人のエンジニアが作った\n電気自動車の会社「テスラ・モーターズ」。\nイーロンは約10億円を出して\n最大の出資者になった。",
    accentColor: RED,
    speechBubbles: [
      {
        text: "EVがダサいから売れないんだ。\nフェラーリより速い\n電気自動車を作ればいい。",
        position: "right",
        delay: 0.8,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // Roadster
  {
    id: "ch2-roadster",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/tesla-roadster-real.webp",
    text: "Tesla Roadster。\n常識を粉砕した。",
    subText: "止まった状態から時速100kmまで、\nたったの──",
    badge: "Tesla",
    stat: "3.9秒",
    statLabel: "0→100km/h 加速タイム",
    accentColor: RED,
  },
  // EVへの批判
  {
    id: "ch2-criticism",
    type: "manga-panel",
    chapter: 2,
    imageUrl: "images/co2-factory-real.webp",
    text: "だが、こんな批判もあった。",
    accentColor: RED,
    speechBubbles: [
      {
        text: "バッテリーを作る時に\n大量のCO₂が出るだろ？\n結局エコじゃないんじゃないか？",
        position: "left",
        delay: 0.5,
        speakerName: "自動車業界の批判者たち",
        emphasis: "quiet",
      },
    ],
  },
  // ライフサイクル反論
  {
    id: "ch2-lifecycle",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "答えはデータにある。",
    subText:
      "確かに、バッテリーを作るときの\nCO₂はガソリン車より多い。\nでも走り始めれば電気自動車のCO₂はほぼゼロ。\n約1.7万km走った時点で逆転する。\n車を買ってから廃車にするまでの\nCO₂を比べると──",
    stat: "73%削減",
    statLabel: "ガソリン車と比べたCO₂（EU調べ）",
    accentColor: RED,
  },
  // バッテリーの廃棄問題
  {
    id: "ch2-battery-recycle",
    type: "text-only",
    chapter: 2,
    imageUrl: null,
    text: "じゃあ、バッテリーは\nどうするのか？",
    subText:
      "「廃車にしたらバッテリーのゴミが\n大量に出るんじゃないか？」\nこれもよく聞く批判だ。\n\nテスラはバッテリーをリサイクルしている。\n中に入っている貴重な金属の\n92%以上を回収して、\n新しいバッテリーの材料に戻す。\n\nさらに、車では使えなくなった電池も\n建物の電力を貯める用途に再利用できる。\nゴミにはならない。第二の人生がある。",
    accentColor: RED,
  },
  // Megapack
  {
    id: "ch2-energy-problem",
    type: "manga-panel",
    chapter: 2,
    imageUrl: ELON_D,
    text: "",
    accentColor: RED,
    speechBubbles: [
      {
        text: "車を電気で走らせるだけじゃ足りない。\n太陽は夜には沈む。\n電気そのものを貯める方法が必要だ。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },
  {
    id: "ch2-megapack",
    type: "image-hero",
    chapter: 2,
    imageUrl: "images/megapack-aerial.webp",
    text: "街ひとつ分の電気を\n貯められる巨大バッテリー。",
    subText:
      "「Megapack（メガパック）」。\n1台で一般家庭約130軒が\n丸一日使う量の電気を貯められる。\n太陽が出ている昼間に貯めて、夜に使う。\nオーストラリアでは\nガスを燃やす発電所をまるごと置き換えた。",
    badge: "Tesla Energy",
    stat: "3,900kWh",
    statLabel: "Megapack 1台の蓄電量",
    accentColor: RED,
  },

  // ════════════════════════════════════════
  //  BRIDGE 2→3
  // ════════════════════════════════════════
  {
    id: "bridge-2-3",
    type: "manga-panel",
    chapter: null,
    imageUrl: "images/elon-thinking.webp",
    text: "",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "エネルギーの問題は見えた。\nだが、もっと恐ろしいものがある。\n人類が生み出す「知能」そのものだ。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },

  // ════════════════════════════════════════
  //  危機 03 — 制御できないAI
  // ════════════════════════════════════════
  {
    id: "ch3-title",
    type: "chapter-title",
    chapter: 3,
    imageUrl: "images/openai-real.webp",
    text: "危機 03",
    subText: "制御できないAI",
    accentColor: PURPLE,
  },
  {
    id: "ch3-threat",
    type: "manga-panel",
    chapter: 3,
    imageUrl: ELON_F,
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "AIは人類にとって\n最大の脅威になりうる。\n核兵器よりも危険かもしれない。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // OpenAI設立
  {
    id: "ch3-openai",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman-real-2.jpg",
    text: "一つの企業に\nAIを独占させちゃいけない。",
    subText:
      "2015年、「OpenAI」を設立。\nお金儲けが目的ではなく、\n人類全体のためにAIを作る組織。\n技術は全て無料で公開する約束だった。",
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
    subText:
      "シリコンバレーで最も有名な\nスタートアップ支援組織の元トップ。\n天才たちを見つけて育てるのが仕事だった。",
    badge: "Sam Altman",
    accentColor: PURPLE,
  },
  // イーロンとサムの対立 → 対話形式に変更
  {
    id: "ch3-elon-leaves",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/elon-photo-16.webp",
    text: "2018年。2人の意見が割れた。",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "AIの技術は全て公開すべきだ。\n誰でも使えるようにしないと\n危険な独占が生まれる。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
      {
        text: "強すぎるAIを誰でも使えたら\nそっちの方が危険だ。\nそれに、もっとお金が必要なんだ。",
        position: "left",
        delay: 1.6,
        speakerName: "Sam Altman",
        emphasis: "quiet",
      },
    ],
  },
  // イーロン離脱の結果
  {
    id: "ch3-elon-leaves-result",
    type: "text-only",
    chapter: 3,
    imageUrl: null,
    text: "イーロンはOpenAIを去った。",
    subText:
      "そしてOpenAIは「お金儲けしない」という\n約束を下ろし、普通の会社になった。\n「人類のため」に作ったはずの組織が、\n「利益のため」の組織に変わった。",
    accentColor: PURPLE,
  },
  // ChatGPT
  {
    id: "ch3-chatgpt",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/chatgpt-real.webp",
    text: "そして2022年11月──\n史上最速の記録が生まれた。",
    subText:
      "100万人が使い始めるまでにかかった時間。\nNetflixは3年半。\nInstagramは2ヶ月半。\nChatGPTは──",
    stat: "5日",
    statLabel: "",
    accentColor: PURPLE,
  },
  // サム解雇
  {
    id: "ch3-altman-fired",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/sam-altman-real-4.jpg",
    text: "2023年11月17日。\n突然のクビ宣告。",
    subText:
      "OpenAIの幹部たちが、\n突然サムを追い出した。\n理由は「嘘をついていた」から。\nあまりに強力なAIの開発を\nどこまで進めていいのか、\n内部で意見が真っ二つに割れていた。",
    badge: "OpenAI",
    accentColor: PURPLE,
  },
  // 社員が動く → 対話形式
  {
    id: "ch3-revolt",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/sam-altman-stage.webp",
    text: "だが社員が動いた。",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "サムを戻せ。\nさもなければ全員辞める。",
        position: "left",
        delay: 0.5,
        speakerName: "OpenAI社員 770人中ほぼ全員",
        emphasis: "hero",
      },
    ],
    subText: "5日後、サムは復帰した。",
  },
  // xAI
  {
    id: "ch3-xai",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/elon-photo-8.webp",
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "OpenAIは約束を破った。\nなら、自分の手で作る。\n本当に真実を追求するAIを。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // Colossus
  {
    id: "ch3-colossus",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/datacenter-real.webp",
    text: "たった122日で、\n世界最大のAI計算センターを建てた。",
    subText:
      "テネシー州メンフィス──アメリカ南部の工業都市。\n使われなくなった巨大な家電工場を買い取り、\nAIの学習に必要な大量の計算を\n同時にこなせる専用チップ「GPU」を\n10万個から20万個へ倍増させた。",
    badge: "xAI",
    stat: "200,000個",
    statLabel: "AIチップの数",
    accentColor: PURPLE,
  },
  // ジェンセン・ファン
  {
    id: "ch3-jensen",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/jensen-huang-real-2.jpg",
    text: "そのGPUを作っている男。",
    subText:
      "ジェンセン・ファン。\n半導体メーカーNVIDIA（エヌビディア）のCEO。\nChatGPTも、イーロンのGrokも、\nGoogleのGeminiも──\n世界中のAIは\nほぼ全てこの男が作ったGPUで動いている。",
    badge: "NVIDIA",
    accentColor: PURPLE,
  },
  // Neuralink
  {
    id: "ch3-neuralink",
    type: "manga-panel",
    chapter: 3,
    imageUrl: "images/elon-photo-11.webp",
    text: "",
    accentColor: PURPLE,
    speechBubbles: [
      {
        text: "AIが人間より賢くなる日が来る。\nそのとき人間が取り残されないために、\n脳そのものを\nアップグレードする必要がある。",
        position: "left",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  {
    id: "ch3-neuralink-detail",
    type: "image-hero",
    chapter: 3,
    imageUrl: "images/noland-arbaugh-real.webp",
    text: "2024年1月。\n人類初の脳チップ手術。",
    subText:
      "ノーランド・アーボウ。\n首から下が動かない彼の脳に、\n小さなチップを埋め込んだ。\n「動け」と念じるだけで\n画面のカーソルが動いた。\n\nまずは体が動かない人を助ける。\nそしていつか、人間の脳そのものを\nパワーアップさせる。",
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
    type: "manga-panel",
    chapter: null,
    imageUrl: ELON_C,
    text: "",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "AIで知能を拡張する。\nだが、もう一つの危機が迫っている。\nそもそも「働く人間」が\nいなくなりつつある。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },

  // ════════════════════════════════════════
  //  危機 04 — 労働力の不足
  // ════════════════════════════════════════
  {
    id: "ch4-title",
    type: "chapter-title",
    chapter: 4,
    imageUrl: "images/population-decline-real.webp",
    text: "危機 04",
    subText: "労働力の不足",
    accentColor: GREEN,
  },
  {
    id: "ch4-birthrate",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/empty-classroom.webp",
    text: "子どもが生まれない。",
    subText:
      "女性1人が一生のうちに産む子どもの数。\n人口が減らないためには「2.1人」が必要。\nでも今の韓国は0.72。日本は1.20。\nこのままでは、介護する人も、\n工場で働く人も、\nトラックの運転手も足りなくなる。",
    accentColor: GREEN,
  },
  // イーロンの動機（Optimus前の橋渡し）
  {
    id: "ch4-optimus-idea",
    type: "manga-panel",
    chapter: 4,
    imageUrl: "images/elon-photo-14.webp",
    text: "",
    accentColor: GREEN,
    speechBubbles: [
      {
        text: "人が足りなくなるなら、\n人の形をしたロボットを作ればいい。\n24時間働いて、文句も言わない。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // Optimus 進化
  {
    id: "ch4-optimus-gen1",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-gen1-hq.webp",
    text: "2023年3月。Optimus Gen 1。",
    subText:
      "まだ荒削り。\nむき出しの配線、ぎこちない歩き方。\nでも、人の形をしたロボットを\n大量に作るという途方もない挑戦が始まった。",
    badge: "Optimus Gen1",
    accentColor: GREEN,
  },
  {
    id: "ch4-optimus-gen2",
    type: "image-hero",
    chapter: 4,
    imageUrl: "images/optimus-gen2-hq.webp",
    text: "9ヶ月後。Gen 2。\n別物になった。",
    subText:
      "2023年12月。\nたった9ヶ月でまるで別物に。\n卵を割らずに持てるほど繊細な指。\n30%軽くなった体。\nそして24時間、休まず働ける。",
    badge: "Optimus Gen2",
    stat: "$20,000",
    statLabel: "1台の目標価格（約300万円）",
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
      "Tesla Cybercab（サイバーキャブ）。\nハンドルもアクセルもない完全自動運転タクシー。\n充電はワイヤレス──停めるだけで充電が始まる。\n人間の運転手がいないから、24時間走り続ける。",
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
    imageUrl: "images/traffic-jam-real.webp",
    text: "危機 05",
    subText: "動かない車、消える時間",
    accentColor: WARM,
  },
  {
    id: "ch5-traffic",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/traffic-jam-real.webp",
    text: "年間51時間。",
    subText:
      "アメリカ人が渋滞で失う時間。\n一生分だと約3,300時間。\n動けず、ただ時間だけが過ぎていく。",
    stat: "51時間/年",
    statLabel: "渋滞で失われる時間（INRIX 2023）",
    accentColor: WARM,
  },
  // イーロンのツイート
  {
    id: "ch5-tweet",
    type: "manga-panel",
    chapter: 5,
    imageUrl: "images/elon-photo-13.webp",
    text: "2016年12月17日。",
    accentColor: WARM,
    speechBubbles: [
      {
        text: "渋滞マジでムリ。\nトンネルを掘る機械を買って、\n今すぐ穴を掘り始めるわ。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  {
    id: "ch5-3d-city",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/tunnel-boring-real.webp",
    text: "ビルは上に伸びるのに、\n道路は平面のまま。",
    subText: "街は3Dなのに、交通は2Dだ。\n地下にもう一層作ればいい。",
    badge: "The Boring Company",
    stat: "1/10",
    statLabel: "従来の1/10のコストでトンネルを掘る",
    accentColor: WARM,
  },
  // Boring Companyの実績
  {
    id: "ch5-boring-method",
    type: "manga-panel",
    chapter: 5,
    imageUrl: "images/elon-photo-15.webp",
    text: "",
    accentColor: WARM,
    speechBubbles: [
      {
        text: "既存のトンネル掘削機は遅すぎる。\nカタツムリより遅い。\nだから、自分たちで速い掘削機を作る。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
    subText:
      "2016年12月、本当に「The Boring Company」を設立。\n「boring」は英語で「退屈」と「掘削」の\nダブルミーニング。",
  },
  // Vegas Loop
  {
    id: "ch5-vegas",
    type: "image-hero",
    chapter: 5,
    imageUrl: "images/vegas-loop-interior.webp",
    text: "ラスベガスの地下で、\nもう走っている。",
    subText:
      "「Vegas Loop」。\nラスベガスの地下に掘ったトンネルの中を、\nテスラの車が乗客を乗せて走っている。\nすでに8駅が営業中。\n2026年には空港までつながる予定。\n最終的には約110km、104駅の\n地下ネットワークになる。",
    badge: "Vegas Loop",
    accentColor: WARM,
  },
  // Vegas Loopの体験
  {
    id: "ch5-vegas-experience",
    type: "text-only",
    chapter: 5,
    imageUrl: null,
    text: "歩けば25分の距離を、\n2分で移動できる。",
    subText:
      "ラスベガスの展示会場LVCC。\n端から端まで歩くと25分かかる巨大施設。\nVegas Loopなら2分。\nしかも無料で乗れる。\n利用者はすでに累計500万人を超えた。",
    stat: "500万人+",
    statLabel: "累計利用者数（2024年末時点）",
    accentColor: WARM,
  },

  // ════════════════════════════════════════
  //  BRIDGE 5→6
  // ════════════════════════════════════════
  {
    id: "bridge-5-6",
    type: "manga-panel",
    chapter: null,
    imageUrl: "images/elon-photo-18.webp",
    text: "",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "地下のトンネルの次は、空だ。\n世界中をつなげる。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },

  // ════════════════════════════════════════
  //  危機 06 — つながれない22億人
  // ════════════════════════════════════════
  {
    id: "ch6-title",
    type: "chapter-title",
    chapter: 6,
    imageUrl: "images/x-hq-real.webp",
    text: "危機 06",
    subText: "つながれない22億人",
    accentColor: TEXT,
  },
  // ウクライナ侵攻
  {
    id: "ch6-ukraine",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/ukraine-real.webp",
    text: "2022年2月。\nロシアがウクライナに侵攻。",
    subText:
      "電話の基地局やネット回線が\n爆撃で破壊された。\n電話もできない。ネットもつながらない。\n軍の連絡も、家族の安否確認もできない。",
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
      "「@elonmusk\nあなたが火星を目指している間に、\nロシアがウクライナを占領しようとしている。\nStarlink（衛星インターネット）の\n端末を送ってくれ。」",
    accentColor: TEXT,
  },
  // イーロンの即応
  {
    id: "ch6-elon-response",
    type: "manga-panel",
    chapter: 6,
    imageUrl: "images/elon-photo-24.webp",
    text: "10時間後。",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "Starlinkサービス、\nウクライナで起動完了。\n端末も送る。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "hero",
      },
    ],
  },
  // Starlinkの説明
  {
    id: "ch6-starlink-explain",
    type: "manga-panel",
    chapter: 6,
    imageUrl: "images/elon-photo-25.webp",
    text: "",
    accentColor: TEXT,
    speechBubbles: [
      {
        text: "宇宙に小さな衛星を何千個も飛ばして、\n地球全体をカバーする\nインターネット網を作る。\n砂漠でも、海の上でも、戦場でも、\n空が見える場所ならどこでも\nネットにつながる。",
        position: "right",
        delay: 0.5,
        speaker: ELON,
        speakerName: "Elon Musk",
        emphasis: "quiet",
      },
    ],
  },
  // Starlink衛星
  {
    id: "ch6-starlink",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/starlink-real.webp",
    text: "今も世界に22億人、\nネットに接続できない人がいる。",
    subText: "ネット回線を引けない場所に、空から届ける。",
    badge: "Starlink",
    stat: "9,400基+",
    statLabel: "宇宙を飛ぶ衛星の数",
    accentColor: TEXT,
  },
  // X / Everything App
  {
    id: "ch6-x",
    type: "image-hero",
    chapter: 6,
    imageUrl: "images/elon-photo-22.webp",
    text: "声を届け、お金を届ける。",
    subText:
      "世界には銀行口座を持てない人が13億人いる。\nスマホ1台でお金を送ったり、\n買い物したり、貯金したりできるアプリ。\n\nイーロンは1999年に「X.com」という\nネット決済サービスを作った男。\nあのPayPalの前身だ。\nTwitterを買って「X」に変えたのは、\nその夢の続きだった。",
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
    imageUrl: "images/earth-blue-marble.webp",
    text: "意識の灯を、消さないために。",
    elonQuote:
      "Consciousness is a very rare and precious thing. We should take whatever steps we can to preserve the light of consciousness.",
    elonQuoteJp:
      "意識はとても稀で、貴重なものだ。\n意識の灯を守るために、\nできることは全てやるべきだ。",
    accentColor: GOLD,
  },
];
