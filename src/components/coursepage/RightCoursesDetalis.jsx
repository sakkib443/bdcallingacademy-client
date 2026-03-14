"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchCoursesData } from "../../redux/CourseSlice";
import CourseCard from "../sheard/CourseCard";
import { LuLayoutGrid, LuList, LuArrowUpDown } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";

// Loading Skeleton
const CourseCardSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="bg-white rounded-md border border-gray-100 overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
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

const RightCoursesDetalis = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { courses = [], loading = false } = useSelector((state) => state.courses || {});
  const { items: categories = [], selectedCategories = [] } = useSelector((state) => state.categories || {});

  const urlType = searchParams.get("type");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    dispatch(fetchCoursesData());
  }, [dispatch]);

  useEffect(() => {
    if (urlType && ["Online", "Offline", "Recorded"].includes(urlType)) {
      setTimeout(() => setSelectedType(urlType), 0);
    } else {
      setTimeout(() => setSelectedType("All"), 0);
    }
  }, [urlType]);

  // Get category name from ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "";
    if (typeof categoryId === "string" && categoryId.length < 20) return categoryId;
    const category = categories.find(cat => cat._id === categoryId || cat.id === categoryId);
    return category?.name || "";
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    if (!course) return false;

    // Type filter
    const typeMatch = selectedType === "All" || course?.type === selectedType;

    // Category filter - check if course category matches any selected category
    let categoryMatch = true;
    if (selectedCategories.length > 0) {
      const courseCategoryName = getCategoryName(course.category);
      categoryMatch = selectedCategories.includes(courseCategoryName);
    }

    // Search filter
    const q = (searchQuery || "").trim().toLowerCase();
    const searchMatch =
      q === "" ||
      (course.title && course.title.toLowerCase().includes(q)) ||
      (course.technology && course.technology.toLowerCase().includes(q)) ||
      getCategoryName(course.category).toLowerCase().includes(q);

    return typeMatch && categoryMatch && searchMatch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    // If default sorting, prioritize "AI and Automation"
    if (sortBy === "default") {
      const isAICategory = (course) => {
        const catName = getCategoryName(course.category);
        return catName.toLowerCase().includes("ai") && catName.toLowerCase().includes("automation");
      };

      const aIsAI = isAICategory(a);
      const bIsAI = isAICategory(b);

      if (aIsAI && !bIsAI) return -1;
      if (!aIsAI && bIsAI) return 1;
      return 0; // Maintain existing order for others
    }

    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "price-low":
        return parseInt(a.fee?.replace(/[^\d]/g, '') || 0) - parseInt(b.fee?.replace(/[^\d]/g, '') || 0);
      case "price-high":
        return parseInt(b.fee?.replace(/[^\d]/g, '') || 0) - parseInt(a.fee?.replace(/[^\d]/g, '') || 0);
      case "students":
        return (b.totalStudentsEnroll || 0) - (a.totalStudentsEnroll || 0);
      default:
        return 0;
    }
  });

  const typeButtons = ["All", "Online", "Offline"];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
        {/* Left - Course Count & Type Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="text-[#41bfb8]" />
            <span className="text-gray-800 font-semibold outfit">
              {sortedCourses.length} <span className="text-gray-500 font-normal">courses found</span>
            </span>
          </div>

          {/* Type Buttons */}
          <div className="flex items-center gap-2">
            {typeButtons.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium work transition-all duration-200 ${selectedType === type
                  ? "bg-[#41bfb8] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Right - Sort & View Toggle */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 work focus:outline-none focus:border-[#41bfb8] cursor-pointer"
            >
              <option value="default">Sort By</option>
              <option value="rating">Top Rated</option>
              <option value="students">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <LuArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 ${isGridView ? 'bg-[#41bfb8] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <LuLayoutGrid className="text-lg" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 ${!isGridView ? 'bg-[#41bfb8] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              <LuList className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : sortedCourses.length > 0 ? (
        <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedCourses.map((course) => (
            <CourseCard key={course?._id || course?.id} course={course} isGridView={isGridView} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineSparkles className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 outfit mb-2">No courses found</h3>
          <p className="text-gray-500 work text-sm">Try adjusting your search or filter criteria</p>
        </div>
      )}

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

export default RightCoursesDetalis;
