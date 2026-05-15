import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WellnessChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-40 right-6 z-40 w-96 h-[500px] glass-card rounded-lg flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white border-opacity-20">
              <h3 className="text-lg font-semibold text-white">MindSpace AI Support</h3>
              <p className="text-sm text-gray-400">How can I help you today?</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="glass-card p-3 rounded-lg mb-4">
                <p className="text-sm text-white">
                  Hi! I'm your AI wellness companion. I'm here to listen and provide support. How are you feeling today?
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white border-opacity-20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="input-dark flex-1 px-4 py-2"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg text-white">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WellnessChatbot;
