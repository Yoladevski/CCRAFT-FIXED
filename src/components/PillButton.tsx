import { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function PillButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: PillButtonProps) {
  const baseStyles = 'button-text relative inline-flex items-center justify-center font-bold rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap';

  const variantStyles = {
    primary: 'bg-[#B11226] text-white hover:bg-[#8B0E1C] shadow-lg shadow-[#B11226]/30',
    secondary: 'bg-[#2E2E2E] text-white hover:bg-[#3E3E3E] shadow-lg shadow-black/30',
    danger: 'bg-[#B11226]/20 border-2 border-[#B11226] text-[#B11226] hover:bg-[#B11226] hover:text-white shadow-lg shadow-[#B11226]/20',
    success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
