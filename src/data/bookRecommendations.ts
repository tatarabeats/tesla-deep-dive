export interface Book {
  title: string;
  titleJp?: string;
  author: string;
  /** Why this book matters — tied to the story the reader just experienced */
  connection: string;
  amazonUrl: string;
  accentColor: string;
}

export interface ChapterBooks {
  chapter: number;
  chapterTitle: string;
  books: Book[];
}

// Amazon アソシエイトタグ
const TAG = "aijunkie-22";

// ── ヒーロー本（最も売りたい1冊） ──
export const heroBook: Book = {
  title: "イーロン・マスク",
  author: "ウォルター・アイザックソン",
  connection:
    "あなたが今読んだ物語の全てが、この本に書かれている。2年間イーロンに密着取材した公式伝記。SpaceX、Tesla、OpenAI、X──6つの会社の裏側を、これ以上ない解像度で描いた1,000ページ。",
  amazonUrl: `https://www.amazon.co.jp/dp/4163917578?tag=${TAG}`,
  accentColor: "rgba(255, 225, 140, 0.9)",
};

// ── チャプター別おすすめ ──
export const chapterBooks: ChapterBooks[] = [
  {
    chapter: 1,
    chapterTitle: "単一惑星への依存",
    books: [
      {
        title: "The Case for Mars",
        titleJp: "火星を拓く",
        author: "ロバート・ズブリン",
        connection:
          "ストーリーで登場した「イーロンの人生を変えた一冊」がこれ。今の技術で火星に行ける具体的な計画書。SpaceXはこの本から生まれた。",
        amazonUrl: `https://www.amazon.co.jp/dp/145160811X?tag=${TAG}`,
        accentColor: "rgba(80, 200, 255, 0.9)",
      },
      {
        title: "火星の人",
        author: "アンディ・ウィアー",
        connection:
          "火星に一人取り残された宇宙飛行士のサバイバル小説。イーロンが「科学的に正確」と絶賛。映画『オデッセイ』の原作。",
        amazonUrl: `https://www.amazon.co.jp/dp/4150120323?tag=${TAG}`,
        accentColor: "rgba(80, 200, 255, 0.9)",
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
        connection:
          "テスラの内幕。Roadsterの資金難、量産地獄、イーロンと共同創業者の対立──ストーリーで語れなかった裏側が全て書かれている。",
        amazonUrl: `https://www.amazon.co.jp/dp/4822289982?tag=${TAG}`,
        accentColor: "rgba(255, 90, 80, 0.9)",
      },
      {
        title: "地球の未来のため僕が決断したこと",
        author: "ビル・ゲイツ",
        connection:
          "CO₂の374億トンが何を意味するのか。EVだけでは足りない理由。もう一人の世界的富豪が描くクリーンエネルギーの全体像。",
        amazonUrl: `https://www.amazon.co.jp/dp/4152100389?tag=${TAG}`,
        accentColor: "rgba(255, 90, 80, 0.9)",
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
        connection:
          "「AIは核兵器より危険」──イーロンのこの言葉の意味がわかる。MITの物理学者が描くAI時代の未来。イーロン自身が絶賛した一冊。",
        amazonUrl: `https://www.amazon.co.jp/dp/4314011629?tag=${TAG}`,
        accentColor: "rgba(180, 130, 255, 0.9)",
      },
      {
        title: "AI 2041",
        author: "カイフー・リー & チェン・チウファン",
        connection:
          "ChatGPTの衝撃はまだ序章。2041年、AIが社会をどう変えるか。10の短編小説と技術解説で描く近未来。",
        amazonUrl: `https://www.amazon.co.jp/dp/4163916148?tag=${TAG}`,
        accentColor: "rgba(180, 130, 255, 0.9)",
      },
    ],
  },
  {
    chapter: 4,
    chapterTitle: "労働力の不足",
    books: [
      {
        title: "ザ・セカンド・マシン・エイジ",
        author: "エリック・ブリニョルフソン",
        connection:
          "ロボットとAIが人間の仕事を奪う？ Optimusが目指す未来の経済学的な意味。MITの研究者が描く第二の機械時代。",
        amazonUrl: `https://www.amazon.co.jp/dp/4822251810?tag=${TAG}`,
        accentColor: "rgba(80, 220, 140, 0.9)",
      },
      {
        title: "未来の年表",
        author: "河合雅司",
        connection:
          "韓国0.72、日本1.20──この数字の先に何が起きるか。2065年までの人口減少カレンダー。日本人なら必読。",
        amazonUrl: `https://www.amazon.co.jp/dp/4065330009?tag=${TAG}`,
        accentColor: "rgba(80, 220, 140, 0.9)",
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
        connection:
          "「ビルは上に伸びるのに、道路は平面のまま」──この問題の歴史的背景と、都市インフラが人類を進化させてきた物語。",
        amazonUrl: `https://www.amazon.co.jp/dp/4140816031?tag=${TAG}`,
        accentColor: "rgba(200, 180, 150, 0.9)",
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
        connection:
          "Twitter買収の真相、Starlinkの世界展開、Xへの変革──伝記の後半は、まさに危機06の物語そのもの。",
        amazonUrl: `https://www.amazon.co.jp/dp/4163917586?tag=${TAG}`,
        accentColor: "rgba(232, 220, 200, 0.9)",
      },
    ],
  },
];
