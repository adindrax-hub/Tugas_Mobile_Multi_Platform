import { useCallback, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ['😊', '🎯', '😌', '😴'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const { 
    query, setQuery, selectedMood, setSelectedMood, 
    filteredEntries, resultCount, resetFilters 
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback((id: number) => {
    router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
  }, [router]);

  const clearSearchAndFocus = useCallback(() => {
    resetFilters();
    searchRef.current?.focus();
  }, [resetFilters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef} 
          value={query} 
          onChangeText={setQuery}
          placeholder="Cari diary..." 
          style={styles.search}
        />
        <Pressable onPress={clearSearchAndFocus} style={styles.clearButton}>
          <Text>Reset</Text>
        </Pressable>
      </View>

      {/* Filter Mood UI */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.moodFilter}
      >
         {MOODS.map(m => (
           <Pressable 
              key={m} 
              onPress={() => setSelectedMood(selectedMood === m ? null : m)}
              style={[styles.moodChip, selectedMood === m && styles.moodChipActive]}
           >
             <Text style={styles.moodText}>{m}</Text>
           </Pressable>
         ))}
      </ScrollView>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title} 
            date={item.date} 
            preview={item.preview} 
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Diary tidak ditemukan.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: SPACE.l, 
    backgroundColor: COLORS.background 
  },
  header: { 
    fontSize: TYPO.h1, 
    fontWeight: "700", 
    color: COLORS.text, 
    marginBottom: SPACE.m 
  },
  searchRow: { 
    flexDirection: "row", 
    gap: SPACE.s 
  },
  search: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    padding: 10, 
    backgroundColor: "#fff" 
  },
  clearButton: { 
    justifyContent: "center", 
    paddingHorizontal: 14, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    backgroundColor: "#fff" 
  },
  
  // === BAGIAN YANG DIPERBARUI AGAR EMOJI TIDAK TERPOTONG ===
  moodFilter: { 
    marginTop: SPACE.m, 
    paddingBottom: 10,
    flexGrow: 0 // Memastikan ScrollView tidak melebar tak terbatas ke bawah
  },
  moodChip: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 20, 
    marginRight: SPACE.s, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  moodChipActive: { 
    borderColor: COLORS.accent, 
    backgroundColor: '#eff6ff' 
  },
  moodText: { 
    fontSize: 20 
  },
  // ==========================================================
  
  counter: { 
    color: COLORS.muted, 
    marginVertical: SPACE.s 
  },
  list: { 
    gap: SPACE.m, 
    paddingBottom: SPACE.xl 
  },
  empty: { 
    textAlign: "center", 
    color: COLORS.muted, 
    paddingTop: 40 
  },
});