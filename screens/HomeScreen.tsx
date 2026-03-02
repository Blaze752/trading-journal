import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '@components/Header';
import StreakTracker from '@components/StreakTracker';
import { useAppState } from '@utils/AppContext';
import { palette } from '@utils/theme';

type Props = {
  onStartLesson: () => void;
};

const HomeScreen: React.FC<Props> = ({ onStartLesson }) => {
  const { streak, xp, darkMode } = useAppState();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? palette.darkBg : palette.cream }]}> 
      <Header lessonIndex={1} totalLessons={10} darkMode={darkMode} />
      <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
        <Text style={[styles.heading, { color: darkMode ? palette.darkText : palette.text }]}>Continue Learning</Text>
        <Text style={[styles.description, { color: darkMode ? '#CBBEB2' : palette.muted }]}>Take a short, gamified lesson and build your Sikh wisdom every day.</Text>
        <View style={styles.inline}>
          <StreakTracker streak={streak} darkMode={darkMode} />
          <Text style={[styles.xp, { color: darkMode ? palette.darkText : palette.text }]}>{xp} XP</Text>
        </View>
        <Pressable style={styles.button} onPress={onStartLesson}>
          <Text style={styles.buttonText}>Start Lesson 1</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 18,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xp: {
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    marginTop: 4,
    backgroundColor: palette.saffron,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default HomeScreen;
