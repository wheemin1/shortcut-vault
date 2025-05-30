// 중앙화된 타입 정의
export interface Shortcut {
  id: number;
  tool: string;
  platform: string;
  keyCombo: string;
  description: string;
  category: string;
}

export interface FilterState {
  searchTerm: string;
  selectedPlatform: string;
  selectedTools: ToolName[];
}

export interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  availableTools: ToolName[];
  selectedTools: ToolName[];
  onToolSelectionChange: (tools: ToolName[]) => void;
  onExportPDF: () => void;
}

export interface ShortcutCardProps {
  shortcut: Shortcut;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export type Platform = 'Mac' | 'Windows';
export type TabType = 'all' | 'bookmarks';
export type ToolName = 'Chrome' | 'Figma' | 'Notion' | 'Photoshop' | 'Slack' | 'VS Code';

export interface LanguageContextType {
  language: 'ko' | 'en';
  t: (key: string) => string;
  toggleLanguage: () => void;
}

export interface BookmarksContextType {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}
