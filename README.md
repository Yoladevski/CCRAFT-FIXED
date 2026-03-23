# COMBATCRAFT

A combat training platform built around structured progression, gamified ranking, and discipline-based training paths.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth (email/password)
- **State Management**: React Context + Hooks

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase project details:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── assets/
│   └── fonts/          # Custom fonts (Beantown, Orbitron, Redhawk, Lato-Black)
├── components/         # Shared UI components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── MainLayout.tsx
│   ├── TrainingStreak.tsx
│   ├── WorkoutOfTheDay.tsx
│   ├── WorkoutMode.tsx
│   ├── LevelProgressIndicator.tsx
│   └── ...
├── contexts/
│   ├── AuthContext.tsx  # Authentication state
│   ├── StreakContext.tsx # Training streak tracking
│   └── ThemeContext.tsx
├── data/
│   ├── boxingWorkouts.ts      # Workout session definitions
│   └── foundationsLessons.ts  # Foundation level/lesson definitions
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── audioController.ts # Audio cues for workout mode
│   └── utils.ts
├── pages/              # Route-level page components
├── styles/
│   └── typography.css
├── App.tsx             # Router and route definitions
└── main.tsx
```

## Features

### Disciplines
Two disciplines are fully implemented with technique libraries, coach's tips, and progression tracking:
- **Boxing** — Attacks, Defence, Footwork, Combos categories
- **Muay Thai** — Full technique library with coach's tips

### Foundation Lessons
Boxing has 5 structured foundation levels (32 lessons total):
1. Foundation — Stance, footwork, jab, cross, guard
2. Control — Sidestep, pivot, uppercut, parry, slip
3. Rotation — Hooks, uppercuts, advanced combos
4. Flow and Reaction — Combos with defensive integration
5. Advanced Control — Slip pivot, L-step, clinch

Lesson completion is tracked per user. Progress bars show level and overall completion on the dashboard.

### Workout Sessions
Workout sessions are defined in `src/data/boxingWorkouts.ts`. Each session includes rounds, rest periods, coach's brief, and per-round instructions. Sessions run in an active workout mode with optional audio cues.

### Training Streak
A daily training streak is tracked via `StreakContext` and persisted to the `profiles` table (`current_streak`, `last_training_date`). The streak resets if a day is missed.

### Rank / Power Level
Power level is calculated from completed foundation lessons (50 XP per lesson). Rank tiers:

| Rank | Power Level |
|---|---|
| Amateur | 0 – 199 |
| Contender | 200 – 499 |
| Challenger | 500 – 999 |
| Elite | 1000 – 1999 |
| Champion | 2000+ |

Rank updates automatically via a database trigger.

## Database

Migrations are in `supabase/migrations/`. Key tables:

| Table | Purpose |
|---|---|
| `profiles` | User profile, power level, rank, streak |
| `disciplines` | Available martial arts disciplines |
| `categories` | Technique categories per discipline |
| `techniques` | Individual techniques with content blocks and coach's tips |
| `user_progress` | Technique completion tracking per user |
| `foundations_progress` | Foundation lesson completion per user |
| `workout_completions` | Workout session completion records |
| `user_legal_acceptance` | Legal waiver acceptance records |

All tables have Row Level Security enabled.

## Design System

### Colors (Tailwind custom tokens)
- `bg-primary` — `#0E0E0E`
- `bg-secondary` — `#1A1A1A`
- `accent-red` — `#B11226`
- `steel-grey` — `#2E2E2E`

### Fonts
- `font-heading` — Beantown
- `font-subheading` — Orbitron
- Body — system sans-serif stack
