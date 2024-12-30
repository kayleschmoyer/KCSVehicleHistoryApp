import React from "react";
import { useRouter } from "expo-router"; // Use `useRouter` for navigation
import { View, Text, StyleSheet, Button } from "react-native";

export default function VehicleHistory({ route }: any) {
  const router = useRouter();
  const { vin } = route.params; // Access VIN from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle History</Text>
      <Text style={styles.detail}>VIN: {vin}</Text>
      <Button title="Back to Dashboard" onPress={() => router.push("/dashboard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: "#333",
  },
});