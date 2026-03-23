import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <div className="flex flex-col mb-5">
      <label className="text-sm font-medium mb-2 text-vibe-muted">{label}</label>
      <div className={`flex items-center bg-black/40 border rounded-lg overflow-hidden transition-all duration-300 focus-within:border-vibe-accent focus-within:ring-1 focus-within:ring-vibe-accent ${error ? 'border-red-500' : 'border-vibe-border'}`}>
        {icon && <span className="pl-3 pr-2 py-3 text-vibe-muted flex items-center">{icon}</span>}
        <input 
          className="flex-1 bg-transparent border-none p-3 text-vibe-text text-base outline-none w-full placeholder-vibe-muted/50" 
          {...props} 
        />
      </div>
      {error && <span className="text-red-500 text-xs mt-1 animate-slideDown">{error}</span>}
    </div>
  );
};
