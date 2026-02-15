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
            className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl border-2 border-white/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--tesla-red), var(--accent-blue))',
            }}
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
            className="fixed inset-x-3 bottom-3 z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh]"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '2px solid var(--card-border)',
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid var(--card-border)' }}
            >
              <span className="text-2xl">🤖</span>
              <div className="flex-1">
                <span className="font-extrabold text-sm" style={{ color: 'var(--foreground)' }}>テスラ博士</span>
                <span className="text-[10px] ml-2" style={{ color: 'var(--muted)' }}>AIに質問しよう</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:opacity-80"
                style={{ color: 'var(--muted)' }}
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4 overflow-y-auto space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                この問題について、もっと知りたい？
                好きなAIを選んで質問しよう！
              </p>

              <div>
                <input
                  type="text"
                  value={customQ}
                  onChange={e => setCustomQ(e.target.value)}
                  placeholder="聞きたいこと（空欄なら自動で質問します）"
                  className="w-full text-sm rounded-xl px-4 py-3 focus:outline-none"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--card-border)',
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setCustomQ(q)}
                    className="text-[11px] px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                    style={{
                      backgroundColor: customQ === q ? 'rgba(227,25,55,0.15)' : 'transparent',
                      borderColor: customQ === q ? 'var(--tesla-red)' : 'var(--card-border)',
                      color: customQ === q ? 'var(--tesla-red)' : 'var(--muted)',
                      border: '1px solid',
                    }}
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
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors active:scale-[0.98] cursor-pointer hover:brightness-110"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="font-bold text-sm">{service.name} で聞く</span>
                    <span className="ml-auto text-xs" style={{ color: 'var(--muted)' }}>↗</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 text-center text-xs font-bold rounded-xl transition-colors cursor-pointer hover:opacity-80"
                style={{
                  color: 'var(--muted)',
                  border: '1px solid var(--card-border)',
                }}
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
