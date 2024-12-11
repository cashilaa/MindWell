import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Progress } from "@material-tailwind/react";

const quizQuestions = [
  {
    id: 1,
    question: 'How have you been feeling lately?',
    options: [
      { text: 'Feeling down or depressed', score: { depression: 5, anxiety: 2 }, specialty: ['depression', 'mood'] },
      { text: 'Anxious or overwhelmed', score: { anxiety: 5, stress: 3 }, specialty: ['anxiety', 'stress-management'] },
      { text: 'Struggling with relationships', score: { relationships: 5 }, specialty: ['relationships', 'family'] },
      { text: 'Processing trauma or difficult experiences', score: { trauma: 5, anxiety: 2 }, specialty: ['trauma', 'PTSD'] },
      { text: 'Looking to grow personally', score: { growth: 5 }, specialty: ['personal-growth', 'life-coaching'] }
    ]
  },
  {
    id: 2,
    question: 'What specific challenges are you facing?',
    options: [
      { text: 'Difficulty sleeping', score: { anxiety: 3, depression: 2 }, specialty: ['sleep', 'anxiety'] },
      { text: 'Trouble concentrating', score: { anxiety: 2, depression: 2 }, specialty: ['cognitive', 'mindfulness'] },
      { text: 'Feeling isolated', score: { depression: 3, relationships: 2 }, specialty: ['depression', 'social'] },
      { text: 'Panic attacks', score: { anxiety: 4, trauma: 2 }, specialty: ['anxiety', 'panic-disorders'] },
      { text: 'Past trauma', score: { trauma: 4, anxiety: 2 }, specialty: ['trauma', 'PTSD'] }
    ]
  },
  {
    id: 3,
    question: 'What are your therapy goals?',
    options: [
      { text: 'Manage daily stress', score: { stress: 4, anxiety: 2 }, specialty: ['stress-management', 'coping-skills'] },
      { text: 'Improve relationships', score: { relationships: 4 }, specialty: ['relationships', 'communication'] },
      { text: 'Process trauma', score: { trauma: 4 }, specialty: ['trauma', 'EMDR'] },
      { text: 'Build self-esteem', score: { growth: 4, depression: 2 }, specialty: ['self-esteem', 'CBT'] },
      { text: 'Find life purpose', score: { growth: 4 }, specialty: ['life-coaching', 'existential'] }
    ]
  },
  {
    id: 4,
    question: 'What therapy style interests you?',
    options: [
      { text: 'Structured and goal-oriented', score: { cbt: 4 }, specialty: ['CBT', 'solution-focused'] },
      { text: 'Exploring past experiences', score: { psychodynamic: 4 }, specialty: ['psychodynamic', 'analytical'] },
      { text: 'Mindfulness and acceptance', score: { mindfulness: 4 }, specialty: ['mindfulness', 'ACT'] },
      { text: 'Emotional processing', score: { emotionalFocus: 4 }, specialty: ['emotion-focused', 'gestalt'] },
      { text: 'Flexible approach', score: { integrative: 4 }, specialty: ['integrative', 'eclectic'] }
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Update progress bar
    const progressPercentage = (currentQuestion / quizQuestions.length) * 100;
    setProgress(progressPercentage);
  }, [currentQuestion]);

  const calculateTherapistMatch = () => {
    // Aggregate all scores
    const finalScores = Object.values(answers).reduce((acc, answer) => {
      Object.entries(answer.score).forEach(([key, value]) => {
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    }, {});

    // Get primary concerns based on highest scores
    const sortedConcerns = Object.entries(finalScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([concern]) => concern);

    // Collect all relevant specialties
    const relevantSpecialties = Object.values(answers)
      .flatMap(answer => answer.specialty)
      .filter((v, i, a) => a.indexOf(v) === i);

    return {
      primaryConcerns: sortedConcerns,
      specialties: relevantSpecialties,
      scores: finalScores
    };
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    setStreak(streak + 1);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const matchResults = calculateTherapistMatch();
      setScores(matchResults);
      setIsComplete(true);
    }
  };

  const handleComplete = () => {
    const matchResults = calculateTherapistMatch();
    localStorage.setItem('quizResults', JSON.stringify({
      answers,
      matchResults,
      streak,
      completedAt: new Date().toISOString()
    }));
    
    if (!user) {
      navigate('/signup', { 
        state: { 
          fromQuiz: true,
          message: "We've found your ideal therapeutic match! Create an account to connect with your matched therapists.",
          matchResults
        }
      });
    } else {
      navigate('/therapists', { 
        state: { 
          quizAnswers: answers,
          matchResults
        }
      });
    }
  };

  const QuestionCard = ({ question, onAnswer }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#BE8B69] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-sm text-[#BE8B69]">Streak: {streak}</span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const CompletionCard = () => (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🎉</span>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Quiz Complete! 
      </h3>
      
      <div className="mb-6">
        <p className="text-lg text-primary-600 font-semibold">
          Achievement Unlocked: {streak} Question Streak! 🏆
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold mb-2">Your Top Areas of Focus:</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {scores.primaryConcerns?.map((concern, index) => (
            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {concern}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="btn-primary text-lg px-8 py-3 animate-pulse"
      >
        View Your Matched Therapists
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <QuestionCard
                key={currentQuestion}
                question={quizQuestions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            ) : (
              <CompletionCard />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
