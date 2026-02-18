import { useState } from 'react';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';

export function TranscriptInputScreen() {
  const { startRound, navigate } = useGame();
  const { play } = useSound();
  const [_text, setText] = useState('');

  const handleStartQuiz = () => {
    play('roundStart');
    startRound('earnings_call');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('home')}
          className="text-xl cursor-pointer hover:opacity-80"
          style={{ color: 'var(--muted)' }}
        >←</button>
        <h1 className="text-xl font-extrabold">🎙️ 決算説明会</h1>
      </div>

      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-2 gold-text">プリビルト問題で学習</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
          テスラの直近の決算説明会から作成された問題で学習できます。
        </p>
        <button
          onClick={handleStartQuiz}
          className="w-full btn-rpg btn-rpg-gold py-3 text-sm"
        >
          🎙️ クイズ開始（プリビルト）
        </button>
      </div>

      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-2" style={{ color: 'var(--muted)' }}>トランスクリプト貼り付け（coming soon）</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
          Earnings callのトランスクリプトを貼り付けると、イーロンの発言からクイズを自動生成します。
        </p>
        <textarea
          value={_text}
          onChange={(e) => setText(e.target.value)}
          placeholder="決算説明会のトランスクリプトをここに貼り付け..."
          className="w-full h-32 rounded-xl p-3 text-sm resize-none focus:outline-none"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            color: 'var(--foreground)',
          }}
          disabled
        />
      </div>
    </div>
  );
}
