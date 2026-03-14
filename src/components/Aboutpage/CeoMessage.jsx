"use client";

import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuQuote } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const CeoMessage = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const messages = [
    {
      name: "Muhammad Monir Hossain",
      title: "CEO at Betopia Group",
      heading: "Moving forward, limitless – together",
      headingBn: "একসাথে এগিয়ে যাওয়া, সীমাহীন",
      message:
        "As part of Betopia Group, Bdcalling Academy carries forward the belief that true prosperity is built on empowering people. We are committed to expanding learning horizons, supporting youth employment, and bridging the gap between ambition and achievement — so everyone can move forward with shared purpose and limitless potential.",
      messageBn: "বেটোপিয়া গ্রুপের অংশ হিসেবে, বিডিকলিং একাডেমি এই বিশ্বাস এগিয়ে নিয়ে যায় যে প্রকৃত সমৃদ্ধি মানুষকে ক্ষমতায়নের উপর নির্মিত। আমরা শেখার দিগন্ত প্রসারিত করতে, যুব কর্মসংস্থান সমর্থন করতে এবং উচ্চাকাঙ্ক্ষা ও অর্জনের মধ্যে ব্যবধান দূর করতে প্রতিশ্রুতিবদ্ধ — যাতে সবাই ভাগ করা উদ্দেশ্য এবং সীমাহীন সম্ভাবনার সাথে এগিয়ে যেতে পারে।",
      img: "/images/ceo.jpg",
    },
    {
      name: "Sabina Akter",
      title: "Chairman at Betopia Group",
      titleBn: "চেয়ারম্যান, বেটোপিয়া গ্রুপ",
      heading: "True growth starts with knowledge and purpose",
      headingBn: "প্রকৃত উন্নয়ন জ্ঞান এবং উদ্দেশ্য দিয়ে শুরু হয়",
      message:
        "At Bdcalling Academy, we believe education is the foundation for unlocking the limitless potential within every learner. Our vision is to nurture confident, skilled individuals who can transform not only their own futures but also contribute meaningfully to society.",
      messageBn: "বিডিকলিং একাডেমিতে, আমরা বিশ্বাস করি শিক্ষা প্রতিটি শিক্ষার্থীর মধ্যে সীমাহীন সম্ভাবনা আনলক করার ভিত্তি। আমাদের দৃষ্টিভঙ্গি হল আত্মবিশ্বাসী, দক্ষ ব্যক্তি তৈরি করা যারা শুধু তাদের নিজের ভবিষ্যত রূপান্তর করতে পারে না বরং সমাজে অর্থবহভাবে অবদান রাখতে পারে।",
      img: "/images/chirman mam.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, messages.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F79952]/10 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <HiOutlineSparkles className="text-[#F79952] text-lg" />
            <span className={`text-sm font-medium text-white/80 work ${bengaliClass}`}>{t("aboutPage.leadershipBadge")}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-white ${bengaliClass}`}>
            {t("aboutPage.leadershipTitle1")}<span className="text-[#41bfb8]">{t("aboutPage.leadershipTitle2")}</span>
          </h2>
        </div>

        {/* Cards Grid - Same Size */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`group cursor-pointer bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-500 ${activeIndex === idx
                ? "border-[#41bfb8] shadow-xl shadow-[#41bfb8]/20 scale-[1.02]"
                : "border-white/10 hover:border-white/30 hover:shadow-lg"
                }`}
            >
              {/* Image */}
              <div className="relative h-[448px] w-full overflow-hidden">
                <Image
                  src={msg.img}
                  alt={msg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                {/* Quote Icon */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === idx ? "bg-[#41bfb8]" : "bg-white/20 group-hover:bg-[#41bfb8]/50"
                  }`}>
                  <LuQuote className="text-white text-lg" />
                </div>

                {/* Active Indicator */}
                {activeIndex === idx && (
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-[#41bfb8] text-white text-xs font-medium rounded-full animate-pulse ${bengaliClass}`}>
                    {t("aboutPage.active")}
                  </div>
                )}

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white outfit">{msg.name}</h3>
                  <p className={`text-[#F79952] text-sm work ${bengaliClass}`}>{language === "bn" && msg.titleBn ? msg.titleBn : msg.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Heading */}
                <h4 className={`text-lg font-bold outfit mb-2 transition-colors duration-300 ${bengaliClass} ${activeIndex === idx ? "text-[#41bfb8]" : "text-white/80 group-hover:text-[#41bfb8]"
                  }`}>
                  &quot;{language === "bn" ? msg.headingBn : msg.heading}&quot;
                </h4>

                {/* Message */}
                <p className={`text-gray-400 leading-relaxed italic relative z-10 text-sm ${bengaliClass}`}>
                  &quot;{language === "bn" ? msg.messageBn : msg.message}&quot;
                </p>
              </div>

              {/* Bottom Glow Effect */}
              <div className={`h-1 w-full transition-all duration-500 ${activeIndex === idx
                ? "bg-gradient-to-r from-[#41bfb8] via-[#F79952] to-[#41bfb8]"
                : "bg-transparent group-hover:bg-white/20"
                }`}></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {messages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx
                ? "bg-[#41bfb8] w-10"
                : "bg-white/30 w-2 hover:bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
