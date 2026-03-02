import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from '@utils/theme';

type Props = {
  progress: number;
  darkMode?: boolean;
};

const ProgressBar: React.FC<Props> = ({ progress, darkMode = false }) => (
  <View style={[styles.track, { backgroundColor: darkMode ? '#3B3532' : '#E9DECC' }]}>
    <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress * 100))}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: palette.saffron,
    borderRadius: 999,
  },
});

export default ProgressBar;
