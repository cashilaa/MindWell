import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from 'framer-motion';

export function ChatbotModal({ open, handleOpen }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-8 z-50 w-[380px] bg-white rounded-lg shadow-xl"
        >
          <div className="relative">
            <button
              onClick={handleOpen}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="h-[500px] w-full">
              <iframe
                src="https://mental-health-chatbot-ybnh.onrender.com"
                title="Mental Health Chatbot"
                className="w-full h-full border-none rounded-lg"
              />
            </div>
          </div>
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
