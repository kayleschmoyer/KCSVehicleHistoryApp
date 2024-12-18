import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Theme from "@/constants/theme";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track layout mount

  // Check if the user is logged in by fetching the token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("Retrieved Token:", token); // Debugging
        setIsLoggedIn(!!token); // Set logged-in state based on token
      } catch (error) {
        console.error("Error reading auth token:", error);
        setIsLoggedIn(false); // Default to logged-out state on error
      }
    };

    checkAuth();
  }, []);

  // Ensure layout is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading screen until login status is determined
  if (isLoggedIn === null || !isMounted) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      {/* Conditional Routing: Load tabs if logged in, else load login */}
      <Stack.Screen
        name={isLoggedIn ? "(tabs)" : "login"}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  },
});