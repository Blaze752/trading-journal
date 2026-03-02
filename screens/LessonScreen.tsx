import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Header from '@components/Header';
import LessonCard from '@components/LessonCard';
import QuizCard from '@components/QuizCard';
import XPAnimation from '@components/XPAnimation';
import { lessons } from '@data/lessons';
import { useAppState } from '@utils/AppContext';
import { LESSON_COMPLETE_XP } from '@utils/xp';
import { palette } from '@utils/theme';

const LessonScreen: React.FC = () => {
  const { completeLesson, darkMode } = useAppState();
  const lesson = lessons[0];
  const [step, setStep] = useState(0);
  const [audioDone, setAudioDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showXP, setShowXP] = useState(false);

  const selectedOption = useMemo(
    () => lesson.quiz.options.find((option) => option.id === selected),
    [selected, lesson.quiz.options],
  );
  const isCorrect = Boolean(selectedOption?.isCorrect);

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(lesson.audioSource);
    await sound.playAsync();
    setAudioDone(true);
    setTimeout(() => {
      sound.unloadAsync();
    }, 250);
  };

  const submitQuiz = async () => {
    setSubmitted(true);
    if (isCorrect) {
      await completeLesson(lesson.id, LESSON_COMPLETE_XP);
      setShowXP(true);
      setTimeout(() => {
        setShowXP(false);
        setStep(4);
      }, 900);
    }
  };

  const renderStep = () => {
    if (step === 0) {
      return <LessonCard title={lesson.title} content={lesson.concept} darkMode={darkMode} />;
    }

    if (step === 1) {
      return (
        <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
          <Text style={[styles.cardTitle, { color: darkMode ? palette.darkText : palette.text }]}>Listen</Text>
          <Text style={[styles.cardBody, { color: darkMode ? '#D4C8BC' : palette.muted }]}>Tap play to hear the lesson audio and complete this step.</Text>
          <Pressable style={styles.audioButton} onPress={playAudio}>
            <Text style={styles.audioText}>{audioDone ? '✓ Completed' : '▶ Play Audio'}</Text>
          </Pressable>
        </View>
      );
    }

    if (step === 2) {
      return (
        <QuizCard
          question={lesson.quiz.question}
          options={lesson.quiz.options}
          selected={selected}
          isSubmitted={submitted}
          onSelect={setSelected}
          darkMode={darkMode}
        />
      );
    }

    if (step === 3) {
      return (
        <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
          <Text style={[styles.cardTitle, { color: isCorrect ? palette.success : palette.danger }]}> 
            {isCorrect ? 'Correct! Great job.' : 'Not quite yet.'}
          </Text>
          <Text style={[styles.cardBody, { color: darkMode ? '#D4C8BC' : palette.muted }]}>{lesson.quiz.explanation}</Text>
          {isCorrect ? <Text style={styles.reward}>You earned +10 XP</Text> : null}
        </View>
      );
    }

    return (
      <View style={[styles.card, { backgroundColor: darkMode ? palette.darkCard : palette.card }]}> 
        <Text style={[styles.cardTitle, { color: darkMode ? palette.darkText : palette.text }]}>Lesson Complete 🎉</Text>
        <Text style={[styles.cardBody, { color: darkMode ? '#D4C8BC' : palette.muted }]}>Amazing consistency. Return tomorrow to keep your streak alive and continue Lesson 2.</Text>
      </View>
    );
  };

  const canContinue =
    (step === 1 && audioDone) ||
    (step === 2 && selected !== null) ||
    (step === 3 && isCorrect) ||
    (step === 0 || step === 4);

  const next = async () => {
    if (step === 2) {
      await submitQuiz();
      setStep(3);
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? palette.darkBg : palette.cream }]}> 
      <Header lessonIndex={1} totalLessons={10} darkMode={darkMode} />
      <View style={styles.stepWrap}>
        {renderStep()}
        <XPAnimation visible={showXP} amount={LESSON_COMPLETE_XP} />
      </View>
      {step === 2 && submitted && !isCorrect ? (
        <Text style={styles.errorText}>Choose the option that reflects truthful living and seva, then try again.</Text>
      ) : null}
      <Pressable
        style={[styles.cta, !canContinue && styles.ctaDisabled]}
        disabled={!canContinue}
        onPress={next}
      >
        <Text style={styles.ctaText}>{step === 2 ? 'Check Answer' : 'Continue'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stepWrap: {
    marginTop: 6,
    position: 'relative',
  },
  card: {
    borderRadius: 22,
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
  },
  cardBody: {
    fontSize: 16,
    lineHeight: 23,
  },
  audioButton: {
    backgroundColor: palette.saffron,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  audioText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  reward: {
    color: palette.success,
    fontWeight: '700',
    fontSize: 16,
  },
  cta: {
    marginTop: 'auto',
    backgroundColor: palette.saffron,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 6,
  },
  ctaDisabled: {
    opacity: 0.45,
  },
  ctaText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  errorText: {
    color: palette.danger,
    marginTop: 10,
    fontSize: 14,
  },
});

export default LessonScreen;
