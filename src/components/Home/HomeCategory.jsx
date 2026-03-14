"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useInView } from 'framer-motion';

const HomeCategory = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t, language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const categories = [
        { img: '/images/ai-automation-new.png', titleKey: 'aiAutomation', subtitleKey: 'aiAutomationSub', color: '#8B5CF6', bgColor: '#F5F3FF' },
        { img: '/images/gdIcon.png', titleKey: 'artDesign', subtitleKey: 'artDesignSub', color: '#FF6B6B', bgColor: '#FFF5F5' },
        { img: '/images/webicon.png', titleKey: 'programming', subtitleKey: 'programmingSub', color: '#41bfb8', bgColor: '#F0FDFA' },
        { img: '/images/icon5.png', titleKey: 'digitalMarketing', subtitleKey: 'digitalMarketingSub', color: '#F79952', bgColor: '#FFF7ED' },
        { img: '/images/icon6 (2).png', titleKey: 'mediaFilm', subtitleKey: 'mediaFilmSub', color: '#8B5CF6', bgColor: '#F5F3FF' },
        { img: '/images/icon3.png', titleKey: 'networkingServer', subtitleKey: 'networkingServerSub', color: '#3B82F6', bgColor: '#EFF6FF' },
        { img: '/images/icon4.png', titleKey: 'management', subtitleKey: 'managementSub', color: '#10B981', bgColor: '#ECFDF5' },
        { img: '/images/gdIcon.png', titleKey: 'diploma', subtitleKey: 'diplomaSub', color: '#6366F1', bgColor: '#EEF2FF' }
    ];

    // Map for URL category names (keep English for URLs)
    const categoryUrlMap = {
        'aiAutomation': 'AI and Automation',
        'artDesign': 'Art & Design',
        'programming': 'Programming',
        'digitalMarketing': 'Digital Marketing',
        'mediaFilm': 'Media & Film',
        'networkingServer': 'Networking & Server',
        'management': 'Management',
        'diploma': 'Diploma'
    };

    return (
        <section className='relative bg-gradient-to-b from-white via-slate-50/50 to-white py-12 lg:py-16 overflow-hidden'>
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#41bfb8]/30 to-transparent"></div>

            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#41bfb8]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-[#F79952]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-200/20 via-transparent to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

            {/* Floating Geometric Shapes */}
            <div className="absolute top-20 left-[8%] w-20 h-20 border border-[#41bfb8]/10 rounded-2xl rotate-12"></div>
            <div className="absolute top-1/3 right-[5%] w-16 h-16 border border-[#F79952]/10 rounded-full"></div>
            <div className="absolute bottom-20 left-[15%] w-12 h-12 bg-[#41bfb8]/5 rounded-lg rotate-45"></div>
            <div className="absolute bottom-1/3 right-[12%] w-14 h-14 border border-purple-200/20 rounded-xl -rotate-12"></div>

            {/* Dot Pattern - Left Side */}
            <div className="absolute top-1/4 left-[3%] hidden lg:flex flex-col gap-3 opacity-30">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="w-1.5 h-1.5 bg-[#41bfb8] rounded-full"></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Dot Pattern - Right Side */}
            <div className="absolute bottom-1/4 right-[3%] hidden lg:flex flex-col gap-3 opacity-30">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="w-1.5 h-1.5 bg-[#F79952] rounded-full"></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Curved Lines */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 1440 600" preserveAspectRatio="none">
                <path d="M0,300 Q360,200 720,300 T1440,300" fill="none" stroke="#41bfb8" strokeWidth="2" />
                <path d="M0,350 Q360,250 720,350 T1440,350" fill="none" stroke="#F79952" strokeWidth="1.5" />
            </svg>

            {/* Corner Decorations */}
            <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-[#41bfb8]/10 rounded-tr-3xl"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-[#F79952]/10 rounded-bl-3xl"></div>

            <div ref={sectionRef} className='container mx-auto px-4 lg:px-16'>
                {/* Section Header with Staggered Animation */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                        },
                    }}
                    className="text-center mb-10"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20, scale: 0.9 },
                            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                        }}
                        className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-[#41bfb8]/10 rounded-full"
                    >
                        <span className="w-2 h-2 bg-[#41bfb8] rounded-full"></span>
                        <span className={`text-sm font-medium text-[#41bfb8] work ${bengaliClass}`}>{t("homeCategory.badge")}</span>
                    </motion.div>
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
                        }}
                        className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 outfit ${bengaliClass}`}
                    >
                        {t("homeCategory.title")}
                    </motion.h2>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                        }}
                        className={`mt-2 text-gray-500 work text-sm sm:text-base max-w-xl mx-auto ${bengaliClass}`}
                    >
                        {t("homeCategory.subtitle")}
                    </motion.p>
                </motion.div>

                {/* Categories Grid with Staggered Animation */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                        },
                    }}
                    className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5'
                >
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.9 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }
                                }
                            }}
                        >
                            <Link
                                href={`/courses?category=${encodeURIComponent(categoryUrlMap[cat.titleKey])}`}
                                className="group relative bg-white border border-gray-200 rounded-md p-4 lg:p-5 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-transparent block"
                            >
                                {/* Hover Gradient Border */}
                                <div
                                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${cat.color}15, transparent)`,
                                    }}
                                ></div>

                                {/* Top Accent Line */}
                                <div
                                    className="absolute top-0 left-0 w-0 group-hover:w-full h-[3px] rounded-t-md transition-all duration-500"
                                    style={{ backgroundColor: cat.color }}
                                ></div>

                                <div className='relative flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4'>
                                    {/* Icon Container */}
                                    <div
                                        className='w-12 h-12 lg:w-14 lg:h-14 rounded-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shrink-0'
                                        style={{ backgroundColor: cat.bgColor }}
                                    >
                                        <Image
                                            src={cat.img}
                                            alt={t(`homeCategory.categories.${cat.titleKey}`)}
                                            width={32}
                                            height={32}
                                            className='w-7 h-7 lg:w-8 lg:h-8 object-contain transition-transform duration-300 group-hover:scale-110'
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div className='flex-1 min-w-0'>
                                        <h3 className={`font-semibold text-gray-800 outfit-semibold text-sm lg:text-base truncate group-hover:text-gray-900 transition-colors ${bengaliClass}`}>
                                            {t(`homeCategory.categories.${cat.titleKey}`)}
                                        </h3>
                                        <p className={`work text-xs lg:text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors ${bengaliClass}`}>
                                            {t(`homeCategory.categories.${cat.subtitleKey}`)}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className='hidden sm:flex w-8 h-8 rounded-full items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-all duration-300 shrink-0'>
                                        <svg
                                            className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-0.5 transition-all duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Course Count Badge */}
                                <div className='mt-3 pt-3 border-t border-gray-50 flex items-center justify-between'>
                                    <span className={`text-xs text-gray-400 work ${bengaliClass}`}>{t("homeCategory.exploreCourses")}</span>
                                    <span
                                        className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-300 ${bengaliClass}`}
                                        style={{
                                            backgroundColor: `${cat.color}15`,
                                            color: cat.color
                                        }}
                                    >
                                        {t("homeCategory.viewAll")}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/courses"
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white rounded-md font-medium work hover:shadow-lg hover:shadow-[#41bfb8]/30 transition-all duration-300 ${bengaliClass}`}
                    >
                        <span>{t("homeCategory.browseAllCourses")}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeCategory;

