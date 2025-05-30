
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, Code, Image, Book, Share, Search, Settings } from 'lucide-react';

interface Shortcut {
  id: number;
  tool: string;
  platform: string;
  keyCombo: string;
  description: string;
  category: string;
}

interface ShortcutCardProps {
  shortcut: Shortcut;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
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

const getToolColor = (tool: string) => {
  const colorMap: { [key: string]: string } = {
    'Figma': 'from-purple-500 to-pink-500',
    'VSCode': 'from-blue-500 to-cyan-500',
    'Notion': 'from-gray-600 to-gray-800',
    'Slack': 'from-green-500 to-teal-500',
    'Chrome': 'from-yellow-500 to-orange-500',
    'Photoshop': 'from-blue-600 to-purple-600',
  };
  
  return colorMap[tool] || 'from-gray-500 to-gray-600';
};

const getPlatformEmoji = (platform: string) => {
  return platform === 'Mac' ? '🍎' : '🪟';
};

const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, isBookmarked, onToggleBookmark }) => {
  const ToolIcon = getToolIcon(shortcut.tool);
  const toolColor = getToolColor(shortcut.tool);

  return (
    <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Header with gradient and tool icon */}
        <div className={`bg-gradient-to-r ${toolColor} p-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <ToolIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{shortcut.tool}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">{getPlatformEmoji(shortcut.platform)}</span>
                  <span className="text-white/80 text-sm font-medium">{shortcut.platform}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleBookmark(shortcut.id)}
              className={`p-2 h-auto w-auto rounded-xl transition-all duration-200 ${
                isBookmarked 
                  ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Key combination */}
          <div className="relative">
            <div className="font-mono text-lg bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl border-2 border-gray-200 text-center font-bold text-gray-800 shadow-inner">
              {shortcut.keyCombo}
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed font-medium">
            {shortcut.description}
          </p>
          
          {/* Category badge */}
          <div className="flex justify-end">
            <Badge 
              variant="outline" 
              className="text-xs text-gray-600 bg-gray-50/50 border-gray-200 hover:bg-gray-100/50 transition-colors"
            >
              {shortcut.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortcutCard;
