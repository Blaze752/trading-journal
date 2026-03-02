import { StreakData } from './storage';

const toDateKey = (date: Date): string => date.toISOString().split('T')[0];

export const calculateNextStreak = (
  current: StreakData,
  now: Date = new Date(),
): StreakData => {
  const today = toDateKey(now);

  if (!current.lastOpenDate || current.lastOpenDate === '') {
    return { count: 1, lastOpenDate: today };
  }

  const last = new Date(`${current.lastOpenDate}T00:00:00.000Z`);
  const currentDay = new Date(`${today}T00:00:00.000Z`);
  const diffInDays = Math.round(
    (currentDay.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) {
    return { count: current.count, lastOpenDate: current.lastOpenDate };
  }

  if (diffInDays === 1) {
    return { count: current.count + 1, lastOpenDate: today };
  }

  return { count: 1, lastOpenDate: today };
};
