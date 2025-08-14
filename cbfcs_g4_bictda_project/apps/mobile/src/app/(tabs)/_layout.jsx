import { Tabs } from 'expo-router';
import { Home, BookOpen, Trophy, MessageCircle, BarChart3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderColor: '#E5E7EB',
          paddingTop: 4,
          height: 84,
        },
        tabBarActiveTintColor: '#30C4B5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="modules"
        options={{
          title: 'Modules',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, size }) => (
            <Trophy color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="mentorship"
        options={{
          title: 'Mentorship',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}