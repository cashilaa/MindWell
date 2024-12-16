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
          className="fixed bottom-20 right-8 z-50"
        >
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleOpen}
              className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full hover:bg-gray-100 transition-colors z-10 shadow-md"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>

            <iframe
              src="https://mental-health-chatbot-ybnh.onrender.com"
              title="Mental Health Chatbot"
              className="rounded-lg shadow-xl"
              width="380"
              height="600"
            />

            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
