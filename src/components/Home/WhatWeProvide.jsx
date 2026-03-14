"use client";

import { useEffect, useState, useRef } from "react";
import { LuTarget, LuRocket, LuAward, LuArrowRight } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";

const WhatWeProvide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: LuTarget,
      titleKey: "jobPlacement",
      descKey: "jobPlacementDesc",
      emoji: "🎯",
      color: "#41bfb8",
      bgColor: "#f0fdfc"
    },
    {
      icon: LuRocket,
      titleKey: "lifetimeSupport",
      descKey: "lifetimeSupportDesc",
      emoji: "🚀",
      color: "#F79952",
      bgColor: "#fffbeb"
    },
    {
      icon: LuAward,
      titleKey: "getCertification",
      descKey: "getCertificationDesc",
      emoji: "🏅",
      color: "#8B5CF6",
      bgColor: "#f5f3ff"
    }
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#41bfb8]/10 to-transparent rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#F79952]/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/10 via-transparent to-[#41bfb8]/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 right-[12%] w-16 h-16 border-2 border-[#41bfb8]/15 rounded-xl rotate-12 animate-float"></div>
      <div className="absolute bottom-24 left-[10%] w-12 h-12 border-2 border-[#F79952]/15 rounded-lg -rotate-12 animate-float animation-delay-1000"></div>
      <div className="absolute top-1/3 left-[5%] w-8 h-8 bg-[#41bfb8]/10 rounded-lg rotate-45 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-[8%] w-10 h-10 border border-purple-200/20 rounded-full animate-float animation-delay-3000"></div>

      {/* Sparkle Effects */}
      <svg className="absolute top-[15%] left-[20%] w-5 h-5 text-[#41bfb8]/30 animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      <svg className="absolute bottom-[20%] right-[25%] w-4 h-4 text-[#F79952]/30 animate-sparkle animation-delay-2000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
      <svg className="absolute top-[40%] right-[10%] w-3 h-3 text-[#41bfb8]/25 animate-sparkle animation-delay-4000" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Floating Dots */}
      <div className="absolute top-[25%] right-[30%] w-2 h-2 bg-[#41bfb8] rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 bg-[#F79952] rounded-full animate-ping animation-delay-1000 opacity-30"></div>
      <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-[#41bfb8]/50 rounded-full animate-ping animation-delay-3000 opacity-25"></div>

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
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-[#41bfb8]/10 to-[#F79952]/10 border border-[#41bfb8]/20 rounded-full"
          >
            <HiOutlineSparkles className="text-[#41bfb8] text-lg" />
            <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("whatWeProvide.badge")}</span>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            }}
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 ${bengaliClass}`}
          >
            {t("whatWeProvide.title1")}<span className="text-[#41bfb8]">{t("whatWeProvide.title2")}</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={`mt-3 text-gray-500 work text-sm sm:text-base max-w-2xl mx-auto ${bengaliClass}`}
          >
            {t("whatWeProvide.subtitle")}
          </motion.p>
        </motion.div>

        {/* Features Grid with Staggered Animation */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[features[1], features[0], features[2]].map((feature, index) => {
            const isCenterCard = index === 1; // Job Placement Support is now at index 1
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
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
                className="group relative bg-white border border-gray-200 rounded-md p-6 lg:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 hover:border-transparent"
              >
                {/* Top Accent Line */}
                <div
                  className={`absolute top-0 left-0 h-1 rounded-t-md transition-all duration-500 ${isCenterCard ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  style={{ backgroundColor: feature.color }}
                ></div>

                {/* Background Gradient on Hover (Permanent for center card) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 rounded-md ${isCenterCard ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  style={{ background: `linear-gradient(135deg, ${feature.bgColor}, transparent)` }}
                ></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-md flex items-center justify-center mb-4 transition-transform duration-300 ${isCenterCard ? 'scale-110' : 'group-hover:scale-110'} relative overflow-hidden`}
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <feature.icon className="text-2xl relative z-10" style={{ color: feature.color }} />

                    {/* Moving Particles Animation */}
                    <div
                      className="absolute w-2 h-2 rounded-full opacity-40 animate-place-move"
                      style={{
                        backgroundColor: feature.color,
                        top: '20%',
                        left: '-20%',
                        animationDuration: '3s',
                        animationDelay: '0s'
                      }}
                    ></div>
                    <div
                      className="absolute w-1.5 h-1.5 rounded-full opacity-30 animate-place-move"
                      style={{
                        backgroundColor: feature.color,
                        bottom: '30%',
                        left: '-20%',
                        animationDuration: '4s',
                        animationDelay: '1.5s'
                      }}
                    ></div>
                    <div
                      className="absolute w-1 h-1 rounded-full opacity-20 animate-place-move"
                      style={{
                        backgroundColor: feature.color,
                        top: '60%',
                        left: '-20%',
                        animationDuration: '5s',
                        animationDelay: '0.5s'
                      }}
                    ></div>
                  </div>

                  {/* Title */}
                  <h3 className={`outfit-semibold text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 ${bengaliClass}`}>
                    {t(`whatWeProvide.features.${feature.titleKey}`)}
                    <span
                      className="animate-float"
                      style={{
                        animationDelay: `${index * 500}ms`, // Staggered animation
                        display: 'inline-block'
                      }}
                    >
                      {feature.emoji}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className={`work text-gray-600 text-sm leading-relaxed mb-4 ${bengaliClass}`}>
                    {t(`whatWeProvide.features.${feature.descKey}`)}
                  </p>

                  {/* Learn More Link */}
                  <div className={`flex items-center text-sm font-medium transition-colors duration-300 ${isCenterCard ? 'gap-2' : 'gap-1 group-hover:gap-2'} ${bengaliClass}`} style={{ color: feature.color }}>
                    <span className="work">{t("whatWeProvide.learnMore")}</span>
                    <LuArrowRight className={`transition-transform duration-300 ${isCenterCard ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>

                {/* Corner Decoration */}
                <div
                  className={`absolute bottom-0 right-0 w-20 h-20 transition-opacity duration-300 ${isCenterCard ? 'opacity-10' : 'opacity-5 group-hover:opacity-10'}`}
                  style={{
                    background: `radial-gradient(circle at bottom right, ${feature.color}, transparent)`,
                    borderRadius: '0 0 0.375rem 0'
                  }}
                ></div>

                <style jsx>{`
                  @keyframes place-move {
                    0% {
                      transform: translate(0, 0);
                      opacity: 0;
                    }
                    10% {
                      opacity: 0.4;
                    }
                    90% {
                      opacity: 0.4;
                    }
                    100% {
                      transform: translate(300%, 0); /* Moves moves across the container rightward */
                      opacity: 0;
                      left: 100%;
                    }
                  }
                  .animate-place-move {
                    animation: place-move linear infinite;
                  }
                `}</style>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Link
            href="/about"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-[#41bfb8] text-[#41bfb8] rounded-md font-semibold work hover:bg-[#41bfb8] hover:text-white transition-all duration-300 group ${bengaliClass}`}
          >
            <span>{t("whatWeProvide.learnMoreAboutUs")}</span>
            <LuArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section >
  );
};

export default WhatWeProvide;
