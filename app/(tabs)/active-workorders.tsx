// app/(tabs)/active-workorders.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Theme from "../../constants/theme";

type Estimate = {
  ESTIMATE_NUMBER: string;
  STATUS: string;
  CAR_YEAR: number;
  MAKE: string;
  MODEL: string;
  LIC_NUMBER: string;
};

export default function ActiveWorkorders() {
  const [data, setData] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pick the right host for your dev environment:
  const BASE_URL = Platform.select({
    ios:   "http://localhost:3000",
    android: "http://10.0.2.2:3000", // Android emulator → host machine
    default: "http://192.168.7.185:3000", // physical device or web
  });

  useEffect(() => {
    (async () => {
      try {
        // 1. Grab token from same key your VehicleHistory uses:
        const token =
          Platform.OS === "web"
            ? localStorage.getItem("authToken")
            : await AsyncStorage.getItem("authToken");

        console.log("AUTH TOKEN:", token);
        if (!token) {
          Alert.alert("Error", "No authentication token found.");
          return;
        }

        // 2. Decode to get CUSTOMER_NUMBER
        const { CUSTOMER_NUMBER }: { CUSTOMER_NUMBER: string } = jwtDecode(token);

        // 3. Build URL with query param
        const url = `${BASE_URL}/api/estimates?customerId=${encodeURIComponent(
          CUSTOMER_NUMBER
        )}`;
        console.log("FETCH URL:", url);

        // 4. Call your API with Bearer header
        const response = await axios.get<{ success: boolean; data: Estimate[] }>(
          url,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API RESPONSE:", response.status, response.data);
        if (!response.data.success) {
          throw new Error("Fetch failed");
        }
        setData(response.data.data);
      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [BASE_URL]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Estimates</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.ESTIMATE_NUMBER}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.vehicle}>
              {item.CAR_YEAR} {item.MAKE} {item.MODEL}
            </Text>
            <Text>Estimate: {item.ESTIMATE_NUMBER}</Text>
            <Text>Status: {item.STATUS}</Text>
            <Text>License: {item.LIC_NUMBER}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: Theme.colors.grey15,
    borderRadius: 8,
    marginBottom: 12,
  },
  vehicle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  errorText: {
    color: Theme.colors.error,
    fontSize: 16,
  },
});
