import {
  Menu,
  Search,
  Mic,
  Bell,
  MonitorPlay,
  Home,
  BookOpen,
  Trophy,
  MessageCircle,
  ChevronDown,
  Settings,
  Info,
  Power,
  X,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import useUser from "@/utils/useUser";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-[#E9EDF3] dark:border-[#2A2A2A] h-14 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Utility Group - Hamburger */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40"
              >
                <Menu
                  size={22}
                  className="text-[#001D2E] dark:text-white hover:text-[#30C4B5] transition-colors"
                />
              </button>

              {/* Brand name on mobile */}
              <div className="ml-3 md:hidden">
                <h1 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white">
                  CBFCS
                </h1>
                <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-tight -mt-1">
                  ICT Training
                </p>
              </div>
            </div>

            {/* Search Module - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-[480px] min-w-[280px] mx-4">
              <div className="flex items-center h-10 border border-[#D7DBE3] dark:border-[#374151] rounded-lg overflow-hidden focus-within:border-[#30C4B5] transition-colors bg-white dark:bg-[#262626] w-full">
                {/* Search Icon Section */}
                <div className="w-12 flex items-center justify-center">
                  <Search
                    size={20}
                    className="text-[#505B6B] dark:text-[#9CA3AF]"
                  />
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search training modules, lessons..."
                  className="flex-1 h-full px-0 py-0 border-0 outline-none font-inter text-sm text-[#505B6B] dark:text-[#E5E7EB] placeholder-[#8B93A3] dark:placeholder-[#6B7280] focus:placeholder-[#707888] dark:focus:placeholder-[#9CA3AF] bg-transparent"
                />

                {/* Divider */}
                <div className="w-px h-6 bg-[#D7DBE3] dark:bg-[#374151]"></div>

                {/* Mic Button */}
                <button className="w-10 h-10 flex items-center justify-center hover:bg-[#30C4B5] hover:bg-opacity-10 dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                  <Mic
                    size={20}
                    className="text-[#505B6B] dark:text-[#9CA3AF]"
                  />
                </button>
              </div>
            </div>

            {/* Action Cluster */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Search icon for mobile */}
              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                <Search
                  size={20}
                  className="text-[#505B6B] dark:text-[#9CA3AF]"
                />
              </button>

              {/* Vertical Divider - hidden on mobile */}
              <div className="w-px h-6 bg-[#E1E4E8] dark:bg-[#374151] hidden md:block"></div>

              {/* Notification Bell */}
              <button className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                <Bell
                  size={20}
                  className="text-[#8B93A3] dark:text-[#9CA3AF]"
                />
                {/* Notification Dot */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF4E5C] rounded-full"></div>
              </button>

              {/* Primary CTA */}
              <button className="flex items-center h-10 px-3 md:px-6 bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white rounded-lg font-jetbrains-mono font-extrabold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                <span className="hidden sm:inline">Start Training</span>
                <MonitorPlay size={18} className="sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobileMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[#001D2E] dark:bg-[#0D1117] text-white flex flex-col transition-colors duration-200 transform">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#0B3144] dark:border-[#1F2937]">
              <div>
                <h1 className="font-montserrat font-bold text-lg text-white">
                  CBFCS
                </h1>
                <p className="font-inter text-xs text-white opacity-60">
                  ICT Training Platform
                </p>
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Profile Section */}
              {user && (
                <div className="flex items-center mb-7 cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#30C4B5] flex items-center justify-center mr-3">
                    <span className="font-montserrat font-bold text-sm text-white">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-onest font-semibold text-[13px] text-white">
                      {user.name || 'User'}
                    </div>
                    <div className="font-onest font-normal text-[11px] text-white opacity-50">
                      {user.email || 'user@example.com'}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className="text-white opacity-60 hover:opacity-80 transition-opacity"
                  />
                </div>
              )}

              {/* Main Menu Section */}
              <div className="mb-9">
                <h2 className="font-onest font-semibold text-[11px] text-white mb-3 opacity-60">
                  Main Menu
                </h2>
                <div className="space-y-3">
                  {/* Dashboard */}
                  <div className="flex items-center bg-[#30C4B5] dark:bg-[#30C4B5] rounded-md px-4 py-3 transition-colors duration-150 ease-out hover:bg-[#29AF9F] dark:hover:bg-[#29AF9F] active:bg-[#239E8F] dark:active:bg-[#239E8F] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5]">
                    <Home size={18} className="text-white mr-4" />
                    <span className="font-onest font-medium text-[13px] text-white">
                      Dashboard
                    </span>
                  </div>

                  {/* Training Modules */}
                  <div className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group">
                    <BookOpen
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Training Modules
                    </span>
                  </div>

                  {/* My Progress */}
                  <div className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group">
                    <BarChart3
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      My Progress
                    </span>
                  </div>

                  {/* Achievements */}
                  <div className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group">
                    <Trophy
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Achievements
                    </span>
                  </div>

                  {/* Mentorship */}
                  <div className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group">
                    <MessageCircle
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Mentorship
                    </span>
                  </div>
                </div>
              </div>

              {/* ICT Categories Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-onest font-semibold text-[11px] text-white opacity-60">
                    ICT Categories
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                    <div className="w-2.5 h-2.5 bg-[#30C4B5] dark:bg-[#30C4B5] rounded-full mr-4"></div>
                    <span className="font-onest font-normal text-[12px] text-white">
                      Computer Basics
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                    <div className="w-2.5 h-2.5 bg-[#FF8C42] dark:bg-[#FF8C42] rounded-full mr-4"></div>
                    <span className="font-onest font-normal text-[12px] text-white">
                      Office Suite
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                    <div className="w-2.5 h-2.5 bg-[#6366F1] dark:bg-[#6366F1] rounded-full mr-4"></div>
                    <span className="font-onest font-normal text-[12px] text-white">
                      Security
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                    <div className="w-2.5 h-2.5 bg-[#10B981] dark:bg-[#10B981] rounded-full mr-4"></div>
                    <span className="font-onest font-normal text-[12px] text-white">
                      Government Tools
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Utility Links */}
              <div className="border-t border-[#0B3144] dark:border-[#1F2937] pt-6">
                <div className="space-y-3">
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] rounded px-2 py-1 group">
                    <Settings
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Settings
                    </span>
                  </div>

                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] rounded px-2 py-1 group">
                    <Info
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Help Center
                    </span>
                  </div>

                  <a
                    href="/account/logout"
                    className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#062236] dark:hover:bg-[#1F2937] active:bg-[#0A1E2D] dark:active:bg-[#111827] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#30C4B5]"
                  >
                    <Power size={18} className="text-white mr-4" />
                    <span className="font-onest font-medium text-[12px] text-white">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}