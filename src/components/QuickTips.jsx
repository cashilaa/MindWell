import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  {
    tip: "Take deep breaths when feeling overwhelmed",
    category: "Stress Management",
    icon: "🧘‍♀️"
  },
  {
    tip: "Practice gratitude by listing three things you're thankful for",
    category: "Positivity",
    icon: "🙏"
  },
  {
    tip: "Take a short walk to clear your mind",
    category: "Physical Health",
    icon: "🚶‍♂️"
  },
  {
    tip: "Reach out to a friend or family member today",
    category: "Social Connection",
    icon: "👥"
  },
  {
    tip: "Set small, achievable goals for the day",
    category: "Productivity",
    icon: "✅"
  },
  {
    tip: "Practice mindful eating during your next meal",
    category: "Mindfulness",
    icon: "🍽️"
  },
  {
    tip: "Take regular breaks from screen time",
    category: "Digital Wellness",
    icon: "📱"
  },
  {
    tip: "Listen to your favorite uplifting music",
    category: "Mood Boost",
    icon: "🎵"
  },
  {
    tip: "Write down your thoughts in a journal",
    category: "Self-reflection",
    icon: "📝"
  },
  {
    tip: "Create a calming bedtime routine",
    category: "Sleep Hygiene",
    icon: "😴"
  }
];

const QuickTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Change tip every 24 hours
    const savedDate = localStorage.getItem('lastTipDate');
    const today = new Date().toDateString();
    
    if (savedDate !== today) {
      const newTipIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(newTipIndex);
      localStorage.setItem('lastTipDate', today);
      localStorage.setItem('currentTipIndex', newTipIndex);
    } else {
      const savedTipIndex = localStorage.getItem('currentTipIndex');
      setCurrentTip(savedTipIndex ? parseInt(savedTipIndex) : 0);
    }
  }, []);

  const handleNextTip = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
      setIsVisible(true);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Card className="overflow-hidden">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" color="blue-gray" className="flex items-center gap-2">
                  <span>{tips[currentTip].icon}</span>
                  {tips[currentTip].category}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  Tip of the Day
                </Typography>
              </div>
              
              <Typography variant="paragraph" color="gray" className="mb-4">
                {tips[currentTip].tip}
              </Typography>

              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                onClick={handleNextTip}
              >
                Next Tip
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default QuickTips;
