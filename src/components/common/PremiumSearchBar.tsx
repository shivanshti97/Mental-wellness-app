import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface PremiumSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor?: 'teal' | 'blue' | 'purple' | 'pink';
}

const accentColors = {
  teal: {
    glow: 'from-teal-500/20 via-purple-500/20 to-blue-500/20',
    icon: 'group-focus-within:text-teal-400',
    border: 'focus:border-teal-400/60',
    selection: 'selection:bg-teal-400/30',
    caret: '#5eead4'
  },
  blue: {
    glow: 'from-blue-500/20 via-purple-500/20 to-teal-500/20',
    icon: 'group-focus-within:text-blue-400',
    border: 'focus:border-blue-400/60',
    selection: 'selection:bg-blue-400/30',
    caret: '#60a5fa'
  },
  purple: {
    glow: 'from-purple-500/20 via-pink-500/20 to-blue-500/20',
    icon: 'group-focus-within:text-purple-400',
    border: 'focus:border-purple-400/60',
    selection: 'selection:bg-purple-400/30',
    caret: '#c084fc'
  },
  pink: {
    glow: 'from-pink-500/20 via-purple-500/20 to-teal-500/20',
    icon: 'group-focus-within:text-pink-400',
    border: 'focus:border-pink-400/60',
    selection: 'selection:bg-pink-400/30',
    caret: '#f472b6'
  }
};

const PremiumSearchBar: React.FC<PremiumSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  accentColor = 'teal'
}) => {
  const colors = accentColors[accentColor];

  return (
    <div className="relative group">
      {/* Animated glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.glow} rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative">
        {/* Search icon */}
        <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${colors.icon} transition-colors duration-300 z-10`} />
        
        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl pl-14 pr-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none ${colors.border} focus:bg-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg shadow-black/10 ${colors.selection} selection:text-gray-800`}
          style={{
            color: '#1f2937',
            WebkitTextFillColor: '#1f2937',
            caretColor: colors.caret
          }}
          autoComplete="off"
        />
        
        {/* Clear button */}
        {value && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all duration-200 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PremiumSearchBar;
