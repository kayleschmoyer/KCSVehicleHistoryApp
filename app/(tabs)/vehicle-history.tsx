import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "@/constants/theme";

type VehicleHistory = {
  INVOICE_NUMBER: string;
  TOTAL_SALE_AMOUNT: string;
  VIN_NUMBER: string;
  SERVICE_CATEGORIES: string[]; // New field to store service categories
};

const getAuthToken = async () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("authToken");
  } else {
    return await AsyncStorage.getItem("authToken");
  }
};

export default function VehicleHistoryScreen() {
  const [history, setHistory] = useState<VehicleHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { vin } = useLocalSearchParams();

  useEffect(() => {
    const fetchVehicleHistory = async () => {
      console.log("Fetching vehicle history for VIN:", vin);
      try {
        const token = await getAuthToken();
        if (!token) {
          Alert.alert("Error", "No authentication token found.");
          router.replace("/login");
          return;
        }

        const response = await axios.get<VehicleHistory[]>(
          `http://192.168.7.185:3000/api/vehicles/history?vin=${vin}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);
        setHistory(response.data || []);
      } catch (error) {
        console.error("Error fetching vehicle history:", error);
        Alert.alert("Error", "Unable to fetch vehicle history.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleHistory();
  }, [vin]);

  const renderItem = ({ item }: { item: VehicleHistory }) => {
    console.log("Rendering item:", item);
    return (
      <View style={styles.historyCard}>
        <Text style={styles.service}>Invoice #: {item.INVOICE_NUMBER}</Text>
        <Text style={styles.date}>Total Sale Amount: ${item.TOTAL_SALE_AMOUNT}</Text>
        <Text style={styles.cost}>VIN: {item.VIN_NUMBER}</Text>
        <Text style={styles.categories}>
          Service Categories:{" "}
          {item.SERVICE_CATEGORIES.length > 0
            ? item.SERVICE_CATEGORIES.join(", ")
            : "No specific services"}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle History</Text>
      {history.length === 0 ? (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>
            No history found for this vehicle.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.INVOICE_NUMBER.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noHistoryText: {
    fontSize: 18,
    color: Theme.colors.error,
  },
  historyCard: {
    flexDirection: "column",
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
  service: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.text,
  },
  date: {
    fontSize: 14,
    color: Theme.colors.primary,
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.colors.secondary,
  },
  categories: {
    fontSize: 14,
    color: Theme.colors.text,
    marginTop: 5,
  },
});