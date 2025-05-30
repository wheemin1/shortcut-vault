import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { STORAGE_KEYS } from '@/constants';
import { safeLocalStorage } from '@/utils/helpers';

type Language = 'ko' | 'en';

interface Translations {
  [key: string]: {
    ko: string;
    en: string;
  };
}

const translations: Translations = {
  shortcutLibrary: {
    ko: '단축키 라이브러리',
    en: 'Shortcut Library'
  },
  masterTools: {
    ko: '개발 도구를 마스터하세요',
    en: 'Master your development tools'
  },
  shortcuts: {
    ko: '개의 단축키',
    en: 'shortcuts'
  },
  tools: {
    ko: '개의 도구',
    en: 'tools'
  },
  allShortcuts: {
    ko: '모든 단축키',
    en: 'All Shortcuts'
  },
  bookmarks: {
    ko: '북마크',
    en: 'Bookmarks'
  },
  shortcutsFound: {
    ko: '개의 단축키가 발견되었습니다',
    en: 'shortcuts found'
  },
  noShortcutsFound: {
    ko: '단축키를 찾을 수 없습니다',
    en: 'No shortcuts found'
  },
  adjustSearch: {
    ko: '검색 조건을 조정해보세요',
    en: 'Try adjusting your search criteria'
  },
  yourBookmarks: {
    ko: '나의 북마크',
    en: 'Your Bookmarks'
  },
  quickAccess: {
    ko: '자주 사용하는 단축키에 빠르게 접근하세요',
    en: 'Quick access to your favorite shortcuts'
  },
  exportBookmarks: {
    ko: '북마크 내보내기',
    en: 'Export Bookmarks'
  },
  noBookmarks: {
    ko: '북마크가 없습니다',
    en: 'No bookmarks yet'
  },
  startBookmarking: {
    ko: '유용한 단축키를 북마크에 추가해보세요',
    en: 'Start bookmarking useful shortcuts to access them quickly'
  },
  filterSearch: {
    ko: '필터 및 검색',
    en: 'Filter & Search'
  },
  searchShortcuts: {
    ko: '단축키 검색...',
    en: 'Search shortcuts...'
  },
  allTools: {
    ko: '모든 도구',
    en: 'All Tools'
  },
  allPlatforms: {
    ko: '모든 플랫폼',
    en: 'All Platforms'
  },
  exportPDF: {
    ko: 'PDF 내보내기',
    en: 'Export PDF'
  },
  allToolsSelected: {
    ko: '모든 도구 선택됨',
    en: 'All tools selected'
  },
  toolsSelected: {
    ko: '개 도구 선택됨',
    en: 'tools selected'
  },
  selectTools: {
    ko: '도구 선택',
    en: 'Select Tools'
  },
  selectAll: {
    ko: '전체 선택',
    en: 'Select All'
  },
  deselectAll: {
    ko: '전체 해제',
    en: 'Deselect All'
  },
  reset: {
    ko: '초기화',
    en: 'Reset'
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isLoading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = safeLocalStorage.getItem(STORAGE_KEYS.LANGUAGE);
      if (saved && (saved === 'ko' || saved === 'en')) {
        setLanguage(saved as Language);
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
      setError('언어 설정을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  const toggleLanguage = useCallback(() => {
    try {
      const newLanguage: Language = language === 'ko' ? 'en' : 'ko';
      
      // 먼저 상태를 변경
      setLanguage(newLanguage);
      
      // 그 다음 localStorage에 저장
      const success = safeLocalStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
      if (!success) {
        console.error('Failed to save language preference to localStorage');
        setError('언어 설정 저장에 실패했습니다.');
      } else {
        setError(null);
      }
    } catch (error) {
      console.error('Failed to toggle language:', error);
      setError('언어 변경 중 오류가 발생했습니다.');
    }
  }, [language]);
  const t = useCallback((key: string): string => {
    try {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
      return translation[language] || translation['ko'] || key;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        isLoading,
        error
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
