import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lessons } from '@data/lessons';
import { useAppState } from '@utils/AppContext';
import { palette } from '@utils/theme';

type Props = {
  openLesson: (id: number) => void;
};

const LessonsScreen: React.FC<Props> = ({ openLesson }) => {
  const { completedLessons, darkMode } = useAppState();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? palette.darkBg : palette.cream }]}> 
      <Text style={[styles.title, { color: darkMode ? palette.darkText : palette.text }]}>Lessons Path</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => {
          const isCompleted = completedLessons.includes(item.id);
          const isUnlocked = item.id === 1 || completedLessons.includes(item.id - 1);

          return (
            <Pressable
              onPress={() => isUnlocked && openLesson(item.id)}
              style={[
                styles.node,
                {
                  backgroundColor: isUnlocked ? palette.saffronSoft : '#E3DDD3',
                  marginLeft: index % 2 === 0 ? 20 : 120,
                },
              ]}
            >
              {isCompleted ? (
                <MaterialCommunityIcons name="check-circle" size={28} color={palette.success} />
              ) : (
                <MaterialCommunityIcons
                  name={isUnlocked ? 'book-open-page-variant' : 'lock'}
                  size={26}
                  color={palette.text}
                />
              )}
              <Text style={styles.nodeText}>{item.id}</Text>
            </Pressable>
          );
        }}
      />
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
    marginBottom: 14,
  },
  list: {
    paddingBottom: 30,
    gap: 14,
  },
  node: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  nodeText: {
    color: palette.text,
    fontWeight: '700',
  },
});

export default LessonsScreen;
