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
        <button onClick={() => navigate('module_select')} className="text-duo-text-muted text-xl">←</button>
        <h1 className="text-xl font-extrabold">10-K/10-Q クイズ</h1>
      </div>

      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-sm font-bold mb-2">プリビルト問題で学習</h2>
        <p className="text-xs text-duo-text-muted mb-3">
          テスラの最新SEC filingから作成された問題で学習できます。
        </p>
        <button
          onClick={handleStartQuiz}
          className="w-full btn-duo btn-duo-blue py-3 text-sm"
        >
          📄 クイズ開始（プリビルト）
        </button>
      </div>

      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-sm font-bold mb-2">テキストを貼り付け（coming soon）</h2>
        <p className="text-xs text-duo-text-muted mb-3">
          10-Kや10-Qの全文をここに貼り付けると、自動でクイズを生成します。
        </p>
        <textarea
          value={_text}
          onChange={(e) => setText(e.target.value)}
          placeholder="SEC filingのテキストをここに貼り付け..."
          className="w-full h-32 bg-duo-bg-surface border border-duo-border rounded-xl p-3 text-sm text-duo-text placeholder-duo-text-muted resize-none focus:outline-none focus:border-duo-blue"
          disabled
        />
      </div>
    </div>
  );
}
