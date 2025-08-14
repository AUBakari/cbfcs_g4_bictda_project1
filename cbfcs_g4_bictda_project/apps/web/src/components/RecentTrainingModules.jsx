import { useState, useEffect, useRef } from "react";
import { Clock, Users, CheckCircle, PlayCircle, BookOpen } from "lucide-react";

// Mock data - will be replaced with real API calls
const mockModules = [
  {
    id: 1,
    title: "Basic Computer Operations",
    description:
      "Learn fundamental computer skills including mouse, keyboard, and file management",
    difficulty_level: "beginner",
    category: "Computer Fundamentals",
    estimated_duration: 120,
    thumbnail_url:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&h=600&q=80",
    progress: 25,
    lessons_completed: 2,
    total_lessons: 5,
    enrollment_count: 1247,
    is_enrolled: true,
  },
  {
    id: 2,
    title: "Email Essentials",
    description:
      "Master professional email communication, organization, and security best practices",
    difficulty_level: "beginner",
    category: "Communication",
    estimated_duration: 90,
    thumbnail_url:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&h=600&q=80",
    progress: 0,
    lessons_completed: 0,
    total_lessons: 4,
    enrollment_count: 892,
    is_enrolled: false,
  },
  {
    id: 3,
    title: "Microsoft Office Suite",
    description:
      "Comprehensive training on Word, Excel, and PowerPoint for government documentation",
    difficulty_level: "intermediate",
    category: "Office Productivity",
    estimated_duration: 180,
    thumbnail_url:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&h=600&q=80",
    progress: 67,
    lessons_completed: 8,
    total_lessons: 12,
    enrollment_count: 1534,
    is_enrolled: true,
  },
  {
    id: 4,
    title: "Internet Navigation & Safety",
    description:
      "Safe browsing practices, search techniques, and online security for government workers",
    difficulty_level: "beginner",
    category: "Internet & Security",
    estimated_duration: 75,
    thumbnail_url:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&h=600&q=80",
    progress: 0,
    lessons_completed: 0,
    total_lessons: 3,
    enrollment_count: 743,
    is_enrolled: false,
  },
];

function ProgressBar({ percentage, isHovered }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isHovered && !hasAnimated) {
      setAnimatedWidth(0);
      const timer = setTimeout(() => {
        setAnimatedWidth(percentage);
        setHasAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else if (!hasAnimated) {
      setAnimatedWidth(percentage);
      setHasAnimated(true);
    }
  }, [isHovered, percentage, hasAnimated]);

  return (
    <div
      className="w-full h-2 bg-[#E5F5F2] dark:bg-[#374151] rounded-full overflow-hidden transition-colors duration-200"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`Module progress: ${percentage}%`}
    >
      <div
        className="h-full bg-[#30C4B5] dark:bg-[#30C4B5] rounded-full transition-all duration-300 ease-out"
        style={{ width: `${animatedWidth}%` }}
      />
    </div>
  );
}

function getDifficultyColor(level) {
  switch (level) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
}

