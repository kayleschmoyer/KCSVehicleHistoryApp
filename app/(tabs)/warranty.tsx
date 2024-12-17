import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "@/constants/theme";

type Warranty = {
  id: string;
  part: string;
  expires: string;
  covered: string;
};

const mockWarranties: Warranty[] = [
  { id: "1", part: "Engine", expires: "2025-12-31", covered: "Yes" },
  { id: "2", part: "Transmission", expires: "2024-07-15", covered: "Yes" },
  { id: "3", part: "Tires", expires: "2023-06-30", covered: "No" },
];

export default function WarrantyScreen() {
  const [warranties, setWarranties] = useState<Warranty[]>(mockWarranties);

  const renderItem = ({ item }: { item: Warranty }) => (
    <View style={styles.warrantyCard}>
      <MaterialIcons
        name="verified"
        size={24}
        color={item.covered === "Yes" ? Theme.colors.success : Theme.colors.error}
      />
      <View style={styles.cardContent}>
        <Text style={styles.part}>{item.part}</Text>
        <Text style={styles.expires}>Expires: {item.expires}</Text>
        <Text
          style={[
            styles.covered,
            { color: item.covered === "Yes" ? Theme.colors.success : Theme.colors.error },
          ]}
        >
          Covered: {item.covered}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warranty Information</Text>
      <FlatList
        data={warranties}
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
  warrantyCard: {
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
  part: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.secondary,
  },
  expires: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
  covered: {
    fontSize: 16,
    fontWeight: "bold",
  },
});