import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 w-full disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-vibe-accent text-[#120b08] hover:bg-vibe-accent-hover shadow-[0_4px_14px_0_rgba(217,119,6,0.25)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.35)] hover:-translate-y-[1px]",
    secondary: "bg-transparent text-vibe-text border border-vibe-border hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};