function TrainingModuleCard({ module, onEnroll, onContinue, isEnrolling }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEnrollment = () => {
    if (onEnroll && !isEnrolling) {
      onEnroll(module.id);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(module.id);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        bg-white dark:bg-[#1E1E1E] rounded-[10px] border border-[#E3E8F4] dark:border-[#2A2A2A] cursor-pointer
        transition-all duration-200 ease-out
        ${isHovered ? "transform -translate-y-0.5 shadow-lg dark:shadow-2xl" : ""}
      `}
      style={{
        boxShadow: isHovered
          ? document.documentElement.classList.contains("dark")
            ? "0 8px 25px rgba(255, 255, 255, 0.05)"
            : "0 6px 20px rgba(32, 50, 89, 0.05)"
          : "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Module Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={module.thumbnail_url}
          alt={`${module.title} training module`}
          className={`
            w-full h-full object-cover rounded-t-[10px]
            transition-transform duration-200 ease-out
            ${isHovered ? "scale-102" : "scale-100"}
          `}
          style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
        />

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(module.difficulty_level)}`}
          >
            {module.difficulty_level.charAt(0).toUpperCase() +
              module.difficulty_level.slice(1)}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1">
            <Clock size={12} />
            <span className="text-xs font-medium">
              {module.estimated_duration}min
            </span>
          </div>
        </div>

        {/* Progress Indicator for Enrolled Modules */}
        {module.is_enrolled && module.progress > 0 && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {module.progress}% complete
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="px-4 pb-5">
        {/* Module Meta - 16px gap from thumbnail */}
        <div className="pt-4 mb-3">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              size={14}
              className="text-[#30C4B5] dark:text-[#30C4B5]"
            />
            <p className="font-inter text-xs text-[#7A8198] dark:text-[#9CA3AF] transition-colors duration-200">
              {module.category}
            </p>
          </div>

          {/* Module Title */}
          <h3
            className="font-montserrat font-semibold text-base text-black dark:text-[#E5E7EB] leading-[125%] line-clamp-2 transition-colors duration-200"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {module.title}
          </h3>

          {/* Description */}
          <p
            className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 line-clamp-2 transition-colors duration-200"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {module.description}
          </p>
        </div>

        {/* Progress Section - Only show if enrolled */}
        {module.is_enrolled && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-montserrat font-semibold text-xs text-black dark:text-[#E5E7EB] transition-colors duration-200">
                {Math.round(module.progress || 0)}% Complete
              </span>
              <span className="font-montserrat text-xs text-[#9BA2B3] dark:text-[#6B7280] text-right transition-colors duration-200">
                {module.lessons_completed || 0}/{module.total_lessons} lessons
              </span>
            </div>
            <ProgressBar
              percentage={module.progress || 0}
              isHovered={isHovered}
            />
          </div>
        )}

        {/* Footer Section */}
        <div className="flex items-center justify-between">
          {/* Enrollment Count */}
          <div className="flex items-center gap-1">
            <Users size={14} className="text-[#6B7280] dark:text-[#9CA3AF]" />
            <span className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] transition-colors duration-200">
              {(module.enrollment_count || 0).toLocaleString()} enrolled
            </span>
          </div>

          {/* Action Button */}
          {module.is_enrolled ? (
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-4 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2"
            >
              {(module.progress || 0) > 0 ? (
                <>
                  <PlayCircle size={16} />
                  Continue
                </>
              ) : (
                <>
                  <PlayCircle size={16} />
                  Start
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleEnrollment}
              disabled={isEnrolling}
              className={`
                flex items-center gap-2 px-4 py-2 border border-[#30C4B5] dark:border-[#30C4B5] rounded-lg font-inter font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2
                ${
                  isEnrolling
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-[#262626] text-[#30C4B5] dark:text-[#30C4B5] hover:bg-[#30C4B5] hover:text-white dark:hover:bg-[#30C4B5] dark:hover:text-white"
                }
              `}
            >
              {isEnrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecentTrainingModules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingModules, setEnrollingModules] = useState(new Set());

  useEffect(() => {
    const fetchTrainingModules = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/training-modules");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success) {
          setModules(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch modules");
        }
      } catch (error) {
        console.error("Error fetching training modules:", error);
        setError("Failed to load training modules");
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingModules();
  }, []);

  const handleEnrollment = async (moduleId) => {
    setEnrollingModules((prev) => new Set(prev).add(moduleId));

    try {
      const response = await fetch(`/api/training-modules/${moduleId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Update the module in state to reflect enrollment
        setModules((prev) =>
          prev.map((module) =>
            module.id === moduleId
              ? {
                  ...module,
                  is_enrolled: true,
                  progress: 0,
                  lessons_completed: 0,
                }
              : module,
          ),
        );

        // Show success message (you could use a toast here)
        console.log(data.message);
      } else {
        throw new Error(data.error || "Failed to enroll");
      }
    } catch (error) {
      console.error("Error enrolling in module:", error);
      alert("Failed to enroll in module. Please try again.");
    } finally {
      setEnrollingModules((prev) => {
        const updated = new Set(prev);
        updated.delete(moduleId);
        return updated;
      });
    }
  };

  const handleContinue = async (moduleId) => {
    // TODO: Navigate to the module/lesson page
    console.log(`Navigating to module ${moduleId}`);
    // You would implement navigation here, e.g.:
    // router.push(`/training-modules/${moduleId}`);
  };

  if (loading) {
    return (
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
          <h2 className="font-inter font-semibold text-lg text-black dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
            ICT Training Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-700 rounded-[10px] aspect-[4/5] animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
          <h2 className="font-inter font-semibold text-lg text-black dark:text-[#E5E7EB] mb-6 transition-colors duration-200">
            ICT Training Modules
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Container with background */}
      <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-inter font-semibold text-lg text-black dark:text-[#E5E7EB] transition-colors duration-200"
            style={{ letterSpacing: "-0.01em" }}
          >
            ICT Training Modules ({modules.length})
          </h2>
          <button
            className="
              px-4 py-2 rounded-full text-sm font-inter font-medium
              bg-[#E4FAF1] bg-opacity-70 text-[#30C4B5]
              dark:bg-[#1A332B] dark:bg-opacity-80 dark:text-[#30C4B5]
              hover:bg-[#D6F5EC] hover:text-[#29AF9F]
              dark:hover:bg-[#1F3D33] dark:hover:text-[#29AF9F]
              transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
            "
            style={{ borderRadius: "4px" }}
          >
            View All Modules
          </button>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {modules.map((module) => (
            <TrainingModuleCard
              key={module.id}
              module={module}
              onEnroll={handleEnrollment}
              onContinue={handleContinue}
              isEnrolling={enrollingModules.has(module.id)}
            />
          ))}
        </div>

        {modules.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen
              size={48}
              className="mx-auto text-[#6B7280] dark:text-[#9CA3AF] mb-4"
            />
            <h3 className="font-montserrat font-semibold text-lg text-[#374151] dark:text-[#E5E7EB] mb-2">
              No training modules available
            </h3>
            <p className="font-inter text-[#6B7280] dark:text-[#9CA3AF]">
              Training modules will appear here when they become available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
