import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { palette } from '@utils/theme';

type Props = {
  lessonIndex: number;
  totalLessons: number;
  darkMode?: boolean;
};

const Header: React.FC<Props> = ({ lessonIndex, totalLessons, darkMode = false }) => {
  const progress = lessonIndex / totalLessons;

  return (
    <View style={styles.container}>
      <Text style={[styles.watermark, { color: darkMode ? '#5C5149' : '#E5D8C4' }]}>ੴ</Text>
      <Text style={[styles.title, { color: darkMode ? palette.darkText : palette.text }]}>SikhHub</Text>
      <Text style={[styles.subtitle, { color: darkMode ? '#D3C7BC' : palette.muted }]}>
        Lesson {lessonIndex} of {totalLessons}
      </Text>
      <ProgressBar progress={progress} darkMode={darkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  watermark: {
    position: 'absolute',
    alignSelf: 'center',
    top: -14,
    fontSize: 62,
    opacity: 0.2,
  },
});

export default Header;
