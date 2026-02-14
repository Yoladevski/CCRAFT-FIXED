# COMBATCRAFT

A premium AI-powered combat training platform built around structured progression, gamified ranking, and discipline-based training paths.

## Features

- **Structured Progression System**: Sequential unlock system ensures proper skill development
- **Gamified Ranking**: Automatic rank progression from Amateur to Champion based on XP
- **Multi-Discipline Training**: Boxing fully implemented, with 6+ more disciplines coming soon
- **Mobile-First Design**: Optimized for all screen sizes with cinematic UI
- **Real-Time Progress Tracking**: Persistent user progress with detailed statistics
- **Premium Design**: Custom fonts, dark theme, controlled aesthetic

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password)
- **State Management**: React Context + Hooks

## Rank System

Power Level progression:
- 0-199 XP: Amateur
- 200-499 XP: Contender
- 500-999 XP: Challenger
- 1000-1999 XP: Elite
- 2000+ XP: Champion

## Database Structure

### Tables
- `profiles`: User profile data, power level, and rank
- `disciplines`: Available martial arts disciplines
- `categories`: Technique categories per discipline
- `techniques`: Individual techniques with video and instruction
- `user_progress`: User completion tracking

### Row Level Security
All tables have RLS enabled with appropriate policies for secure data access.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── assets/           # Static assets (fonts)
├── components/       # Reusable components (Navigation)
├── contexts/         # React contexts (AuthContext)
├── lib/             # Utilities and configurations (Supabase)
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── Disciplines.tsx
│   ├── DisciplinePage.tsx
│   ├── CategoryPage.tsx
│   ├── TechniquePage.tsx
│   ├── Dashboard.tsx
│   ├── News.tsx
│   └── Account.tsx
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## Design System

### Colors
- Primary Background: #0E0E0E
- Secondary Surface: #1A1A1A
- Accent Red: #B11226
- Steel Grey: #2E2E2E
- Primary Text: #FFFFFF
- Secondary Text: #A0A0A0

### Typography
- **Headings**: Progress font (custom, uppercase, bold)
- **Body**: KGRedHands font (custom, readable)

## Future Enhancements

- Additional disciplines (Muay Thai, BJJ, Kickboxing, Karate, Taekwondo, Judo)
- Video completion tracking
- Social features and leaderboards
- Advanced analytics and insights
- Mobile app version
