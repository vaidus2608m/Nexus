import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-[#1a1a1a] border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-vexor-accent focus:ring-vexor-accent'
        } rounded-md px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
