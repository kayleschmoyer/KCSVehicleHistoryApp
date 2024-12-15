import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Theme from "@/constants/theme"; // Import Theme for consistent styling

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={
            notificationsEnabled
              ? Theme.colors.primary
              : Theme.colors.grey30
          }
          trackColor={{
            false: Theme.colors.grey15,
            true: Theme.colors.primary,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Theme.colors.grey15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingLabel: {
    fontSize: 18,
    color: Theme.colors.text,
  },
});