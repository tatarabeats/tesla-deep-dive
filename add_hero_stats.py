"""Add heroStat and heroCaption to all nodes in visionTree.ts"""
import re

HERO_DATA = {
    'root': ('6つの脅威', '全てに解を持つ1人の人間'),
    'single-planet': ('5回', '地球はすでに5回の大量絶滅を経験'),
    'extinction-risk': ('138億年', '宇宙で知的生命が確認された惑星は地球だけ'),
    'starship': ('$10/kg', '宇宙輸送コスト目標 — 従来の100分の1'),
    'reusable-rockets': ('25回+', 'Falcon 9ブースター再利用回数の記録'),
    'mars-colony': ('100万人', '自給自足火星都市の目標人口'),
    'isru': ('95%', '火星大気のCO2 — 燃料の原料になる'),
    'terraforming': ('数百年', '火星を歩ける惑星にする計画の時間軸'),
    'starlink-connectivity': ('118億ドル', '2025年のStarlink年間売上'),
    'direct-to-cell': ('80億人', '既存スマホがそのまま衛星電話になる'),
    'starlink-mars-comms': ('4〜24分', '地球-火星間の通信遅延'),
    'fossil-fuel': ('374億トン/年', '化石燃料によるCO2排出量'),
    'ev-transition': ('4.4倍', 'EVはガソリン車よりエネルギー効率が高い'),
    'master-plan-strategy': ('3段階', 'ロードスター→セダン→大衆車の戦略'),
    'fsd-autonomy': ('7倍安全', 'FSDは人間の運転より安全'),
    'cybercab': ('$30,000以下', '運転席のない自動運転専用タクシー'),
    'energy-storage': ('114%増', '2024年のTesla Energy出荷量成長率'),
    'megapack-grid': ('4GWh', 'Megafactoryの年間生産能力'),
    'powerwall-home': ('13.5kWh', '1台で家庭の1日分をバックアップ'),
    'solar-generation': ('10,000倍', '太陽は人類の消費量の10,000倍のエネルギーを供給'),
    'solar-roof': ('25年保証', '屋根全体が発電するソーラールーフ'),
    'master-plan-3': ('240TWh', '地球全体を持続可能エネルギーに移行する蓄電量'),
    'intelligence-limits': ('5年以内', '全人類を超えるAIの到来予測'),
    'ai-development': ('10倍', 'xAI Colossusは世界最大のAIクラスター'),
    'colossus': ('200,000基', 'NVIDIA GPUを搭載した世界最大AIスパコン'),
    'grok': ('リアルタイム', 'Xの投稿データで常に最新の情報にアクセス'),
    'openai-departure': ('2つの道', '営利AI vs 安全重視AI — イーロンの分岐点'),
    'brain-interface': ('1,024ch', 'Neuralink N1チップのチャンネル数'),
    'bandwidth-problem': ('39bit/s', '人間のタイピング速度 — AIとの帯域幅の壁'),
    'blindsight': ('失明者', 'Neuralinkで視覚を取り戻す最初の製品'),
    'telepathy': ('テレパシー', '脳から直接デバイスを操作する技術'),
    'bci-alignment': ('共生', '人間がAIと融合して知能格差を解消する'),
    'population-decline': ('0.75', '韓国の出生率 — 世界最低'),
    'optimus-robot': ('$20,000〜', 'ヒューマノイドロボットの量産価格目標'),
    'humanoid-design': ('28自由度', 'Optimusの手だけで28の関節'),
    'fsd-to-robot': ('同じAI', 'FSDの自動運転技術をロボットに転用'),
    'optimus-price': ('$20,000〜', '車より安いヒューマノイドロボット'),
    'autonomous-transport': ('16時間/日', 'ロボタクシーは人間より2倍稼働できる'),
    'cybercab-labor': ('年80%削減', 'ライドシェアの人件費をほぼゼロに'),
    'semi-truck': ('500マイル', 'Tesla Semi — EV大型トラックの航続距離'),
    'abundance-economy': ('GDP 2倍', 'ロボットで人間の労働力不足を完全補完'),
    'mobility-inefficiency': ('870億ドル', '米国の年間渋滞コスト'),
    'underground-network': ('1/10', 'トンネル掘削コストを10分の1に削減'),
    'tunnel-cost-reduction': ('$1,000万/マイル', '従来の1/10のトンネル建設コスト目標'),
    'intracity-transit': ('200km/h', '都市内地下ループの目標速度'),
    'intercity-transit': ('マッハ級', 'Hyperloopの都市間超高速輸送構想'),
    'info-finance-gap': ('22億人', 'インターネット未接続の人口'),
    'global-connectivity': ('9,400基+', '軌道上のStarlink衛星数'),
    'starlink-stats': ('1,000万人+', 'Starlink加入者数'),
    'starlink-disaster': ('10,000台+', 'ハリケーン・ヘレーンで配布されたStarlinkキット'),
    'free-speech-platform': ('6億人', 'X（旧Twitter）の月間アクティブユーザー'),
    'community-notes': ('クラウド', 'コミュニティノート — 集合知によるファクトチェック'),
    'censorship-problem': ('80%以上', 'イーロン買収前のTwitter社員がリベラル寄り'),
    'financial-inclusion': ('13億人', '銀行口座を持てない成人の数'),
    'x-payments': ('送金手数料0', 'X Paymentsの目標 — 金融アクセスの民主化'),
    'everything-app': ('WeChat型', '1つのアプリで全てが完結するスーパーアプリ'),
}

with open('C:/Users/shunp/tesla-deep-dive/src/data/visionTree.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for node_id, (stat, caption) in HERO_DATA.items():
    # Find the icon line for this node and add heroStat/heroCaption before it
    # Pattern: within the node block, find "icon: '...'"
    # We need to be careful to only match within the correct node

    # Strategy: find "  'node_id': {" then find the next "icon:" line
    node_start = content.find(f"  '{node_id}': {{")
    if node_start == -1:
        print(f"WARNING: node '{node_id}' not found!")
        continue

    # Find the icon line after this node_start
    icon_pos = content.find("    icon:", node_start)
    if icon_pos == -1:
        print(f"WARNING: icon not found for '{node_id}'!")
        continue

    # Check if heroStat already exists between node_start and icon_pos
    segment = content[node_start:icon_pos]
    if 'heroStat' in segment:
        print(f"SKIP: '{node_id}' already has heroStat")
        continue

    # Insert heroStat and heroCaption before the icon line
    escaped_stat = stat.replace("'", "\\'")
    escaped_caption = caption.replace("'", "\\'")
    insert_text = f"    heroStat: '{escaped_stat}',\n    heroCaption: '{escaped_caption}',\n"

    content = content[:icon_pos] + insert_text + content[icon_pos:]
    print(f"OK: '{node_id}'")

with open('C:/Users/shunp/tesla-deep-dive/src/data/visionTree.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone! Added heroStat/heroCaption to {len(HERO_DATA)} nodes.")
