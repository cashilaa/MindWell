import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const quizQuestions = [
  {
    id: 1,
    question: 'What brings you here today?',
    options: [
      'Depression',
      'Anxiety or stress',
      'Relationship issues',
      'Personal growth',
      'Trauma or PTSD',
      'Other concerns'
    ]
  },
  {
    id: 2,
    question: 'What type of therapy are you interested in?',
    options: [
      'Individual therapy',
      'Couples therapy',
      'Group therapy',
      'Family therapy',
      'Not sure yet'
    ]
  },
  {
    id: 3,
    question: 'Do you have a preference for session format?',
    options: [
      'In-person sessions',
      'Video sessions',
      'Phone sessions',
      'Flexible / No preference'
    ]
  },
  {
    id: 4,
    question: 'What are your preferred therapist qualities?',
    options: [
      'Experience with specific issues',
      'Cultural sensitivity',
      'Gender preference',
      'Language preferences',
      'Specific therapeutic approach',
      'No specific preferences'
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleComplete = () => {
    // Store quiz results in localStorage or context if needed
    localStorage.setItem('quizResults', JSON.stringify(answers));
    
    // If user is not logged in, redirect to signup
    if (!user) {
      navigate('/signup', { 
        state: { 
          fromQuiz: true,
          message: "Great! We've found some matches for you. Create an account to view your matched therapists." 
        }
      });
    } else {
      // If user is logged in, redirect to therapist matches
      navigate('/therapists', { state: { quizAnswers: answers } });
    }
  };

  const QuestionCard = ({ question, onAnswer }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
        <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
        <div className="flex space-x-1">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentQuestion ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  const CompletionCard = () => (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Thank You for Completing the Quiz!
      </h3>
      <p className="text-gray-600 mb-8">
        We'll use your responses to match you with therapists who best fit your needs.
      </p>
      <button
        onClick={handleComplete}
        className="btn-primary text-lg px-8 py-3"
      >
        View Matched Therapists
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {!isComplete ? (
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestion}
                question={quizQuestions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            </AnimatePresence>
          ) : (
            <CompletionCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
