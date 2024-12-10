import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    currentStep: 0,
    answers: {},
    completed: false,
  });

  const questions = [
    {
      id: 1,
      question: "What type of support are you looking for?",
      options: [
        { id: 'therapy', label: 'One-on-one Therapy', icon: '👥' },
        { id: 'counseling', label: 'Counseling', icon: '💭' },
        { id: 'psychiatry', label: 'Psychiatric Support', icon: '🏥' },
        { id: 'coaching', label: 'Life Coaching', icon: '🎯' },
      ],
    },
    {
      id: 2,
      question: "How would you prefer to connect with your mental health professional?",
      options: [
        { id: 'in-person', label: 'In-Person Sessions', icon: '🤝' },
        { id: 'video', label: 'Video Calls', icon: '📹' },
        { id: 'audio', label: 'Audio Calls', icon: '📞' },
        { id: 'chat', label: 'Text Chat', icon: '💬' },
      ],
    },
    {
      id: 3,
      question: "What areas would you like to focus on?",
      options: [
        { id: 'anxiety', label: 'Anxiety & Stress', icon: '😰' },
        { id: 'depression', label: 'Depression', icon: '😔' },
        { id: 'relationships', label: 'Relationships', icon: '❤️' },
        { id: 'self-growth', label: 'Personal Growth', icon: '🌱' },
      ],
    },
    {
      id: 4,
      question: "When would you prefer to have your sessions?",
      options: [
        { id: 'weekday-day', label: 'Weekdays (9am-5pm)', icon: '☀️' },
        { id: 'weekday-evening', label: 'Weekday Evenings', icon: '🌅' },
        { id: 'weekend', label: 'Weekends', icon: '📅' },
        { id: 'flexible', label: 'Flexible', icon: '⭐' },
      ],
    },
  ];

  const setAnswer = (questionId, answer) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      currentStep: prev.currentStep + 1,
      completed: prev.currentStep + 1 >= questions.length,
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentStep: 0,
      answers: {},
      completed: false,
    });
  };

  return (
    <QuizContext.Provider value={{ quizState, setAnswer, resetQuiz, questions }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
