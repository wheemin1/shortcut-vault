import type { Shortcut } from '@/types';

// 도구별 데이터 파일 맵핑
const TOOL_DATA_FILES = {
  'Chrome': () => import('@/data/chrome.json'),
  'Figma': () => import('@/data/figma.json'),
  'Notion': () => import('@/data/notion.json'),
  'Photoshop': () => import('@/data/photoshop.json'),
  'Slack': () => import('@/data/slack.json'),
  'VSCode': () => import('@/data/vscode.json'),
  'Discord': () => import('@/data/discord.json'),
  'GitHub': () => import('@/data/github.json'),
  'Spotify': () => import('@/data/spotify.json'),
  'Excel': () => import('@/data/excel.json'),
  'IntelliJ': () => import('@/data/intellij.json'),
} as const;

export type ToolName = keyof typeof TOOL_DATA_FILES;

/**
 * 모든 단축키 데이터를 로드합니다
 */
export const loadAllShortcuts = async (): Promise<Shortcut[]> => {
  try {
    const loadPromises = Object.values(TOOL_DATA_FILES).map(loader => loader());
    const modules = await Promise.all(loadPromises);
    
    // 모든 모듈의 default export를 합쳐서 반환
    const allShortcuts = modules.flatMap(module => module.default as Shortcut[]);
    
    // ID 중복 방지를 위해 새로운 ID 할당
    return allShortcuts.map((shortcut, index) => ({
      ...shortcut,
      id: index + 1
    }));
  } catch (error) {
    console.error('Failed to load shortcuts data:', error);
    throw new Error('단축키 데이터를 불러오는데 실패했습니다.');
  }
};

/**
 * 특정 도구의 단축키만 로드합니다
 */
export const loadToolShortcuts = async (toolName: ToolName): Promise<Shortcut[]> => {
  try {
    const loader = TOOL_DATA_FILES[toolName];
    if (!loader) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    
    const module = await loader();
    return module.default as Shortcut[];
  } catch (error) {
    console.error(`Failed to load ${toolName} shortcuts:`, error);
    throw new Error(`${toolName} 단축키를 불러오는데 실패했습니다.`);
  }
};

/**
 * 사용 가능한 모든 도구 이름을 반환합니다
 */
export const getAvailableTools = (): ToolName[] => {
  return Object.keys(TOOL_DATA_FILES) as ToolName[];
};

/**
 * 여러 도구의 단축키를 로드합니다
 */
export const loadMultipleToolShortcuts = async (toolNames: ToolName[]): Promise<Shortcut[]> => {
  try {
    const loadPromises = toolNames.map(toolName => loadToolShortcuts(toolName));
    const toolShortcuts = await Promise.all(loadPromises);
    
    // 모든 도구의 단축키를 합치고 ID 재할당
    const allShortcuts = toolShortcuts.flat();
    return allShortcuts.map((shortcut, index) => ({
      ...shortcut,
      id: index + 1
    }));
  } catch (error) {
    console.error('Failed to load multiple tool shortcuts:', error);
    throw new Error('선택된 도구들의 단축키를 불러오는데 실패했습니다.');
  }
};
