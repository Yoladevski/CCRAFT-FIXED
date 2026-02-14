import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const QUOTES = [
  { text: "Float like a butterfly, sting like a bee.", author: "Muhammad Ali" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'", author: "Muhammad Ali" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "You are in danger of living a life so comfortable that you will die without ever realizing your true potential.", author: "David Goggins" },
  { text: "The only way to guarantee failure is to quit.", author: "David Goggins" },
  { text: "Suffering is a test. That's all it is. A test to see what you're made of.", author: "David Goggins" },
  { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
  { text: "Knowing is not enough, we must apply. Willing is not enough, we must do.", author: "Bruce Lee" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  useEffect(() => {
    setTimeout(() => setShowLoading(true), 250);
    setTimeout(() => setShowQuote(true), 500);

    const duration = 5000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 300);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8 max-w-3xl px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoading ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div
                  className="overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - progress}% 0 0)`,
                  }}
                >
                  <img
                    src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png"
                    alt="Combat Craft"
                    className="h-32 w-auto"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-robot)' }}>
                {progress}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showQuote ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                "{quote.text}"
              </p>
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/60 font-light">
                {quote.author}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
