import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Theme from "../constants/theme";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.removeItem("authToken");
      } else {
        await AsyncStorage.removeItem("authToken");
      }

      Alert.alert("Logged out", "You have been logged out.");
      router.replace("/login");

    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary, // Magenta
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  buttonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
