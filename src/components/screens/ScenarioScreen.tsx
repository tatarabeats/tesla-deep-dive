import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { scenarios } from '../../data/scenarios';
import type { Scenario } from '../../types/scenario';

export function ScenarioScreen() {
  const { userProfile, updateProfile } = useGame();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [userText, setUserText] = useState('');
  const [showCounter, setShowCounter] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleSubmitAnalysis = () => {
    if (!selectedScenario || !userText.trim()) return;
    setShowCounter(true);
  };

  const handleSaveAndClose = () => {
    if (!selectedScenario || rating === 0) return;
    updateProfile(prev => ({
      ...prev,
      analyses: [
        ...prev.analyses,
        {
          scenarioId: selectedScenario.id,
          userText,
          timestamp: Date.now(),
          selfRating: rating as 1 | 2 | 3 | 4 | 5,
        },
      ],
      convictionScore: Math.min(100, prev.convictionScore + (rating >= 4 ? 8 : rating >= 3 ? 5 : 3)),
    }));
    setSelectedScenario(null);
    setUserText('');
    setShowCounter(false);
    setRating(0);
  };

  const severityBorder = {
    moderate: 'var(--gold)',
    severe: 'var(--accent-orange)',
    existential: 'var(--tesla-red)',
  };

  const ratingLabels = ['', '全く自信なし', 'やや不安', 'まあまあ', 'かなり自信あり', '絶対的な確信'];

  if (selectedScenario) {
    return (
      <div className="space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setSelectedScenario(null); setShowCounter(false); setUserText(''); setRating(0); }}
            className="text-2xl hover:opacity-80 cursor-pointer"
            style={{ color: 'var(--muted)' }}
          >
            ←
          </button>
          <h1 className="text-xl font-extrabold flex-1 leading-snug">{selectedScenario.title}</h1>
        </div>

        {/* Scenario description */}
        <div className="rpg-card">
          <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>{selectedScenario.description}</p>
        </div>

        {/* Prompt */}
        <div className="rpg-card" style={{ borderColor: 'var(--tesla-red)', backgroundColor: 'rgba(227,25,55,0.05)' }}>
          <h3 className="text-base font-bold mb-2" style={{ color: 'var(--tesla-red)' }}>🤔 考えてみよう</h3>
          <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>{selectedScenario.prompt}</p>
        </div>

        {/* User input */}
        <div>
          <label className="text-sm font-bold block mb-2" style={{ color: 'var(--muted)' }}>
            あなたの分析（このリスクにテスラはどう対処できる？）
          </label>
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="例: BYDの低価格攻勢に対して、テスラはFSDやSupercharger網で差別化できる…"
            className="w-full h-44 rounded-xl p-4 text-base resize-none focus:outline-none leading-relaxed"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '2px solid var(--card-border)',
              color: 'var(--foreground)',
            }}
          />
        </div>

        {!showCounter && (
          <button
            onClick={handleSubmitAnalysis}
            disabled={!userText.trim()}
            className={`w-full btn-rpg py-4 text-base ${userText.trim() ? 'btn-rpg-blue' : 'btn-rpg-outline opacity-50'}`}
          >
            反論を見る
          </button>
        )}

        <AnimatePresence>
          {showCounter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Counter arguments */}
              <h3 className="text-lg font-extrabold gold-text">💡 カウンター・アーギュメント</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                あなたの分析に対する反論です。投資判断の「死角」を見つけよう。
              </p>
              {selectedScenario.counterArguments.map((arg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="rpg-card"
                >
                  <p className="text-base font-bold mb-2" style={{ color: 'var(--foreground)' }}>{arg.point}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{arg.evidence}</p>
                </motion.div>
              ))}

              {/* Follow-up questions */}
              {selectedScenario.followUpQuestions.length > 0 && (
                <div className="rpg-card" style={{ borderColor: 'var(--accent-purple)', backgroundColor: 'rgba(155,89,182,0.05)' }}>
                  <h4 className="text-base font-bold mb-3" style={{ color: 'var(--accent-purple)' }}>🔍 さらに考えてみよう</h4>
                  {selectedScenario.followUpQuestions.map((q, i) => (
                    <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: 'var(--foreground)' }}>• {q}</p>
                  ))}
                </div>
              )}

              {/* Conviction Rating */}
              <div className="rpg-card" style={{ borderColor: 'var(--accent-blue)' }}>
                <h4 className="text-lg font-extrabold mb-2 text-center gold-text">
                  🎯 テスラへの投資確信度
                </h4>
                <p className="text-sm text-center mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  このリスクを考慮した上で、<br />
                  「それでもテスラに長期投資したいか？」
                </p>
                <div className="flex gap-3 justify-center mb-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className="w-14 h-14 rounded-xl font-extrabold text-lg transition-all cursor-pointer"
                      style={{
                        backgroundColor: rating === n ? 'var(--tesla-red)' : 'var(--card-bg)',
                        color: rating === n ? '#fff' : 'var(--muted)',
                        transform: rating === n ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: rating === n ? '0 4px 16px rgba(227,25,55,0.3)' : 'none',
                        border: `1px solid ${rating === n ? 'var(--tesla-red)' : 'var(--card-border)'}`,
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs px-2" style={{ color: 'var(--muted)' }}>
                  <span>❄️ 不安</span>
                  <span>🔥 確信</span>
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm font-bold mt-3"
                    style={{ color: 'var(--tesla-red)' }}
                  >
                    {ratingLabels[rating]}
                  </motion.p>
                )}
              </div>

              <button
                onClick={handleSaveAndClose}
                disabled={rating === 0}
                className={`w-full btn-rpg py-4 text-base ${rating > 0 ? 'btn-rpg-green' : 'btn-rpg-outline opacity-50'}`}
              >
                保存して完了 ✓
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Scenario list
  return (
    <div className="space-y-5 pb-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold tesla-text">🔥 最悪シナリオ</h1>
        <p className="text-base" style={{ color: 'var(--muted)' }}>テスラが失敗するシナリオを考えよう</p>
        <p className="text-sm" style={{ color: 'var(--muted)', opacity: 0.7 }}>— 李録「10年後の最悪を想定せよ」</p>
      </div>

      {/* Explanation card */}
      <div className="rpg-card" style={{ borderColor: 'var(--accent-blue)', backgroundColor: 'rgba(74,144,217,0.05)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
          💡 各シナリオを読んで自分の考えを書き、反論を見た後に
          <span className="font-bold" style={{ color: 'var(--accent-blue)' }}>「それでもテスラに投資したいか？」</span>
          を1〜5で評価します。この繰り返しで投資の確信度が磨かれます。
        </p>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario, i) => {
          const completed = userProfile.analyses.some(a => a.scenarioId === scenario.id);
          return (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedScenario(scenario)}
              className="w-full rpg-card flex items-center gap-3 text-left cursor-pointer hover:brightness-110 transition-all"
              style={{ borderColor: severityBorder[scenario.severity] }}
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-base">{scenario.title}</span>
                  {completed && <span className="text-sm" style={{ color: 'var(--accent-green)' }}>✓ 分析済み</span>}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{scenario.description}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                scenario.severity === 'existential' ? 'badge-existential' :
                scenario.severity === 'severe' ? 'badge-severe' :
                'badge-moderate'
              }`}>
                {scenario.severity === 'existential' ? '致命的' :
                 scenario.severity === 'severe' ? '深刻' : '中程度'}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
