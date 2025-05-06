import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { Platform, Pressable, Animated, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { IconSymbol } from '../../components/ui/IconSymbol';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  const scheme = useColorScheme() ?? 'light';
  const tint = Colors[scheme].tint;
  const inactive = Colors[scheme].icon;
  const bg = Colors[scheme].background;
  const gradStart = Colors[scheme].primary || tint;
  const gradEnd = Colors[scheme].secondary || tint;
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        height: 60,
        backgroundColor: bg,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => router.push('/profile')}
        >
          <IconSymbol name="person.circle" size={24} color={tint} />
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            height: 56,
            borderRadius: 32,
            backgroundColor: bg,
            paddingHorizontal: 12,
            justifyContent: 'space-between',
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
              },
              android: { elevation: 8 },
            }),
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={[gradStart, gradEnd]}
              start={[0, 0]}
              end={[1, 0]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
              }}
            />
          ),
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarActiveTintColor: tint,
          tabBarInactiveTintColor: inactive,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="vehicle-history"
          options={{
            title: 'Your Vehicles',
            tabBarIcon: ({ color }) => <IconSymbol name="car" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="active-workorders"
          options={{
            title: 'Active Workorders',
            tabBarIcon: ({ color }) => <IconSymbol name="hammer.fill" size={24} color={color} />,
          }}
        />

        <Tabs.Screen
          name="warranty"
          options={{
            title: 'Warranties',
            tabBarIcon: ({ color }) => <IconSymbol name="shield.fill" size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

/**
 * Wrap each tab child in a Pressable + Animated.View so the icon smoothly
 * “pops” a bit on focus/unfocus.
 */
function AnimatedTabButton({
  accessibilityState,
  children,
  onPress,
}: any) {
  const focused = accessibilityState.selected;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        flexGrow: 1,
        maxWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
      }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}