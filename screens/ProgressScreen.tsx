import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lessons } from '@data/lessons';
import ProgressBar from '@components/ProgressBar';
import StreakTracker from '@components/StreakTracker';
import { useAppState } from '@utils/AppContext';
import { palette } from '@utils/theme';

const ProgressScreen: React.FC = () => {
  const { xp, streak, completedLessons, darkMode } = useAppState();
  const completion = completedLessons.length / lessons.length;

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? palette.darkBg : palette.cream }]}> 
      <Text style={[styles.title, { color: darkMode ? palette.darkText : palette.text }]}>Your Progress</Text>
      <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
        <Text style={[styles.metric, { color: darkMode ? palette.darkText : palette.text }]}>Total XP: {xp}</Text>
        <StreakTracker streak={streak} darkMode={darkMode} />
        <Text style={[styles.metric, { color: darkMode ? palette.darkText : palette.text }]}>Lessons Completed: {completedLessons.length}/{lessons.length}</Text>
        <ProgressBar progress={completion} darkMode={darkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  metric: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProgressScreen;
