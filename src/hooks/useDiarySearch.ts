import { useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Debounce logic untuk performa pencarian
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    let result = entries;

    // Eksekusi Tugas: Filter berdasarkan Mood terlebih dahulu
    if (selectedMood) {
      result = result.filter((entry) => entry.mood === selectedMood);
    }

    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return result;

    // Lalu filter berdasarkan Query Pencarian
    return result.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q),
    );
  }, [entries, debouncedQuery, selectedMood]);

  const resetFilters = () => {
    setQuery("");
    setSelectedMood(null);
  };

  return {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount: filteredEntries.length,
    resetFilters,
  };
}
