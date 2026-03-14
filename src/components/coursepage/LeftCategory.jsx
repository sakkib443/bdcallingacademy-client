"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setSelectedCategories } from "@/redux/categorySlice";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { LuFilter, LuX } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";

const LeftCategory = ({ searchQuery, setSearchQuery, selectedType, setSelectedType }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { items: courseCategories, status, selectedCategories } = useSelector(
    (state) => state.categories
  );
  const initialUrlCategorySet = useRef(false);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  // Handle URL category parameter - only once on initial load
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && !initialUrlCategorySet.current) {
      initialUrlCategorySet.current = true;
      dispatch(setSelectedCategories([urlCategory]));
    }
  }, [searchParams, dispatch]);

  const handleCategoryChange = (categoryName) => {
    // Single-select behavior: clicking a new category replaces the old one
    // Clicking the same category unselects it
    const newSelection = selectedCategories.includes(categoryName)
      ? []  // Unselect if already selected
      : [categoryName];  // Only select this one category
    dispatch(setSelectedCategories(newSelection));
  };

  const clearAllFilters = () => {
    dispatch(setSelectedCategories([]));
    if (setSearchQuery) setSearchQuery("");
    if (setSelectedType) setSelectedType("All");
  };

  // Filter out "All" and sort to put "AI and Automation" first
  const filteredCategories = courseCategories
    .filter((category) => category.name !== "All")
    .sort((a, b) => {
      // "AI and Automation" always comes first
      if (a.name === "AI and Automation") return -1;
      if (b.name === "AI and Automation") return 1;
      return 0; // Keep original order for other categories
    });

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery || (selectedType && selectedType !== "All");

  const typeOptions = ["All", "Online", "Offline"];

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#41bfb8] focus:bg-white transition-colors work"
          />
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IoClose />
            </button>
          )}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-medium work hover:bg-red-100 transition-colors"
        >
          <LuX className="text-base" />
          Clear All Filters
        </button>
      )}

      {/* Categories Filter */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
          <LuFilter className="text-[#41bfb8]" />
          <h3 className="font-semibold text-gray-800 outfit text-sm">Categories</h3>
          {selectedCategories.length > 0 && (
            <span className="ml-auto text-xs bg-[#41bfb8] text-white px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>

        <div className="p-3 space-y-1  overflow-y-auto">
          {/* All Option */}
          <label
            className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${selectedCategories.length === 0
              ? "bg-[#41bfb8]/10 text-[#41bfb8]"
              : "hover:bg-gray-50 text-gray-700"
              }`}
            onClick={() => dispatch(setSelectedCategories([]))}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedCategories.length === 0 ? "border-[#41bfb8] bg-[#41bfb8]" : "border-gray-300"
              }`}>
              {selectedCategories.length === 0 && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium work">All Categories</span>
          </label>

          {status === "loading" && (
            <div className="text-center py-4">
              <div className="w-5 h-5 border-2 border-[#41bfb8] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {status === "succeeded" &&
            filteredCategories.map((category) => (
              <label
                key={category._id || category.id}
                className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${selectedCategories.includes(category.name)
                  ? "bg-[#41bfb8]/10 text-[#41bfb8]"
                  : "hover:bg-gray-50 text-gray-700"
                  }`}
                onClick={() => handleCategoryChange(category.name)}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedCategories.includes(category.name)
                  ? "border-[#41bfb8] bg-[#41bfb8]"
                  : "border-gray-300"
                  }`}>
                  {selectedCategories.includes(category.name) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm work">{category.name}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftCategory;
