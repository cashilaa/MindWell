import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from './QuizContext';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { quizState, setAnswer, questions } = useQuiz();
  const navigate = useNavigate();
  const currentQuestion = questions[quizState.currentStep];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleOptionClick = (answer) => {
    setAnswer(currentQuestion.id, answer);
    if (quizState.currentStep >= questions.length - 1) {
      navigate('/recommendations');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((quizState.currentStep) / (questions.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500 text-right">
            {quizState.currentStep + 1} of {questions.length}
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
              {currentQuestion.question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-primary-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <div className="text-lg font-medium text-primary-900">
                    {option.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
