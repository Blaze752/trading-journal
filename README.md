# SikhHub (Expo + React Native)

SikhHub is a Duolingo-inspired Sikh learning app with bite-sized lessons, audio step simulation, quiz feedback, XP rewards, streak tracking, and progress persistence.

## Tech Stack
- React Native (Expo)
- TypeScript
- React Navigation (Bottom Tabs + Stack)
- AsyncStorage persistence
- Animated API for smooth micro-interactions

## Project Structure

```
/components
  Header.tsx
  LessonCard.tsx
  QuizCard.tsx
  ProgressBar.tsx
  StreakTracker.tsx
  XPAnimation.tsx

/screens
  HomeScreen.tsx
  LessonScreen.tsx
  LessonsScreen.tsx
  ProgressScreen.tsx
  SettingsScreen.tsx

/utils
  AppContext.tsx
  streak.ts
  storage.ts
  theme.ts
  xp.ts

/data
  lessons.ts
```

## Local Run Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Expo dev server:
   ```bash
   npm run start
   ```
3. Run on simulator/device:
   - `npm run ios`
   - `npm run android`
   - `npm run web`

## Notes
- XP, streak, completed lessons, and theme mode are saved in AsyncStorage.
- Streak updates automatically on app launch using date comparison.
- Lessons 2-10 are placeholders and locked until previous lesson completion.
