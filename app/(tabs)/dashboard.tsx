import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Theme from "../../constants/theme";

type Vehicle = {
  CAR_YEAR: number | null;
  MAKE: string | null;
  MODEL: string | null;
  VIN_NUMBER: string | null;
  CAR_COLOR: string | null;
  LIC_NUMBER: string | null;
};

// 👇 Map makes to icons
const getVehicleIcon = (make: string | null) => {
  if (!make) return require("../../assets/vehicle-icons/default-car.png");

  const lowerMake = make.toLowerCase();

  if (lowerMake.includes("ford"))
    return require("../../assets/vehicle-icons/ford.png");
  if (lowerMake.includes("toyota"))
    return require("../../assets/vehicle-icons/toyota.png");
  if (lowerMake.includes("chevy") || lowerMake.includes("chevrolet"))
    return require("../../assets/vehicle-icons/chevrolet.png");
  if (lowerMake.includes("honda"))
    return require("../../assets/vehicle-icons/honda.png");
  if (lowerMake.includes("nissan"))
    return require("../../assets/vehicle-icons/nissan.png");
  if (lowerMake.includes("tesla"))
    return require("../../assets/vehicle-icons/tesla.png");
  if (lowerMake.includes("subaru"))
    return require("../../assets/vehicle-icons/subaru.png");
  if (lowerMake.includes("jeep"))
    return require("../../assets/vehicle-icons/jeep.png");
  if (lowerMake.includes("dodge"))
    return require("../../assets/vehicle-icons/dodge.png");
  if (lowerMake.includes("ram"))
    return require("../../assets/vehicle-icons/ram.png");
  if (lowerMake.includes("buick"))
    return require("../../assets/vehicle-icons/buick.png");

  return require("../../assets/vehicle-icons/default-car.png");
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
          "http://192.168.7.185:3000/api/vehicles/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.cars) {
          setVehicles(response.data.cars);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        Alert.alert("Error", "Unable to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const renderVehicle = ({ item }: { item: Vehicle }) => {
    const makeModel = `${item.MAKE || "Unknown"} ${item.MODEL || ""}`.trim();
    const year = item.CAR_YEAR ? item.CAR_YEAR : "N/A";
    const vin = item.VIN_NUMBER || "N/A";
    const color = item.CAR_COLOR || "N/A";

    return (
      <View style={styles.vehicleCard}>
        <View style={styles.cardTopRow}>
          <Image source={getVehicleIcon(item.MAKE)} style={styles.vehicleIcon} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={styles.cardHeader}>
              <Text style={styles.vehicleMakeModel}>{makeModel.toUpperCase()}</Text>
              <Text style={styles.yearBadge}>{year}</Text>
            </View>
            <Text style={styles.vehicleDetail}>VIN: {vin}</Text>
            <Text style={styles.vehicleDetail}>Color: {color}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() =>
            router.push({
              pathname: "/vehicle-history",
              params: {
                vin: item.VIN_NUMBER || "",
                year: item.CAR_YEAR ? item.CAR_YEAR.toString() : "",
                make: item.MAKE || "",
                model: item.MODEL || "",
                license: item.LIC_NUMBER || ""
              },
            })
          }
        >
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          renderItem={renderVehicle}
          keyExtractor={(item, index) =>
            (item.VIN_NUMBER || `${index}-${Math.random()}`).toString()
          }
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
    padding: 20,
    marginBottom: 15,
    backgroundColor: Theme.colors.grey15,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  vehicleIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  vehicleMakeModel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.text,
    flex: 1,
    flexWrap: "wrap",
  },
  yearBadge: {
    backgroundColor: Theme.colors.grey30,
    color: Theme.colors.text,
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 5,
  },
  vehicleDetail: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
  viewDetailsButton: {
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: Theme.colors.magenta,
    borderRadius: 8,
    alignItems: "center",
  },
  viewDetailsButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
