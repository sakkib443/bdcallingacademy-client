"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuPlay, LuUsers, LuTrophy, LuStar, LuArrowRight } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import VideoModal from "@/components/sheard/VideoModal";

const SuccessHistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("journey");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // Body scroll is now handled by VideoModal component

  const videoData = {
    journey: [
      { id: "iqiNOsO7Yp8", title: language === "bn" ? "ছাত্র থেকে পেশাদার - সারার জার্নি" : "From Student to Professional - Sarah's Journey", name: language === "bn" ? "সারা খান" : "Sarah Khan" },
      { id: "_6cBwuHNKgI", title: language === "bn" ? "ক্যারিয়ার ট্রান্সফর্মেশন - জনের সাফল্যের গল্প" : "Career Transformation - John's Success Story", name: language === "bn" ? "জন ডো" : "John Doe" },
      { id: "2GqZBsRqaf0", title: language === "bn" ? "ওয়েব ডেভেলপমেন্ট জার্নি" : "Web Development Journey", name: language === "bn" ? "রিফাত হাসান" : "Rifat Hassan" },
      { id: "5RrnH4paPSg", title: language === "bn" ? "শেখা থেকে আয় - মারিয়ার অভিজ্ঞতা" : "Learning to Earning - Maria's Experience", name: language === "bn" ? "মারিয়া আক্তার" : "Maria Akter" },
      { id: "0_FsHO7u5Pc", title: language === "bn" ? "ইন্টার্নশিপ থেকে ফুল-টাইম - ডেভিডের অগ্রগতি" : "Internship to Full-time - David's Progress", name: language === "bn" ? "ডেভিড হোসেন" : "David Hossain" },
      { id: "MAesoykAUhc", title: language === "bn" ? "ফ্রিল্যান্সিং সাফল্য" : "Freelancing Success", name: language === "bn" ? "করিম উদ্দিন" : "Karim Uddin" },
    ],
    feedback: [
      { id: "ymFUAUDfHIo", title: language === "bn" ? "ছাত্র ফিডব্যাক - কোর্স অভিজ্ঞতা" : "Student Feedback - Course Experience", name: language === "bn" ? "নাদিয়া ইসলাম" : "Nadia Islam" },
      { id: "2GqZBsRqaf0", title: language === "bn" ? "কোর্স রিভিউ - পজিটিভ অভিজ্ঞতা" : "Course Review - Positive Experience", name: language === "bn" ? "সাকিব আহমেদ" : "Sakib Ahmed" },
      { id: "5HQLWiQP5-E", title: language === "bn" ? "মেন্টরশিপ অভিজ্ঞতা" : "Mentorship Experience", name: language === "bn" ? "তানভীর রহমান" : "Tanvir Rahman" },
    ],
  };

  const stats = [
    { icon: LuUsers, value: "4,200+", label: language === "bn" ? "সফল শিক্ষার্থী" : "Successful Students" },
    { icon: LuTrophy, value: "92%", label: language === "bn" ? "প্লেসমেন্ট রেট" : "Placement Rate" },
    { icon: LuStar, value: "4.9/5", label: language === "bn" ? "ছাত্র রেটিং" : "Student Rating" },
  ];

  const filters = [
    { key: "journey", label: language === "bn" ? "ছাত্রদের গল্প" : "Student Stories" },
    { key: "feedback", label: language === "bn" ? "ছাত্র ফিডব্যাক" : "Student Feedback" },
  ];

  const activeVideos = videoData[activeFilter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ecfcfb] via-white to-[#ecfcfb]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f9f9] via-white to-[#fff8f0]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#41bfb8]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#F79952]/10 to-transparent rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="container mx-auto px-4 lg:px-16 py-12 lg:py-16 relative z-10">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <HiOutlineSparkles className="text-[#F79952] text-lg" />
              <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>
                {language === "bn" ? "আমাদের সাফল্যের গল্প" : "Our Success Stories"}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold outfit text-gray-800 mb-4 ${bengaliClass}`}>
              {language === "bn" ? "শিক্ষার্থীদের " : "Student "}
              <span className="bg-gradient-to-r from-[#41bfb8] to-[#38a89d] bg-clip-text text-transparent">
                {language === "bn" ? "সাফল্যের গল্প" : "Success Stories"}
              </span>
            </h1>

            {/* Description */}
            <p className={`text-gray-600 work text-sm sm:text-base leading-relaxed mb-8 ${bengaliClass}`}>
              {language === "bn"
                ? "বিডি কলিং একাডেমিতে আমাদের শিক্ষার্থীরা শুধু দক্ষতা অর্জন করে না — তারা সুযোগ অর্জন করে। রিয়েল ক্লায়েন্ট প্রজেক্ট-ভিত্তিক প্রশিক্ষণের মাধ্যমে তারা বাস্তব চ্যালেঞ্জের জন্য সম্পূর্ণ প্রস্তুত হয়ে স্নাতক হয়।"
                : "At Bdcalling Academy, our students gain more than just skills — they gain opportunities. Through real client project-based training, they graduate fully prepared for real-world challenges."}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#41bfb8]/10 to-[#41bfb8]/5 rounded-lg flex items-center justify-center">
                      <Icon className="text-[#41bfb8] text-lg" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-gray-800 outfit">{stat.value}</p>
                      <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <FaStar key={i} className="text-[#F79952] text-sm" />
                ))}
              </div>
              <span className={`text-sm text-gray-600 work ${bengaliClass}`}>
                {language === "bn" ? "৫০০+ সাফল্যের গল্প" : "500+ Success Stories"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-16 py-12">
        {/* Filter Buttons */}
        <div className={`flex justify-center gap-4 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative px-6 py-3 rounded-xl font-medium work transition-all duration-300 ${bengaliClass} ${activeFilter === filter.key
                ? "bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white shadow-lg shadow-[#41bfb8]/30"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#41bfb8]/50 hover:text-[#41bfb8]"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeVideos.map((video, index) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`group cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                {/* Video Thumbnail */}
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 group-hover:bg-[#41bfb8]">
                      <LuPlay className="w-6 h-6 text-[#41bfb8] group-hover:text-white ml-1" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 bg-[#F79952] text-white text-xs font-medium rounded-lg ${bengaliClass}`}>
                    {activeFilter === "journey"
                      ? (language === "bn" ? "সাফল্যের গল্প" : "Success Story")
                      : (language === "bn" ? "ফিডব্যাক" : "Feedback")}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-white font-semibold outfit text-base mb-1 line-clamp-2 ${bengaliClass}`}>{video.title}</p>
                    <p className="text-white/80 text-sm work">{video.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-gradient-to-r from-[#41bfb8]/10 via-white to-[#F79952]/10 rounded-2xl p-8 border border-gray-100">
            <h3 className={`text-2xl font-bold text-gray-800 outfit mb-3 ${bengaliClass}`}>
              {language === "bn" ? "পরবর্তী সাফল্যের গল্প আপনার হতে পারে!" : "Your Success Story Could Be Next!"}
            </h3>
            <p className={`text-gray-600 work mb-6 max-w-xl mx-auto ${bengaliClass}`}>
              {language === "bn"
                ? "আজই আমাদের সাথে যোগ দিন এবং আপনার ক্যারিয়ার ট্রান্সফর্মেশন শুরু করুন।"
                : "Join us today and start your career transformation journey with our expert-led courses."}
            </p>
            <Link
              href="/courses"
              className={`inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white rounded-xl font-semibold work hover:shadow-xl hover:shadow-[#41bfb8]/30 transition-all duration-300 group ${bengaliClass}`}
            >
              <span>{language === "bn" ? "কোর্স দেখুন" : "Explore Courses"}</span>
              <LuArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal - Using Portal to render outside IntroWrapper transform */}
      <VideoModal
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        bengaliClass={bengaliClass}
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessHistoryPage;
