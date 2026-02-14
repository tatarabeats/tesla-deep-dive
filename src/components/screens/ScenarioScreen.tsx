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

  const severityColors = {
    moderate: 'border-duo-gold',
    severe: 'border-duo-orange',
    existential: 'border-duo-red',
  };

  const ratingLabels = ['', '全く自信なし', 'やや不安', 'まあまあ', 'かなり自信あり', '絶対的な確信'];

  if (selectedScenario) {
    return (
      <div className="space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setSelectedScenario(null); setShowCounter(false); setUserText(''); setRating(0); }}
            className="text-duo-text-muted text-2xl hover:text-duo-text"
          >
            ←
          </button>
          <h1 className="text-xl font-extrabold flex-1 leading-snug">{selectedScenario.title}</h1>
        </div>

        {/* Scenario description */}
        <div className="bg-duo-bg-card rounded-2xl p-5 border border-duo-border">
          <p className="text-base text-duo-text leading-relaxed">{selectedScenario.description}</p>
        </div>

        {/* Prompt */}
        <div className="bg-duo-red/10 border-2 border-duo-red/30 rounded-2xl p-5">
          <h3 className="text-base font-bold text-duo-red mb-2">🤔 考えてみよう</h3>
          <p className="text-base text-duo-text leading-relaxed">{selectedScenario.prompt}</p>
        </div>

        {/* User input */}
        <div>
          <label className="text-sm font-bold text-duo-text-secondary block mb-2">
            あなたの分析（このリスクにテスラはどう対処できる？）
          </label>
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="例: BYDの低価格攻勢に対して、テスラはFSDやSupercharger網で差別化できる…"
            className="w-full h-44 bg-duo-bg-surface border-2 border-duo-border rounded-2xl p-4 text-base text-duo-text placeholder-duo-text-muted resize-none focus:outline-none focus:border-duo-blue leading-relaxed"
          />
        </div>

        {!showCounter && (
          <button
            onClick={handleSubmitAnalysis}
            disabled={!userText.trim()}
            className={`w-full btn-duo py-4 text-base ${userText.trim() ? 'btn-duo-blue' : 'btn-duo-outline opacity-50'}`}
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
              <h3 className="text-lg font-extrabold text-duo-gold">💡 カウンター・アーギュメント</h3>
              <p className="text-sm text-duo-text-secondary">
                あなたの分析に対する反論です。投資判断の「死角」を見つけよう。
              </p>
              {selectedScenario.counterArguments.map((arg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border"
                >
                  <p className="text-base font-bold text-duo-text mb-2">{arg.point}</p>
                  <p className="text-sm text-duo-text-secondary leading-relaxed">{arg.evidence}</p>
                </motion.div>
              ))}

              {/* Follow-up questions */}
              {selectedScenario.followUpQuestions.length > 0 && (
                <div className="bg-duo-purple/10 border-2 border-duo-purple/30 rounded-2xl p-4">
                  <h4 className="text-base font-bold text-duo-purple mb-3">🔍 さらに考えてみよう</h4>
                  {selectedScenario.followUpQuestions.map((q, i) => (
                    <p key={i} className="text-sm text-duo-text leading-relaxed mb-2">• {q}</p>
                  ))}
                </div>
              )}

              {/* Conviction Rating */}
              <div className="bg-duo-bg-card rounded-2xl p-5 border-2 border-duo-blue/30">
                <h4 className="text-lg font-extrabold mb-2 text-center">
                  🎯 テスラへの投資確信度
                </h4>
                <p className="text-sm text-duo-text-secondary text-center mb-4 leading-relaxed">
                  このリスクを考慮した上で、<br />
                  「それでもテスラに長期投資したいか？」
                </p>
                <div className="flex gap-3 justify-center mb-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`w-14 h-14 rounded-2xl font-extrabold text-lg transition-all ${
                        rating === n
                          ? 'bg-duo-blue text-white scale-110 shadow-lg shadow-duo-blue/30'
                          : 'bg-duo-bg-surface text-duo-text-muted hover:bg-duo-border'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-duo-text-muted px-2">
                  <span>❄️ 不安</span>
                  <span>🔥 確信</span>
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm font-bold text-duo-blue mt-3"
                  >
                    {ratingLabels[rating]}
                  </motion.p>
                )}
              </div>

              <button
                onClick={handleSaveAndClose}
                disabled={rating === 0}
                className={`w-full btn-duo py-4 text-base ${rating > 0 ? 'btn-duo-green' : 'btn-duo-outline opacity-50'}`}
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
        <h1 className="text-2xl font-extrabold">🔥 最悪シナリオ</h1>
        <p className="text-base text-duo-text-secondary">テスラが失敗するシナリオを考えよう</p>
        <p className="text-sm text-duo-text-muted">— 李録「10年後の最悪を想定せよ」</p>
      </div>

      {/* Explanation card */}
      <div className="bg-duo-blue/10 border border-duo-blue/30 rounded-2xl p-4">
        <p className="text-sm text-duo-text leading-relaxed">
          💡 各シナリオを読んで自分の考えを書き、反論を見た後に
          <span className="font-bold text-duo-blue">「それでもテスラに投資したいか？」</span>
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
              className={`w-full choice-card ${severityColors[scenario.severity]}`}
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-base">{scenario.title}</span>
                  {completed && <span className="text-duo-green text-sm">✓ 分析済み</span>}
                </div>
                <p className="text-sm text-duo-text-secondary leading-relaxed">{scenario.description}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                scenario.severity === 'existential' ? 'bg-duo-red/20 text-duo-red' :
                scenario.severity === 'severe' ? 'bg-duo-orange/20 text-duo-orange' :
                'bg-duo-gold/20 text-duo-gold'
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
