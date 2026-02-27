import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { bookRecommendations } from "../../data/bookRecommendations";

const CHAPTER_COLORS: Record<number, string> = {
  1: "rgba(80, 200, 255, 0.9)",
  2: "rgba(255, 90, 80, 0.9)",
  3: "rgba(180, 130, 255, 0.9)",
  4: "rgba(80, 220, 140, 0.9)",
  5: "rgba(200, 180, 150, 0.9)",
  6: "rgba(232, 220, 200, 0.9)",
};

export default function FurtherReading() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section ref={ref} className="further-reading">
      <motion.div
        className="further-reading__header"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="further-reading__line"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,225,140,0.5), transparent)",
          }}
        />
        <h2 className="further-reading__title">もっと深く知りたいあなたへ</h2>
        <p className="further-reading__subtitle">
          各章のテーマをさらに掘り下げる厳選書籍
        </p>
      </motion.div>

      <div className="further-reading__chapters">
        {bookRecommendations.map((rec) => (
          <ChapterBooks key={rec.chapter} rec={rec} />
        ))}
      </div>

      <motion.p
        className="further-reading__footer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        ※ リンクはAmazonアソシエイトを利用しています
      </motion.p>
    </section>
  );
}

function ChapterBooks({ rec }: { rec: (typeof bookRecommendations)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const color = CHAPTER_COLORS[rec.chapter] || "rgba(255,225,140,0.9)";

  return (
    <motion.div
      ref={ref}
      className="further-reading__chapter"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="further-reading__chapter-label" style={{ color }}>
        <span className="further-reading__chapter-num">
          危機 {String(rec.chapter).padStart(2, "0")}
        </span>
        <span className="further-reading__chapter-name">
          {rec.chapterTitle}
        </span>
      </div>

      <div className="further-reading__books">
        {rec.books.map((book, i) => (
          <motion.a
            key={book.title}
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="further-reading__book"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.15,
              ease: "easeOut",
            }}
          >
            <div
              className="further-reading__book-cover"
              style={{ borderColor: `${color.replace("0.9", "0.3")}` }}
            >
              <div
                className="further-reading__book-placeholder"
                style={{ color }}
              >
                📖
              </div>
            </div>
            <div className="further-reading__book-info">
              <span className="further-reading__book-title">{book.title}</span>
              <span className="further-reading__book-author">
                {book.author}
              </span>
              <span className="further-reading__book-desc">
                {book.description}
              </span>
              <span className="further-reading__book-cta" style={{ color }}>
                Amazonで見る →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
