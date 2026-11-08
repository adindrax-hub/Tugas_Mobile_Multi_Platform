import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, RADIUS, SHADOWS, SPACE, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);
  if (!entry)
    return (
      <View style={styles.center}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );

  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen
        options={{ title: "Baca Catatan", headerBackTitle: "Kembali" }}
      />
      <ScrollView style={styles.bg} contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.mood}>{entry.mood}</Text>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>{entry.date}</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={[styles.likeButton, liked && styles.likeButtonActive]}
        >
          <Text style={[styles.likeText, liked && styles.likeTextActive]}>
            {liked ? "❤️ Hapus dari Favorit" : "🤍 Tambah ke Favorit"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: SPACE.l, gap: SPACE.xl, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.xl,
    borderRadius: RADIUS.card,
    ...SHADOWS.soft,
  },
  mood: { fontSize: 72, textAlign: "center", marginBottom: SPACE.m },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACE.xs,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: SPACE.l,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: SPACE.l },
  body: { fontSize: 16, lineHeight: 26, color: COLORS.text },
  likeButton: {
    padding: SPACE.l,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  likeButtonActive: { borderColor: COLORS.danger, backgroundColor: "#FEF2F2" },
  likeText: { fontWeight: "700", fontSize: 16, color: COLORS.text },
  likeTextActive: { color: COLORS.danger },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
