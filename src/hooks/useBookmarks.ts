
import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/constants';
import { safeLocalStorage } from '@/utils/helpers';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = safeLocalStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (saved) {
        const parsedBookmarks = JSON.parse(saved);
        if (Array.isArray(parsedBookmarks)) {
          setBookmarks(parsedBookmarks);
        } else {
          console.warn('Invalid bookmarks data in localStorage');
          setBookmarks([]);
        }
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
      setError('북마크를 불러오는데 실패했습니다.');
      setBookmarks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleBookmark = useCallback((id: number) => {
    try {
      setBookmarks(prevBookmarks => {
        const newBookmarks = prevBookmarks.includes(id)
          ? prevBookmarks.filter(bookmarkId => bookmarkId !== id)
          : [...prevBookmarks, id];
        
        const success = safeLocalStorage.setItem(
          STORAGE_KEYS.BOOKMARKS, 
          JSON.stringify(newBookmarks)
        );
        
        if (!success) {
          setError('북마크 저장에 실패했습니다.');
          return prevBookmarks; // 실패시 이전 상태 유지
        }
        
        setError(null);
        return newBookmarks;
      });
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      setError('북마크 처리 중 오류가 발생했습니다.');
    }
  }, []);

  const isBookmarked = useCallback((id: number) => bookmarks.includes(id), [bookmarks]);

  const clearBookmarks = useCallback(() => {
    try {
      setBookmarks([]);
      const success = safeLocalStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
      if (!success) {
        setError('북마크 초기화에 실패했습니다.');
      } else {
        setError(null);
      }
    } catch (error) {
      console.error('Failed to clear bookmarks:', error);
      setError('북마크 초기화 중 오류가 발생했습니다.');
    }
  }, []);

  return { 
    bookmarks, 
    toggleBookmark, 
    isBookmarked, 
    clearBookmarks,
    isLoading,
    error 
  };
};
