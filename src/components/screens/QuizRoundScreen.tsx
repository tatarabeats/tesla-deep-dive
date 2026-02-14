import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { GlossaryText } from '../quiz/GlossaryText';
import { MascotChat } from '../quiz/MascotChat';

export function QuizRoundScreen() {
  const { gameState, submitAnswer, nextQuestion, navigate } = useGame();
  const { play } = useSound();
  const [shaking, setShaking] = useState(false);

  const round = gameState.round;
  if (!round) return null;

  const question = round.questions[round.currentQuestionIndex];
  const progress = ((round.currentQuestionIndex + 1) / round.questions.length) * 100;
  const isAnswered = round.answerState !== 'waiting';

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    submitAnswer(index);
  };

  const handleTrueFalse = (value: boolean) => {
    if (isAnswered) return;
    submitAnswer(value);
  };

  const handleNext = () => {
    if (round.answerState === 'answered_wrong') {
      setShaking(false);
    }
    nextQuestion();
  };

  // Play sound on answer
  if (round.answerState === 'answered_correct' && !shaking) {
    play('correct');
    if (round.currentCombo >= 3) {
      setTimeout(() => play('combo'), 300);
    }
  }
  if (round.answerState === 'answered_wrong' && !shaking) {
    play('wrong');
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  }

  // Build context for MascotChat
  const questionContext = `問題: ${question.questionText}\n解説: ${question.explanation}`;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 max-w-lg mx-auto">
      {/* Top bar: progress + quit */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('module_select')}
          className="text-duo-text-muted text-xl hover:text-duo-text"
        >
          ✕
        </button>
        <div className="flex-1 progress-bar-duo">
          <motion.div
            className="progress-bar-duo-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-duo-gold">{round.currentScore}</span>
        </div>
      </div>

      {/* Combo */}
      {round.currentCombo >= 2 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mb-2"
        >
          <span className="text-duo-orange font-extrabold text-sm">
            🔥 {round.currentCombo}x コンボ！
          </span>
        </motion.div>
      )}

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 ${shaking ? 'animate-shake' : ''}`}
      >
        <p className="text-lg font-bold leading-relaxed">
          <GlossaryText text={question.questionText} />
        </p>
        {question.source && (
          <p className="text-xs text-duo-text-muted mt-2">出典: {question.source}</p>
        )}
      </motion.div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {question.type === 'true_false' ? (
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((value) => {
              let cardClass = 'choice-card justify-center py-5';
              if (isAnswered) {
                if (value === question.correctAnswer) cardClass += ' choice-card-correct';
                else if (round.answerState === 'answered_wrong') cardClass += ' choice-card-wrong';
              }

              return (
                <button
                  key={String(value)}
                  onClick={() => handleTrueFalse(value)}
                  className={cardClass}
                  disabled={isAnswered}
                >
                  <span className="text-xl font-bold">{value ? '⭕ TRUE' : '❌ FALSE'}</span>
                </button>
              );
            })}
          </div>
        ) : (
          question.options?.map((option, i) => {
            let cardClass = 'choice-card';
            if (isAnswered) {
              if (i === question.correctIndex) cardClass += ' choice-card-correct';
              else if (round.answerState === 'answered_wrong') cardClass += ' choice-card-disabled';
            }

            const label = String.fromCharCode(65 + i);
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(i)}
                className={`w-full ${cardClass}`}
                disabled={isAnswered}
              >
                <span className="w-8 h-8 rounded-lg bg-duo-bg-surface flex items-center justify-center text-sm font-bold text-duo-text-secondary shrink-0">
                  {label}
                </span>
                <span className="flex-1 text-left text-sm font-semibold">{option}</span>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Answer Feedback Modal */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`mt-4 rounded-2xl p-4 ${
              round.answerState === 'answered_correct'
                ? 'bg-duo-green/10 border-2 border-duo-green'
                : 'bg-duo-red/10 border-2 border-duo-red'
            }`}
          >
            {/* Result header */}
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="text-2xl"
              >
                {round.answerState === 'answered_correct' ? '🎉' : '💭'}
              </motion.span>
              <span className="font-extrabold text-sm">
                {round.answerState === 'answered_correct' ? 'すばらしい！' : '惜しい！'}
              </span>
              {round.answers[round.answers.length - 1]?.pointsEarned > 0 && (
                <motion.span
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="ml-auto text-duo-gold font-extrabold text-sm"
                >
                  +{round.answers[round.answers.length - 1].pointsEarned}pt
                </motion.span>
              )}
            </div>

            {/* Show correct answer when wrong */}
            {round.answerState === 'answered_wrong' && question.type !== 'true_false' && question.correctIndex !== undefined && (
              <div className="mb-3 px-3 py-2 rounded-xl bg-duo-green/10 border border-duo-green/30">
                <span className="text-xs font-bold text-duo-green">正解: </span>
                <span className="text-xs text-duo-text">{question.options?.[question.correctIndex]}</span>
              </div>
            )}

            {/* Explanation with glossary terms */}
            <div className="text-sm text-duo-text-secondary leading-relaxed">
              <GlossaryText text={question.explanation} />
            </div>

            {/* Glossary hint */}
            <p className="text-[10px] text-duo-text-muted mt-2">
              💡 青い用語をタップすると意味がわかります
            </p>

            {/* Next button */}
            <button
              onClick={handleNext}
              className={`w-full mt-4 btn-duo py-3 text-sm ${
                round.answerState === 'answered_correct' ? 'btn-duo-green' : 'btn-duo-red'
              }`}
            >
              {round.currentQuestionIndex < round.questions.length - 1 ? '次の問題' : '結果を見る'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MascotChat - テスラ博士 (only visible after answering) */}
      {isAnswered && <MascotChat questionContext={questionContext} />}
    </div>
  );
}
