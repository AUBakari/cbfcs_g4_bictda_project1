import {
  Home,
  BookOpen,
  Trophy,
  MessageCircle,
  ChevronDown,
  Settings,
  Info,
  Power,
  GraduationCap,
  BarChart3,
  Users,
} from "lucide-react";
import { useState } from "react";
import useUser from "@/utils/useUser";

export default function LeftSidebar() {
  const { data: user } = useUser();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div
      className="w-64 bg-[#001D2E] dark:bg-[#0D1117] text-white flex flex-col fixed left-0 top-0 h-full font-onest md:block hidden transition-colors duration-200"
      style={{
        paddingTop: "32px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "28px",
      }}
    >
      {/* Brand Section */}
      <div className="mb-5">
        <h1
          className="font-montserrat font-bold text-lg text-white"
          style={{ letterSpacing: "-0.25px" }}
        >
          CBFCS
        </h1>
        <p className="font-inter text-xs text-white opacity-60 mt-1">
          ICT Training Platform
        </p>
      </div>

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
            <div
              className="font-onest font-normal text-[11px] text-white"
              style={{ opacity: "0.5" }}
            >
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
        <h2
          className="font-onest font-semibold text-[11px] text-white mb-3"
          style={{ opacity: "0.6" }}
        >
          Main Menu
        </h2>
        <div className="space-y-3">
          {/* Active Menu Item - Dashboard */}
          <div
            className={`flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] ${
              activeMenu === "dashboard"
                ? "bg-[#30C4B5] dark:bg-[#30C4B5] hover:bg-[#29AF9F] dark:hover:bg-[#29AF9F] active:bg-[#239E8F] dark:active:bg-[#239E8F]"
                : "hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20"
            }`}
            tabIndex="0"
            onClick={() => handleMenuClick("dashboard")}
          >
            <Home size={18} className={`mr-4 ${activeMenu === "dashboard" ? "text-white" : "text-white opacity-60 group-hover:opacity-80 transition-opacity"}`} />
            <span className={`font-onest text-[13px] text-white ${activeMenu === "dashboard" ? "font-medium" : "font-normal opacity-60 group-hover:opacity-80 transition-opacity"}`}>
              Dashboard
            </span>
          </div>

          {/* Training Modules */}
          <div
            className={`flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group ${
              activeMenu === "modules"
                ? "bg-[#30C4B5] dark:bg-[#30C4B5]"
                : "hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20"
            }`}
            tabIndex="0"
            onClick={() => handleMenuClick("modules")}
          >
            <BookOpen
              size={18}
              className={`mr-4 ${activeMenu === "modules" ? "text-white" : "text-white opacity-60 group-hover:opacity-80 transition-opacity"}`}
            />
            <span className={`font-onest text-[13px] text-white ${activeMenu === "modules" ? "font-medium" : "font-normal opacity-60 group-hover:opacity-80 transition-opacity"}`}>
              Training Modules
            </span>
          </div>

          {/* My Progress */}
          <div
            className={`flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group ${
              activeMenu === "progress"
                ? "bg-[#30C4B5] dark:bg-[#30C4B5]"
                : "hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20"
            }`}
            tabIndex="0"
            onClick={() => handleMenuClick("progress")}
          >
            <BarChart3
              size={18}
              className={`mr-4 ${activeMenu === "progress" ? "text-white" : "text-white opacity-60 group-hover:opacity-80 transition-opacity"}`}
            />
            <span className={`font-onest text-[13px] text-white ${activeMenu === "progress" ? "font-medium" : "font-normal opacity-60 group-hover:opacity-80 transition-opacity"}`}>
              My Progress
            </span>
          </div>

          {/* Achievements */}
          <div
            className={`flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group ${
              activeMenu === "achievements"
                ? "bg-[#30C4B5] dark:bg-[#30C4B5]"
                : "hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20"
            }`}
            tabIndex="0"
            onClick={() => handleMenuClick("achievements")}
          >
            <Trophy
              size={18}
              className={`mr-4 ${activeMenu === "achievements" ? "text-white" : "text-white opacity-60 group-hover:opacity-80 transition-opacity"}`}
            />
            <span className={`font-onest text-[13px] text-white ${activeMenu === "achievements" ? "font-medium" : "font-normal opacity-60 group-hover:opacity-80 transition-opacity"}`}>
              Achievements
            </span>
          </div>

          {/* Mentorship */}
          <div
            className={`flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#30C4B5] group ${
              activeMenu === "mentorship"
                ? "bg-[#30C4B5] dark:bg-[#30C4B5]"
                : "hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20"
            }`}
            tabIndex="0"
            onClick={() => handleMenuClick("mentorship")}
          >
            <MessageCircle
              size={18}
              className={`mr-4 ${activeMenu === "mentorship" ? "text-white" : "text-white opacity-60 group-hover:opacity-80 transition-opacity"}`}
            />
            <span className={`font-onest text-[13px] text-white ${activeMenu === "mentorship" ? "font-medium" : "font-normal opacity-60 group-hover:opacity-80 transition-opacity"}`}>
              Mentorship
            </span>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-onest font-semibold text-[11px] text-white"
            style={{ opacity: "0.6" }}
          >
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
      <div className="mt-60">
        <hr className="border-[#0B3144] dark:border-[#1F2937] border-t mb-6" />
        <div className="space-y-3">
          <div
            className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] rounded px-2 py-1 group"
            tabIndex="0"
          >
            <Settings
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Settings
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#30C4B5] rounded px-2 py-1 group"
            tabIndex="0"
          >
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
            tabIndex="0"
          >
            <Power size={18} className="text-white mr-4" />
            <span className="font-onest font-medium text-[12px] text-white">
              Logout
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}