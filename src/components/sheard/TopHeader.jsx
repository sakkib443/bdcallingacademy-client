"use client";

import React, { useEffect, useState } from "react";
import { IoMdCall } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { SlSocialLinkedin } from "react-icons/sl";
import Link from "next/link";
import { FiYoutube } from "react-icons/fi";
import { LuFacebook, LuChevronDown } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/context/SettingsContext";

const TopHeader = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t, language } = useLanguage();
  const { settings } = useSettings();

  // Dynamic values from settings with fallbacks
  const phoneNumber = "+880 1335-202802";
  const email = settings?.email || "info@bdcallingacademy.com";
  const facebookUrl = settings?.facebookUrl || "https://www.facebook.com/bdcallingacademy.bd";
  const youtubeUrl = settings?.youtubeUrl || "https://www.youtube.com/@bdcallingacademy";
  const linkedinUrl = settings?.linkedinUrl || "https://www.linkedin.com/company/bdcalling-academy/";

  // Apply Bengali font class when language is Bengali
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setTimeout(() => setUser(JSON.parse(storedUser)), 0);
    }

    // Close dropdown on click away
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="work relative hidden lg:block">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#0f172a]"></div>

      {/* Animated Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#41bfb8] to-transparent opacity-60"></div>

      <div className="relative w-full container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between py-1.5">
          {/* Contact Info - Left Side */}
          <div className="flex items-center gap-6">
            {/* Phone with Premium Styling */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="group flex gap-2 items-center px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#41bfb8]/50 hover:bg-[#41bfb8]/10 transition-all duration-300"
            >
              <span className="relative">
                <IoMdCall className="text-[18px] text-[#41bfb8] group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </span>
              <span className="text-[13px] font-medium text-white/90 group-hover:text-white tracking-wide">
                {phoneNumber}
              </span>
            </a>

            {/* Email with Premium Styling */}
            <a
              href={`mailto:${email}`}
              className="group flex gap-2 items-center px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F79952]/50 hover:bg-[#F79952]/10 transition-all duration-300"
            >
              <IoMailOutline className="text-[18px] text-[#F79952] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[13px] font-medium text-white/90 group-hover:text-white tracking-wide">
                {email}
              </span>
            </a>
          </div>

          <div className="flex gap-8 items-center">
            {/* Social Media Icons with Premium Effects */}
            <div className="flex gap-2 items-center">
              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/20 transition-all duration-300 overflow-hidden"
              >
                <LuFacebook className="text-[16px] text-white/80 group-hover:text-[#1877F2] group-hover:scale-110 transition-all duration-300 z-10" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#1877F2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              {/* YouTube */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#FF0000]/50 hover:bg-[#FF0000]/20 transition-all duration-300 overflow-hidden"
              >
                <FiYoutube className="text-[16px] text-white/80 group-hover:text-[#FF0000] group-hover:scale-110 transition-all duration-300 z-10" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#FF0000]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/20 transition-all duration-300 overflow-hidden"
              >
                <SlSocialLinkedin className="text-[14px] text-white/80 group-hover:text-[#0A66C2] group-hover:scale-110 transition-all duration-300 z-10" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0A66C2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/bdcallingacademy/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/20 transition-all duration-300 overflow-hidden"
              >
                <FaInstagram className="text-[16px] text-white/80 group-hover:text-[#E4405F] group-hover:scale-110 transition-all duration-300 z-10" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#E4405F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

            {/* Auth Section with Premium Buttons */}
            <div className="flex gap-3 items-center text-[13px] font-medium">
              {user ? (
                <div className="relative profile-dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    type="button"
                    className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#41bfb8]/50 group-hover:border-[#41bfb8] transition-colors">
                      {user.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white text-xs font-bold">
                          {(user.name || user.gmail || "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-white text-[12px] font-semibold leading-tight max-w-[100px] truncate">
                        {user.firstName || user.name || user.email?.split('@')[0] || "User"}
                      </p>
                      <p className={`text-white/60 text-[10px] uppercase tracking-tighter ${bengaliClass}`}>
                        {user.role === 'admin' ? t("topHeader.adminPanel") : user.role === 'mentor' ? 'Mentor' : 'Student'}
                      </p>
                    </div>
                    <LuChevronDown className={`text-white/60 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <p className={`text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 ${bengaliClass}`}>{t("topHeader.signedInAs")}</p>
                        <p className="text-[13px] font-bold text-gray-800 truncate">{user.gmail}</p>
                      </div>

                      <div className="p-2">
                        <Link
                          href={user.role === 'admin' ? "/dashboard/admin" : user.role === 'mentor' ? "/dashboard/mentor" : "/dashboard/user"}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#41bfb8]/10 hover:text-[#41bfb8] transition-all group/item"
                        >
                          <div className="p-2 rounded-lg bg-gray-100 group-hover/item:bg-[#41bfb8]/20 group-hover/item:text-[#41bfb8] transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                          </div>
                          <span className={`text-[14px] font-semibold ${bengaliClass}`}>{t("navbar.dashboard")}</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group/logout"
                        >
                          <div className="p-2 rounded-lg bg-red-50 group-hover/logout:bg-red-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          </div>
                          <span className={`text-[14px] font-semibold ${bengaliClass}`}>{t("navbar.logout")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="relative px-5 py-1.5 rounded-full bg-white/5 border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 overflow-hidden group"
                  >
                    <span className={`relative z-10 flex items-center gap-1.5 ${bengaliClass}`}>
                      <HiOutlineUserCircle className="text-[16px]" />
                      {t("topHeader.login")}
                    </span>
                  </Link>

                  <Link
                    href="/register"
                    className="relative px-5 py-1.5 rounded-full overflow-hidden group"
                  >
                    {/* Gradient Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#41bfb8] to-[#2dd4bf] group-hover:from-[#2dd4bf] group-hover:to-[#41bfb8] transition-all duration-500"></span>
                    {/* Shine Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                    <span className={`relative z-10 text-white font-semibold ${bengaliClass}`}>
                      {t("topHeader.register")}
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
