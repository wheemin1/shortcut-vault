import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = '로딩 중...' }) => {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-3" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Loading;
