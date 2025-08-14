import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";
import {
  BookOpen,
  Trophy,
  Award,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
  MessageCircle,
} from "lucide-react-native";

const { width: screenWidth } = Dimensions.get("window");

function StatCard({ stat, onPress }) {
  const iconComponents = {
    BookOpen,
    Trophy,
    Award,
    TrendingUp,
  };

  const IconComponent =
    typeof stat.icon === "string"
      ? iconComponents[stat.icon] || BookOpen
      : stat.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        minHeight: 110,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#F0FDFA",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconComponent size={20} color="#30C4B5" />
        </View>
        <ChevronRight size={16} color="#9CA3AF" />
      </View>

      <View style={{ marginTop: 12 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: 2,
          }}
        >
          {stat.value}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#6B7280",
            marginBottom: 4,
          }}
        >
          {stat.title}
        </Text>
        <Text style={{ fontSize: 12, color: "#9CA3AF" }}>{stat.subValue}</Text>
      </View>
    </TouchableOpacity>
  );
}

function QuickAction({
  title,
  subtitle,
  icon: Icon,
  onPress,
  backgroundColor = "#30C4B5",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: backgroundColor + "20",
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <Icon size={24} color={backgroundColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: 2,
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7280" }}>{subtitle}</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { auth, signIn } = useAuth();
  const { data: user, loading: userLoading } = useUser();

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/user/stats");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [auth]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleQuickAction = (action) => {
    Alert.alert(
      "Feature Coming Soon",
      `${action} will be available in a future update.`,
    );
  };

  if (!auth) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#F7F9FC",
            paddingTop: insets.top,
          }}
        >
          <StatusBar style="dark" />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 48 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#30C4B5",
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <BookOpen size={40} color="#FFFFFF" />
              </View>

              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  color: "#1F2937",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Welcome to CBFCS
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 24,
                  marginBottom: 4,
                }}
              >
                Capacity Building for Civil Servants
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#9CA3AF",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Build essential ICT skills for government work
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSignIn}
              style={{
                backgroundColor: "#30C4B5",
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 12,
                minWidth: 200,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#FFFFFF" }}
              >
                Sign In to Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View
        style={{ flex: 1, backgroundColor: "#F7F9FC", paddingTop: insets.top }}
      >
        <StatusBar style="dark" />

        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#1F2937",
                  marginBottom: 4,
                }}
              >
                Welcome back!
              </Text>
              <Text style={{ fontSize: 16, color: "#6B7280" }}>
                {user?.name || "Continue your ICT training journey"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bell size={20} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Settings size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#30C4B5"
            />
          }
        >
          {/* Stats Overview */}
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#1F2937",
                marginBottom: 16,
              }}
            >
              Training Overview
            </Text>

            {loading ? (
              <View style={{ flexDirection: "row", gap: 8 }}>
                {[1, 2].map((i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 110,
                      backgroundColor: "#E5E7EB",
                      borderRadius: 12,
                    }}
                  />
                ))}
              </View>
            ) : (
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
                {stats.slice(0, 2).map((stat, index) => (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    onPress={() => handleQuickAction(stat.title)}
                  />
                ))}
              </View>
            )}

            {!loading && stats.length > 2 && (
              <View style={{ flexDirection: "row", gap: 8 }}>
                {stats.slice(2).map((stat) => (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    onPress={() => handleQuickAction(stat.title)}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#1F2937",
                marginBottom: 16,
              }}
            >
              Quick Actions
            </Text>

            <QuickAction
              title="Start Learning"
              subtitle="Continue your current module or start a new one"
              icon={BookOpen}
              onPress={() => handleQuickAction("Start Learning")}
            />

            <QuickAction
              title="View Achievements"
              subtitle="See your badges, certificates, and progress"
              icon={Trophy}
              backgroundColor="#FF8C42"
              onPress={() => handleQuickAction("View Achievements")}
            />

            <QuickAction
              title="Get Help"
              subtitle="Chat with a mentor or join office hours"
              icon={MessageCircle}
              backgroundColor="#6366F1"
              onPress={() => handleQuickAction("Get Help")}
            />
          </View>

          {/* ICT Categories */}
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: "#1F2937" }}
              >
                ICT Categories
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#30C4B5" }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {[
                { name: "Computer Basics", color: "#30C4B5" },
                { name: "Office Suite", color: "#FF8C42" },
                { name: "Security", color: "#6366F1" },
                { name: "Government Tools", color: "#10B981" },
              ].map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: category.color + "40",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: category.color,
                      borderRadius: 4,
                      marginRight: 8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}
