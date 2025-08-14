import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/utils/auth/useAuth';
import {
  BookOpen,
  Clock,
  Users,
  PlayCircle,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2; // 2 columns with padding

function getDifficultyColor(level) {
  switch (level) {
    case 'beginner':
      return { bg: '#ECFDF5', text: '#059669', border: '#34D399' };
    case 'intermediate':
      return { bg: '#FFFBEB', text: '#D97706', border: '#FBBF24' };
    case 'advanced':
      return { bg: '#FEF2F2', text: '#DC2626', border: '#F87171' };
    default:
      return { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' };
  }
}

function ModuleCard({ module, onPress, onEnroll, isEnrolling }) {
  const difficultyColors = getDifficultyColor(module.difficulty_level);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: cardWidth,
      }}
    >
      {/* Thumbnail */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: module.thumbnail_url }}
          style={{ width: '100%', height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          contentFit="cover"
          transition={200}
        />
        
        {/* Difficulty Badge */}
        <View
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: difficultyColors.bg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '600', color: difficultyColors.text }}>
            {module.difficulty_level.charAt(0).toUpperCase() + module.difficulty_level.slice(1)}
          </Text>
        </View>
        
        {/* Duration Badge */}
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.6)',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Clock size={12} color="#FFFFFF" />
          <Text style={{ fontSize: 10, fontWeight: '500', color: '#FFFFFF', marginLeft: 4 }}>
            {module.estimated_duration}min
          </Text>
        </View>
        
        {/* Progress Indicator for Enrolled Modules */}
        {module.is_enrolled && module.progress > 0 && (
          <View
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(255,255,255,0.9)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: '600', color: '#1F2937' }}>
              {Math.round(module.progress)}% complete
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ padding: 12 }}>
        {/* Category */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <BookOpen size={12} color="#30C4B5" />
          <Text style={{ fontSize: 10, color: '#6B7280', marginLeft: 4, fontWeight: '500' }}>
            {module.category}
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#1F2937',
            lineHeight: 18,
            marginBottom: 6,
          }}
          numberOfLines={2}
        >
          {module.title}
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 12,
            color: '#6B7280',
            lineHeight: 16,
            marginBottom: 12,
          }}
          numberOfLines={2}
        >
          {module.description}
        </Text>

        {/* Progress Section - Only show if enrolled */}
        {module.is_enrolled && (
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#1F2937' }}>
                {Math.round(module.progress || 0)}% Complete
              </Text>
              <Text style={{ fontSize: 10, color: '#6B7280' }}>
                {module.lessons_completed || 0}/{module.total_lessons} lessons
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 4,
                backgroundColor: '#E5E7EB',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${module.progress || 0}%`,
                  height: '100%',
                  backgroundColor: '#30C4B5',
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Enrollment Count */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Users size={12} color="#6B7280" />
            <Text style={{ fontSize: 10, color: '#6B7280', marginLeft: 4 }}>
              {(module.enrollment_count || 0).toLocaleString()}
            </Text>
          </View>

          {/* Action Button */}
          {module.is_enrolled ? (
            <TouchableOpacity
              onPress={onPress}
              style={{
                backgroundColor: '#30C4B5',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <PlayCircle size={14} color="#FFFFFF" />
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#FFFFFF', marginLeft: 4 }}>
                {(module.progress || 0) > 0 ? 'Continue' : 'Start'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onEnroll(module.id)}
              disabled={isEnrolling}
              style={{
                backgroundColor: isEnrolling ? '#F3F4F6' : '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: isEnrolling ? '#D1D5DB' : '#30C4B5',
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: isEnrolling ? '#6B7280' : '#30C4B5',
                }}
              >
                {isEnrolling ? 'Enrolling...' : 'Enroll'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ModulesScreen() {
  const insets = useSafeAreaInsets();
  const { auth, signIn } = useAuth();
  
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [enrollingModules, setEnrollingModules] = useState(new Set());
  const [filter, setFilter] = useState('all'); // all, enrolled, available

  const fetchModules = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filter === 'enrolled') {
        queryParams.append('enrolled', 'true');
      }
      
      const response = await fetch(`/api/training-modules?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setModules(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchModules();
    } else {
      setLoading(false);
    }
  }, [auth, filter]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchModules();
    setRefreshing(false);
  };

  const handleEnrollment = async (moduleId) => {
    setEnrollingModules(prev => new Set(prev).add(moduleId));
    
    try {
      const response = await fetch(`/api/training-modules/${moduleId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the module in state to reflect enrollment
        setModules(prev => prev.map(module => 
          module.id === moduleId 
            ? { ...module, is_enrolled: true, progress: 0, lessons_completed: 0 }
            : module
        ));
        
        Alert.alert('Success', data.message);
      } else {
        throw new Error(data.error || 'Failed to enroll');
      }
    } catch (error) {
      console.error('Error enrolling in module:', error);
      Alert.alert('Error', 'Failed to enroll in module. Please try again.');
    } finally {
      setEnrollingModules(prev => {
        const updated = new Set(prev);
        updated.delete(moduleId);
        return updated;
      });
    }
  };

  const handleModulePress = (moduleId) => {
    Alert.alert('Coming Soon', 'Individual module lessons will be available in a future update.');
  };

  const filteredModules = modules.filter(module => {
    if (filter === 'enrolled') return module.is_enrolled;
    if (filter === 'available') return !module.is_enrolled;
    return true;
  });

  if (!auth) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: '#F7F9FC', paddingTop: insets.top }}>
          <StatusBar style="dark" />
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <BookOpen size={64} color="#30C4B5" />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F2937', marginTop: 16, textAlign: 'center' }}>
              Sign in to view training modules
            </Text>
            <TouchableOpacity
              onPress={signIn}
              style={{
                backgroundColor: '#30C4B5',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#F7F9FC', paddingTop: insets.top }}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFFFFF' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#1F2937' }}>
              Training Modules
            </Text>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#F3F4F6',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[
                { key: 'all', label: 'All Modules' },
                { key: 'enrolled', label: 'Enrolled' },
                { key: 'available', label: 'Available' },
              ].map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setFilter(tab.key)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: filter === tab.key ? '#30C4B5' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: filter === tab.key ? '#30C4B5' : '#E5E7EB',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: filter === tab.key ? '#FFFFFF' : '#6B7280',
                    }}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#30C4B5" />
          }
        >
          <View style={{ padding: 16 }}>
            {loading ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {[1,2,3,4,5,6].map(i => (
                  <View
                    key={i}
                    style={{
                      width: cardWidth,
                      height: 220,
                      backgroundColor: '#E5E7EB',
                      borderRadius: 12,
                      marginBottom: 16,
                    }}
                  />
                ))}
              </View>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {filteredModules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onPress={() => handleModulePress(module.id)}
                    onEnroll={handleEnrollment}
                    isEnrolling={enrollingModules.has(module.id)}
                  />
                ))}
              </View>
            )}

            {!loading && filteredModules.length === 0 && (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <BookOpen size={48} color="#9CA3AF" />
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#374151', marginTop: 16 }}>
                  {filter === 'enrolled' ? 'No enrolled modules' : 
                   filter === 'available' ? 'No available modules' : 'No modules found'}
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 8 }}>
                  {filter === 'enrolled' 
                    ? 'Enroll in modules to see them here'
                    : 'Check back later for new training modules'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}