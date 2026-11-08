import { useMemo } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

// Mengekstrak khusus entri yang di-like (untuk tab Favorites)
export function useLikedEntries(entries: DiaryEntry[], likedIds: Set<number>) {
  return useMemo(() => {
    return entries.filter((entry) => likedIds.has(entry.id));
  }, [entries, likedIds]);
}