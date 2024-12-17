import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";

type Vehicle = {
  make: string;
  model: string;
  year: number;
  warranty?: string;
};

export default function DashboardScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Error", "No authentication token found.");
          router.replace("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/vehicles",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        Alert.alert("Error", "Unable to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Vehicles</Text>
      {vehicles.map((vehicle, index) => (
        <View key={index} style={styles.vehicleCard}>
          <Text style={styles.vehicleText}>
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </Text>
          <Text style={styles.vehicleText}>
            Warranty: {vehicle.warranty || "N/A"}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 20,
  },
  vehicleCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: Theme.colors.grey15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleText: {
    fontSize: 16,
    color: Theme.colors.text,
  },
});