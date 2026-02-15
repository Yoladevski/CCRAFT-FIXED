import { useState, useEffect, useMemo } from 'react';

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
  const [isExiting, setIsExiting] = useState(false);
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
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
            onComplete();
          }, 300);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center ${
        isExiting ? 'loading-screen-exit' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-8 max-w-3xl px-8">
        <div
          className={`flex flex-col items-center gap-6 ${
            showLoading ? 'loading-section-enter' : 'opacity-0'
          }`}
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
        </div>

        <div
          className={`flex flex-col items-center gap-4 text-center ${
            showQuote ? 'quote-section-enter' : 'opacity-0'
          }`}
        >
          <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/60 font-light">
            {quote.author}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes loadingScreenExit {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes loadingSectionEnter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes quoteSectionEnter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .loading-screen-exit {
          animation: loadingScreenExit 0.3s ease-out forwards;
        }

        .loading-section-enter {
          animation: loadingSectionEnter 0.3s ease-out forwards;
        }

        .quote-section-enter {
          animation: quoteSectionEnter 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
