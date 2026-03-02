import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calculateNextStreak } from './streak';
import { storage } from './storage';
import { addXP } from './xp';

type AppContextValue = {
  xp: number;
  streak: number;
  completedLessons: number[];
  darkMode: boolean;
  completeLesson: (id: number, lessonXP: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  toggleDarkMode: (value: boolean) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const init = async () => {
      const [storedXP, storedCompleted, storedStreak, storedTheme] = await Promise.all([
        storage.getXP(),
        storage.getCompletedLessons(),
        storage.getStreak(),
        storage.getThemeMode(),
      ]);

      const nextStreak = calculateNextStreak(storedStreak);
      await storage.setStreak(nextStreak);

      setXP(storedXP);
      setCompletedLessons(storedCompleted);
      setStreak(nextStreak.count);
      setDarkMode(storedTheme === 'dark');
    };

    init();
  }, []);

  const completeLesson = async (id: number, lessonXP: number) => {
    const updatedLessons = completedLessons.includes(id)
      ? completedLessons
      : [...completedLessons, id];

    const shouldAwardXP = !completedLessons.includes(id);
    const nextXP = shouldAwardXP ? addXP(xp, lessonXP) : xp;

    setCompletedLessons(updatedLessons);
    setXP(nextXP);

    await Promise.all([
      storage.setCompletedLessons(updatedLessons),
      shouldAwardXP ? storage.setXP(nextXP) : Promise.resolve(),
    ]);
  };

  const resetProgress = async () => {
    setXP(0);
    setCompletedLessons([]);
    setStreak(1);
    await storage.resetAll();
    const refreshed = calculateNextStreak({ count: 0, lastOpenDate: null });
    await storage.setStreak(refreshed);
    setStreak(refreshed.count);
  };

  const toggleDarkMode = async (value: boolean) => {
    setDarkMode(value);
    await storage.setThemeMode(value ? 'dark' : 'light');
  };

  const value = useMemo(
    () => ({
      xp,
      streak,
      completedLessons,
      darkMode,
      completeLesson,
      resetProgress,
      toggleDarkMode,
    }),
    [xp, streak, completedLessons, darkMode],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};
