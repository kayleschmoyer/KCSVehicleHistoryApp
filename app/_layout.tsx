import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Theme from "@/constants/theme";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Set logged-in state based on token
      } catch (error) {
        console.error("Error reading auth token:", error);
        setIsLoggedIn(false); // Default to logged-out state on error
      }
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
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