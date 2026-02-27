export interface BookRecommendation {
  chapter: number;
  chapterTitle: string;
  books: {
    title: string;
    author: string;
    description: string;
    amazonUrl: string;
    coverImage: string;
  }[];
}

// Amazon アソシエイトタグ（取得後に差し替え）
const TAG = "aijunkie-22";

export const bookRecommendations: BookRecommendation[] = [
  {
    chapter: 1,
    chapterTitle: "単一惑星への依存",
    books: [
      {
        title: "イーロン・マスク（上）",
        author: "ウォルター・アイザックソン",
        description:
          "SpaceXの創業から火星計画まで、公式伝記が描くイーロンの全貌。",
        amazonUrl: `https://www.amazon.co.jp/dp/4163917578?tag=${TAG}`,
        coverImage: "images/books/isaacson-musk.jpg",
      },
      {
        title: "火星の人",
        author: "アンディ・ウィアー",
        description:
          "火星に一人取り残された宇宙飛行士のサバイバル。イーロンが愛した小説。",
        amazonUrl: `https://www.amazon.co.jp/dp/4150120323?tag=${TAG}`,
        coverImage: "images/books/the-martian.jpg",
      },
    ],
  },
  {
    chapter: 2,
    chapterTitle: "化石燃料への依存",
    books: [
      {
        title: "POWER PLAY",
        author: "ティム・ヒギンズ",
        description:
          "テスラの内幕を暴くウォール・ストリート・ジャーナル記者の取材録。",
        amazonUrl: `https://www.amazon.co.jp/dp/4822289982?tag=${TAG}`,
        coverImage: "images/books/power-play.jpg",
      },
      {
        title: "地球の未来のため僕が決断したこと",
        author: "ビル・ゲイツ",
        description: "気候変動の科学とクリーンエネルギーへの移行を明快に解説。",
        amazonUrl: `https://www.amazon.co.jp/dp/4152100389?tag=${TAG}`,
        coverImage: "images/books/gates-climate.jpg",
      },
    ],
  },
  {
    chapter: 3,
    chapterTitle: "制御できないAI",
    books: [
      {
        title: "LIFE 3.0",
        author: "マックス・テグマーク",
        description:
          "AI時代の人間の意味を問う。イーロンも絶賛した超知能の未来論。",
        amazonUrl: `https://www.amazon.co.jp/dp/4314011629?tag=${TAG}`,
        coverImage: "images/books/life-3-0.jpg",
      },
      {
        title: "AI 2041",
        author: "カイフー・リー & チェン・チウファン",
        description: "2041年のAI社会を10の短編小説と技術解説で描く。",
        amazonUrl: `https://www.amazon.co.jp/dp/4163916148?tag=${TAG}`,
        coverImage: "images/books/ai-2041.jpg",
      },
    ],
  },
  {
    chapter: 4,
    chapterTitle: "労働力の消滅",
    books: [
      {
        title: "ザ・セカンド・マシン・エイジ",
        author: "エリック・ブリニョルフソン",
        description:
          "ロボットとAIが変える労働市場。経済学者が描く第二の機械時代。",
        amazonUrl: `https://www.amazon.co.jp/dp/4822251810?tag=${TAG}`,
        coverImage: "images/books/second-machine-age.jpg",
      },
      {
        title: "未来の年表",
        author: "河合雅司",
        description: "人口減少が日本にもたらす危機。2024年問題から2065年まで。",
        amazonUrl: `https://www.amazon.co.jp/dp/4065330009?tag=${TAG}`,
        coverImage: "images/books/mirai-nenpyo.jpg",
      },
    ],
  },
  {
    chapter: 5,
    chapterTitle: "動かない車、消える時間",
    books: [
      {
        title: "都市は人類最高の発明である",
        author: "エドワード・グレイザー",
        description:
          "都市密度とインフラが人類を進化させてきた。交通革命の歴史的文脈。",
        amazonUrl: `https://www.amazon.co.jp/dp/4140816031?tag=${TAG}`,
        coverImage: "images/books/triumph-city.jpg",
      },
    ],
  },
  {
    chapter: 6,
    chapterTitle: "つながれない22億人",
    books: [
      {
        title: "イーロン・マスク（下）",
        author: "ウォルター・アイザックソン",
        description: "Twitter買収からXへの変革、Starlinkの拡大。伝記の完結編。",
        amazonUrl: `https://www.amazon.co.jp/dp/4163917586?tag=${TAG}`,
        coverImage: "images/books/isaacson-musk-2.jpg",
      },
      {
        title: "ネットワーク効果",
        author: "アンドリュー・チェン",
        description:
          "プラットフォームが世界を支配する仕組み。X（旧Twitter）の未来を読む。",
        amazonUrl: `https://www.amazon.co.jp/dp/4296001159?tag=${TAG}`,
        coverImage: "images/books/cold-start.jpg",
      },
    ],
  },
];
