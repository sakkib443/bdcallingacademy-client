"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import CourseCard from "../sheard/CourseCard";

// Loading Skeleton Component
const CourseCardSkeleton = () => (
  <div className="w-full md:w-[360px] animate-pulse">
    <div className="bg-white rounded-md border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-px bg-gray-100"></div>
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>)}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
          <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
);

const PopularCourseCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const { items: courseCategories = [] } = useSelector((state) => state.categories);
  const { courses = [], loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) setVisibleItems(1);
      else if (window.innerWidth <= 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prioritize "AI and Automation" courses
  const sortedAllCourses = [...courses].sort((a, b) => {
    const getCatName = (course) => {
      if (course.category?.name) return course.category.name;
      const catId = course.category?._id || course.category;
      const category = courseCategories.find(c => c._id === catId || c.id === catId);
      return category?.name || "";
    };

    const isAICategory = (course) => {
      const catName = getCatName(course).toLowerCase();
      // Match "ai" and "automation" anywhere in the name
      return catName.includes("ai") && catName.includes("automation");
    };

    const aIsAI = isAICategory(a);
    const bIsAI = isAICategory(b);

    if (aIsAI && !bIsAI) return -1;
    if (!aIsAI && bIsAI) return 1;
    return 0;
  });

  // Filter courses by category _id (course.category is ObjectId string or populated)
  const filteredCourses =
    selectedCategory === "All"
      ? sortedAllCourses
      : sortedAllCourses.filter((course) => {
        const courseCategoryId = course.category?._id || course.category;
        return courseCategoryId === selectedCategory;
      });

  const visibleCourses = filteredCourses.slice(startIndex, startIndex + visibleItems);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Math.max(filteredCourses.length - visibleItems, 0) : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStartIndex((prevIndex) =>
      prevIndex + visibleItems >= filteredCourses.length ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setStartIndex(0);
  };

  return (
    <div className="relative mt-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        {courseCategories.map((cat, index) => (
          <button
            key={cat._id || cat.id}
            onClick={() => handleCategoryChange(cat._id || cat.id)}
            className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-medium text-sm work transition-all duration-300 overflow-hidden ${selectedCategory === (cat._id || cat.id)
              ? "text-white shadow-lg shadow-[#41bfb8]/30"
              : "bg-white text-gray-600 border border-gray-200 hover:border-[#41bfb8]/50 hover:text-[#41bfb8]"
              }`}
          >
            {/* Active Background */}
            {selectedCategory === (cat._id || cat.id) && (
              <span className="absolute inset-0 bg-gradient-to-r from-[#41bfb8] to-[#38a89d]"></span>
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {selectedCategory === (cat._id || cat.id) && <HiOutlineSparkles className="text-sm" />}
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Courses Display with Navigation */}
      <div className="relative px-4 sm:px-8 lg:px-16">
        {/* Navigation Buttons */}
        {!loading && filteredCourses.length > visibleItems && (
          <>
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#41bfb8] hover:text-white hover:border-[#41bfb8] hover:shadow-xl hover:shadow-[#41bfb8]/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#41bfb8] hover:text-white hover:border-[#41bfb8] hover:shadow-xl hover:shadow-[#41bfb8]/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center gap-6 lg:gap-8 overflow-hidden px-6 sm:px-10">
            {[1, 2, 3].slice(0, visibleItems).map((i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 work text-lg font-medium">Failed to load courses</p>
            <p className="text-gray-400 work text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Course Cards Grid */}
        {!loading && !error && (
          <div className="flex justify-center gap-6 lg:gap-8 overflow-hidden px-6 sm:px-10">
            {visibleCourses.length > 0 ? (
              visibleCourses.map((course, index) => (
                <div
                  key={course.id || course._id}
                  className={`transition-all duration-500 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineSparkles className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 work text-lg">No courses found in this category</p>
                <p className="text-gray-400 work text-sm mt-1">Try selecting a different category</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination Dots */}
        {!loading && filteredCourses.length > visibleItems && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(filteredCourses.length / visibleItems) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setStartIndex(index * visibleItems);
                }}
                className={`transition-all duration-300 rounded-full ${Math.floor(startIndex / visibleItems) === index
                  ? "w-8 h-2 bg-[#41bfb8]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shimmer Animation Style */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default PopularCourseCard;
