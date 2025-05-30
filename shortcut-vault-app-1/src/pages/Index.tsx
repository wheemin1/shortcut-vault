import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ShortcutCard from '@/components/ShortcutCard';
import FilterBar from '@/components/FilterBar';
import LanguageToggle from '@/components/LanguageToggle';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useLanguage } from '@/hooks/useLanguage';
import { exportToPDF } from '@/utils/exportPDF';
import { getAllShortcuts, getAvailableTools, type Shortcut } from '@/utils/dataManager';
import { Bookmark, Search, BookmarkPlus, Download, Zap } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { t } = useLanguage();
  
  const shortcuts: Shortcut[] = getAllShortcuts();
  const tools = getAvailableTools();
  
  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter(shortcut => {
      const matchesSearch = 
        shortcut.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortcut.keyCombo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortcut.tool.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTool = selectedTool === 'all' || shortcut.tool === selectedTool;
      const matchesPlatform = selectedPlatform === 'all' || shortcut.platform === selectedPlatform;
      
      return matchesSearch && matchesTool && matchesPlatform;
    });
  }, [shortcuts, searchTerm, selectedTool, selectedPlatform]);
  
  const bookmarkedShortcuts = useMemo(() => {
    return shortcuts.filter(shortcut => bookmarks.includes(shortcut.id));
  }, [shortcuts, bookmarks]);
  
  const displayShortcuts = activeTab === 'bookmarks' ? bookmarkedShortcuts : filteredShortcuts;
  
  const handleExportPDF = () => {
    const shortcuts = activeTab === 'bookmarks' ? bookmarkedShortcuts : filteredShortcuts;
    const title = activeTab === 'bookmarks' ? t('bookmarks') : t('allShortcuts');
    exportToPDF(shortcuts, title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t('shortcutLibrary')}
                </h1>
                <p className="text-gray-600 mt-1 text-sm">
                  {t('masterTools')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Badge variant="outline" className="px-4 py-2 bg-white/50 backdrop-blur-sm border-indigo-200">
                <span className="text-indigo-600 font-semibold">{shortcuts.length}</span>
                <span className="text-gray-600 ml-1">{t('shortcuts')}</span>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-700">
                <span className="font-semibold">{tools.length}</span>
                <span className="ml-1">{t('tools')}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-center">
            <TabsList className="grid w-auto grid-cols-2 bg-white/60 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-indigo-100">
              <TabsTrigger 
                value="all" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <Search className="h-4 w-4" />
                <span className="font-medium">{t('allShortcuts')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <Bookmark className="h-4 w-4" />
                <span className="font-medium">{t('bookmarks')} ({bookmarks.length})</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-8">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
              tools={tools}
              onExportPDF={handleExportPDF}
            />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredShortcuts.length} {t('shortcutsFound')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShortcuts.map((shortcut) => (
                  <ShortcutCard
                    key={shortcut.id}
                    shortcut={shortcut}
                    isBookmarked={isBookmarked(shortcut.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
              
              {filteredShortcuts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noShortcutsFound')}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{t('adjustSearch')}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
                    <BookmarkPlus className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t('yourBookmarks')}</h2>
                    <p className="text-gray-600 text-sm">{t('quickAccess')}</p>
                  </div>
                </div>
                {bookmarkedShortcuts.length > 0 && (
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" />
                    <span className="font-medium">{t('exportBookmarks')}</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedShortcuts.map((shortcut) => (
                <ShortcutCard
                  key={shortcut.id}
                  shortcut={shortcut}
                  isBookmarked={true}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
            
            {bookmarkedShortcuts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Bookmark className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noBookmarks')}</h3>
                <p className="text-gray-600 max-w-md mx-auto">{t('startBookmarking')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
