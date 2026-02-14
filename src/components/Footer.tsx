import { Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#2E2E2E] mt-auto" style={{
      backgroundImage: `
        linear-gradient(45deg, #0D0D0D 25%, transparent 25%),
        linear-gradient(-45deg, #0D0D0D 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #0D0D0D 75%),
        linear-gradient(-45deg, transparent 75%, #0D0D0D 75%)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      backgroundColor: '#111111'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-8">
            <button
              onClick={() => onNavigate('Legal')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium"
            >
              Legal
            </button>
            <button
              onClick={() => onNavigate('AboutUs')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium"
            >
              About Us
            </button>
          </div>

          <div>
            <button
              onClick={() => onNavigate('Contact')}
              className="text-[#A0A0A0] hover:text-white transition-colors text-body font-medium"
            >
              Contact
            </button>
          </div>

          <div className="flex justify-center items-center gap-6 pt-4">
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

          <div className="pt-6 border-t border-[#2E2E2E] mt-6">
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
