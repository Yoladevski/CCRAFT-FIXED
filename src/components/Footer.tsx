import { Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black border-t border-[#2E2E2E] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <img
              src="https://i.postimg.cc/KcNxkd4T/new-2.png"
              alt="CombatCraft Logo"
              className="h-32 w-auto object-contain"
            />
          </div>

          <div className="flex justify-center items-center gap-8">
            <button
              onClick={() => onNavigate('Legal')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium uppercase"
            >
              Legal
            </button>
            <button
              onClick={() => onNavigate('AboutUs')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium uppercase"
            >
              About Us
            </button>
            <button
              onClick={() => onNavigate('Contact')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium uppercase"
            >
              Contact
            </button>
          </div>

          <div className="flex justify-center items-center gap-6">
            <a
              href="https://www.instagram.com/combatcraft1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#B11226] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@combat_craft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#B11226] transition-colors"
              aria-label="TikTok"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://x.com/combatcraft_1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-[#B11226] transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </div>

          <div className="pt-4">
            <p className="text-[#A0A0A0] text-body">
              Copyright © 2025 COMBATCRAFT<br />
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
