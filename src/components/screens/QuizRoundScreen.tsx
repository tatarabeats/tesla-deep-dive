import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { GlossaryText } from '../quiz/GlossaryText';
import { MascotChat } from '../quiz/MascotChat';

export function QuizRoundScreen() {
  const { gameState, submitAnswer, nextQuestion, navigate } = useGame();
  const { play } = useSound();
  const [shaking, setShaking] = useState(false);
  const lastSoundPlayedRef = useRef<string | null>(null);

  const round = gameState.round;

  // Play sound ONLY once per answer state change
  useEffect(() => {
    if (!round) return;
    const key = `${round.currentQuestionIndex}-${round.answerState}`;
    if (key === lastSoundPlayedRef.current) return;

    if (round.answerState === 'answered_correct') {
      lastSoundPlayedRef.current = key;
      play('correct');
      if (round.currentCombo >= 3) {
        setTimeout(() => play('combo'), 300);
      }
    } else if (round.answerState === 'answered_wrong') {
      lastSoundPlayedRef.current = key;
      play('wrong');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }, [round?.currentQuestionIndex, round?.answerState]);

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
    setShaking(false);
    nextQuestion();
  };

  const questionContext = `問題: ${question.questionText}\n解説: ${question.explanation}`;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 max-w-lg mx-auto">
      {/* Top bar: progress + quit */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('home')}
          className="text-xl hover:opacity-80 cursor-pointer"
          style={{ color: 'var(--muted)' }}
        >
          ✕
        </button>
        <div className="flex-1 progress-bar-rpg">
          <motion.div
            className="progress-bar-rpg-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
            {round.currentQuestionIndex + 1}/{round.questions.length}
          </span>
        </div>
      </div>

      {/* Combo */}
      {round.currentCombo >= 2 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mb-2"
        >
          <span className="font-extrabold text-base" style={{ color: 'var(--tesla-red)' }}>
            {round.currentCombo}x combo
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
        <p className="text-xl font-bold leading-relaxed" style={{ color: 'var(--foreground)' }}>
          <GlossaryText text={question.questionText} />
        </p>
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
                <span className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)' }}
                >
                  {label}
                </span>
                <span className="flex-1 text-left text-base font-semibold">{option}</span>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Answer Feedback */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-4 rpg-card"
            style={{
              borderColor: round.answerState === 'answered_correct' ? 'var(--accent-green)' : 'var(--tesla-red)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">
                {round.answerState === 'answered_correct' ? '✅' : '❌'}
              </span>
              <span className="font-extrabold text-base" style={{ color: 'var(--foreground)' }}>
                {round.answerState === 'answered_correct' ? '正解！' : '不正解'}
              </span>
            </div>

            {round.answerState === 'answered_wrong' && question.type !== 'true_false' && question.correctIndex !== undefined && (
              <div className="mb-3 px-3 py-2 rounded-xl"
                style={{ backgroundColor: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)' }}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--accent-green)' }}>正解: </span>
                <span className="text-sm" style={{ color: 'var(--foreground)' }}>{question.options?.[question.correctIndex]}</span>
              </div>
            )}

            <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              <GlossaryText text={question.explanation} />
            </div>

            <button
              onClick={handleNext}
              className="w-full mt-4 btn-rpg btn-rpg-red py-3 text-base"
            >
              {round.currentQuestionIndex < round.questions.length - 1 ? '次へ' : '結果を見る'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && <MascotChat questionContext={questionContext} />}
    </div>
  );
}
