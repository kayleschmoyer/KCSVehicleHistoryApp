import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Theme from "@/constants/theme"; // Use Theme for consistent styling

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
    color: Theme.colors.text, // Use a contrasting text color
    fontWeight: "bold",
    fontSize: 16,
  },
});