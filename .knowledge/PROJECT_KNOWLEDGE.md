# Elon's Vision — プロジェクト知見

## 概要
イーロン・マスクのビジョン（6つの危機 × 6つの会社）を、映画的スクロールストーリーテリングで伝えるWebサイト。
React + TypeScript + Vite + Framer Motion + Tailwind CSS v4 で構築。

## 技術スタック
- **フレームワーク**: React 19 + TypeScript + Vite 7
- **アニメーション**: Framer Motion（フェードイン / スケール）
- **スタイリング**: Tailwind CSS v4 + Vanilla CSS（index.css）
- **スムーズスクロール**: Lenis
- **フォント**: Google Fonts — Noto Sans JP（300-900）

## プロジェクト構造
```
tesla-deep-dive/
├── public/images/          # 全画像アセット（.webp, .jpg）
├── src/
│   ├── components/
│   │   ├── story/
│   │   │   ├── Scene.tsx           # メインシーンコンポーネント（全シーンタイプを描画）
│   │   │   ├── ScrollStory.tsx     # スクロール制御＋Lenisセットアップ
│   │   │   ├── ProgressBar.tsx     # 上部の進捗バー
│   │   │   ├── ChapterIndicator.tsx # 現在のチャプター表示
│   │   │   ├── SceneImage.tsx      # 画像のレイジーロード
│   │   │   └── FurtherReading.tsx  # 最後の参考書籍セクション
│   │   ├── effects/
│   │   │   ├── ParticleField.tsx   # Canvas パーティクルアニメーション
│   │   │   ├── CountUp.tsx         # 数値カウントアップ
│   │   │   └── GlitchText.tsx      # グリッチテキストエフェクト
│   │   └── tree/
│   │       └── VisionTreeExplorer.tsx  # ツリー表示（未使用）
│   ├── data/
│   │   └── storyScenes.ts         # 全ストーリーデータ（テキスト、画像URL、設定）
│   ├── index.css                  # メインCSS（全スタイル定義）
│   └── App.tsx
├── vite.config.ts
├── CLAUDE.md
└── .knowledge/                    # ← このフォルダ
    ├── PROJECT_KNOWLEDGE.md
    └── screenshots/               # サイトのスクリーンショット
```

## シーンタイプ
`storyScenes.ts` で定義される各シーンの `type`:
- **`prologue-crisis`** — 最初のグリッチテキスト画面
- **`chapter-title`** — 各チャプターのタイトルカード（映画風）
- **`image-hero`** — 背景画像 + テキスト（メインの表現手法）
- **`text-only`** — パーティクル背景 + テキストのみ
- **`manga-panel`** — イーロンの引用（吹き出し付き）
- **`data-reveal`** — データ / 統計の表示
- **`success`** — クライマックスシーン（フラッシュ + ゴールドグロー）

## ストーリー構成（6つの危機）
1. **危機01: 地球にしか住んでいない** → SpaceX
2. **危機02: 石油と石炭に頼りすぎている** → Tesla / Solar
3. **危機03: AIの暴走** → xAI（Grok）
4. **危機04: 人口減少** → Neuralink / The Boring Company
5. **危機05: 渋滞で消える人生** → The Boring Company / Tesla FSD
6. **危機06: ネットが届かない22億人** → Starlink

## 実施済みの改善（2026/02/28）

### タイポグラフィ
- Google Fonts `Noto Sans JP` 導入（300-900ウェイト）
- テキストコンテナ: `max-width: 820px`（hero）、`900px`（text-only）
- プロローグ: `white-space: nowrap` で1行表示を保証
- hero-text: `clamp(26px, 7vw, 42px)` / sub-text: `clamp(13px, 3vw, 18px)`

### クライマックス「成功。」演出
- 白フラッシュオーバーレイ → ゴールドラジアルグロー → 巨大テキスト
- テキストサイズ: `clamp(56px, 20vw, 140px)`
- パーティクル爆発エフェクト: 80個、electricバリアント

### パフォーマンス最適化
- ParticleField: `createRadialGradient` → `fillCircle + lighter compositing`
- 全シーンの `connectDistance: 0`（接続線無効化、O(n²)回避）
- パーティクル数: プロローグ80、チャプタータイトル50、クライマックス80

### テキスト品質
- 長すぎるタイトルを短縮（例:「2008年9月28日。4回目が打ち上がった。」→「4回目の打ち上げ。」）
- 不自然な改行位置の修正

### UI/UX
- プロローグに SCROLL ヒント追加
- チャプタータイトルを映画風に強化（装飾線、サブタイトル表示）
- マンガパネル: バブル幅 520px、blur 12px

## デプロイ設定
- **GitHub Pages**: `base: '/tesla-deep-dive/'`（`GITHUB_ACTIONS` 環境変数で自動判定）
- **Vercel**: `base: '/'`（デフォルト）
- vite.config.ts で `process.env.GITHUB_ACTIONS ? '/tesla-deep-dive/' : '/'` 設定済み
- GitHub リポジトリ: `https://github.com/tatarabeats/tesla-deep-dive.git`

## 画像パス
全ての画像は `import.meta.env.BASE_URL` を使って参照:
```tsx
const imgSrc = scene.imageUrl ? `${import.meta.env.BASE_URL}${scene.imageUrl}` : undefined;
```

## 既知の課題
- `@theme` lint警告: Tailwind CSS v4の `@theme` ディレクティブをVSCodeのCSS validatorが認識しない（無害）
- Vercel CLIがNode.js v24と互換性問題あり（`vercel login` が失敗）
- モバイル最適化がまだ不十分

## スクリーンショット
`screenshots/` フォルダに現在のサイトの各シーンのスクリーンショットを保存済み:
- `01_prologue.png` — プロローグ画面
- `02_intro.png` — イーロン紹介 + 6つの危機テーマ
- `03_chapter1_title.png` — 危機01 チャプタータイトル
- `04_extinction.png` — 大量絶滅の歴史
- `05_manga_panel.png` — イーロンの引用パネル
- `06_rocket_launch.png` — ロケット打ち上げシーン
- `07_success_climax.png` — 「成功。」クライマックス
- `08_chapter2_title.png` — 危機02 チャプタータイトル
- `09_chapter3_ai.png` — 危機03 AI脅威
- `10_chapter5_traffic.png` — 危機05 渋滞データ
- `11_further_reading.png` — 参考書籍セクション
