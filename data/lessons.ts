export type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Lesson = {
  id: number;
  title: string;
  concept: string;
  audioSource: any;
  quiz: {
    question: string;
    options: QuizOption[];
    explanation: string;
  };
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Why Learn Sikhi?',
    concept:
      'Sikhi teaches us to live truthfully, serve others, and stay connected to Waheguru while living everyday life.',
    audioSource: require('../assets/audio/lesson1.mp3'),
    quiz: {
      question: 'What is one main purpose of Sikhi?',
      options: [
        {
          id: 'a',
          text: 'Live truthfully and serve humanity',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'Gain authority over others',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'Ignore worldly duties',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Memorize scriptures only',
          isCorrect: false,
        },
      ],
      explanation:
        'In Sikhi, spiritual growth and service go together. We are encouraged to be truthful, compassionate, and active in everyday responsibilities.',
    },
  },
  ...Array.from({ length: 9 }, (_, index) => ({
    id: index + 2,
    title: `Lesson ${index + 2}`,
    concept: 'Coming soon: A focused and bite-sized Sikh learning concept.',
    audioSource: require('../assets/audio/lesson1.mp3'),
    quiz: {
      question: 'Placeholder quiz question.',
      options: [
        { id: 'a', text: 'Placeholder correct answer', isCorrect: true },
        { id: 'b', text: 'Placeholder option', isCorrect: false },
        { id: 'c', text: 'Placeholder option', isCorrect: false },
        { id: 'd', text: 'Placeholder option', isCorrect: false },
      ],
      explanation: 'More lesson content will be unlocked in future updates.',
    },
  })),
];
