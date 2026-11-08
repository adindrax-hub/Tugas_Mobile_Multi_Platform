import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/styles/tokens';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.accent, headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ title: 'Favorit', tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ title: 'Tambah', tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ title: 'Pengaturan', tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} /> }} 
      />
    </Tabs>
  );
}