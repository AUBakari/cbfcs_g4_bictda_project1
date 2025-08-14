import { BookOpen, Award, Trophy, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data - will be replaced with real API calls
const mockStats = [
  {
    id: "modules",
    title: "Training Modules",
    value: "6",
    subValue: "2 completed",
    icon: BookOpen,
    bgColor: "bg-[#DDF7F5] dark:bg-[#1A2F2B]",
    borderColor: "border-[#30C4B5] dark:border-[#30C4B5]",
    accentColor: "#30C4B5",
    darkAccentColor: "#30C4B5",
    textColor: "text-[#30C4B5] dark:text-[#30C4B5]",
    hoverBorderColor: "hover:border-[#29AF9F] dark:hover:border-[#29AF9F]",
  },
  {
    id: "points",
    title: "Total Points",
    value: "350",
    subValue: "+50 this week",
    icon: Trophy,
    bgColor: "bg-[#FFF1E4] dark:bg-[#3D2B1A]",
    borderColor: "border-[#FF8C42] dark:border-[#FF8C42]",
    accentColor: "#FF8C42",
    darkAccentColor: "#FF8C42",
    textColor: "text-[#FF8C42] dark:text-[#FF8C42]",
    hoverBorderColor: "hover:border-[#E07A38] dark:hover:border-[#E07A38]",
  },
  {
    id: "certificates",
    title: "Certificates",
    value: "2",
    subValue: "Gov verified",
    icon: Award,
    bgColor: "bg-[#EFE9FF] dark:bg-[#2A2440]",
    borderColor: "border-[#6366F1] dark:border-[#6366F1]",
    accentColor: "#6366F1",
    darkAccentColor: "#6366F1",
    textColor: "text-[#6366F1] dark:text-[#6366F1]",
    hoverBorderColor: "hover:border-[#5A5AD8] dark:hover:border-[#5A5AD8]",
  },
  {
    id: "progress",
    title: "Weekly Progress",
    value: "75%",
    subValue: "Target: 80%",
    icon: TrendingUp,
    bgColor: "bg-[#ECFDF5] dark:bg-[#1A2E1A]",
    borderColor: "border-[#10B981] dark:border-[#10B981]",
    accentColor: "#10B981",
    darkAccentColor: "#10B981",
    textColor: "text-[#10B981] dark:text-[#10B981]",
    hoverBorderColor: "hover:border-[#0FA370] dark:hover:border-[#0FA370]",
  },
];

function DecorativeOverlay({ accentColor, darkAccentColor, cardId }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] pointer-events-none">
      {/* Top-left arc */}
      <svg
        className="absolute -top-2 -left-2 w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
      </svg>

      {/* Bottom-right arc */}
      <svg
        className="absolute -bottom-2 -right-2 w-16 h-16 rotate-180"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
      </svg>
    </div>
  );
}

function StatCard({ stat }) {
  // Map icon names to actual components
  const iconComponents = {
    BookOpen,
    Trophy,
    Award,
    TrendingUp,
  };

  // Handle both string icon names from API and direct icon components
  const IconComponent =
    typeof stat.icon === "string"
      ? iconComponents[stat.icon] || BookOpen
      : stat.icon;

  return (
    <div
      className={`
        relative min-h-[124px] p-5 rounded-[14px] border transition-all duration-200 ease-out cursor-pointer
        ${stat.bgColor} ${stat.borderColor} ${stat.hoverBorderColor}
        hover:shadow-sm hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-offset-2
        dark:hover:shadow-lg
      `}
      style={{
        "--focus-ring-color": stat.accentColor,
        boxShadow: "var(--card-shadow, none)",
      }}
      tabIndex={0}
      role="button"
      onMouseEnter={(e) => {
        const isDark = document.documentElement.classList.contains("dark");
        e.currentTarget.style.setProperty(
          "--card-shadow",
          isDark
            ? "rgba(255,255,255,0.05) 0px 2px 8px 0px"
            : "rgba(0,0,0,0.05) 0px 2px 6px 0px",
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--card-shadow", "none");
      }}
      onFocus={(e) => {
        const isDark = document.documentElement.classList.contains("dark");
        const color = isDark ? stat.darkAccentColor : stat.accentColor;
        e.currentTarget.style.outline = `2px solid ${color}`;
        e.currentTarget.style.outlineOffset = "2px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
      }}
    >
      <DecorativeOverlay
        accentColor={stat.accentColor}
        darkAccentColor={stat.darkAccentColor}
        cardId={stat.id}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Upper block */}
        <div className="flex items-start gap-3">
          {/* Icon container */}
          <div className="w-12 h-12 bg-white dark:bg-[#262626] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
            <IconComponent
              size={20}
              strokeWidth={2}
              color={stat.accentColor}
              className="dark:hidden"
            />
            <IconComponent
              size={20}
              strokeWidth={2}
              color={stat.darkAccentColor}
              className="hidden dark:block"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="font-poppins font-medium text-[28px] leading-8 text-[#09121F] dark:text-[#E5E7EB] mb-1 transition-colors duration-200">
              {stat.value}
            </div>
            <div className="font-montserrat font-semibold text-sm leading-5 text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
              {stat.title}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px bg-black bg-opacity-6 dark:bg-white dark:bg-opacity-10 my-4 transition-colors duration-200"
          style={{ marginTop: "auto", marginBottom: "16px" }}
        />

        {/* Lower block */}
        <div className="flex items-center justify-between">
          <span className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
            {stat.subValue}
          </span>
          <div>
            <ArrowRight
              size={18}
              color={stat.accentColor}
              className="dark:hidden"
            />
            <ArrowRight
              size={18}
              color={stat.darkAccentColor}
              className="hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrainingOverview() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real user stats from API
  useEffect(() => {
    const fetchUserStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/user/stats");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success) {
          setStats(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
        setError("Failed to load your training statistics");
        // Fallback to empty stats
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <section className="w-full">
        <h2 className="font-poppins font-bold text-xl md:text-2xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
          Training Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-h-[124px] bg-gray-200 dark:bg-gray-700 rounded-[14px] animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <h2 className="font-poppins font-bold text-xl md:text-2xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
          Training Overview
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Section Title */}
      <h2 className="font-poppins font-bold text-xl md:text-2xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
        Training Overview
      </h2>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
