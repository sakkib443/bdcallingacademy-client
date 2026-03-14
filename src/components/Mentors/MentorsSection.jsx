"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Shimmer Loading Skeleton
const MentorSkeleton = () => (
  <div className="max-w-3xl mx-auto 2xl:w-[740px]">
    <div className="bg-[#E1FCF9] border border-gray-200 rounded-md overflow-hidden p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Image Skeleton with Shimmer */}
        <div className="relative w-full lg:w-5/12 h-72 bg-gray-200 rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Name */}
          <div className="relative h-8 bg-gray-200 rounded w-3/4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>

          {/* Designation */}
          <div className="relative h-4 bg-gray-200 rounded w-1/2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>

          {/* Experience */}
          <div className="relative h-4 bg-gray-200 rounded w-2/3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-2 mt-6">
            <div className="relative h-6 bg-gray-200 rounded w-1/3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
            <div className="relative h-4 bg-gray-200 rounded w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
            <div className="relative h-4 bg-gray-200 rounded w-5/6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
            <div className="relative h-4 bg-gray-200 rounded w-4/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
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

const MentorsSection = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    fetch("http://localhost:5000/api/mentors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch mentors");
        return res.json();
      })
      .then((result) => {
        // API returns {success: true, data: [...]}
        setMentors(result.data || result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentors:", err);
        setError("Failed to load mentors");
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full mt-10 pb-10">
        <div className="mx-auto flex flex-wrap container justify-between gap-y-4 px-4">
          {loading ? (
            // Loading Skeletons
            <>
              <MentorSkeleton />
              <MentorSkeleton />
              <MentorSkeleton />
              <MentorSkeleton />
            </>
          ) : (
            mentors.map((mentor, index) => (
              <div key={mentor._id || mentor.id || index}>
                <div className="max-w-3xl mx-auto lg:h-84">
                  <div className="group bg-[#E1FCF9] cursor-pointer hover:shadow-2xl 2xl:w-[740px] container transition-all duration-300 border border-gray-200 rounded-md overflow-hidden p-6 hover:border-[#41bfb8]/30">
                    <Link href={`/mentors/${mentor._id || mentor.id}`}>
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="relative w-full h-full lg:w-5/12 lg:h-72 rounded-md shadow-md overflow-hidden">
                          <Image
                            src={mentor?.image}
                            alt={mentor?.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Hover Overlay with View Details */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                            <span className={`px-5 py-2.5 bg-white text-[#41bfb8] font-semibold rounded-md shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 ${bengaliClass}`}>
                              {t("mentorsPage.viewDetails")}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <h2 className="text-3xl font-bold text-gray-800 outfit">
                            {mentor.name}
                          </h2>
                          <p className="csd work">
                            {mentor?.designation}{" "}
                            {mentor?.subject && `• ${mentor.subject}`}
                          </p>
                          <p className={`text-sm text-gray-500 mt-2 work ${bengaliClass}`}>
                            ✅ {mentor?.training_experience?.years} {t("mentorsPage.yearsOfExperience")}
                          </p>

                          <div>
                            <h3 className={`text-xl outfit mt-5 font-bold text-gray-800 mb-3 flex items-center ${bengaliClass}`}>
                              <span className="w-3 h-3 bg-[#F79952] rounded-full mr-2"></span>
                              {t("mentorsPage.workExperience")}
                            </h3>
                            <ul className="space-y-1 work">
                              {mentor.work_experience
                                ?.slice(0, 3)
                                .map((work, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-[15px]"
                                  >
                                    <svg
                                      className="h-5 w-5 cpr mr-2 mt-0.5 flex-shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="crd">{work}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsSection;
