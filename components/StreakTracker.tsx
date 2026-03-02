import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '@utils/theme';

type Props = {
  streak: number;
  darkMode?: boolean;
};

const StreakTracker: React.FC<Props> = ({ streak, darkMode = false }) => (
  <View style={[styles.container, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
    <MaterialCommunityIcons name="fire" size={24} color={palette.saffron} />
    <Text style={[styles.text, { color: darkMode ? palette.darkText : palette.text }]}>{streak} Day Streak</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StreakTracker;
