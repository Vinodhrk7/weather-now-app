
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center text-white animate-fade-in">
      <AlertTriangle className="text-yellow-300 w-16 h-16 mb-4" />
      <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
      <p className="opacity-90">{message}</p>
    </div>
  );
};

export default ErrorDisplay;
