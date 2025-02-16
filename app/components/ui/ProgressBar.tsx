// app/components/ui/ProgressBar.tsx
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // Progress value between 0 and 1
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
    <motion.div
      className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
      style={{
        scaleX: progress, // Scales the progress based on input (0 to 1)
        transformOrigin: 'left', // Ensures scaling starts from the left
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
    {/* Glow effect behind the progress */}
    <div className="absolute inset-0 bg-accent-blue/20 blur-sm" />
  </div>
);