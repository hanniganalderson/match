// app/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import GradientBackground from '@/components/ui/GradientBackground'; // Corrected import
import { Button } from '@/components/ui/Button';

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <GradientBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center space-y-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-xl shadow-accent-blue/20"
        >
          <span className="text-2xl font-bold text-white">M</span>
        </motion.div>

        {/* Title Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-content-primary to-content-primary/60">
            Find Your Perfect Match
          </h1>
          <p className="text-xl text-content-secondary max-w-xl mx-auto">
            AI-powered scholarship matching that understands your unique potential.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button onClick={() => router.push('/questions')} icon={ArrowRight}>
            Get Started
          </Button>
        </motion.div>
      </div>
    </main>
  );
}