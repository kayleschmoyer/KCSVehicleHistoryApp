import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "@/constants/theme"; // Use Theme constants for consistent styling

type VehicleHistory = {
  id: string;
  service: string;
  date: string;
  cost: string;
};

const mockHistory: VehicleHistory[] = [
  { id: "1", service: "Oil Change", date: "2023-11-25", cost: "$50" },
  { id: "2", service: "Brake Replacement", date: "2023-09-10", cost: "$200" },
  { id: "3", service: "Tire Rotation", date: "2023-08-15", cost: "$30" },
];

export default function VehicleHistoryScreen() {
  const [history, setHistory] = useState<VehicleHistory[]>(mockHistory);

  const renderItem = ({ item }: { item: VehicleHistory }) => (
    <TouchableOpacity style={styles.historyCard}>
      <MaterialIcons name="history" size={24} color={Theme.colors.primary} />
      <View style={styles.cardContent}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.cost}>Cost: {item.cost}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle History</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    color: Theme.colors.primary,
    marginBottom: 20,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.grey15,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    marginLeft: 15,
  },
  service: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.secondary,
  },
  date: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.primary,
  },
});