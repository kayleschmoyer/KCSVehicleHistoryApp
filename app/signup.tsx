import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Theme from "@/constants/theme";
import axios from "axios";

interface SignupResponse {
  message: string;
}

const API_BASE_URL = "http://localhost:3000/api/auth";

export default function SignupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post<SignupResponse>(`${API_BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      Alert.alert("Success", response.data.message || "Account created successfully.");
      setModalVisible(false);
    } catch (error: any) {
      console.error("Signup Error:", error);
      const message = error.response?.data?.message || "An error occurred during signup.";
      Alert.alert("Signup Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sign Up Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sign Up</Text>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={Theme.colors.grey30}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={Theme.colors.grey30}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={Theme.colors.grey30}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={Theme.colors.grey30}
            />

            <TouchableOpacity
              style={[styles.signupButton, isSubmitting && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={Theme.colors.background} />
              ) : (
                <Text style={styles.signupButtonText}>Submit</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Screen Content */}
      <TouchableOpacity style={styles.signupMainButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.signupMainButtonText}>Sign Up</Text>
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: Theme.colors.background,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Theme.colors.grey30,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: Theme.colors.grey15,
    fontSize: 16,
    color: Theme.colors.text,
  },
  signupButton: {
    width: "100%",
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: Theme.colors.grey30,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Theme.colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  signupMainButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  signupMainButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 18,
  },
});