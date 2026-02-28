import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  heroBook,
  chapterBooks,
  type Book,
} from "../../data/bookRecommendations";

export default function FurtherReading() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });

  return (
    <section ref={ref} className="fr">
      {/* ── Header ── */}
      <motion.div
        className="fr__header"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="fr__header-line" />
        <h2 className="fr__header-title">もっと深く知りたいあなたへ</h2>
        <p className="fr__header-sub">
          各章のテーマに対応する厳選書籍。
          <br />
          イーロンの頭の中を、さらに深く覗く。
        </p>
      </motion.div>

      {/* ── Hero Book ── */}
      <HeroBookCard />

      {/* ── Chapter Books ── */}
      <div className="fr__chapters">
        {chapterBooks.map((ch) => (
          <ChapterSection key={ch.chapter} chapter={ch} />
        ))}
      </div>

      {/* ── Footer ── */}
      <motion.p
        className="fr__footer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        ※ リンクはAmazonアソシエイトを利用しています
      </motion.p>
    </section>
  );
}

// ── Hero Book (full-width premium card) ──
function HeroBookCard() {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={heroBook.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fr__hero"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <div className="fr__hero-badge">RECOMMENDED</div>
      <div
        className="fr__hero-cover"
        style={{
          background: `linear-gradient(135deg, rgba(255,225,140,0.15), rgba(255,180,80,0.08))`,
        }}
      >
        <span className="fr__hero-cover-title">
          ELON
          <br />
          MUSK
        </span>
        <span className="fr__hero-cover-author">Walter Isaacson</span>
      </div>
      <div className="fr__hero-info">
        <h3 className="fr__hero-title">{heroBook.title}</h3>
        <span className="fr__hero-author">{heroBook.author}</span>
        <p className="fr__hero-desc">{heroBook.connection}</p>
        <span className="fr__hero-cta" style={{ color: heroBook.accentColor }}>
          Amazonで読む →
        </span>
      </div>
    </motion.a>
  );
}

// ── Chapter Section ──
function ChapterSection({
  chapter,
}: {
  chapter: (typeof chapterBooks)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const color = chapter.books[0]?.accentColor ?? "rgba(255,225,140,0.9)";

  return (
    <motion.div
      ref={ref}
      className="fr__chapter"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="fr__chapter-label">
        <span className="fr__chapter-num" style={{ color }}>
          危機 {String(chapter.chapter).padStart(2, "0")}
        </span>
        <span className="fr__chapter-name">{chapter.chapterTitle}</span>
      </div>
      <div className="fr__chapter-books">
        {chapter.books.map((book, i) => (
          <BookCard
            key={book.title}
            book={book}
            delay={i * 0.15}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Individual Book Card ──
function BookCard({
  book,
  delay,
  isInView,
}: {
  book: Book;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fr__book"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + delay, ease: "easeOut" }}
    >
      <div
        className="fr__book-cover"
        style={{
          background: `linear-gradient(145deg, ${book.accentColor.replace("0.9", "0.12")}, ${book.accentColor.replace("0.9", "0.04")})`,
          borderColor: book.accentColor.replace("0.9", "0.25"),
        }}
      >
        <span
          className="fr__book-cover-title"
          style={{ color: book.accentColor }}
        >
          {book.titleJp || book.title}
        </span>
      </div>
      <div className="fr__book-info">
        <span className="fr__book-title">{book.titleJp || book.title}</span>
        {book.titleJp && (
          <span className="fr__book-title-en">{book.title}</span>
        )}
        <span className="fr__book-author">{book.author}</span>
        <p className="fr__book-desc">{book.connection}</p>
        <span className="fr__book-cta" style={{ color: book.accentColor }}>
          Amazonで読む →
        </span>
      </div>
    </motion.a>
  );
}
