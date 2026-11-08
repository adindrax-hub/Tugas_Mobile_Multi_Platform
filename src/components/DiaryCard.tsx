import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import ikon profesional
import { COLORS, SPACE, RADIUS, TYPO, SHADOWS } from '../styles/tokens';

type Props = {
  title: string; date: string; preview: string; mood: string;
  liked: boolean; onPress: () => void; onToggleLike: () => void;
};

export default function DiaryCard({ title, date, preview, mood, liked, onPress, onToggleLike }: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.main, { opacity: pressed ? 0.7 : 1 }]}>
        <View style={styles.moodContainer}>
          <Text style={styles.mood}>{mood}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>{preview}</Text>
        </View>
      </Pressable>
      <Pressable onPress={onToggleLike} style={styles.likeButton} hitSlop={10}>
        {/* Menggunakan Ionicons agar tidak error kotak silang di Android */}
        <Ionicons 
          name={liked ? "heart" : "heart-outline"} 
          size={28} 
          color={liked ? COLORS.danger : COLORS.muted} 
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card, borderWidth: 1, borderColor: COLORS.border,
    ...SHADOWS.soft, overflow: 'hidden',
  },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: SPACE.m, gap: SPACE.m },
  moodContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  mood: { fontSize: 26 },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.muted, lineHeight: 20 },
  likeButton: { padding: SPACE.l, justifyContent: 'center', alignItems: 'center' },
});