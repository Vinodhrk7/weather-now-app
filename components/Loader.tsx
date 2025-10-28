
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
