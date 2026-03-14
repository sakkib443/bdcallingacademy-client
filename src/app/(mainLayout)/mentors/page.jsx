"use client";

import MentorsSection from "@/components/Mentors/MentorsSection";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";

const MentorsPage = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#e8f9f9] via-white to-[#fff8f0] overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-10 left-10 w-60 h-60 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#F79952]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 lg:px-16 py-10 lg:py-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-[#41bfb8]/10 border border-[#41bfb8]/20 rounded-full">
              <HiOutlineAcademicCap className="text-[#41bfb8] text-base" />
              <span className={`text-xs font-medium text-gray-700 work ${bengaliClass}`}>{t("mentorsPage.badge")}</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 mb-2 ${bengaliClass}`}>
              {t("mentorsPage.title1")}<span className="text-[#41bfb8]">{t("mentorsPage.title2")}</span>
            </h1>
            <p className={`text-gray-500 work text-sm leading-relaxed ${bengaliClass}`}>
              {t("mentorsPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Original Mentors Section */}
      <MentorsSection />
    </div>
  );
};

export default MentorsPage;
