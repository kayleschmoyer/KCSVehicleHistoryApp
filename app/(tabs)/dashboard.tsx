import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Theme from "@/constants/theme"; // Import updated Theme constants

const mockVehicles = [
  {
    id: "1",
    make: "Tesla",
    model: "Model S",
    year: 2021,
    warranty: "Active",
    image: "https://example.com/tesla.jpg", // Placeholder image URL
  },
  {
    id: "2",
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    warranty: "Expired",
    image: "https://example.com/toyota.jpg", // Placeholder image URL
  },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Vehicles</Text>
      <FlatList
        data={mockVehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.make} {item.model} ({item.year})
              </Text>
              <Text
                style={[
                  styles.cardSubtitle,
                  item.warranty === "Active"
                    ? styles.activeWarranty
                    : styles.expiredWarranty,
                ]}
              >
                Warranty: {item.warranty}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden", // Ensure content stays within the card
    elevation: 3, // Subtle shadow effect
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeWarranty: {
    color: Theme.colors.success, // Green for active warranties
  },
  expiredWarranty: {
    color: Theme.colors.error, // Red for expired warranties
  },
});