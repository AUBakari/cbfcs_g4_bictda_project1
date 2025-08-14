import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trophy } from 'lucide-react-native';

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#F7F9FC', paddingTop: insets.top }}>
        <StatusBar style="dark" />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Trophy size={64} color="#FF8C42" />
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#1F2937', marginTop: 16, textAlign: 'center' }}>
            Achievements & Badges
          </Text>
          <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 8 }}>
            View your earned certificates and badges
          </Text>
          <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginTop: 16 }}>
            Coming Soon
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}