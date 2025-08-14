import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';

export default function MentorshipScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#F7F9FC', paddingTop: insets.top }}>
        <StatusBar style="dark" />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <MessageCircle size={64} color="#6366F1" />
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#1F2937', marginTop: 16, textAlign: 'center' }}>
            Mentorship & Help Desk
          </Text>
          <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 8 }}>
            Chat with mentors and get ICT training support
          </Text>
          <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginTop: 16 }}>
            Coming Soon
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}