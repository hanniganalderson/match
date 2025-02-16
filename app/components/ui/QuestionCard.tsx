// app/components/ui/QuestionCard.tsx
import { motion } from 'framer-motion'; // Ensure this import is correct

interface QuestionCardProps {
  children: React.ReactNode;
}

export const QuestionCard = ({ children }: QuestionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
  >
    {children}
  </motion.div>
);