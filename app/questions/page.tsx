// app/questions/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import GradientBackground from '@/components/ui/GradientBackground'; // Correct default import
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';

// Define the type for each question
interface Question {
    id: string;
    question: string;
    type: 'select' | 'text' | 'number';
    options?: string[];
    placeholder?: string;
    validation?: (value: string | number) => boolean;
}

const questions: Question[] = [
  {
    id: 'level',
    question: 'What is your level of study?',
    type: 'select',
    options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
  },
  {
    id: 'major',
    question: 'What is your major?',
    type: 'text',
    placeholder: 'e.g. Computer Science',
    validation: (value: string | number) => {
      if (typeof value === 'string') {
        return value.length >= 2;
      }
      return false; 
    },
  },
  {
    id: 'gpa',
    question: 'What is your GPA?',
    type: 'number',
    placeholder: '0.00 - 4.00',
    validation: (value: string | number) => {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      return numValue >= 0 && numValue <= 4;
    },
  },
  {
    id: 'financialNeed',
    question: 'Do you have financial need?',
    type: 'select',
    options: ['Yes', 'No', 'Prefer not to say'],
  }
];

export default function Questions() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];

    if (currentQuestion.validation) {
      let valid = false;

      if (currentQuestion.type === 'number') {
        valid = currentQuestion.validation(Number(currentAnswer));
      } else if (currentQuestion.type === 'text') {
        valid = currentQuestion.validation(currentAnswer as string);
      } else {
        valid = currentQuestion.validation(currentAnswer);
      }

      if (!valid) {
        setError('Please enter a valid value');
        return;
      }
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setError(null);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
    setError(null);

    if (questions[currentStep].type === 'select') {
      setTimeout(handleNext, 500);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        handleNext();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [currentStep, loading]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <GradientBackground />

      <ProgressBar progress={(currentStep + 1) / questions.length} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence>
          {currentStep > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handleBack}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 text-content-secondary hover:text-content-primary transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <QuestionCard key={currentStep}>
            <h2 className="text-4xl font-bold tracking-tight text-center mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-content-primary to-content-secondary">
                {questions[currentStep].question}
              </span>
            </h2>

            {questions[currentStep].type === 'select' ? (
              <div className="grid gap-3">
                {questions[currentStep].options?.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant={answers[questions[currentStep].id] === option ? 'primary' : 'secondary'}
                    fullWidth
                    icon={ChevronRight}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type={questions[currentStep].type}
                  placeholder={questions[currentStep].placeholder}
                  value={answers[questions[currentStep].id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className={`
                    w-full p-4 bg-white/5 rounded-xl border transition-all duration-200
                    ${error ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-800 focus:ring-2 focus:ring-accent-blue/50'}
                  `}
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </QuestionCard>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button onClick={handleNext} loading={loading}>
            {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}