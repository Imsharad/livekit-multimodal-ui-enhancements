import React, { useEffect } from 'react';
import { AgentState, BarVisualizer, useVoiceAssistant } from '@livekit/components-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyLogo } from './CompanyLogo';

interface EnhancedVoiceAssistantProps {
  onStateChange: (state: AgentState) => void;
}

/**
 * Enhanced voice assistant component with improved animations for different states
 * - Visual indicator for processing user's voice (listening state)
 * - Visual indicator for server connected and responding (thinking/speaking states)
 * - Idle animation when system is ready but not active
 */
export function EnhancedVoiceAssistant({ onStateChange }: EnhancedVoiceAssistantProps) {
  const { state, audioTrack } = useVoiceAssistant();
  
  useEffect(() => {
    onStateChange(state);
  }, [onStateChange, state]);

  // Define animation variants for different states
  const containerVariants = {
    idle: {
      scale: 1,
      opacity: 0.8,
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const }
    },
    listening: {
      scale: 1.05,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    thinking: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    speaking: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    connecting: {
      scale: 1,
      opacity: 0.6,
      transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
    },
    disconnected: {
      scale: 0.95,
      opacity: 0.5,
      transition: { duration: 0.5 }
    }
  };

  // Get the current animation variant based on state
  const currentVariant = state in containerVariants ? state : 'idle';

  // Define colors for different states
  const stateColors = {
    idle: 'bg-gray-200',
    listening: 'bg-blue-500',
    thinking: 'bg-purple-500',
    speaking: 'bg-green-500',
    connecting: 'bg-yellow-500',
    disconnected: 'bg-gray-400'
  };

  // Get status text based on state
  const getStatusText = () => {
    switch (state) {
      case 'listening': return 'Listening...';
      case 'thinking': return 'Processing...';
      case 'speaking': return 'Responding...';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      default: return 'Ready';
    }
  };

  return (
    <div className="h-[300px] max-w-[90vw] mx-auto relative flex flex-col items-center justify-center">
      {/* Status indicator */}
      <AnimatePresence>
        <motion.div
          key="status-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-0 text-sm text-gray-600 font-medium mb-2"
        >
          {getStatusText()}
        </motion.div>
      </AnimatePresence>

      {/* Main animation container */}
      <motion.div
        className="relative flex items-center justify-center"
        variants={containerVariants}
        animate={currentVariant}
      >
        {/* Background pulse animation for active states */}
        {(state === 'listening' || state === 'speaking') && (
          <motion.div
            className={`absolute rounded-full ${stateColors[state as keyof typeof stateColors]} opacity-20`}
            initial={{ width: '100%', height: '100%' }}
            animate={{ 
              width: ['100%', '120%', '100%'], 
              height: ['100%', '120%', '100%'],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        )}

        {/* Company logo */}
        <CompanyLogo className="absolute z-10" />

        {/* Voice visualizer */}
        <div className={`relative z-0 ${state === 'disconnected' ? 'opacity-50' : 'opacity-100'}`}>
          <BarVisualizer
            state={state}
            barCount={5}
            trackRef={audioTrack}
            className={`agent-visualizer ${
              state === 'listening' ? 'listening-visualizer' : 
              state === 'thinking' ? 'thinking-visualizer' : 
              state === 'speaking' ? 'speaking-visualizer' : 'idle-visualizer'
            }`}
            options={{ minHeight: 24 }}
          />
        </div>

        {/* State indicator dot */}
        <motion.div 
          className={`absolute bottom-0 w-3 h-3 rounded-full ${stateColors[state as keyof typeof stateColors]}`}
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ 
            scale: [0.8, 1, 0.8], 
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Accessibility note: Add aria-live region for screen readers */}
      <div className="sr-only" aria-live="polite">
        AI Assistant is {getStatusText()}
      </div>
    </div>
  );
}