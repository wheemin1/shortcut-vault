
import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('shortcut-bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const toggleBookmark = (id: number) => {
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(bookmarkId => bookmarkId !== id)
      : [...bookmarks, id];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('shortcut-bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (id: number) => bookmarks.includes(id);

  return { bookmarks, toggleBookmark, isBookmarked };
};
