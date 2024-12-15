import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Theme from "@/constants/theme"; // Use your theme constants

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulate API call
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/kcs-logo.png")} // Adjust to your logo file path
          style={styles.logo}
        />
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background, // White background
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 250, // Larger logo size
    height: 250,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.primary, // Magenta
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Theme.colors.grey30, // Subtle border
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: Theme.colors.grey15, // Light grey background
    fontSize: 16,
    color: Theme.colors.text,
  },
  loginButton: {
    width: "100%",
    backgroundColor: Theme.colors.primary, // Magenta button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: Theme.colors.background, // White text
    fontWeight: "bold",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: Theme.colors.grey30, // Disabled button color
  },
});
