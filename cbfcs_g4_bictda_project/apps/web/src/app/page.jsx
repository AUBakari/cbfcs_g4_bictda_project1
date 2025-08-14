import { Suspense } from 'react';
import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import TrainingOverview from "@/components/TrainingOverview";
import RecentTrainingModules from "@/components/RecentTrainingModules";
import UpcomingMentorship from "@/components/UpcomingMentorship";
import useUser from "@/utils/useUser";

function DashboardContent() {
  const { data: user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
        <LeftSidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="p-4 md:p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-300 rounded-xl mb-8"></div>
              <div className="h-64 bg-gray-300 rounded-xl"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC] dark:bg-[#121212]">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-4">
            Welcome to CBFCS
          </h1>
          <p className="font-inter text-[#6B7280] dark:text-[#9CA3AF] mb-6">
            Please sign in to access your ICT training dashboard
          </p>
          <a
            href="/account/signin"
            className="inline-flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] text-white font-medium rounded-lg transition-colors"
          >
            Sign In to Continue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Left Sidebar - Fixed dark sidebar with navigation - hidden on mobile */}
      <LeftSidebar />

      {/* Main Content Area - Responsive with sidebar offset on desktop */}
      <div className="flex-1 md:ml-64">
        {/* Header - Top navigation bar with search and actions */}
        <Header />

        {/* Main Content Container - Scrollable main content with responsive padding */}
        <main className="p-4 md:p-6 space-y-6 md:space-y-8">
          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="font-poppins font-bold text-2xl md:text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2 transition-colors duration-200">
              Welcome back, {user.name}!
            </h1>
            <p className="font-inter text-[#6B7280] dark:text-[#9CA3AF] transition-colors duration-200">
              Continue your ICT training journey and build essential digital skills.
            </p>
          </div>

          {/* Training Overview Section - 4 colored stat cards in responsive grid */}
          <TrainingOverview />

          {/* Recent Training Modules Section - Responsive grid of training module cards */}
          <RecentTrainingModules />

          {/* Upcoming Mentorship Section - Professional mentorship cards */}
          <UpcomingMentorship />
        </main>
      </div>

      {/* Global styles and fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-onest {
          font-family: 'Onest', sans-serif;
        }
        
        .font-jetbrains-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .font-mono {
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .bg-opacity-6 {
          background-color: rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC] dark:bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30C4B5]"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}