import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "../../constants/theme";

type VehicleHistory = {
  INVOICE_NUMBER: string;
  TOTAL_SALE_AMOUNT: string;
  VIN_NUMBER: string;
  SERVICE_CATEGORIES: string[];
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
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

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

        const response = await axios.get<{ history: VehicleHistory[] }>(
          `http://192.168.7.185:3000/api/vehicles/history?vin=${vin}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);
        setHistory(response.data.history || []);
      } catch (error) {
        console.error("Error fetching vehicle history:", error);
        Alert.alert("Error", "Unable to fetch vehicle history.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleHistory();
  }, [router, vin]);

  const renderItem = ({ item }: { item: VehicleHistory }) => {
    const isExpanded = expandedInvoice === item.INVOICE_NUMBER;

    return (
      <TouchableOpacity
        style={styles.historyCard}
        onPress={() =>
          setExpandedInvoice(
            isExpanded ? null : item.INVOICE_NUMBER
          )
        }
      >
        <View style={styles.headerRow}>
          <Text style={styles.invoiceNumber}>Invoice: {item.INVOICE_NUMBER}</Text>
          <Text style={styles.amount}>${item.TOTAL_SALE_AMOUNT}</Text>
        </View>

        <Text style={styles.vinText}>VIN: {item.VIN_NUMBER || "N/A"}</Text>

        {isExpanded && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Service Categories:</Text>
            {item.SERVICE_CATEGORIES.length > 0 ? (
              item.SERVICE_CATEGORIES.map((cat, index) => (
                <Text key={index} style={styles.serviceItem}>
                  • {cat}
                </Text>
              ))
            ) : (
              <Text style={styles.noServices}>No service categories</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
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
    backgroundColor: Theme.colors.grey15,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.text,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.magenta,
  },
  vinText: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
  detailsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: 5,
  },
  serviceItem: {
    fontSize: 14,
    color: Theme.colors.text,
  },
  noServices: {
    fontSize: 14,
    color: Theme.colors.grey50,
  },
});
