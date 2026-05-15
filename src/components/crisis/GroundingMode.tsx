import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { deactivateGroundingMode, setGroundingStep } from '../../store/slices/crisisSlice';
import EmergencyContacts from './EmergencyContacts';

interface GroundingModeProps {
  isActive: boolean;
  onComplete: () => void;
  onExit: () => void;
}

const GroundingMode: React.FC<GroundingModeProps> = ({ isActive, onComplete, onExit }) => {
  const dispatch = useDispatch();
  const { emergencyContacts } = useSelector(
    (state: RootState) => state.crisis
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const breathingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const groundingSteps = [
    {
      title: "5 Things You Can See",
      instruction: "Look around and name 5 things you can see right now",
      icon: "👁️",
      duration: 30000, // 30 seconds
    },
    {
      title: "4 Things You Can Touch",
      instruction: "Feel and name 4 things you can touch around you",
      icon: "✋",
      duration: 25000,
    },
    {
      title: "3 Things You Can Hear",
      instruction: "Listen carefully and identify 3 sounds you can hear",
      icon: "👂",
      duration: 20000,
    },
    {
      title: "2 Things You Can Smell",
      instruction: "Take a deep breath and notice 2 scents around you",
      icon: "👃",
      duration: 15000,
    },
    {
      title: "1 Thing You Can Taste",
      instruction: "Focus on 1 taste in your mouth or take a sip of water",
      icon: "👅",
      duration: 10000,
    },
  ];

  const breathingPattern = [
    { phase: 'inhale', duration: 4000, instruction: 'Breathe in slowly...' },
    { phase: 'hold', duration: 4000, instruction: 'Hold your breath...' },
    { phase: 'exhale', duration: 6000, instruction: 'Breathe out slowly...' },
  ];

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      if (currentStep < groundingSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        dispatch(setGroundingStep(nextStep));
      } else {
        // Completed all steps
        onComplete();
      }
    }, groundingSteps[currentStep]?.duration || 30000);

    return () => clearTimeout(timer);
  }, [currentStep, isActive, dispatch, onComplete]);

  // Breathing animation cycle — properly cleaned up
  useEffect(() => {
    if (!isActive) return;

    let phaseIndex = 0;
    let cancelled = false;

    const scheduleNext = () => {
      if (cancelled) return;
      const currentPhase = breathingPattern[phaseIndex];
      setBreathingPhase(currentPhase.phase as 'inhale' | 'hold' | 'exhale');
      breathingTimerRef.current = setTimeout(() => {
        if (!cancelled) {
          phaseIndex = (phaseIndex + 1) % breathingPattern.length;
          scheduleNext();
        }
      }, currentPhase.duration);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      if (breathingTimerRef.current) {
        clearTimeout(breathingTimerRef.current);
        breathingTimerRef.current = null;
      }
    };
  }, [isActive]);

  const handleExit = () => {
    dispatch(deactivateGroundingMode());
    onExit();
  };

  const handleEmergencyContacts = () => {
    setShowEmergencyContacts(true);
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="glass-card max-w-2xl w-full mx-4 p-8 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Crisis Support</h1>
            <button
              onClick={handleExit}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Exit grounding mode"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <motion.div
                className="bg-gradient-to-r from-space-teal to-space-purple h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / groundingSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-300">
              Step {currentStep + 1} of {groundingSteps.length}
            </p>
          </div>

          {/* Current Grounding Step */}
          <motion.div
            key={currentStep}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">{groundingSteps[currentStep]?.icon}</div>
            <h2 className="text-xl font-semibold text-white mb-4">
              {groundingSteps[currentStep]?.title}
            </h2>
            <p className="text-gray-300 text-lg">
              {groundingSteps[currentStep]?.instruction}
            </p>
          </motion.div>

          {/* Breathing Guide */}
          <motion.div
            className="mb-8 flex flex-col items-center"
            animate={{
              scale: breathingPhase === 'inhale' ? 1.1 : breathingPhase === 'hold' ? 1.1 : 0.9,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Heart className="w-12 h-12 text-red-400 mb-2" />
            <p className="text-sm text-gray-400">
              {breathingPattern.find(p => p.phase === breathingPhase)?.instruction}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleEmergencyContacts}
              className="glass-card-hover px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </motion.button>

            <motion.button
              onClick={() => setCurrentStep(Math.min(currentStep + 1, groundingSteps.length - 1))}
              className="bg-space-teal hover:bg-opacity-80 px-6 py-3 rounded-lg text-white font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Step
            </motion.button>
          </div>

          {/* Encouraging Message */}
          <motion.p
            className="mt-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            You're doing great. Take your time and focus on the present moment.
          </motion.p>
        </motion.div>

        {/* Emergency Contacts Modal */}
        {showEmergencyContacts && (
          <EmergencyContacts
            isOpen={showEmergencyContacts}
            onClose={() => setShowEmergencyContacts(false)}
            contacts={emergencyContacts}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GroundingMode;