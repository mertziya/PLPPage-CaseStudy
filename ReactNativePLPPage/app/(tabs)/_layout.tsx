import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // <- the icon library

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = 'light';
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel : false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Colors.light.absoluteBackground, // match your TabBarBackground
          borderTopWidth: 0, // remove default border if needed
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4, // Android shadow

          left: 0,
          right: 0,
          bottom: -insets.bottom, // ✅ push it into the safe area
          height: 3 * insets.bottom, // accounts for extra space needed
          paddingBottom: 0, // ✅ no inner padding
          paddingTop: 0,     // ✅ prevent extra vertical space
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tintColor,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].logoColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              name={focused ? 'house.fill' : 'house' as any}
              size={32}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol
              name={focused ? 'person.fill' : 'person' as any}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}