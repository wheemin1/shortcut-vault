import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X, Layers } from 'lucide-react';
import { getToolIcon } from '@/utils/helpers';
import { useLanguage } from '@/hooks/useLanguage';
import type { ToolName } from '@/types';

interface ToolMultiSelectProps {
  availableTools: ToolName[];
  selectedTools: ToolName[];
  onSelectionChange: (tools: ToolName[]) => void;
}

export const ToolMultiSelect: React.FC<ToolMultiSelectProps> = ({
  availableTools,
  selectedTools,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleToolToggle = (tool: ToolName) => {
    const isSelected = selectedTools.includes(tool);
    if (isSelected) {
      onSelectionChange(selectedTools.filter(t => t !== tool));
    } else {
      onSelectionChange([...selectedTools, tool]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTools.length === availableTools.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...availableTools]);
    }
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const allSelected = selectedTools.length === availableTools.length;
  const someSelected = selectedTools.length > 0 && selectedTools.length < availableTools.length;

  return (
    <div className="space-y-3">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="h-12 w-full rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:border-indigo-300 justify-between"
          >            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">
                {selectedTools.length === 0 
                  ? t('allTools')
                  : selectedTools.length === availableTools.length
                  ? t('allToolsSelected')
                  : `${selectedTools.length}${t('toolsSelected')}`
                }
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 rounded-2xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{t('selectTools')}</h4>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSelectAll}
                  className="text-indigo-600 hover:bg-indigo-50"
                >
                  {allSelected ? t('deselectAll') : t('selectAll')}
                </Button>
                {selectedTools.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearAll}
                    className="text-red-600 hover:bg-red-50"
                  >
                    {t('reset')}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableTools.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                const Icon = getToolIcon(tool);
                
                return (
                  <div
                    key={tool}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleToolToggle(tool)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleToolToggle(tool)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-700">{tool}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedTools.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTools.map((tool) => {
            const Icon = getToolIcon(tool);
            return (
              <Badge 
                key={tool} 
                variant="secondary" 
                className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 border-indigo-200"
              >
                <Icon className="h-3 w-3" />
                {tool}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-indigo-200"
                  onClick={() => handleToolToggle(tool)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
