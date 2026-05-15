import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { activateGroundingMode, addCrisisLog } from '../../store/slices/crisisSlice';
import { useCrisisMode } from '../../hooks/useCrisisMode';

interface SOSButtonProps {
  position?: 'fixed' | 'relative';
  size?: 'small' | 'medium' | 'large';
  onActivate?: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ 
  position = 'fixed', 
  size = 'medium',
  onActivate 
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isGroundingModeActive } = useSelector((state: RootState) => state.crisis);
  const { triggerCrisisIntervention } = useCrisisMode();

  const sizeClasses = {
    small: 'w-12 h-12 text-sm',
    medium: 'w-16 h-16 text-base',
    large: 'w-20 h-20 text-lg'
  };

  const handleSOSClick = async () => {
    try {
      // Log crisis event
      const crisisLog = {
        id: Date.now().toString(),
        userId: user?.id || 'anonymous',
        triggerType: 'panic_button' as const,
        interventionTaken: 'Grounding mode activated',
        followUpRequired: true,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(addCrisisLog(crisisLog));
      dispatch(activateGroundingMode());
      
      // Trigger crisis intervention workflow
      await triggerCrisisIntervention('panic_button');
      
      // Call optional callback
      if (onActivate) {
        onActivate();
      }
    } catch (error) {
      console.error('Error activating crisis intervention:', error);
      // Still activate grounding mode even if logging fails
      dispatch(activateGroundingMode());
    }
  };

  return (
    <motion.button
      className={`
        ${position === 'fixed' ? 'fixed bottom-6 right-6 z-50' : 'relative'}
        ${sizeClasses[size]}
        crisis-button
        flex items-center justify-center
        text-white font-bold
        focus:outline-none focus:ring-4 focus:ring-crisis-red-glow
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      onClick={handleSOSClick}
      disabled={isGroundingModeActive}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(220, 38, 38, 0.5)',
          '0 0 30px rgba(220, 38, 38, 0.8)',
          '0 0 20px rgba(220, 38, 38, 0.5)',
        ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: {
          duration: 0.2,
        },
      }}
      aria-label="Emergency SOS - Activate crisis intervention"
      role="button"
      tabIndex={0}
    >
      {isGroundingModeActive ? (
        <Phone className="w-6 h-6" />
      ) : (
        <AlertTriangle className="w-6 h-6" />
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        {isGroundingModeActive 
          ? 'Crisis intervention active - Emergency contacts available'
          : 'Emergency SOS Button - Click for immediate crisis support'
        }
      </span>
    </motion.button>
  );
};

export default SOSButton;