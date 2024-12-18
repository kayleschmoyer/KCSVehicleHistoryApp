import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "@/constants/theme";

type Vehicle = {
  year: number; // CAR_YEAR
  make: string; // MAKE
  model: string; // MODEL
  vin: string; // VIN_NUMBER
  color: string; // CAR_COLOR
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

        const response = await axios.get<Vehicle[]>(
          "http://192.168.7.192:3000/api/vehicles",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setVehicles(response.data); // Set the fetched vehicles
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

      {vehicles.length === 0 ? (
        // Message when no vehicles are found
        <View style={styles.noVehiclesContainer}>
          <MaterialIcons name="info-outline" size={50} color={Theme.colors.error} />
          <Text style={styles.noVehiclesText}>
            No vehicles found. Please check back later!
          </Text>
        </View>
      ) : (
        // List of vehicles
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <View style={styles.vehicleCard}>
              <Text style={styles.vehicleTitle}>
                {item.make} {item.model} ({item.year})
              </Text>
              <Text style={styles.vehicleDetail}>VIN: {item.vin}</Text>
              <Text style={styles.vehicleDetail}>Color: {item.color}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 20,
  },
  noVehiclesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noVehiclesText: {
    fontSize: 18,
    color: Theme.colors.error,
    marginTop: 10,
    textAlign: "center",
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
    elevation: 3,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.text,
  },
  vehicleDetail: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
});