import { Code, Image, Book, Share, Search, Settings, MessageSquare, GitBranch, Music, Table, Zap } from 'lucide-react';

// 도구별 아이콘 매핑
export const TOOL_ICONS = {
  'Figma': Image,
  'VSCode': Code,
  'Notion': Book,
  'Slack': Share,
  'Chrome': Search,
  'Photoshop': Image,
  'Discord': MessageSquare,
  'GitHub': GitBranch,
  'Spotify': Music,
  'Excel': Table,
  'IntelliJ': Zap,
} as const;

// 도구별 색상 매핑
export const TOOL_COLORS = {
  'Figma': 'from-purple-500 to-pink-500',
  'VSCode': 'from-blue-500 to-cyan-500',
  'Notion': 'from-gray-600 to-gray-800',
  'Slack': 'from-green-500 to-teal-500',
  'Chrome': 'from-yellow-500 to-orange-500',
  'Photoshop': 'from-blue-600 to-purple-600',
  'Discord': 'from-indigo-500 to-purple-500',
  'GitHub': 'from-gray-700 to-gray-900',
  'Spotify': 'from-green-400 to-emerald-500',
  'Excel': 'from-emerald-600 to-green-600',
  'IntelliJ': 'from-orange-500 to-red-500',
} as const;

// 플랫폼별 이모지
export const PLATFORM_EMOJIS = {
  'Mac': '🍎',
  'Windows': '🪟',
} as const;

// 기본 아이콘
export const DEFAULT_ICON = Settings;
export const DEFAULT_COLOR = 'from-gray-500 to-gray-600';

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  BOOKMARKS: 'shortcut-bookmarks',
  LANGUAGE: 'shortcut-language',
} as const;

// 필터 기본값
export const DEFAULT_FILTERS = {
  PLATFORM: 'all',
  SEARCH: '',
} as const;

// 지원 플랫폼
export const PLATFORMS = ['Mac', 'Windows'] as const;

// 탭 타입
export const TAB_TYPES = ['all', 'bookmarks'] as const;
