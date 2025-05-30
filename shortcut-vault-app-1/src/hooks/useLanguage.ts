
import { useState, useEffect } from 'react';

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
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<'ko' | 'en'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'ko' | 'en') || 'ko';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return {
    language,
    toggleLanguage,
    t
  };
};
