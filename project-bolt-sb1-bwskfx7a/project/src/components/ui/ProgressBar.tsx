import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'bg-blue-600',
  height = 6,
  showLabel = false,
  className = '',
}) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full">
        <div 
          className={`bg-gray-200 rounded-full overflow-hidden`} 
          style={{ height: `${height}px` }}
        >
          <motion.div
            className={`${color} h-full rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${safeProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {showLabel && (
          <div className="mt-1 text-right text-sm font-medium text-gray-600">
            {safeProgress}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;