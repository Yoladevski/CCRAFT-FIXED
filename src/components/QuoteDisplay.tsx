import { useEffect, useState } from 'react';

interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "Float like a butterfly, sting like a bee.",
    author: "Muhammad Ali"
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali"
  },
  {
    text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    author: "Muhammad Ali"
  },
  {
    text: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius"
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius"
  },
  {
    text: "You are in danger of living a life so comfortable that you will die without ever realizing your true potential.",
    author: "David Goggins"
  },
  {
    text: "The only way to guarantee failure is to quit.",
    author: "David Goggins"
  },
  {
    text: "Suffering is a test. That's all it is. A test to see what you're made of.",
    author: "David Goggins"
  },
  {
    text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    author: "Bruce Lee"
  },
  {
    text: "Knowing is not enough, we must apply. Willing is not enough, we must do.",
    author: "Bruce Lee"
  },
  {
    text: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    author: "Bruce Lee"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "I learned that courage was not the absence of fear, but the triumph over it.",
    author: "Nelson Mandela"
  },
  {
    text: "The temporary satisfaction of quitting is outweighed by the eternal suffering of being a nobody.",
    author: "Andrew Tate"
  },
  {
    text: "The man who goes to the gym every single day regardless of how he feels will always beat the man who goes to the gym when he feels like going.",
    author: "Andrew Tate"
  },
  {
    text: "Your mind must be stronger than your feelings.",
    author: "Andrew Tate"
  }
];

export default function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  return (
    <div className="bg-[#0E0E0E] border border-[#2E2E2E] p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#B11226]" />
      <div className="relative z-10">
        <p className="text-white text-lg md:text-xl mb-4 leading-relaxed italic">
          "{currentQuote.text}"
        </p>
        <p className="text-[#B11226] text-sm md:text-base font-bold tracking-wider">
          — {currentQuote.author.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
