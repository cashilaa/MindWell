import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const quizQuestions = [
  {
    id: 1,
    question: "What brings you here today?",
    options: [
      { text: "I'm feeling overwhelmed and need someone to talk to", score: { anxiety: 4, stress: 4 }, specialty: ['anxiety', 'stress-management'] },
      { text: "I want to understand myself better", score: { growth: 4, self_discovery: 3 }, specialty: ['personal-growth', 'psychodynamic'] },
      { text: "I'm dealing with something specific, like anxiety, depression, or trauma", score: { specific_concerns: 5 }, specialty: ['anxiety', 'depression', 'trauma'] },
      { text: "I'm not sure, but I know I want to feel better", score: { general_support: 4 }, specialty: ['counseling', 'supportive-therapy'] }
    ]
  },
  {
    id: 2,
    question: "What kind of vibe are you looking for in a therapist?",
    options: [
      { text: "Warm and nurturing, like a cozy cup of tea", score: { nurturing: 4 }, specialty: ['person-centered', 'supportive'] },
      { text: "Straightforward and practical, let's get to the point", score: { practical: 4 }, specialty: ['cbt', 'solution-focused'] },
      { text: "Chill and conversational, like talking to a wise friend", score: { conversational: 4 }, specialty: ['humanistic', 'narrative'] },
      { text: "I'm open—surprise me!", score: { flexible: 4 }, specialty: ['integrative', 'eclectic'] }
    ]
  },
  {
    id: 3,
    question: "How would you like to work on things?",
    options: [
      { text: "Just listen and help me process my feelings", score: { processing: 4 }, specialty: ['psychodynamic', 'person-centered'] },
      { text: "Assign me homework and give me tools I can use every day", score: { practical_tools: 4 }, specialty: ['cbt', 'dbt'] },
      { text: "A mix of both, depending on what I need", score: { flexible_approach: 4 }, specialty: ['integrative', 'holistic'] }
    ]
  },
  {
    id: 4,
    question: "What's your budget?",
    options: [
      { text: "Free or low-cost options, please! (Under $50/session)", score: { budget_conscious: 4 }, specialty: ['sliding-scale', 'community'] },
      { text: "Moderate—value is important, but I'm on a budget ($50–$150/session)", score: { moderate_budget: 4 }, specialty: ['standard-fee'] },
      { text: "Flexible—I'm willing to invest in myself ($150+/session)", score: { premium: 4 }, specialty: ['specialized', 'intensive'] }
    ]
  },
  {
    id: 5,
    question: "Do you have any preferences for your therapist? (Select all that apply)",
    options: [
      { text: "Someone who understands LGBTQ+ experiences", score: { lgbtq: 4 }, specialty: ['lgbtq-affirming'] },
      { text: "Someone familiar with my cultural background", score: { cultural: 4 }, specialty: ['multicultural'] },
      { text: "Someone experienced in trauma therapy", score: { trauma: 4 }, specialty: ['trauma', 'emdr'] },
      { text: "Someone who specializes in anxiety or depression", score: { anxiety_depression: 4 }, specialty: ['anxiety', 'depression'] },
      { text: "Someone skilled in relationship or family therapy", score: { relationships: 4 }, specialty: ['couples', 'family'] },
      { text: "Someone with expertise in mindfulness or holistic approaches", score: { holistic: 4 }, specialty: ['mindfulness', 'holistic'] },
      { text: "Someone who can provide faith-based counselling", score: { faith: 4 }, specialty: ['spiritual', 'faith-based'] },
      { text: "I don't have specific preferences", score: { open: 4 }, specialty: ['general'] }
    ]
  },
  {
    id: 6,
    question: "What type of session works best for you?",
    options: [
      { text: "Face-to-face, I connect better in person", score: { in_person: 4 }, specialty: ['in-person'] },
      { text: "Virtual, I love the comfort of my own space", score: { virtual: 4 }, specialty: ['telehealth'] },
      { text: "I'm flexible—whatever gets me started", score: { flexible_format: 4 }, specialty: ['hybrid'] }
    ]
  },
  {
    id: 7,
    question: "Have you seen a therapist before?",
    options: [
      { text: "Yes, and it was helpful!", score: { positive_experience: 4 }, specialty: ['continuation'] },
      { text: "Yes, but it wasn't quite the right fit", score: { new_approach: 4 }, specialty: ['alternative'] },
      { text: "No, this is my first time", score: { first_time: 4 }, specialty: ['beginner-friendly'] },
      { text: "Does Googling 'therapist memes' count?", score: { humor: 4 }, specialty: ['approachable'] }
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
    // Aggregate all scores from multiple answers
    const finalScores = Object.entries(answers).reduce((acc, [_, questionAnswers]) => {
      questionAnswers.forEach(answer => {
        Object.entries(answer.score).forEach(([key, value]) => {
          acc[key] = (acc[key] || 0) + value;
        });
      });
      return acc;
    }, {});

    // Get primary concerns based on highest scores
    const sortedConcerns = Object.entries(finalScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([concern]) => concern);

    // Collect all relevant specialties from multiple answers
    const relevantSpecialties = Object.values(answers)
      .flat()
      .flatMap(answer => answer.specialty)
      .filter((v, i, a) => a.indexOf(v) === i);

    return {
      primaryConcerns: sortedConcerns,
      specialties: relevantSpecialties,
      scores: finalScores
    };
  };

  const handleAnswer = (option) => {
    // Initialize or get current answers for this question
    const currentAnswers = answers[currentQuestion] || [];
    
    // Toggle the selected option
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(ans => ans !== option)
      : [...currentAnswers, option];
      
    setAnswers({
      ...answers,
      [currentQuestion]: updatedAnswers
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const matchResults = calculateTherapistMatch();
      setScores(matchResults);
      setIsComplete(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    const matchResults = calculateTherapistMatch();
    localStorage.setItem('quizResults', JSON.stringify({
      answers,
      matchResults,
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
        <div className="mt-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>

      <p className="text-gray-600 mb-4">Select all that apply:</p>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = answers[currentQuestion]?.includes(option);
          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.text}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousQuestion}
          className={`px-4 py-2 rounded-lg ${currentQuestion === 0 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-primary-600 hover:bg-primary-50'}`}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={goToNextQuestion}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          disabled={!answers[currentQuestion]?.length}
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </motion.div>
  );

  const CompletionCard = () => (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Thank You for Taking This Step
      </h3>
      
      <p className="text-gray-600 mb-6">
        Great job! Based on your answers, we'll match you with therapists who meet your
        needs. Your path to feeling better starts here.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold mb-2">Key Areas of Focus:</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {scores.primaryConcerns?.map((concern, index) => (
            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {concern}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleComplete()}
        className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
      >
        View Your Matched Therapists
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut"
          }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 0.8, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            Find Your Perfect Match
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 1.6, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            Welcome! Let's find the right therapist for you. Answer these quick questions
            to guide us in matching you with someone who truly gets you.
          </motion.p>
        </motion.div>
        
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
