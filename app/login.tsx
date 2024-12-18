import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Image,
} from "react-native";
import Theme from "@/constants/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Define the expected structure of the login response
interface LoginResponse {
  token: string;
  message?: string;
}

const API_BASE_URL = "http://localhost:3000/api/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }
  
    setIsLoading(true);
    try {
      // Specify the expected response type with generics
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, {
        email,
        password,
      });
  
      const { token } = response.data; // Type is now inferred correctly
  
      // Save token in AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      console.log("Token saved:", token);
  
      Alert.alert("Login Successful", "You are now logged in.");
      router.replace("/dashboard"); // Navigate to dashboard
    } catch (error: any) {
      console.error("Login Error:", error);
      Alert.alert("Error", error.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };  

  // Handle Signup
  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
  
    setIsSubmitting(true);
    try {
      // Specify the expected response type with generics
      const response = await axios.post<{ message: string }>(
        `${API_BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
  
      const { message } = response.data; // Now TypeScript knows 'data.message' exists
  
      Alert.alert("Signup Successful", message);
      setIsModalVisible(false);
    } catch (error: any) {
      console.error("Signup Error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("@/assets/images/kcs-logo.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome to KCS Vehicle History</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={Theme.colors.grey30}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={Theme.colors.grey30}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Theme.colors.text} />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign-Up Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign-Up Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign Up</Text>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={Theme.colors.grey30}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={Theme.colors.grey30}
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Theme.colors.grey30}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={Theme.colors.grey30}
              value={password}
              onChangeText={setPassword}
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
              style={[styles.signupButton, styles.cancelButton]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.signupButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
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
  loginButton: {
    width: "100%",
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 18,
  },
  signupButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    alignItems: "center",
  },
  signupButtonText: {
    color: Theme.colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Theme.colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Theme.colors.error,
  },
  disabledButton: {
    backgroundColor: Theme.colors.grey30,
  },
});