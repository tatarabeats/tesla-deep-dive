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
        <button onClick={() => navigate('module_select')} className="text-duo-text-muted text-xl">←</button>
        <h1 className="text-xl font-extrabold">決算説明会</h1>
      </div>

      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-sm font-bold mb-2">プリビルト問題で学習</h2>
        <p className="text-xs text-duo-text-muted mb-3">
          テスラの直近の決算説明会から作成された問題で学習できます。
        </p>
        <button
          onClick={handleStartQuiz}
          className="w-full btn-duo btn-duo-gold py-3 text-sm"
        >
          🎙️ クイズ開始（プリビルト）
        </button>
      </div>

      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-sm font-bold mb-2">トランスクリプト貼り付け（coming soon）</h2>
        <p className="text-xs text-duo-text-muted mb-3">
          Earnings callのトランスクリプトを貼り付けると、イーロンの発言からクイズを自動生成します。
        </p>
        <textarea
          value={_text}
          onChange={(e) => setText(e.target.value)}
          placeholder="決算説明会のトランスクリプトをここに貼り付け..."
          className="w-full h-32 bg-duo-bg-surface border border-duo-border rounded-xl p-3 text-sm text-duo-text placeholder-duo-text-muted resize-none focus:outline-none focus:border-duo-blue"
          disabled
        />
      </div>
    </div>
  );
}
