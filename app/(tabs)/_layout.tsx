// app/(tabs)/_layout.tsx

import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { Platform, Pressable, Animated, View } from 'react-native';
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // hide the labels for a clean icon-only look
        tabBarShowLabel: false,

        // pill-shaped, floating bar
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          height: 56,
          borderRadius: 32,
          backgroundColor: bg,
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

        // draw a tiny gradient stripe across the top of the pill
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

        // custom button to animate icon scale + haptic on press
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
        name="warranty"
        options={{
          title: 'Warranties',
          tabBarIcon: ({ color }) => <IconSymbol name="shield.fill" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol name="person.circle" size={24} color={color} />,
        }}
      />
    </Tabs>
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
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
