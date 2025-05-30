import { TOOL_ICONS, TOOL_COLORS, PLATFORM_EMOJIS, DEFAULT_ICON, DEFAULT_COLOR } from '@/constants';
import type { Shortcut, Platform } from '@/types';

/**
 * 도구명에 해당하는 아이콘 컴포넌트를 반환
 */
export const getToolIcon = (tool: string) => {
  return TOOL_ICONS[tool as keyof typeof TOOL_ICONS] || DEFAULT_ICON;
};

/**
 * 도구명에 해당하는 그라디언트 색상을 반환
 */
export const getToolColor = (tool: string) => {
  return TOOL_COLORS[tool as keyof typeof TOOL_COLORS] || DEFAULT_COLOR;
};

/**
 * 플랫폼에 해당하는 이모지를 반환
 */
export const getPlatformEmoji = (platform: string) => {
  return PLATFORM_EMOJIS[platform as Platform] || '💻';
};

/**
 * 단축키 배열에서 고유한 도구 목록을 추출하여 정렬된 배열로 반환
 */
export const extractUniqueTools = (shortcuts: Shortcut[]): string[] => {
  return Array.from(new Set(shortcuts.map(s => s.tool))).sort();
};

/**
 * 검색어가 단축키 객체와 매치되는지 확인
 */
export const matchesSearch = (shortcut: Shortcut, searchTerm: string): boolean => {
  if (!searchTerm) return true;
  
  const term = searchTerm.toLowerCase();
  return (
    shortcut.description.toLowerCase().includes(term) ||
    shortcut.keyCombo.toLowerCase().includes(term) ||
    shortcut.tool.toLowerCase().includes(term) ||
    shortcut.category.toLowerCase().includes(term)
  );
};

/**
 * 도구 필터가 단축키와 매치되는지 확인
 */
export const matchesTool = (shortcut: Shortcut, selectedTool: string): boolean => {
  return selectedTool === 'all' || shortcut.tool === selectedTool;
};

/**
 * 플랫폼 필터가 단축키와 매치되는지 확인
 */
export const matchesPlatform = (shortcut: Shortcut, selectedPlatform: string): boolean => {
  return selectedPlatform === 'all' || shortcut.platform === selectedPlatform;
};

/**
 * 모든 필터 조건을 적용하여 단축키를 필터링
 */
export const filterShortcuts = (
  shortcuts: Shortcut[],
  searchTerm: string,
  selectedTool: string,
  selectedPlatform: string
): Shortcut[] => {
  return shortcuts.filter(shortcut => 
    matchesSearch(shortcut, searchTerm) &&
    matchesTool(shortcut, selectedTool) &&
    matchesPlatform(shortcut, selectedPlatform)
  );
};

/**
 * 안전한 로컬 스토리지 접근
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }
};

/**
 * 단축키 배열에서 고유한 도구 목록을 추출 (정렬된 배열 반환)
 */
export const getUniqueTools = (shortcuts: Shortcut[]): string[] => {
  return Array.from(new Set(shortcuts.map(s => s.tool))).sort();
};

/**
 * 단축키 배열에서 고유한 플랫폼 목록을 추출 (정렬된 배열 반환)
 */
export const getUniquePlatforms = (shortcuts: Shortcut[]): string[] => {
  return Array.from(new Set(shortcuts.map(s => s.platform))).sort();
};
