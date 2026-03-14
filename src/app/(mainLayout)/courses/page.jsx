"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesData } from "@/redux/CourseSlice";
import { fetchCategories } from "@/redux/categorySlice";
import LeftCategory from "@/components/coursepage/LeftCategory";
import dynamic from "next/dynamic";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";
import { LuBookOpen, LuFilter } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const RightCoursesDetalis = dynamic(
  () => import("@/components/coursepage/RightCoursesDetalis"),
  { ssr: false }
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CourseContent = () => {
  const dispatch = useDispatch();
  const { courses = [], loading } = useSelector((state) => state.courses || {});
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    dispatch(fetchCoursesData());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#e8f9f9] via-white to-[#e8f9f9] overflow-hidden border-b border-gray-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#F79952]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 lg:px-16 py-10 lg:py-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex  items-center gap-2 mb-3 px-3 py-1.5 bg-[#41bfb8]/10 border border-[#41bfb8]/20 rounded-full">
              <HiOutlineAcademicCap className="text-[#41bfb8] text-base" />
              <span className={`text-xs font-medium text-gray-700 work ${bengaliClass}`}>{t("coursesPage.badge")}</span>
            </div>

            {/* Title */}
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 mb-2 ${bengaliClass}`}>
              {t("coursesPage.title1")}<span className="text-[#41bfb8]">{t("coursesPage.title2")}</span>
            </h1>

            {/* Description */}
            <p className={`text-gray-500 work text-sm leading-relaxed mb-6 ${bengaliClass}`}>
              {t("coursesPage.subtitle")}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-[#41bfb8]/10 rounded-md flex items-center justify-center">
                  <LuBookOpen className="text-[#41bfb8] text-base" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-gray-800 outfit">{courses.length || '20'}+</p>
                  <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{t("coursesPage.courses")}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-[#F79952]/10 rounded-md flex items-center justify-center">
                  <HiOutlineSparkles className="text-[#F79952] text-base" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-gray-800 outfit">10+</p>
                  <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{t("coursesPage.categories")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-16 py-8 lg:py-12">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className={`lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm w-full justify-center ${bengaliClass}`}
        >
          <LuFilter className="text-[#41bfb8]" />
          <span className="work text-gray-700">{t("coursesPage.filtersCategories")}</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className={`lg:w-[280px] shrink-0 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-24">
              <Suspense fallback={<LoadingFallback />}>
                <LeftCategory
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </Suspense>
            </div>
          </div>

          {/* Right - Course Grid */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={<LoadingFallback />}>
              <RightCoursesDetalis searchQuery={searchQuery} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

const Course = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CourseContent />
    </Suspense>
  );
};

export default Course;
