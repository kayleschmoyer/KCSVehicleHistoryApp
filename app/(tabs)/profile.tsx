import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Theme from "../../constants/theme";
import LogoutButton from "../../components/LogoutButton";
import * as jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Define the structure of the decoded token
interface DecodedToken {
  CUSTOMER_NUMBER: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  EMAILADDRESS?: string;
  iat: number;
  exp: number;
}

export default function ProfileScreen() {
  const [fullName, setFullName] = useState("Loading...");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        let token;
        if (Platform.OS === "web") {
          token = localStorage.getItem("authToken");
        } else {
          token = await AsyncStorage.getItem("authToken");
        }

        if (token) {
          const decoded: DecodedToken = jwtDecode.default(token);
          const name = `${decoded.FIRST_NAME || "Unknown"} ${decoded.LAST_NAME || ""}`.trim();
          setFullName(name);
          setEmail(decoded.EMAILADDRESS || "No email");
        } else {
          setFullName("Guest");
          setEmail("");
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
        setFullName("Error loading name");
        setEmail("");
      }
    };

    loadUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Theme.colors.grey50,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  editButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
