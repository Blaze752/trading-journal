import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { QuizOption } from '@data/lessons';
import { palette } from '@utils/theme';

type Props = {
  question: string;
  options: QuizOption[];
  selected: string | null;
  isSubmitted: boolean;
  onSelect: (id: string) => void;
  darkMode?: boolean;
};

const QuizCard: React.FC<Props> = ({
  question,
  options,
  selected,
  isSubmitted,
  onSelect,
  darkMode = false,
}) => (
  <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
    <Text style={[styles.question, { color: darkMode ? palette.darkText : palette.text }]}>{question}</Text>
    {options.map((option) => {
      const isSelected = selected === option.id;
      const stateStyle = isSubmitted
        ? option.isCorrect
          ? styles.correct
          : isSelected
            ? styles.incorrect
            : styles.defaultState
        : isSelected
          ? styles.selected
          : styles.defaultState;

      return (
        <Pressable
          key={option.id}
          onPress={() => onSelect(option.id)}
          disabled={isSubmitted}
          style={[styles.option, stateStyle]}
        >
          <View style={styles.row}>
            <View style={[styles.radio, isSelected && styles.radioSelected]} />
            <Text style={styles.optionText}>{option.text}</Text>
          </View>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    gap: 12,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  option: {
    borderWidth: 2,
    borderColor: '#E8DCC8',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 58,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A58A6A',
  },
  radioSelected: {
    backgroundColor: palette.saffron,
  },
  optionText: {
    fontSize: 16,
    color: palette.text,
    flex: 1,
  },
  defaultState: { backgroundColor: '#FFFDF9' },
  selected: { borderColor: palette.saffron, backgroundColor: '#FDF1DE' },
  correct: { borderColor: palette.success, backgroundColor: '#E8F8EF' },
  incorrect: { borderColor: palette.danger, backgroundColor: '#FFEDED' },
});

export default QuizCard;
