import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { getLevelTitle } from '../../engine/progressionEngine';
import { teslaFeedCards } from '../../data/feedCards';
import { TeslaFeedCard } from '../feed/TeslaFeedCard';

const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 300;

const feedVariants = {
  enter: (d: string) => ({
    y: d === 'up' ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (d: string) => ({
    y: d === 'up' ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function HomeScreen() {
  const { userProfile, startRound, navigate } = useGame();
  const { play } = useSound();
  const [feedIndex, setFeedIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const currentCard = teslaFeedCards[feedIndex];

  const nextCard = useCallback(() => {
    if (feedIndex < teslaFeedCards.length - 1) {
      setDirection('up');
      setFeedIndex(prev => prev + 1);
    }
  }, [feedIndex]);

  const prevCard = useCallback(() => {
    if (feedIndex > 0) {
      setDirection('down');
      setFeedIndex(prev => prev - 1);
    }
  }, [feedIndex]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      const { offset, velocity } = info;
      if (offset.y < -SWIPE_THRESHOLD || velocity.y < -VELOCITY_THRESHOLD) {
        nextCard();
      } else if (offset.y > SWIPE_THRESHOLD || velocity.y > VELOCITY_THRESHOLD) {
        prevCard();
      }
    },
    [nextCard, prevCard]
  );

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  const convictionLevel = userProfile.convictionScore >= 80 ? '確信' :
    userProfile.convictionScore >= 60 ? '理解' :
    userProfile.convictionScore >= 40 ? '学習中' :
    userProfile.convictionScore >= 20 ? '初心者' : '未知';

  return (
    <div className="space-y-5 -mx-4 -my-5">
      {/* Feed Card Area (swipeable) */}
      <div
        className="relative overflow-hidden"
        style={{ height: '280px', touchAction: 'none' }}
      >
        {/* Counter */}
        <div className="absolute top-3 right-3 z-30 text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(26,26,46,0.8)', color: 'var(--muted)' }}
        >
          {feedIndex + 1} / {teslaFeedCards.length}
        </div>

        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentCard.id}
            className="absolute inset-0"
            custom={direction}
            variants={feedVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform' }}
          >
            <TeslaFeedCard
              card={currentCard}
              showSwipeHint={feedIndex < 2}
              onDeepDive={currentCard.relatedModule ? () => {
                play('click');
                navigate('module_select');
              } : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Game Dashboard */}
      <div className="px-4 space-y-4">
        {/* Level + EXP Bar */}
        <div className="rpg-card">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="gold-text text-2xl font-bold">Lv.{userProfile.level}</span>
              <span className="ml-2 text-sm" style={{ color: 'var(--foreground)' }}>
                {getLevelTitle(userProfile.level)}
              </span>
            </div>
          </div>
          <div className="exp-bar">
            <motion.div
              className="exp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-right text-xs mt-1" style={{ color: 'var(--muted)' }}>
            {userProfile.currentLevelXP} / {userProfile.xpToNextLevel} XP
          </div>
        </div>

        {/* Conviction Meter */}
        <div className="rpg-card rpg-card-tesla">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="var(--tesla-red)"
                  strokeWidth="8"
                  strokeDasharray={`${userProfile.convictionScore * 2.64} 264`}
                  strokeLinecap="round"
                  initial={false}
                  animate={{ strokeDasharray: `${userProfile.convictionScore * 2.64} 264` }}
                  transition={{ duration: 0.8 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold"
                style={{ color: 'var(--foreground)' }}
              >
                {userProfile.convictionScore}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>テスラ確信度</span>
                <span className="gold-text text-xs font-bold">{convictionLevel}</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                テスラを深く理解するほどスコアが上がる。目標: 80+
              </p>
            </div>
          </div>
        </div>

        {/* Daily Challenge Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            play('roundStart');
            startRound('sec_filing', true);
          }}
          className="w-full btn-rpg btn-rpg-red py-4 text-lg animate-pulse-glow"
        >
          ⚔️ 今日のクエスト
        </motion.button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rpg-card text-center !p-3">
            <div className="text-lg font-extrabold" style={{ color: 'var(--accent-orange)' }}>
              🔥 {userProfile.currentStreak}
            </div>
            <div className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>連続日数</div>
          </div>
          <div className="rpg-card text-center !p-3">
            <div className="text-lg font-extrabold" style={{ color: 'var(--gold)' }}>
              💎 {userProfile.totalXP.toLocaleString()}
            </div>
            <div className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>総XP</div>
          </div>
          <div className="rpg-card text-center !p-3">
            <div className="text-lg font-extrabold" style={{ color: 'var(--accent-blue)' }}>
              🎯 {userProfile.totalQuestionsAnswered > 0
                ? Math.round((userProfile.totalCorrect / userProfile.totalQuestionsAnswered) * 100)
                : 0}%
            </div>
            <div className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>正答率</div>
          </div>
        </div>
      </div>
    </div>
  );
}
