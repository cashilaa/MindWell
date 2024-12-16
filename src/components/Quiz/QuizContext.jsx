import React, { createContext, useContext, useState } from 'react';
import { 
  Heart, Brain, Activity, HelpCircle, Sun, Target, MessageCircle, Shuffle,
  HeartHandshake, Tool, Mix, Wallet, Users, Globe, Pyramid, Activity as HealthIcon,
  Users as FamilyIcon, Flower2, Cross, CircleDot, MapPin, Video, ThumbsUp,
  ThumbsDown, Coffee, DollarSign, Clock, Calendar
} from 'lucide-react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({
    currentStep: 0,
    answers: {},
    completed: false,
    culturalBackground: '',
  });

  const questions = [
    {
      id: 'reason',
      question: "What brings you here today?",
      options: [
        { 
          id: 'overwhelmed', 
          label: "I'm feeling overwhelmed and need someone to talk to.", 
          icon: <Heart className="w-8 h-8" /> 
        },
        { 
          id: 'understanding', 
          label: "I want to understand myself better.", 
          icon: <Brain className="w-8 h-8" /> 
        },
        { 
          id: 'specific', 
          label: "I'm dealing with something specific, like anxiety, depression, or trauma.", 
          icon: <Activity className="w-8 h-8" /> 
        },
        { 
          id: 'unsure', 
          label: "I'm not sure, but I know I want to feel better.", 
          icon: <HelpCircle className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'therapist_vibe',
      question: "What kind of vibe are you looking for in a therapist?",
      options: [
        { 
          id: 'nurturing', 
          label: "Warm and nurturing, like a cozy cup of tea.", 
          icon: <Sun className="w-8 h-8" /> 
        },
        { 
          id: 'practical', 
          label: "Straightforward and practical, let's get to the point.", 
          icon: <Target className="w-8 h-8" /> 
        },
        { 
          id: 'conversational', 
          label: "Chill and conversational, like talking to a wise friend.", 
          icon: <MessageCircle className="w-8 h-8" /> 
        },
        { 
          id: 'open', 
          label: "I'm open—surprise me!", 
          icon: <Shuffle className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'approach',
      question: "How would you like to work on things?",
      options: [
        { 
          id: 'listening', 
          label: "Just listen and help me process my feelings.", 
          icon: <HeartHandshake className="w-8 h-8" /> 
        },
        { 
          id: 'tools', 
          label: "Assign me homework and give me tools I can use every day.", 
          icon: <Tool className="w-8 h-8" /> 
        },
        { 
          id: 'mixed', 
          label: "A mix of both, depending on what I need.", 
          icon: <Mix className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'budget',
      question: "What's your budget?",
      options: [
        { 
          id: 'low', 
          label: "Free or low-cost options, please! (Under $50/session)", 
          icon: <DollarSign className="w-8 h-8" /> 
        },
        { 
          id: 'moderate', 
          label: "Moderate—value is important, but I'm on a budget. ($50–$150/session)", 
          icon: <Wallet className="w-8 h-8" /> 
        },
        { 
          id: 'flexible', 
          label: "Flexible—I'm willing to invest in myself. ($150+/session)", 
          icon: <DollarSign className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'preferences',
      question: "Do you have any preferences for your therapist? (Select all that apply)",
      multiSelect: true,
      options: [
        { 
          id: 'lgbtq', 
          label: "Someone who understands LGBTQ+ experiences", 
          icon: <Users className="w-8 h-8" /> 
        },
        { 
          id: 'cultural', 
          label: "Someone familiar with my cultural background", 
          icon: <Globe className="w-8 h-8" />,
          hasInput: true,
          inputPlaceholder: "Please specify your cultural background"
        },
        { 
          id: 'trauma', 
          label: "Someone experienced in trauma therapy", 
          icon: <Pyramid className="w-8 h-8" /> 
        },
        { 
          id: 'anxiety_depression', 
          label: "Someone who specializes in anxiety or depression", 
          icon: <HealthIcon className="w-8 h-8" /> 
        },
        { 
          id: 'relationships', 
          label: "Someone skilled in relationship or family therapy", 
          icon: <FamilyIcon className="w-8 h-8" /> 
        },
        { 
          id: 'holistic', 
          label: "Someone with expertise in mindfulness or holistic approaches", 
          icon: <Flower2 className="w-8 h-8" /> 
        },
        { 
          id: 'faith', 
          label: "Someone who can provide faith-based counselling", 
          icon: <Cross className="w-8 h-8" /> 
        },
        { 
          id: 'no_preference', 
          label: "I don't have specific preferences", 
          icon: <CircleDot className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'session_type',
      question: "What type of session works best for you?",
      options: [
        { 
          id: 'in_person', 
          label: "Face-to-face, I connect better in person.", 
          icon: <MapPin className="w-8 h-8" /> 
        },
        { 
          id: 'virtual', 
          label: "Virtual, I love the comfort of my own space.", 
          icon: <Video className="w-8 h-8" /> 
        },
        { 
          id: 'flexible', 
          label: "I'm flexible—whatever gets me started.", 
          icon: <Mix className="w-8 h-8" /> 
        }
      ]
    },
    {
      id: 'experience',
      question: "Have you seen a therapist before?",
      options: [
        { 
          id: 'yes_helpful', 
          label: "Yes, and it was helpful!", 
          icon: <ThumbsUp className="w-8 h-8" /> 
        },
        { 
          id: 'yes_not_fit', 
          label: "Yes, but it wasn't quite the right fit.", 
          icon: <ThumbsDown className="w-8 h-8" /> 
        },
        { 
          id: 'first_time', 
          label: "No, this is my first time.", 
          icon: <Coffee className="w-8 h-8" /> 
        }
      ]
    }
  ];

  const setAnswer = (questionId, answer, additionalData = null) => {
    setQuizState(prev => {
      const newAnswers = { ...prev.answers };
      
      if (questions.find(q => q.id === questionId)?.multiSelect) {
        newAnswers[questionId] = newAnswers[questionId] || [];
        const index = newAnswers[questionId].indexOf(answer);
        
        if (index === -1) {
          newAnswers[questionId].push(answer);
        } else {
          newAnswers[questionId].splice(index, 1);
        }
      } else {
        newAnswers[questionId] = answer;
      }

      return {
        ...prev,
        answers: newAnswers,
        culturalBackground: additionalData?.culturalBackground || prev.culturalBackground,
        currentStep: answer === 'no_preference' ? prev.currentStep + 2 : prev.currentStep + 1,
        completed: prev.currentStep + 1 >= questions.length,
      };
    });
  };

  const resetQuiz = () => {
    setQuizState({
      currentStep: 0,
      answers: {},
      completed: false,
      culturalBackground: '',
    });
  };

  const value = {
    quizState,
    setAnswer,
    resetQuiz,
    questions
  };

  return (
    <QuizContext.Provider value={value}>
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