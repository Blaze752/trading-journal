import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  xp: 'sikhhub_xp',
  streak: 'sikhhub_streak',
  completedLessons: 'sikhhub_completed_lessons',
  lastOpenDate: 'sikhhub_last_open_date',
  themeMode: 'sikhhub_theme_mode',
};

export type StreakData = {
  count: number;
  lastOpenDate: string | null;
};

export const storage = {
  async getXP(): Promise<number> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.xp);
    return value ? Number(value) : 0;
  },
  async setXP(value: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.xp, String(value));
  },
  async getCompletedLessons(): Promise<number[]> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.completedLessons);
    return value ? JSON.parse(value) : [];
  },
  async setCompletedLessons(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.completedLessons, JSON.stringify(ids));
  },
  async getStreak(): Promise<StreakData> {
    const [count, lastOpenDate] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.streak),
      AsyncStorage.getItem(STORAGE_KEYS.lastOpenDate),
    ]);

    return {
      count: count ? Number(count) : 0,
      lastOpenDate,
    };
  },
  async setStreak(value: StreakData): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.streak, String(value.count)),
      AsyncStorage.setItem(STORAGE_KEYS.lastOpenDate, value.lastOpenDate ?? ''),
    ]);
  },
  async getThemeMode(): Promise<'light' | 'dark'> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.themeMode);
    return value === 'dark' ? 'dark' : 'light';
  },
  async setThemeMode(value: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.themeMode, value);
  },
  async resetAll(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  },
};
