import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from './QuizContext';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Quiz = () => {
  const { quizState, setAnswer, questions, goBack } = useQuiz();
  const navigate = useNavigate();
  const [culturalInput, setCulturalInput] = useState('');
  const [error, setError] = useState('');
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
    setError('');
    const option = currentQuestion.options.find(opt => opt.id === answer);
    
    if (option?.hasInput && !culturalInput.trim()) {
      setError('Please specify your cultural background');
      return;
    }

    setAnswer(
      currentQuestion.id, 
      answer, 
      option?.hasInput ? { culturalBackground: culturalInput } : null
    );

    if (quizState.currentStep >= questions.length - 1) {
      navigate('/recommendations');
    }
  };

  const handleMultiSelect = (answer) => {
    setAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (currentQuestion.multiSelect && 
        (!quizState.answers[currentQuestion.id] || 
         quizState.answers[currentQuestion.id].length === 0)) {
      setError('Please select at least one option');
      return;
    }
    
    if (quizState.currentStep >= questions.length - 1) {
      navigate('/recommendations');
    } else {
      setAnswer(currentQuestion.id, quizState.answers[currentQuestion.id] || []);
    }
  };

  const handleBack = () => {
    if (quizState.currentStep > 0) {
      goBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {quizState.currentStep > 0 && (
          <button
            onClick={handleBack}
            className="mb-4 text-primary-600 hover:text-primary-700 flex items-center gap-2"
          >
            ← Previous Question
          </button>
        )}

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
            Question {quizState.currentStep + 1} of {questions.length}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            <Card className="p-6 mb-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
                {currentQuestion.question}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <motion.div key={option.id}>
                    <Button
                      variant={currentQuestion.multiSelect ? 
                        (quizState.answers[currentQuestion.id]?.includes(option.id) ? "secondary" : "outline") : 
                        "outline"
                      }
                      className="w-full p-6 h-auto flex flex-col items-center gap-3"
                      onClick={() => currentQuestion.multiSelect ? 
                        handleMultiSelect(option.id) : 
                        handleOptionClick(option.id)
                      }
                    >
                      <div className="text-primary-600">
                        {option.icon}
                      </div>
                      <div className="text-lg font-medium text-primary-900 text-center">
                        {option.label}
                      </div>
                      {option.hasInput && (
                        <Input
                          type="text"
                          value={culturalInput}
                          onChange={(e) => setCulturalInput(e.target.value)}
                          placeholder={option.inputPlaceholder}
                          className="mt-2 w-full"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {currentQuestion.multiSelect && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    size="lg"
                    onClick={handleNext}
                    className="px-8"
                  >
                    Next
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;