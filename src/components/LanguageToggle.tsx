
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleToggle = () => {
    console.log('Before toggle - Current language:', language);
    toggleLanguage();
    // toggleLanguage는 비동기이므로 즉시 변경되지 않을 수 있음
    setTimeout(() => {
      console.log('After toggle - Language should be:', language === 'ko' ? 'en' : 'ko');
    }, 100);
  };

  console.log('LanguageToggle render - Current language:', language);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2 h-10 px-3 bg-white/60 backdrop-blur-sm border-indigo-200 hover:bg-white/80"
    >
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? '한국어' : 'English'}</span>
    </Button>
  );
};

export default LanguageToggle;
