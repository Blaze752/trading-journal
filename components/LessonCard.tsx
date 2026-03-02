import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { palette } from '@utils/theme';

type Props = {
  title: string;
  content: string;
  darkMode?: boolean;
};

const LessonCard: React.FC<Props> = ({ title, content, darkMode = false }) => (
  <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
    <Text style={[styles.title, { color: darkMode ? palette.darkText : palette.text }]}>{title}</Text>
    <Text style={[styles.content, { color: darkMode ? '#DACEC2' : palette.muted }]}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    fontSize: 17,
    lineHeight: 24,
  },
});

export default LessonCard;
