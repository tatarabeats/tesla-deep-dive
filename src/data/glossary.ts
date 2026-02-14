export interface GlossaryEntry {
  term: string;
  reading?: string;
  short: string;
}

// Terms sorted longest-first so regex matching picks up longer terms before shorter substrings
export const glossary: GlossaryEntry[] = [
  // ── Tesla Specific ──
  { term: 'フリーキャッシュフロー', reading: 'FCF', short: '営業活動で得たお金から設備投資を引いた「本当に自由に使えるお金」。テスラは2024年にFCF $3.6Bを創出。' },
  { term: 'Full Self-Driving', reading: 'FSD', short: 'テスラの完全自動運転機能。現在はLv2+（Supervised）だが、将来的にロボタクシー事業の核になると期待。月$99のサブスク。' },
  { term: 'コングロマリット・ディスカウント', short: '多角化しすぎた企業が市場に割安評価されること。テスラは逆に「Auto+Energy+AI+Robot」の統合が評価されている。' },
  { term: 'バリュエーション', short: '企業の価値評価。PERやDCF等で「今の株価は割高か割安か」を判断する。テスラのPER 65xは市場の高い期待を反映。' },
  { term: 'リカーリング収益', short: '毎月・毎年繰り返し入る安定収入。テスラではFSDサブスク、Supercharging、保険がこれに該当する。' },
  { term: 'フライホイール効果', short: '好循環のこと。テスラでは車両販売→走行データ増→FSD改善→車の価値向上→さらに販売増、という循環。' },
  { term: 'ネットワーク効果', short: 'ユーザーが増えるほど価値が上がる現象。テスラのSupercharger網は車が増えるほど投資効率が上がる。' },
  { term: 'スイッチングコスト', short: '乗り換えの手間やコスト。テスラはSupercharger網、FSD学習データ、アプリ連携で高いスイッチングコストを構築。' },
  { term: 'Shanghai Gigafactory', short: 'テスラの中国上海工場。Model 3/Yを年95万台以上生産可能。テスラで最も効率的な工場。' },
  { term: 'Gigafactory Texas', short: 'テキサス州オースティンの本社兼工場。Cybertruck、Model Y、将来的にOptimus生産拠点。' },
  { term: 'Gigafactory Berlin', short: 'ドイツ・ベルリン近郊の欧州工場。Model Y生産。欧州市場向けの製造・物流拠点。' },
  { term: 'Gigafactory Nevada', short: 'ネバダ州リノのバッテリー工場。4680セルとMegapackを生産。パナソニックとの合弁で開始。' },
  { term: 'スケールメリット', short: '生産量が増えるほど1台あたりのコストが下がること。テスラは年200万台規模で固定費按分が改善。' },
  { term: 'OTAアップデート', reading: 'Over-The-Air', short: '無線でソフトウェアを更新する仕組み。テスラは販売後も車の機能を追加・改善でき、従来のリコールより効率的。' },
  { term: 'Supercharger', short: 'テスラの急速充電ネットワーク。世界6万基以上。NACSコネクタが北米標準に採用され、他社EVにも開放中。' },
  { term: 'ロボタクシー', short: 'テスラが計画する無人タクシーサービス。専用車両Cybercabで2025年開始予定。FSD完成が前提条件。' },
  { term: '規制クレジット', short: 'EV製造でCO2排出枠を余らせた分を他社に販売できる権利。テスラの高利益率収入だが、他社のEV化で将来減少見込み。' },
  { term: '繰延収益', short: '前受けした売上のうち、まだサービス提供が完了していない分。テスラではFSD一括購入の未認識分が計上される。' },
  { term: 'レギュラトリークレジット', short: '規制クレジットの英語表記。排出規制を達成したメーカーが、未達成メーカーにクレジットを売却できる。' },
  { term: '能力の輪', short: '李録（Li Lu）の投資哲学。自分が深く理解できる分野だけに投資すべきという概念。深い理解が確信を生む。' },
  { term: 'Autopilot', short: 'テスラの標準搭載ADAS。車線維持とアダプティブクルーズが含まれる。FSDはこの上位版。' },
  { term: 'Cybertruck', short: 'テスラのピックアップトラック。ステンレス鋼ボディ、2023年末から納車開始。米国最大の車両セグメントに参入。' },
  { term: 'Megapack', short: 'テスラの大型蓄電池システム。ユーティリティ規模（3.9MWh/ユニット）。Energy部門の主力製品で受注残数年分。' },
  { term: 'Powerwall', short: 'テスラの家庭用蓄電池。太陽光発電と組み合わせて家庭の電力を自給自足。Powerwall 3は最大出力11.5kW。' },
  { term: 'Solar Roof', short: 'テスラの太陽光発電一体型屋根材。通常の瓦に見える太陽電池パネル。Powerwallと連携して家庭用電力を賄う。' },
  { term: '4680セル', short: 'テスラの次世代バッテリーセル。直径46mm×長さ80mm。従来の2170セルよりエネルギー密度が高くコスト低減。' },
  { term: 'Optimus', short: 'テスラのヒューマノイドロボット。FSDのAI技術を転用。イーロンは「テスラ最大の事業になる」と主張。' },
  { term: 'Cybercab', short: 'テスラの専用ロボタクシー車両。ハンドル・ペダルなしの2人乗り。$30,000以下での販売を目標。' },
  { term: 'Dojo', short: 'テスラ独自のAIスーパーコンピュータ。FSD学習用に設計された専用チップD1を搭載。NVIDIAへの依存を減らす狙い。' },

  // ── Competitors ──
  { term: 'BYD', reading: 'ビーワイディー', short: '中国の電気自動車・バッテリーメーカー。2024年にEV+PHEV販売台数でテスラの約1.7倍。低価格帯が強み。' },
  { term: 'Waymo', reading: 'ウェイモ', short: 'Alphabet傘下の自動運転企業。LiDARベースのアプローチでフェニックス等で商用サービス運行中。テスラのカメラ方式と対照的。' },
  { term: 'Rivian', reading: 'リビアン', short: '米国のEVスタートアップ。R1T（トラック）とR1S（SUV）を製造。Amazonの配達バンも受注。まだ赤字段階。' },
  { term: 'Lucid', reading: 'ルシッド', short: '米国の高級EVメーカー。Lucid AirはEPA航続距離500マイル超。サウジアラビアのPIFが筆頭株主。' },
  { term: 'CATL', reading: 'シーエーティーエル', short: '中国の世界最大バッテリーメーカー。EV用リチウムイオン電池で世界シェア約35%。テスラにも供給。' },

  // ── Financial Metrics ──
  { term: '営業利益率', short: '売上から原価と販管費を引いた利益の割合。テスラのFY2024は約7.6%で、BYDの6.4%をやや上回る。' },
  { term: '粗利益率', short: '売上から原価を引いた利益の割合。テスラAutomotiveは約18%、Energyは約27%。値下げ戦略で2022年の28%から低下。' },
  { term: '時価総額', short: '株価×発行株数。テスラの時価総額は約$800Bで、トヨタ（$280B）の約3倍。市場はテスラをテック企業として評価。' },
  { term: '粗利率', short: '粗利益率と同じ。ビジネスモデルの質を測る基本指標。テスラはソフトウェア収益比率が上がるほど改善する。' },
  { term: 'CapEx', reading: 'キャペックス', short: '設備投資額。テスラのFY2024 CapExは約$11B。Gigafactory拡張とAIインフラに投入。' },
  { term: 'EBITDA', reading: 'イービットダー', short: '利払い・税・減価償却前利益。設備投資が大きいテスラの実力を測るのに使う。' },
  { term: 'PER', reading: 'ピーイーアール', short: '株価収益率。テスラは約65倍でBYDの20倍、トヨタの10倍を大きく上回る。自動運転・ロボットの期待を反映。' },
  { term: 'EPS', reading: 'イーピーエス', short: '1株当たり利益。テスラのFY2024 EPSは約$2.42。自社株買いは未実施だが、利益成長で改善を目指す。' },
  { term: 'ASP', reading: 'エーエスピー', short: '平均販売単価。テスラのASPは約$43,000でBYDの$17,000の2.5倍。プレミアムブランドのポジション。' },
  { term: 'DCF', reading: 'ディーシーエフ', short: '将来のキャッシュフローを割り引いて現在価値を求める評価法。テスラのDCFはFSD/ロボタクシーの前提次第で大きく変わる。' },
  { term: 'TAM', reading: 'タム', short: '獲得可能な最大市場規模。テスラが狙うTAMはEV（$800B）+Energy（$200B）+ロボタクシー（$1T+）+ロボット（$10T+）。' },
  { term: 'ROI', reading: 'アールオーアイ', short: '投資利益率。テスラのGigafactory投資のROIは業界最高水準。Shanghai工場は投資回収済み。' },
  { term: 'R&D', reading: 'アールアンドディー', short: '研究開発費。テスラのFY2024 R&Dは約$4.6B。FSD、4680バッテリー、Optimus等に投資。' },

  // ── Industry Terms ──
  { term: '地政学リスク', short: '国際政治が企業業績に影響するリスク。テスラは米中関係悪化でShanghai工場の運営リスクを抱える。' },
  { term: '規模の経済', short: '生産量が増えるほどコストが下がること。テスラは年200万台→300万台に拡大して更なるコスト削減を狙う。' },
  { term: '垂直統合', short: '設計から製造・販売まで自社で行うこと。テスラはバッテリー、ソフト、充電インフラまで垂直統合。' },
  { term: '参入障壁', short: '新規参入を阻む要因。テスラのSupercharger網、FSDデータ、製造ノウハウは高い参入障壁を構成。' },
  { term: 'LiDAR', reading: 'ライダー', short: 'レーザーで周囲を3Dスキャンするセンサー。Waymoは採用、テスラは「不要」としてカメラのみで自動運転を目指す。' },
  { term: 'NHTSA', reading: 'ニッツァ', short: '米国高速道路交通安全局。Autopilot/FSDの安全性を監督する規制当局。リコール命令の権限を持つ。' },
  { term: 'NACS', reading: 'ナックス', short: 'North American Charging Standard。テスラが開発した充電規格。北米標準に採用され、Ford、GM等も採用。' },
  { term: 'FSD', reading: 'エフエスディー', short: 'Full Self-Driving。テスラの完全自動運転機能。月$99サブスクまたは$8,000で購入。ロボタクシーの前提技術。' },
  { term: 'EV', short: '電気自動車。テスラは2024年に約179万台を納車。世界EV市場は年20%以上成長中。' },
  { term: 'AI', short: '人工知能。テスラはFSD、Dojo、Optimusの3つのAI事業を展開。イーロンはテスラを「AI/ロボティクス企業」と位置づけ。' },
  { term: 'OTA', reading: 'オーティーエー', short: 'Over-The-Air。無線ソフトウェア更新。テスラの全車両がOTA対応で、販売後も機能追加が可能。' },
].sort((a, b) => b.term.length - a.term.length);
