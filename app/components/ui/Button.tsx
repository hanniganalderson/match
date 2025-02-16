import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({ 
  children, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  fullWidth = false,
  loading = false 
}: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={clsx(
      "group relative px-8 py-4 rounded-xl font-medium overflow-hidden",
      {
        "w-full": fullWidth,
        "opacity-80 cursor-not-allowed": loading
      }
    )}
    disabled={loading}
    aria-label={loading ? "Loading" : children?.toString()}
  >
    {/* Background */}
    <div className={clsx(
      "absolute inset-0 transition-opacity",
      variant === 'primary' 
        ? 'bg-gradient-to-r from-accent-blue to-accent-purple opacity-90 group-hover:opacity-100'
        : 'bg-white/5 group-hover:bg-white/10'
    )} />
    
    {/* Shine effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity 
                    bg-gradient-to-r from-transparent via-white to-transparent 
                    -translate-x-full group-hover:translate-x-full duration-1000" />
    
    {/* Content */}
    <div className={clsx(
      "relative flex items-center justify-center space-x-2",
      variant === 'primary' ? 'text-white' : 'text-content-primary'
    )}>
      {loading ? (
        <span className="animate-spin">↻</span>
      ) : (
        <>
          <span>{children}</span>
          {Icon && <Icon className="w-5 h-5" />}
        </>
      )}
    </div>
  </motion.button>
);