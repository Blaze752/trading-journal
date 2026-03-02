import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { palette } from '@utils/theme';

type Props = {
  visible: boolean;
  amount: number;
};

const XPAnimation: React.FC<Props> = ({ visible, amount }) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -10,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      translateY.setValue(20);
      opacity.setValue(0);
    });
  }, [opacity, translateY, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity }]}>
      <Text style={styles.text}>+{amount} XP</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: -4,
    backgroundColor: '#FFE8BE',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    color: palette.text,
    fontWeight: '700',
  },
});

export default XPAnimation;
