import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, RADIUS, SHADOWS, SPACE } from "../../src/styles/tokens";

const MOODS = ["😊", "🎯", "😌", "😴", "😭", "😡"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Otomatis tanggal hari ini
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("");

  const canSave =
    title.trim().length > 0 && body.trim().length > 0 && mood !== "";

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80) + "...",
      body: body.trim(),
      mood,
    });
    setTitle("");
    setBody("");
    setMood("");
    router.replace("/");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Tulis Diary Baru</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Judul</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Cth: Hari yang cerah..."
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Cerita Hari Ini</Text>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Bagaimana perasaanmu hari ini?"
          multiline
          style={[styles.input, styles.bodyInput]}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pilih Mood</Text>
        <View style={styles.moodRow}>
          {MOODS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setMood(item)}
              style={[styles.moodButton, mood === item && styles.moodSelected]}
            >
              <Text style={styles.mood}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.saveButton, !canSave && styles.disabled]}
      >
        <Text style={styles.saveText}>Simpan Catatan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACE.xl, gap: SPACE.m, paddingBottom: 40 },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  formGroup: { gap: SPACE.s, marginBottom: SPACE.s },
  label: { fontSize: 14, fontWeight: "700", color: COLORS.muted },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.button,
    padding: 14,
    backgroundColor: COLORS.surface,
    fontSize: 16,
  },
  bodyInput: { minHeight: 140, textAlignVertical: "top" },
  moodRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACE.m },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 3,
    backgroundColor: "#EFF6FF",
  },
  mood: { fontSize: 24 },
  saveButton: {
    padding: 16,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    marginTop: SPACE.l,
    ...SHADOWS.soft,
  },
  disabled: { backgroundColor: COLORS.muted, opacity: 0.5 },
  saveText: { color: COLORS.surface, fontWeight: "700", fontSize: 16 },
});
