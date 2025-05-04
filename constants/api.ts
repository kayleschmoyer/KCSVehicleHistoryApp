import { Platform } from "react-native";

// PC web browser:
const localApiUrl = "http://localhost:3000/api/auth";

// Real device on same Wi-Fi as PC:
const lanApiUrl = "http://192.168.1.123:3000/api/auth";

// Android Emulator:
const emulatorApiUrl =
  Platform.OS === "android" ? "http://10.0.2.2:3000/api/auth" : lanApiUrl;

export const API_BASE_URL =
  Platform.OS === "web" ? localApiUrl : emulatorApiUrl;
