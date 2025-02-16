// app/components/ui/GradientBackground.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Random dots generation
const generateDots = () => {
  return Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

const GradientBackground = () => {
  const [dots, setDots] = useState<any[]>([]);

  useEffect(() => {
    // This ensures that random positions are only generated on the client side
    setDots(generateDots());
  }, []);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        {/* Base gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-background to-accent-purple/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/10 via-transparent to-transparent" />

        {/* Animated dots */}
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-accent-blue/30 rounded-full"
            style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GradientBackground; // Default export