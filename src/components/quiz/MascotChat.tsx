import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MascotChatProps {
  questionContext: string;
}

const AI_SERVICES = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '💬',
    buildUrl: (prompt: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '✨',
    buildUrl: (prompt: string) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🧠',
    buildUrl: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
] as const;

export function MascotChat({ questionContext }: MascotChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customQ, setCustomQ] = useState('');

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }, 15000);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setCopied(false);
    setCustomQ('');
  }, [questionContext]);

  const buildPrompt = useCallback((extra?: string) => {
    const base = `テスラ(TSLA)の深掘り学習をしています。以下の問題について教えてください。

${questionContext}`;
    if (extra) return `${base}\n\n質問: ${extra}`;
    return `${base}\n\nこの内容についてわかりやすく解説してください。テスラの投資判断に役立つポイントも含めて、初心者にもわかるように教えてください。`;
  }, [questionContext]);

  const handleOpenAI = useCallback((serviceId: string) => {
    const service = AI_SERVICES.find(s => s.id === serviceId);
    if (!service) return;
    const prompt = buildPrompt(customQ || undefined);
    window.open(service.buildUrl(prompt), '_blank');
    setIsOpen(false);
  }, [buildPrompt, customQ]);

  const handleCopy = useCallback(async () => {
    const prompt = buildPrompt(customQ || undefined);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [buildPrompt, customQ]);

  const quickQuestions = [
    'テスラのMOAT（競争優位性）は？',
    'このリスクの深刻度は？',
    'もっと詳しく解説して',
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: bounce ? -8 : 0 }}
            exit={{ scale: 0 }}
            transition={bounce ? { type: 'spring', stiffness: 400, damping: 10 } : { duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-duo-blue to-duo-green shadow-lg flex items-center justify-center text-2xl border-2 border-white/20 hover:scale-110 active:scale-95 transition-transform"
          >
            🤖
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-x-3 bottom-3 z-50 bg-duo-bg-card border-2 border-duo-border rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh]"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-duo-border">
              <span className="text-2xl">🤖</span>
              <div className="flex-1">
                <span className="font-extrabold text-duo-text text-sm">テスラ博士</span>
                <span className="text-[10px] text-duo-text-muted ml-2">AIに質問しよう</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-duo-text-muted hover:text-duo-text text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-duo-bg-surface transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4 overflow-y-auto space-y-4">
              <p className="text-sm text-duo-text-secondary leading-relaxed">
                この問題について、もっと知りたい？
                好きなAIを選んで質問しよう！
              </p>

              <div>
                <input
                  type="text"
                  value={customQ}
                  onChange={e => setCustomQ(e.target.value)}
                  placeholder="聞きたいこと（空欄なら自動で質問します）"
                  className="w-full bg-duo-bg text-duo-text text-sm rounded-xl px-4 py-3 border border-duo-border focus:border-duo-blue focus:outline-none placeholder-duo-text-muted"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setCustomQ(q)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border font-bold transition-colors ${
                      customQ === q
                        ? 'bg-duo-blue/20 border-duo-blue text-duo-blue'
                        : 'border-duo-border text-duo-text-muted hover:border-duo-blue/50 hover:text-duo-text'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {AI_SERVICES.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleOpenAI(service.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-duo-bg-surface border border-duo-border hover:border-duo-blue/50 transition-colors active:scale-[0.98]"
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="font-bold text-sm text-duo-text">{service.name} で聞く</span>
                    <span className="ml-auto text-duo-text-muted text-xs">↗</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 text-center text-xs font-bold text-duo-text-muted hover:text-duo-text rounded-xl border border-duo-border hover:border-duo-blue/30 transition-colors"
              >
                {copied ? '✅ コピーしました！' : '📋 プロンプトをコピーして自分で貼り付ける'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
