"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiBookOpen, FiUsers, FiTrendingUp, FiCpu } from "react-icons/fi";
import { LuBrain, LuSparkles, LuRocket, LuBot, LuNetwork } from "react-icons/lu";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/context/SettingsContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ courses: 0, students: 0, placement: 0 });
    const [typedText, setTypedText] = useState("");
    const { t, language } = useLanguage();
    const { settings, getSetting } = useSettings();

    const aiTexts = ["AI Design", "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision"];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Apply Bengali font class when language is Bengali
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        setIsVisible(true);

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCounts({
                courses: Math.floor(50 * progress),
                students: Math.floor(6200 * progress),
                placement: Math.floor(92 * progress)
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // AI Text Typing Effect
    useEffect(() => {
        const currentText = aiTexts[currentTextIndex];
        let charIndex = 0;
        setTypedText("");

        const typingInterval = setInterval(() => {
            if (charIndex < currentText.length) {
                setTypedText(currentText.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setCurrentTextIndex((prev) => (prev + 1) % aiTexts.length);
                }, 2000);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [currentTextIndex]);

    return (
        <section className="relative overflow-hidden lg:py-12 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
            {/* Soft AI Background */}
            <div className="absolute inset-0">
                {/* Soft Gradient Orbs - Using Brand Colors */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#41bfb8]/20 to-[#41bfb8]/5 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#F79952]/20 to-[#F79952]/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-[#41bfb8]/15 to-purple-100/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

                {/* Soft AI Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
            </div>

            {/* Floating Neural Nodes - Brand Colors */}
            <div className="absolute top-[10%] left-[10%] w-3 h-3 bg-[#41bfb8]/60 rounded-full animate-neural-pulse shadow-lg shadow-[#41bfb8]/20"></div>
            <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-[#F79952]/60 rounded-full animate-neural-pulse animation-delay-1000 shadow-lg shadow-[#F79952]/20"></div>
            <div className="absolute top-[40%] left-[5%] w-4 h-4 bg-[#41bfb8]/60 rounded-full animate-neural-pulse animation-delay-2000 shadow-lg shadow-[#41bfb8]/20"></div>
            <div className="absolute bottom-[30%] right-[10%] w-3 h-3 bg-[#F79952]/60 rounded-full animate-neural-pulse animation-delay-3000 shadow-lg shadow-[#F79952]/20"></div>
            <div className="absolute bottom-[20%] left-[20%] w-2 h-2 bg-[#41bfb8]/60 rounded-full animate-neural-pulse animation-delay-4000 shadow-lg shadow-[#41bfb8]/20"></div>

            {/* Floating Geometric Shapes */}
            <div className="absolute bottom-20 right-[5%] w-16 h-16 border-2 border-[#41bfb8]/20 rounded-lg animate-float rotate-12"></div>
            <div className="absolute top-40 left-[10%] w-12 h-12 border-2 border-[#F79952]/20 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-32 right-[25%] w-10 h-10 bg-[#41bfb8]/10 rounded-lg animate-float animation-delay-2000 rotate-45"></div>

            {/* Data Flow Particles */}
            <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 bg-[#41bfb8]/50 rounded-full animate-data-flow"></div>
            <div className="absolute top-[25%] left-[45%] w-2 h-2 bg-[#F79952]/50 rounded-full animate-data-flow animation-delay-1000"></div>
            <div className="absolute top-[35%] right-[35%] w-1.5 h-1.5 bg-[#41bfb8]/50 rounded-full animate-data-flow animation-delay-2000"></div>

            {/* Connection Lines SVG - Brand Colors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <defs>
                    <linearGradient id="brandLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#41bfb8" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#41bfb8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F79952" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                <path d="M100,100 Q300,50 500,150 T900,100" stroke="url(#brandLineGradient)" strokeWidth="1.5" fill="none" className="animate-circuit-flow" />
                <path d="M0,300 Q200,250 400,350 T800,300" stroke="url(#brandLineGradient)" strokeWidth="1.5" fill="none" className="animate-circuit-flow animation-delay-1000" />
            </svg>

            {/* AI Sparkle Effects - Brand Colors */}
            <svg className="absolute top-[12%] right-[25%] w-8 h-8 text-[#F79952]/40 animate-sparkle" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <svg className="absolute bottom-[35%] left-[12%] w-5 h-5 text-[#41bfb8]/40 animate-sparkle animation-delay-2000" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <svg className="absolute top-[55%] right-[8%] w-6 h-6 text-[#F79952]/30 animate-sparkle animation-delay-4000" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                    {/* Left Section - Content with Staggered Animations */}
                    <motion.div
                        className="flex-1 w-full"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.12,
                                    delayChildren: 0.1,
                                },
                            },
                        }}
                    >

                        {/* AI Badge - Brand Color */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30, scale: 0.9 },
                                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
                            }}
                            className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-white/70 backdrop-blur-md border border-[#41bfb8]/30 rounded-full w-fit shadow-sm"
                        >
                            <LuBrain className="text-[#41bfb8] animate-neural-pulse" />
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#41bfb8] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#41bfb8]"></span>
                            </span>
                            <p className={`text-[10px] sm:text-sm font-medium text-gray-700 work whitespace-nowrap ${bengaliClass}`}>
                                {getSetting('heroBadge', language) || t("hero.badge")}
                            </p>
                        </motion.div>

                        {/* Main Heading - Brand Colors */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
                            }}
                            className="mb-2"
                        >
                            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold outfit leading-tight ${bengaliClass}`}>
                                <span className="text-gray-800">{getSetting('heroHeading1', language) || t("hero.heading1")} </span>
                                <span className="relative inline-block">
                                    <span className="text-[#F79952]">
                                        {getSetting('heroHeading2', language) || t("hero.heading2")}
                                    </span>
                                    {/* Brand color underline */}
                                    <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                                        <path d="M2 6C50 2 150 2 198 6" stroke="#F79952" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                                    </svg>
                                </span>
                            </h1>
                            <p className={`mt-1 text-lg lg:text-3xl text-gray-600 outfit-semibold ${bengaliClass}`}>
                                {getSetting('heroHeadingWith', language) || t("hero.headingWith")} <span className="text-[#41bfb8]">{getSetting('heroAcademyName', language) || t("hero.academyName")}</span>
                            </p>
                        </motion.div>

                        {/* AI Typing Effect - Brand Color */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="mb-2 flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#41bfb8]/20 rounded-md px-3 py-1.5 w-fit shadow-sm"
                        >
                            <FiCpu className="text-[#41bfb8] text-xl animate-pulse" />
                            <div className="flex items-center">
                                <span className="text-[#41bfb8] font-mono text-lg">&gt;_</span>
                                <span className="text-gray-700 font-mono text-lg ml-2">{typedText}</span>
                                <span className="w-2 h-5 bg-[#41bfb8] ml-1 animate-ai-cursor rounded-sm"></span>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className={`text-gray-600 text-sm leading-relaxed mb-3 work ${bengaliClass}`}
                        >
                            {getSetting('heroDescription', language) || t("hero.description")}
                        </motion.p>

                        {/* Stats Cards - Brand Colors with Staggered Animation */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            className="grid grid-cols-3 gap-2 mb-3"
                        >
                            {/* Courses */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                                }}
                                className="group relative bg-white/70 backdrop-blur-md border border-[#41bfb8]/20 rounded-xl p-3 hover:border-[#41bfb8]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#41bfb8]/10"
                            >
                                <div className="flex items-center gap-1.5 mb-1">
                                    <LuBrain className="text-[#41bfb8] text-base animate-neural-pulse" />
                                    <span className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("hero.courses")}</span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800 outfit">{counts.courses}+</p>
                                <p className={`text-[10px] text-gray-500 work hidden sm:block ${bengaliClass}`}>{t("hero.vendorCertified")}</p>
                            </motion.div>

                            {/* Students */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                                }}
                                className="group relative bg-white/70 backdrop-blur-md border border-[#F79952]/20 rounded-xl p-3 hover:border-[#F79952]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F79952]/10"
                            >
                                <div className="flex items-center gap-1.5 mb-1">
                                    <FiUsers className="text-[#F79952] text-base" />
                                    <span className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("hero.students")}</span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800 outfit">{counts.students.toLocaleString()}+</p>
                                <p className={`text-[10px] text-gray-500 work hidden sm:block ${bengaliClass}`}>{t("hero.buildingSkills")}</p>
                            </motion.div>

                            {/* Placement */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                                }}
                                className="group relative bg-white/70 backdrop-blur-md border border-[#41bfb8]/20 rounded-xl p-3 hover:border-[#41bfb8]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#41bfb8]/10"
                            >
                                <div className="flex items-center gap-1.5 mb-1">
                                    <FiTrendingUp className="text-[#41bfb8] text-base" />
                                    <span className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("hero.placement")}</span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800 outfit">{counts.placement}%</p>
                                <p className={`text-[10px] text-gray-500 work hidden sm:block ${bengaliClass}`}>{t("hero.careerSuccess")}</p>
                            </motion.div>
                        </motion.div>

                        {/* CTA Buttons - Brand Colors */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="flex flex-wrap gap-2 mb-3"
                        >
                            <a href="/events" className="group relative overflow-hidden">
                                <div className={`relative flex items-center gap-2 bg-gradient-to-r from-[#41bfb8] to-[#41bfb8] text-white px-5 py-2.5 rounded-md font-semibold work transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#41bfb8]/30 text-sm ${bengaliClass}`}>
                                    <LuSparkles className="text-lg group-hover:rotate-12 transition-transform" />
                                    <span>{t("hero.joinSeminar")}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                </div>
                            </a>

                            <Link href="/success-story" className="group">
                                <div className={`flex items-center gap-2 bg-white/50 border border-[#41bfb8] text-[#00796b] px-5 py-2.5 rounded-md font-semibold work transition-all duration-300 hover:bg-[#e0f2f1] hover:shadow-lg text-sm ${bengaliClass}`}>
                                    <LuRocket className="text-lg group-hover:translate-x-1 transition-transform" />
                                    <span>{t("hero.successStories")}</span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex -space-x-2">
                                {[
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
                                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                                ].map((img, i) => (
                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Student ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className={`text-xs text-gray-500 work ${bengaliClass}`}>
                                <span className="text-gray-800 font-semibold">Join Our AI Community</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Section - AI Image with Animation */}
                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="relative">
                            {/* Decorative AI Elements - Brand Colors */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#41bfb8]/15 to-[#41bfb8]/5 rounded-full -z-10 blur-xl animate-blob"></div>
                            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gradient-to-br from-[#F79952]/10 to-[#F79952]/5 rounded-full -z-10 blur-xl animate-blob animation-delay-2000"></div>

                            {/* Floating AI Badge - Top Left */}
                            <div className="absolute -top-2 -left-2 z-20 bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-3 py-2 border border-[#41bfb8]/20 animate-hologram">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#41bfb8] to-[#26a69a] rounded-lg flex items-center justify-center shadow-md shadow-[#41bfb8]/20">
                                        <LuBot className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold text-gray-800 outfit ${bengaliClass}`}>AI Powered</p>
                                        <p className={`text-[10px] text-[#41bfb8] work ${bengaliClass}`}>Smart Learning</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge - Bottom Right */}
                            <div className="absolute -bottom-2 -right-2 z-20 bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-3 py-2 border border-[#F79952]/20 animate-hologram animation-delay-2000">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#F79952] to-[#f59e0b] rounded-lg flex items-center justify-center shadow-md shadow-[#F79952]/20">
                                        <BsStars className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold text-gray-800 outfit ${bengaliClass}`}>{t("hero.topRated")}</p>
                                        <p className={`text-[10px] text-[#F79952] work ${bengaliClass}`}>{t("hero.academy2024")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main AI Image Container */}
                            <div className="relative group max-w-[450px] mx-auto animate-float-3d-slow">
                                {/* Glow Effect Behind Image */}
                                <div className="absolute inset-3 bg-gradient-to-br from-[#41bfb8]/20 via-transparent to-[#F79952]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                                {/* Image Container with Border */}
                                <div className="relative bg-gradient-to-br from-[#41bfb8]/10 to-[#F79952]/10 p-1 rounded-2xl animate-glow-pulse-3d">
                                    <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                                        {/* AI Image */}
                                        <Image
                                            src="/images/ai-hero.png"
                                            alt="AI Learning Concept - Neural Network Brain with Data Visualization"
                                            width={450}
                                            height={380}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>

                                        {/* Animated Scan Line */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#41bfb8]/30 to-transparent animate-scan-line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Stats Badge */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-white/98 backdrop-blur-md shadow-lg rounded-xl px-4 py-2 border border-gray-100 flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-[#41bfb8] to-[#26a69a] rounded-lg flex items-center justify-center shadow-md shadow-[#41bfb8]/20">
                                        <LuNetwork className="text-white text-base" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 outfit">4.9/5</p>
                                        <p className={`text-[9px] text-gray-500 work ${bengaliClass}`}>{t("hero.rating")}</p>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-[#F79952] to-[#f59e0b] rounded-lg flex items-center justify-center shadow-md shadow-[#F79952]/20">
                                        <HiOutlineAcademicCap className="text-white text-base" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 outfit">100%</p>
                                        <p className={`text-[9px] text-gray-500 work ${bengaliClass}`}>{t("hero.jobSupport")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
