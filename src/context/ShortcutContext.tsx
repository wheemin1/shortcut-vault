import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Shortcut } from '@/types';
import { getUniqueTools } from '@/utils/helpers';
import { loadAllShortcuts, getAvailableTools, loadMultipleToolShortcuts, type ToolName } from '@/utils/dataLoader';

interface ShortcutContextType {
  shortcuts: Shortcut[];
  tools: string[];
  availableTools: ToolName[];
  isLoading: boolean;
  error: string | null;
  loadToolData: (toolNames: ToolName[]) => Promise<void>;
  refreshData: () => Promise<void>;
}

const ShortcutContext = createContext<ShortcutContextType | undefined>(undefined);

export const ShortcutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [availableTools] = useState<ToolName[]>(getAvailableTools());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (loadFunction: () => Promise<Shortcut[]>) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await loadFunction();
      setShortcuts(data);
      setTools(getUniqueTools(data));
    } catch (err) {
      console.error('Failed to load shortcuts:', err);
      setError(err instanceof Error ? err.message : '단축키 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData(loadAllShortcuts);
  };

  const loadToolData = async (toolNames: ToolName[]) => {
    if (toolNames.length === 0) {
      await refreshData();
    } else {
      await loadData(() => loadMultipleToolShortcuts(toolNames));
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <ShortcutContext.Provider value={{ 
      shortcuts, 
      tools, 
      availableTools,
      isLoading, 
      error,
      loadToolData,
      refreshData
    }}>
      {children}
    </ShortcutContext.Provider>
  );
};

export const useShortcuts = (): ShortcutContextType => {
  const context = useContext(ShortcutContext);
  if (context === undefined) {
    throw new Error('useShortcuts must be used within a ShortcutProvider');
  }
  return context;
};
