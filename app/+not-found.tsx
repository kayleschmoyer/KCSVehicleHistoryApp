import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Screen Not Found</Text>
      <Text style={styles.subtitle}>
        The screen you are looking for doesn’t exist.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#E91E63",
  },
  subtitle: {
    fontSize: 16,
    color: "#7E7E7E",
  },
});