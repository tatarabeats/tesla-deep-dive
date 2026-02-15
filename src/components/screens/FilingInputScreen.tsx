import { useState } from 'react';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';

export function FilingInputScreen() {
  const { startRound, navigate } = useGame();
  const { play } = useSound();
  const [_text, setText] = useState('');

  const handleStartQuiz = () => {
    play('roundStart');
    startRound('sec_filing');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('module_select')}
          className="text-xl cursor-pointer hover:opacity-80"
          style={{ color: 'var(--muted)' }}
        >←</button>
        <h1 className="text-xl font-extrabold">📄 10-K/10-Q クイズ</h1>
      </div>

      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-2 gold-text">プリビルト問題で学習</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
          テスラの最新SEC filingから作成された問題で学習できます。
        </p>
        <button
          onClick={handleStartQuiz}
          className="w-full btn-rpg btn-rpg-blue py-3 text-sm"
        >
          📄 クイズ開始（プリビルト）
        </button>
      </div>

      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-2" style={{ color: 'var(--muted)' }}>テキストを貼り付け（coming soon）</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
          10-Kや10-Qの全文をここに貼り付けると、自動でクイズを生成します。
        </p>
        <textarea
          value={_text}
          onChange={(e) => setText(e.target.value)}
          placeholder="SEC filingのテキストをここに貼り付け..."
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
