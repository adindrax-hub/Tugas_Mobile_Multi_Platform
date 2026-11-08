import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Compact Mode</Text>
          <Switch value={compactMode} onValueChange={setCompactMode} />
        </View>
        <Text style={styles.info}>
          Status State: {compactMode ? "Aktif" : "Nonaktif"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACE.l,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  info: { marginTop: SPACE.m, color: COLORS.muted, fontSize: 14 },
});
