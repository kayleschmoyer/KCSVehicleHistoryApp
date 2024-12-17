import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Theme from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.grey50,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginTop: -5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicle-history"
        options={{
          title: "Vehicle History",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="warranty"
        options={{
          title: "Warranties",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="verified-user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}