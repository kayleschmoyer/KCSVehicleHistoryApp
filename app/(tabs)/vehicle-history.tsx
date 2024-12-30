import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Updated import
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "@/constants/theme";

type VehicleHistory = {
  INVOICE_NUMBER: string;
  INVOICE_DATE: string;
  TOTAL_SALE_AMOUNT: string;
  LEVEL1TAX_TOTAL?: string;
  LEVEL2TAX_TOTAL?: string;
  LEVEL3TAX_TOTAL?: string;
  LEVEL4TAX_TOTAL?: string;
  LEVEL5TAX_TOTAL?: string;
  LEVEL6TAX_TOTAL?: string;
  LEVEL7TAX_TOTAL?: string;
  LEVEL8TAX_TOTAL?: string;
  LEVEL9TAX_TOTAL?: string;
};

export default function VehicleHistoryScreen() {
  const [history, setHistory] = useState<VehicleHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { vin } = useLocalSearchParams(); // Updated to use useLocalSearchParams

  useEffect(() => {
    const fetchVehicleHistory = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Error", "No authentication token found.");
          router.replace("/login");
          return;
        }

        const response = await axios.get<VehicleHistory[]>(
          `http://192.168.7.185:3000/api/history?vin=${vin}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

  const renderItem = ({ item }: { item: VehicleHistory }) => (
    <View style={styles.historyCard}>
      <Text style={styles.service}>Invoice #: {item.INVOICE_NUMBER}</Text>
      <Text style={styles.date}>Date: {item.INVOICE_DATE}</Text>
      <Text style={styles.cost}>Total Sale: ${item.TOTAL_SALE_AMOUNT}</Text>
      {item.LEVEL1TAX_TOTAL && <Text style={styles.tax}>Tax 1: ${item.LEVEL1TAX_TOTAL}</Text>}
      {item.LEVEL2TAX_TOTAL && <Text style={styles.tax}>Tax 2: ${item.LEVEL2TAX_TOTAL}</Text>}
      {/* Add other taxes as needed */}
    </View>
  );

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
          keyExtractor={(item) => item.INVOICE_NUMBER}
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
  tax: {
    fontSize: 12,
    color: Theme.colors.grey50,
  },
});