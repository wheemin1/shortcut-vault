import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Download, Filter, Code, Image, Book, Share, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTool: string;
  onToolChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  tools: string[];
  onExportPDF: () => void;
}

const getToolIcon = (tool: string) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'Figma': Image,
    'VSCode': Code,
    'Notion': Book,
    'Slack': Share,
    'Chrome': Search,
    'Photoshop': Image,
  };
  
  return iconMap[tool] || Settings;
};

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedTool,
  onToolChange,
  selectedPlatform,
  onPlatformChange,
  tools,
  onExportPDF
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-indigo-100 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
          <Filter className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{t('filterSearch')}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-indigo-500" />
          <Input
            placeholder={t('searchShortcuts')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        
        <Select value={selectedTool} onValueChange={onToolChange}>
          <SelectTrigger className="h-12 rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100">
            <SelectValue placeholder={t('allTools')} />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <SelectItem value="all" className="rounded-lg">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                {t('allTools')}
              </div>
            </SelectItem>
            {tools.map((tool) => {
              const ToolIcon = getToolIcon(tool);
              return (
                <SelectItem key={tool} value={tool} className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <ToolIcon className="h-4 w-4 text-gray-600" />
                    {tool}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        <Select value={selectedPlatform} onValueChange={onPlatformChange}>
          <SelectTrigger className="h-12 rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100">
            <SelectValue placeholder={t('allPlatforms')} />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <SelectItem value="all" className="rounded-lg">{t('allPlatforms')}</SelectItem>
            <SelectItem value="Mac" className="rounded-lg">
              <div className="flex items-center gap-2">
                <span>🍎</span>
                Mac
              </div>
            </SelectItem>
            <SelectItem value="Windows" className="rounded-lg">
              <div className="flex items-center gap-2">
                <span>🪟</span>
                Windows
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={onExportPDF} 
          className="h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('exportPDF')}
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
