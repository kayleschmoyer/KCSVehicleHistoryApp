import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";

type Vehicle = {
  CAR_YEAR: number;
  MAKE: string;
  MODEL: string;
  VIN_NUMBER: string;
  CAR_COLOR: string;
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

        const response = await axios.get<{ cars: Vehicle[] }>(
          "http://localhost:3000/api/vehicles/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.cars) {
          setVehicles(response.data.cars); // Set fetched vehicles
        } else {
          setVehicles([]); // No vehicles found
        }
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
        <View style={styles.noVehiclesContainer}>
          <Text style={styles.noVehiclesText}>
            No vehicles found. Please check back later!
          </Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <View style={styles.vehicleCard}>
              <Text style={styles.vehicleTitle}>
                {item.MAKE} {item.MODEL} ({item.CAR_YEAR})
              </Text>
              <Text style={styles.vehicleDetail}>VIN: {item.VIN_NUMBER}</Text>
              <Text style={styles.vehicleDetail}>Color: {item.CAR_COLOR}</Text>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() =>
                  router.push({
                    pathname: "/vehicle-history",
                    params: { vin: item.VIN_NUMBER },
                  })
                }
              >
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.VIN_NUMBER}
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
  viewDetailsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  viewDetailsButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 14,
  },
});