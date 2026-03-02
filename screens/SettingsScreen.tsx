import React from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { useAppState } from '@utils/AppContext';
import { palette } from '@utils/theme';

const SettingsScreen: React.FC = () => {
  const { darkMode, toggleDarkMode, resetProgress } = useAppState();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? palette.darkBg : palette.cream }]}> 
      <Text style={[styles.title, { color: darkMode ? palette.darkText : palette.text }]}>Settings</Text>
      <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
        <View style={styles.row}>
          <Text style={[styles.label, { color: darkMode ? palette.darkText : palette.text }]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
        <Pressable style={styles.resetBtn} onPress={resetProgress}>
          <Text style={styles.resetText}>Reset Progress</Text>
        </Pressable>
        <View style={styles.aboutWrap}>
          <Text style={[styles.aboutTitle, { color: darkMode ? palette.darkText : palette.text }]}>About SikhHub</Text>
          <Text style={[styles.aboutBody, { color: darkMode ? '#D3C7BC' : palette.muted }]}>SikhHub helps learners build a daily Sikhi habit with small lessons, quizzes, and motivating progress tracking.</Text>
        </View>
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
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  resetBtn: {
    backgroundColor: palette.danger,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  resetText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  aboutWrap: {
    gap: 6,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  aboutBody: {
    fontSize: 15,
    lineHeight: 21,
  },
});

export default SettingsScreen;
