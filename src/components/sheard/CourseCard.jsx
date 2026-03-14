"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import { LuBookOpenCheck, LuClock, LuUsers, LuEye } from "react-icons/lu";
import { HiOutlinePlayCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import { useSettings } from "@/context/SettingsContext";

const CourseCard = ({ course, isGridView = true }) => {
  const courseId = course.id || course._id;
  const { items: categories = [] } = useSelector((state) => state.categories);
  const { settings } = useSettings();
  const rawWhatsappNumber = '8801335202802';
  const whatsappNumber = rawWhatsappNumber.replace(/[^0-9]/g, '');

  // Get category name from ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "General";
    if (typeof categoryId === "string" && categoryId.length < 20) return categoryId;
    const category = categories.find(cat => cat._id === categoryId || cat.id === categoryId);
    return category?.name || "General";
  };

  // List View Layout
  if (!isGridView) {
    return (
      <div className="group relative w-full">
        <div className="relative bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:border-[#41bfb8]/20">
          <div className="flex flex-col md:flex-row">

            {/* Left - Image Section */}
            <div className="relative w-full md:w-[320px] h-[200px] md:h-auto md:min-h-[220px] flex-shrink-0 overflow-hidden">
              <Link href={`/courses/${courseId}`}>
                <Image
                  width={320}
                  height={220}
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F79952] text-white text-xs font-semibold rounded-md shadow-lg">
                  {course.type}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-md shadow-lg">
                <FaStar className="text-[#F79952] text-sm" />
                <span className="text-sm font-bold text-gray-800">{course.rating || 5}</span>
                <span className="text-xs text-gray-500">({Math.floor(Math.random() * 50) + 10})</span>
              </div>

              {/* Student Count Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white rounded-md text-xs">
                <LuUsers className="text-sm" />
                <span>{course.totalStudentsEnroll || 50}+ Enrolled</span>
              </div>
            </div>

            {/* Middle - Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              {/* Top Content */}
              <div>
                {/* Category & Meta */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <BiCategory className="text-[#41bfb8]" />
                    <span className="text-xs work">{getCategoryName(course.category)}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <LuClock className="text-[#41bfb8] text-sm" />
                    <span className="text-xs work">3 Months</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/courses/${courseId}`}>
                  <h3 className="text-xl font-bold text-gray-800 outfit-semibold line-clamp-2 group-hover:text-[#41bfb8] transition-colors duration-300 leading-snug mb-3">
                    {course.title}
                  </h3>
                </Link>

                {/* Features List - Core Value Proposition */}
                <ul className="space-y-2 mb-4">
                  {course.courseIncludes?.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 work">
                      <HiOutlineCheckCircle className="text-[#41bfb8] text-lg flex-shrink-0" />
                      <span className="line-clamp-1">{item.text || item}</span>
                    </li>
                  )) || (
                      <>
                        <li className="flex items-center gap-2 text-sm text-gray-600 work">
                          <HiOutlineCheckCircle className="text-[#41bfb8] text-lg flex-shrink-0" />
                          <span>Industry-standard curriculum</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600 work">
                          <HiOutlineCheckCircle className="text-[#41bfb8] text-lg flex-shrink-0" />
                          <span>Expert mentors & career support</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600 work">
                          <HiOutlineCheckCircle className="text-[#41bfb8] text-lg flex-shrink-0" />
                          <span>Certificate upon completion</span>
                        </li>
                      </>
                    )}
                </ul>
              </div>
            </div>

            {/* Right - Price & Actions Section */}
            <div className="w-full md:w-[200px] p-5 bg-gray-50/50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between">
              {/* Price Section */}
              <div className="text-center md:text-right mb-4">
                <p className="text-2xl font-bold text-[#41bfb8] outfit">{course.fee}</p>
                <div className="flex items-center justify-center md:justify-end gap-1 mt-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xs ${i < (course.rating || 5) ? "text-[#F79952]" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 work">({course.totalStudentsEnroll || 50}+ students)</span>
                </div>
                <p className="text-xs text-gray-400 work mt-1">Last updated: Dec 2024</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href={`/courses/${courseId}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#41bfb8] hover:bg-[#38a89d] text-white px-4 py-2.5 rounded-md font-medium text-sm work transition-all duration-300"
                >
                  <LuEye className="text-lg" />
                  <span>View Details</span>
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `আমি "${course.title}" কোর্সটি করতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] px-4 py-2.5 rounded-md font-medium text-sm work transition-all duration-300"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Enroll Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Original)
  return (
    <div className="group relative w-full">
      {/* Card Container */}
      <div className="relative bg-white rounded-md border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 hover:border-transparent">

        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <Link href={`/courses/${courseId}`}>
            <Image
              width={400}
              height={250}
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F79952] text-white text-xs font-medium rounded-md shadow-lg">
              {course.type}
            </span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <HiOutlinePlayCircle className="w-8 h-8 text-[#41bfb8]" />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-md shadow-lg">
            <FaStar className="text-[#F79952] text-sm" />
            <span className="text-sm font-semibold text-gray-800">{course.rating || 5}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="flex items-center gap-1.5 text-gray-500">
            <BiCategory className="text-[#41bfb8]" />
            <span className="text-xs work">{getCategoryName(course.category)}</span>
          </div>

          {/* Title */}
          <Link href={`/courses/${courseId}`}>
            <h3 className="text-lg font-bold text-gray-800 outfit-semibold line-clamp-2 group-hover:text-[#41bfb8] transition-colors duration-300 leading-tight min-h-[48px]">
              {course.title}
            </h3>
          </Link>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 work">
            <div className="flex items-center gap-1">
              <LuClock className="text-[#41bfb8]" />
              <span>3 Months</span>
            </div>
            <div className="flex items-center gap-1">
              <LuUsers className="text-[#41bfb8]" />
              <span>50+ Enrolled</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Price & Rating Row */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 work">Course Fee</span>
              <p className="text-xl font-bold text-[#41bfb8] outfit">{course.fee}</p>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${i < (course.rating || 5) ? "text-[#F79952]" : "text-gray-200"}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 pt-2">
            <Link
              href={`/courses/${courseId}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#41bfb8] hover:bg-[#38a89d] text-white px-4 py-2.5 rounded-md font-medium text-sm work transition-all duration-300"
            >
              <LuBookOpenCheck className="text-lg" />
              <span>Details</span>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `আমি "${course.title}" কোর্সটি করতে চাই।`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-200 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] px-4 py-2.5 rounded-md font-medium text-sm work transition-all duration-300"
            >
              <FaWhatsapp className="text-lg" />
              <span>Enroll</span>
            </a>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#41bfb8] to-[#F79952] transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default CourseCard;
