"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuArrowRight, LuPlay } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import VideoModal from "@/components/sheard/VideoModal";

const videoData = [
  { id: "_6cBwuHNKgI", title: "Career Transformation - Success Story", name: "Shakil Ahmed" },
  { id: "iqiNOsO7Yp8", title: "From Student to Professional", name: "Sarah Khan" },
  { id: "2GqZBsRqaf0", title: "Web Development Journey", name: "Rifat Hassan" },
  { id: "zIyMHMoQN0w", title: "Student Feedback - Course Experience", name: "Nadia Islam" },
];

const SuccesHistory = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Body scroll is now handled by VideoModal component

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecfcfb] via-white to-[#fef9f3]"></div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2341bfb8' fill-opacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#41bfb8]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#F79952]/10 via-transparent to-transparent rounded-full blur-3xl"></div>

      {/* Star Decorations */}
      <svg className="absolute top-[10%] right-[15%] w-8 h-8 text-[#F79952]/20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      <svg className="absolute bottom-[20%] left-[10%] w-6 h-6 text-[#41bfb8]/20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      <svg className="absolute top-[40%] left-[5%] w-4 h-4 text-[#F79952]/15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>

      {/* Curved Accent Lines */}
      <svg className="absolute bottom-0 left-0 w-full h-32 opacity-5" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 Q360,120 720,60 T1440,60" fill="none" stroke="#41bfb8" strokeWidth="2" />
        <path d="M0,80 Q360,20 720,80 T1440,80" fill="none" stroke="#F79952" strokeWidth="1.5" />
      </svg>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#41bfb8]/15 rounded-tl-lg"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#F79952]/15 rounded-br-lg"></div>

      <div ref={sectionRef} className="container mx-auto px-4 lg:px-16 relative z-10">
        {/* Section Header with Staggered Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
          className="text-center mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
            }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm"
          >
            <HiOutlineSparkles className="text-[#F79952] text-lg" />
            <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("successHistory.badge")}</span>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            }}
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 ${bengaliClass}`}
          >
            {t("successHistory.title1")}<span className="text-[#41bfb8]">{t("successHistory.title2")}</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={`mt-3 text-gray-500 work text-sm sm:text-base max-w-2xl mx-auto ${bengaliClass}`}
          >
            {t("successHistory.subtitle")}
          </motion.p>

          {/* Stats with Animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
            }}
            className="flex flex-wrap justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <FaStar key={i} className="text-[#F79952] text-sm" />
                ))}
              </div>
              <span className={`text-sm text-gray-600 work ${bengaliClass}`}>4.9/5 {t("successHistory.rating")}</span>
            </div>
            <div className="w-px h-5 bg-gray-300"></div>
            <span className={`text-sm text-gray-600 work ${bengaliClass}`}><strong className="text-[#41bfb8]">500+</strong> {t("successHistory.successStories")}</span>
          </motion.div>
        </motion.div>

        {/* Video Grid with Staggered Animation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {videoData.map((video, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }
              }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Video Thumbnail */}
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 group-hover:bg-[#41bfb8]">
                      <LuPlay className="w-6 h-6 text-[#41bfb8] group-hover:text-white ml-1" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold outfit text-base mb-1 line-clamp-1">{video.title}</p>
                    <p className="text-white/80 text-sm work">{video.name}</p>
                  </div>

                  {/* Top Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 bg-[#F79952] text-white text-xs font-medium rounded-md ${bengaliClass}`}>
                    {t("successHistory.studentStory")}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <Link
            href="/success-story"
            className={`inline-flex items-center gap-2 px-8 py-3.5 bg-[#41bfb8] hover:bg-[#38a89d] text-white rounded-md font-semibold work hover:shadow-xl hover:shadow-[#41bfb8]/30 transition-all duration-300 group ${bengaliClass}`}
          >
            <span>{t("successHistory.viewAllSuccessStories")}</span>
            <LuArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className={`mt-3 text-sm text-gray-400 work ${bengaliClass}`}>
            {t("successHistory.beNextSuccessStory")}
          </p>
        </motion.div>
      </div>

      {/* Video Modal - Using Portal to render outside IntroWrapper transform */}
      <VideoModal
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        bengaliClass={bengaliClass}
      />
    </section>
  );
};

export default SuccesHistory;
