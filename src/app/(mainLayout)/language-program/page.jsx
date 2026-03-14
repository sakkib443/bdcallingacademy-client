"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    HiOutlineSparkles,
    HiOutlineAcademicCap,
    HiOutlineGlobeAlt,
    HiOutlineCheckBadge,
    HiOutlineUserGroup,
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlineChatBubbleLeftRight
} from "react-icons/hi2";
import {
    LuArrowRight,
    LuBookOpen,
    LuTarget,
    LuAward,
    LuUsers,
    LuGraduationCap,
    LuStar,
    LuTrendingUp,
    LuHeadphones,
    LuPenTool,
    LuMessageCircle,
    LuBookOpenCheck
} from "react-icons/lu";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/context/SettingsContext";

const LanguageProgramPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("ielts");
    const { language } = useLanguage();
    const { settings } = useSettings();
    // Clean WhatsApp number - remove all non-numeric characters (+, spaces, dashes)
    const rawWhatsappNumber = '8801335202802';
    const whatsappNumber = rawWhatsappNumber.replace(/[^0-9]/g, '');
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const fontClass = language === "bn" ? "hind-siliguri" : "outfit";

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
    }, []);

    const programs = [
        {
            id: "ielts",
            title: language === "bn" ? "IELTS প্রস্তুতি" : "IELTS Preparation",
            icon: LuBookOpen,
            description: language === "bn"
                ? "British Council সার্টিফাইড IELTS প্রস্তুতি কোর্স। সব মডিউলে সর্বোচ্চ ব্যান্ড স্কোর অর্জনের জন্য বিশেষজ্ঞ প্রশিক্ষণ।"
                : "British Council certified IELTS preparation course. Expert training to achieve the highest band score in all modules.",
            features: [
                language === "bn" ? "লিসেনিং, রিডিং, রাইটিং, স্পিকিং" : "Listening, Reading, Writing, Speaking",
                language === "bn" ? "মক টেস্ট ও ফিডব্যাক" : "Mock Tests & Feedback",
                language === "bn" ? "ব্যান্ড ৭+ গ্যারান্টি" : "Band 7+ Guarantee",
                language === "bn" ? "ফ্লেক্সিবল সময়সূচী" : "Flexible Schedule"
            ],
            duration: language === "bn" ? "৩ মাস" : "3 Months",
            students: "2,500+",
            price: "15,000",
            originalPrice: "20,000"
        },
        {
            id: "spoken",
            title: language === "bn" ? "স্পোকেন ইংলিশ" : "Spoken English",
            icon: LuMessageCircle,
            description: language === "bn"
                ? "আত্মবিশ্বাসের সাথে ইংরেজিতে কথা বলুন। প্র্যাক্টিক্যাল কমিউনিকেশন স্কিল ডেভেলপ করুন।"
                : "Speak English with confidence. Develop practical communication skills for real-world situations.",
            features: [
                language === "bn" ? "দৈনন্দিন কথোপকথন" : "Daily Conversations",
                language === "bn" ? "উচ্চারণ ও ফ্লুয়েন্সি" : "Pronunciation & Fluency",
                language === "bn" ? "ব্যবসায়িক ইংরেজি" : "Business English",
                language === "bn" ? "প্রেজেন্টেশন স্কিল" : "Presentation Skills"
            ],
            duration: language === "bn" ? "২ মাস" : "2 Months",
            students: "3,000+",
            price: "8,000",
            originalPrice: "12,000"
        },
        {
            id: "writing",
            title: language === "bn" ? "একাডেমিক রাইটিং" : "Academic Writing",
            icon: LuPenTool,
            description: language === "bn"
                ? "উচ্চশিক্ষার জন্য প্রয়োজনীয় একাডেমিক রাইটিং স্কিল শিখুন। এসে, রিসার্চ পেপার, থিসিস লেখার কৌশল।"
                : "Learn essential academic writing skills for higher education. Essay, research paper, thesis writing techniques.",
            features: [
                language === "bn" ? "এসে রাইটিং" : "Essay Writing",
                language === "bn" ? "রিসার্চ পেপার" : "Research Papers",
                language === "bn" ? "SOP ও LOR" : "SOP & LOR",
                language === "bn" ? "থিসিস গাইডেন্স" : "Thesis Guidance"
            ],
            duration: language === "bn" ? "৬ সপ্তাহ" : "6 Weeks",
            students: "1,200+",
            price: "6,000",
            originalPrice: "8,000"
        }
    ];

    const stats = [
        { icon: LuUsers, value: "6,500+", label: language === "bn" ? "সফল শিক্ষার্থী" : "Successful Students" },
        { icon: LuAward, value: "95%", label: language === "bn" ? "সাফল্যের হার" : "Success Rate" },
        { icon: LuStar, value: "4.9/5", label: language === "bn" ? "ছাত্র রেটিং" : "Student Rating" },
        { icon: LuGraduationCap, value: "50+", label: language === "bn" ? "বিশেষজ্ঞ প্রশিক্ষক" : "Expert Instructors" }
    ];

    const whyChooseUs = [
        {
            icon: HiOutlineCheckBadge,
            title: language === "bn" ? "British Council সার্টিফাইড" : "British Council Certified",
            description: language === "bn"
                ? "আমরা British Council এর অফিসিয়াল পার্টনার এবং সার্টিফাইড এক্সাম সেন্টার।"
                : "We are an official British Council partner and certified exam center."
        },
        {
            icon: HiOutlineUserGroup,
            title: language === "bn" ? "অভিজ্ঞ প্রশিক্ষক" : "Experienced Instructors",
            description: language === "bn"
                ? "আন্তর্জাতিক সার্টিফিকেশনধারী এবং ১০+ বছরের অভিজ্ঞ প্রশিক্ষকমণ্ডলী।"
                : "Internationally certified instructors with 10+ years of experience."
        },
        {
            icon: HiOutlineBuildingOffice2,
            title: language === "bn" ? "IELTS এক্সাম সেন্টার" : "IELTS Exam Center",
            description: language === "bn"
                ? "আমাদের নিজস্ব IELTS এক্সাম সেন্টার রয়েছে। একই জায়গায় প্রস্তুতি এবং পরীক্ষা দিন।"
                : "We have our own IELTS exam center. Prepare and take the exam at the same place."
        },
        {
            icon: LuTarget,
            title: language === "bn" ? "ব্যান্ড স্কোর গ্যারান্টি" : "Band Score Guarantee",
            description: language === "bn"
                ? "আপনার টার্গেট ব্যান্ড স্কোর অর্জনের গ্যারান্টি। না হলে ফ্রি রি-কোর্স।"
                : "Guaranteed target band score achievement. Free re-course if not achieved."
        },
        {
            icon: LuHeadphones,
            title: language === "bn" ? "২৪/৭ সাপোর্ট" : "24/7 Support",
            description: language === "bn"
                ? "যেকোনো সময় শিক্ষকদের কাছ থেকে সাহায্য নিন। অনলাইন সাপোর্ট সবসময় উপলব্ধ।"
                : "Get help from instructors anytime. Online support always available."
        },
        {
            icon: LuBookOpenCheck,
            title: language === "bn" ? "বিনামূল্যে মক টেস্ট" : "Free Mock Tests",
            description: language === "bn"
                ? "সীমাহীন মক টেস্ট এবং বিস্তারিত ফিডব্যাক। আসল পরীক্ষার মতো পরিবেশে অনুশীলন।"
                : "Unlimited mock tests with detailed feedback. Practice in real exam environment."
        }
    ];

    const testimonials = [
        {
            name: language === "bn" ? "ফাতিমা আক্তার" : "Fatima Akter",
            score: "8.0",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
            quote: language === "bn"
                ? "BD Calling Academy এর IELTS কোর্স আমার জীবন বদলে দিয়েছে। ব্যান্ড ৮ পেয়ে UK তে স্কলারশিপ পেয়েছি!"
                : "BD Calling Academy's IELTS course changed my life. Got Band 8 and scholarship to UK!"
        },
        {
            name: language === "bn" ? "মোহাম্মদ রাফি" : "Mohammad Rafi",
            score: "7.5",
            image: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=100&h=100&fit=crop",
            quote: language === "bn"
                ? "মাত্র ২ মাসেই ব্যান্ড ৫ থেকে ৭.৫ এ উন্নতি করেছি। শিক্ষকরা অসাধারণ!"
                : "Improved from Band 5 to 7.5 in just 2 months. The instructors are amazing!"
        },
        {
            name: language === "bn" ? "সারা রহমান" : "Sara Rahman",
            score: "8.5",
            image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&h=100&fit=crop",
            quote: language === "bn"
                ? "British Council এক্সাম সেন্টার থাকায় সব এক জায়গায় হয়ে গেল। খুবই সুবিধাজনক!"
                : "Having the British Council exam center made everything convenient. Highly recommended!"
        }
    ];

    const examSchedule = [
        { date: language === "bn" ? "জানুয়ারি ১৫, ২০২৫" : "January 15, 2025", type: "Academic", seats: 50 },
        { date: language === "bn" ? "জানুয়ারি ২৫, ২০২৫" : "January 25, 2025", type: "General", seats: 40 },
        { date: language === "bn" ? "ফেব্রুয়ারি ১০, ২০২৫" : "February 10, 2025", type: "Academic", seats: 50 },
        { date: language === "bn" ? "ফেব্রুয়ারি ২০, ২০২৫" : "February 20, 2025", type: "General", seats: 45 }
    ];

    const activeProgram = programs.find(p => p.id === activeTab);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f9f9] via-white to-[#f0f4ff] border-b border-gray-100">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#41bfb8]/15 to-transparent rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#8B5CF6]/15 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-[#F79952]/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Floating Shapes */}
                <div className="absolute top-20 right-[15%] w-16 h-16 border-2 border-[#41bfb8]/20 rounded-xl rotate-12 animate-float"></div>
                <div className="absolute bottom-32 left-[10%] w-12 h-12 border-2 border-[#8B5CF6]/20 rounded-lg -rotate-12 animate-float animation-delay-1000"></div>
                <div className="absolute top-1/3 right-[5%] w-8 h-8 bg-[#F79952]/10 rounded-full animate-float animation-delay-2000"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                <div className="container mx-auto px-4 lg:px-16 py-16 lg:py-24 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className={`flex-1 text-center lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                                <Image
                                    src="/images/Our Working Partner Images/Members of all images/british-council-logo.svg--BugRp5Z9.png"
                                    alt="British Council"
                                    width={80}
                                    height={24}
                                    className="h-5 w-auto"
                                />
                                <span className={`text-sm font-medium text-gray-700 ${bengaliClass}`}>
                                    {language === "bn" ? "অফিসিয়াল পার্টনার" : "Official Partner"}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 ${fontClass}`}>
                                {language === "bn" ? "ল্যাঙ্গুয়েজ " : "Language "}
                                <span className="bg-gradient-to-r from-[#41bfb8] to-[#38a89d] bg-clip-text text-transparent">
                                    {language === "bn" ? "প্রোগ্রাম" : "Program"}
                                </span>
                            </h1>
                            <p className={`text-xl sm:text-2xl font-semibold text-gray-600 mb-6 ${fontClass}`}>
                                {language === "bn" ? "বিডি কলিং " : "BD Calling "}
                                <span className="text-[#41bfb8]">{language === "bn" ? "একাডেমি" : "Academy"}</span>
                            </p>

                            {/* Description */}
                            <p className={`text-gray-600 text-lg leading-relaxed mb-8 max-w-xl ${bengaliClass}`}>
                                {language === "bn"
                                    ? "British Council সার্টিফাইড IELTS প্রস্তুতি, স্পোকেন ইংলিশ, এবং একাডেমিক রাইটিং কোর্স। আমাদের নিজস্ব এক্সাম সেন্টারে পরীক্ষা দিন।"
                                    : "British Council certified IELTS preparation, Spoken English, and Academic Writing courses. Take your exam at our own exam center."}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                                <Link
                                    href="#programs"
                                    className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#41bfb8]/30 transition-all duration-300 group ${fontClass}`}
                                >
                                    <span>{language === "bn" ? "কোর্স দেখুন" : "Explore Courses"}</span>
                                    <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#exam-center"
                                    className={`inline-flex items-center gap-2 px-8 py-4 border-2 border-[#41bfb8] text-[#41bfb8] rounded-xl font-semibold hover:bg-[#41bfb8] hover:text-white transition-all duration-300 ${fontClass}`}
                                >
                                    <span>{language === "bn" ? "এক্সাম সেন্টার" : "Exam Center"}</span>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                                {stats.slice(0, 3).map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Icon className="text-[#41bfb8] text-xl" />
                                            <div>
                                                <p className={`font-bold text-gray-800 ${fontClass}`}>{stat.value}</p>
                                                <p className={`text-xs text-gray-500 ${bengaliClass}`}>{stat.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Image/Visual */}
                        <div className={`flex-1 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="relative">
                                {/* Main Card */}
                                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                    <div className="text-center mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                            <HiOutlineAcademicCap className="text-white text-4xl" />
                                        </div>
                                        <h3 className={`text-2xl font-bold text-gray-800 ${fontClass}`}>
                                            {language === "bn" ? "IELTS সেন্টার" : "IELTS Center"}
                                        </h3>
                                        <p className={`text-gray-500 ${bengaliClass}`}>
                                            {language === "bn" ? "সার্টিফাইড এক্সাম সেন্টার" : "Certified Exam Center"}
                                        </p>
                                    </div>

                                    {/* IELTS Modules */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: LuHeadphones, name: language === "bn" ? "লিসেনিং" : "Listening" },
                                            { icon: LuBookOpen, name: language === "bn" ? "রিডিং" : "Reading" },
                                            { icon: LuPenTool, name: language === "bn" ? "রাইটিং" : "Writing" },
                                            { icon: LuMessageCircle, name: language === "bn" ? "স্পিকিং" : "Speaking" }
                                        ].map((module, index) => {
                                            const Icon = module.icon;
                                            return (
                                                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-[#41bfb8]/10 transition-colors">
                                                    <Icon className="text-[#41bfb8] text-2xl mx-auto mb-2" />
                                                    <p className={`text-sm font-medium text-gray-700 ${bengaliClass}`}>{module.name}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Rating */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <FaStar key={i} className="text-[#F79952] text-sm" />
                                            ))}
                                        </div>
                                        <span className={`text-sm text-gray-600 ${bengaliClass}`}>
                                            {language === "bn" ? "৪.৯/৫ রেটিং (২০০০+ রিভিউ)" : "4.9/5 Rating (2000+ Reviews)"}
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#F79952] to-[#e07832] text-white px-4 py-2 rounded-full shadow-lg">
                                    <span className={`text-sm font-bold ${fontClass}`}>
                                        {language === "bn" ? "ব্যান্ড ৭+ গ্যারান্টি" : "Band 7+ Guarantee"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 lg:px-16">
                    {/* Section Header */}
                    <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#41bfb8]/10 rounded-full">
                            <HiOutlineSparkles className="text-[#41bfb8]" />
                            <span className={`text-sm font-medium text-[#41bfb8] ${bengaliClass}`}>
                                {language === "bn" ? "আমাদের প্রোগ্রামসমূহ" : "Our Programs"}
                            </span>
                        </div>
                        <h2 className={`text-3xl lg:text-4xl font-bold text-gray-800 mb-4 ${fontClass}`}>
                            {language === "bn" ? "ল্যাঙ্গুয়েজ " : "Language "}
                            <span className="text-[#41bfb8]">{language === "bn" ? "কোর্সসমূহ" : "Courses"}</span>
                        </h2>
                        <p className={`text-gray-500 max-w-2xl mx-auto ${bengaliClass}`}>
                            {language === "bn"
                                ? "আপনার প্রয়োজন অনুযায়ী সঠিক কোর্স বেছে নিন এবং ভাষা দক্ষতা বাড়ান"
                                : "Choose the right course according to your needs and enhance your language skills"}
                        </p>
                    </div>

                    {/* Program Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {programs.map((program) => {
                            const Icon = program.icon;
                            return (
                                <button
                                    key={program.id}
                                    onClick={() => setActiveTab(program.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${bengaliClass} ${activeTab === program.id
                                        ? "bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white shadow-lg shadow-[#41bfb8]/30"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#41bfb8]/50"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {program.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Program Details */}
                    {activeProgram && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="grid lg:grid-cols-2">
                                {/* Left - Info */}
                                <div className="p-8 lg:p-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-xl flex items-center justify-center">
                                            <activeProgram.icon className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className={`text-2xl font-bold text-gray-800 ${fontClass}`}>{activeProgram.title}</h3>
                                            <p className={`text-sm text-gray-500 ${bengaliClass}`}>
                                                {language === "bn" ? "মেয়াদ: " : "Duration: "}{activeProgram.duration}
                                            </p>
                                        </div>
                                    </div>

                                    <p className={`text-gray-600 mb-6 ${bengaliClass}`}>{activeProgram.description}</p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-8">
                                        {activeProgram.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <FaCheckCircle className="text-[#41bfb8] text-lg shrink-0" />
                                                <span className={`text-gray-700 ${bengaliClass}`}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-6 mb-6">
                                        <div className="text-center">
                                            <p className={`text-2xl font-bold text-[#41bfb8] ${fontClass}`}>{activeProgram.students}</p>
                                            <p className={`text-sm text-gray-500 ${bengaliClass}`}>{language === "bn" ? "শিক্ষার্থী" : "Students"}</p>
                                        </div>
                                        <div className="w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <p className={`text-2xl font-bold text-[#F79952] ${fontClass}`}>95%</p>
                                            <p className={`text-sm text-gray-500 ${bengaliClass}`}>{language === "bn" ? "সাফল্যের হার" : "Success Rate"}</p>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="bg-gradient-to-r from-[#41bfb8]/10 to-[#8B5CF6]/10 rounded-xl p-4 mb-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`text-sm text-gray-500 ${bengaliClass}`}>{language === "bn" ? "কোর্স ফি" : "Course Fee"}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-2xl font-bold text-gray-800 ${fontClass}`}>৳ {activeProgram.price}</span>
                                                    <span className="text-sm text-gray-400 line-through">৳ {activeProgram.originalPrice}</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-[#F79952] to-[#e07832] text-white px-3 py-1 rounded-full text-xs font-bold">
                                                {language === "bn" ? "২৫% ছাড়" : "25% OFF"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href="/contact"
                                        className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group ${fontClass}`}
                                    >
                                        <span>{language === "bn" ? "এখনই ভর্তি হন" : "Enroll Now"}</span>
                                        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Right - Visual */}
                                <div className="bg-gradient-to-br from-[#41bfb8]/10 to-[#8B5CF6]/10 p-8 lg:p-12 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl mx-auto mb-6 flex items-center justify-center">
                                            <activeProgram.icon className="text-[#41bfb8] text-6xl" />
                                        </div>
                                        <h4 className={`text-xl font-bold text-gray-800 mb-2 ${fontClass}`}>
                                            {language === "bn" ? "শুরু করুন আজই" : "Start Today"}
                                        </h4>
                                        <p className={`text-gray-600 mb-4 ${bengaliClass}`}>
                                            {language === "bn" ? "সীমিত আসন উপলব্ধ" : "Limited seats available"}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className={`text-sm text-gray-600 ${bengaliClass}`}>
                                                {language === "bn" ? "ভর্তি চলছে" : "Admission Open"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-16">
                    <div className={`text-center mb-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#41bfb8]/10 rounded-full">
                            <LuTarget className="text-[#41bfb8]" />
                            <span className={`text-sm font-medium text-[#41bfb8] ${bengaliClass}`}>
                                {language === "bn" ? "কেন আমরা সেরা" : "Why We're the Best"}
                            </span>
                        </div>
                        <h2 className={`text-3xl lg:text-4xl font-bold text-gray-800 mb-4 ${fontClass}`}>
                            {language === "bn" ? "কেন বেছে নেবেন " : "Why Choose "}
                            <span className="text-[#41bfb8]">{language === "bn" ? "আমাদের?" : "Us?"}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#41bfb8]/30 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#41bfb8]/10 to-[#38a89d]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="text-[#41bfb8] text-2xl" />
                                    </div>
                                    <h3 className={`text-lg font-bold text-gray-800 mb-2 ${fontClass}`}>{item.title}</h3>
                                    <p className={`text-gray-600 text-sm ${bengaliClass}`}>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Exam Center Section */}
            <section id="exam-center" className="py-16 lg:py-24 bg-gradient-to-br from-[#41bfb8]/5 via-white to-[#38a89d]/5">
                <div className="container mx-auto px-4 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left */}
                        <div>
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                                <HiOutlineBuildingOffice2 className="text-[#41bfb8]" />
                                <span className={`text-sm font-medium text-gray-700 ${bengaliClass}`}>
                                    {language === "bn" ? "IELTS এক্সাম সেন্টার" : "IELTS Exam Center"}
                                </span>
                            </div>

                            <h2 className={`text-3xl lg:text-4xl font-bold text-gray-800 mb-6 ${fontClass}`}>
                                {language === "bn" ? "আমাদের সার্টিফাইড " : "Our Certified "}
                                <span className="text-[#41bfb8]">{language === "bn" ? "এক্সাম সেন্টার" : "Exam Center"}</span>
                            </h2>

                            <p className={`text-gray-600 mb-8 ${bengaliClass}`}>
                                {language === "bn"
                                    ? "BD Calling Academy হলো British Council এর অফিসিয়াল পার্টনার এবং সার্টিফাইড IELTS এক্সাম সেন্টার। একই জায়গায় প্রস্তুতি নিন এবং পরীক্ষা দিন।"
                                    : "BD Calling Academy is an official British Council partner and certified IELTS exam center. Prepare and take your exam at the same location."}
                            </p>

                            {/* Features */}
                            <div className="space-y-4 mb-8">
                                {[
                                    { icon: HiOutlineCheckBadge, text: language === "bn" ? "British Council অনুমোদিত" : "British Council Approved" },
                                    { icon: HiOutlineCalendarDays, text: language === "bn" ? "প্রতি মাসে পরীক্ষার তারিখ" : "Monthly Exam Dates" },
                                    { icon: HiOutlineMapPin, text: language === "bn" ? "সুবিধাজনক লোকেশন" : "Convenient Location" },
                                    { icon: HiOutlineClock, text: language === "bn" ? "ফলাফল ১৩ দিনের মধ্যে" : "Results in 13 Days" }
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#41bfb8]/10 rounded-lg flex items-center justify-center">
                                                <Icon className="text-[#41bfb8] text-lg" />
                                            </div>
                                            <span className={`text-gray-700 ${bengaliClass}`}>{item.text}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group ${fontClass}`}
                            >
                                <span>{language === "bn" ? "পরীক্ষার জন্য রেজিস্টার করুন" : "Register for Exam"}</span>
                                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right - WhatsApp Contact Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <HiOutlineChatBubbleLeftRight className="text-white text-4xl" />
                                </div>
                                <h3 className={`text-xl font-bold text-gray-800 mb-2 ${fontClass}`}>
                                    {language === "bn" ? "পরীক্ষার তারিখ জানতে" : "Know Exam Dates"}
                                </h3>
                                <p className={`text-gray-500 ${bengaliClass}`}>
                                    {language === "bn" ? "WhatsApp এ যোগাযোগ করুন" : "Contact us on WhatsApp"}
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                {[
                                    language === "bn" ? "আসন্ন পরীক্ষার তারিখ জানুন" : "Get upcoming exam dates",
                                    language === "bn" ? "রেজিস্ট্রেশন প্রক্রিয়া জানুন" : "Learn registration process",
                                    language === "bn" ? "ফি ও ডিসকাউন্ট জানুন" : "Know fees & discounts",
                                    language === "bn" ? "সরাসরি পরামর্শ নিন" : "Get direct consultation"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <FaCheckCircle className="text-[#25D366] shrink-0" />
                                        <span className={`text-sm text-gray-700 ${bengaliClass}`}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Button */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Hello! I want to know about IELTS exam dates and registration.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 ${fontClass}`}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span>{language === "bn" ? "WhatsApp এ মেসেজ করুন" : "Message on WhatsApp"}</span>
                            </a>

                            <p className={`text-center text-xs text-gray-400 mt-4 ${bengaliClass}`}>
                                {language === "bn" ? "২৪/৭ সাপোর্ট উপলব্ধ" : "24/7 Support Available"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#F79952]/10 rounded-full">
                            <LuStar className="text-[#F79952]" />
                            <span className={`text-sm font-medium text-[#F79952] ${bengaliClass}`}>
                                {language === "bn" ? "সাফল্যের গল্প" : "Success Stories"}
                            </span>
                        </div>
                        <h2 className={`text-3xl lg:text-4xl font-bold text-gray-800 mb-4 ${fontClass}`}>
                            {language === "bn" ? "শিক্ষার্থীদের " : "Student "}
                            <span className="text-[#F79952]">{language === "bn" ? "অভিজ্ঞতা" : "Experiences"}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className={`font-semibold text-gray-800 ${fontClass}`}>{testimonial.name}</p>
                                        <div className="flex items-center gap-1">
                                            <span className={`text-sm text-gray-500 ${bengaliClass}`}>IELTS Score:</span>
                                            <span className={`font-bold text-[#41bfb8] ${fontClass}`}>{testimonial.score}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-gray-600 italic ${bengaliClass}`}>"{testimonial.quote}"</p>
                                <div className="flex mt-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <FaStar key={i} className="text-[#F79952] text-sm" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-[#41bfb8] to-[#38a89d]">
                <div className="container mx-auto px-4 lg:px-16 text-center">
                    <h2 className={`text-3xl lg:text-4xl font-bold text-white mb-6 ${fontClass}`}>
                        {language === "bn" ? "আজই শুরু করুন আপনার ভাষা যাত্রা!" : "Start Your Language Journey Today!"}
                    </h2>
                    <p className={`text-white/80 mb-8 max-w-2xl mx-auto ${bengaliClass}`}>
                        {language === "bn"
                            ? "British Council সার্টিফাইড কোর্সে ভর্তি হন এবং আপনার স্বপ্নের ব্যান্ড স্কোর অর্জন করুন।"
                            : "Enroll in our British Council certified courses and achieve your dream band score."}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-[#41bfb8] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group ${fontClass}`}
                        >
                            <HiOutlinePhone />
                            <span>{language === "bn" ? "যোগাযোগ করুন" : "Contact Us"}</span>
                        </Link>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white border-2 border-white/40 rounded-xl font-semibold hover:bg-white hover:text-[#41bfb8] transition-all duration-300 ${fontClass}`}
                        >
                            <HiOutlineChatBubbleLeftRight />
                            <span>{language === "bn" ? "WhatsApp এ মেসেজ করুন" : "Message on WhatsApp"}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -30px) scale(1.05); }
                    50% { transform: translate(-20px, 20px) scale(0.95); }
                    75% { transform: translate(30px, 10px) scale(1.02); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-15px) rotate(12deg); }
                }
                .animate-blob { animation: blob 8s infinite ease-in-out; }
                .animate-float { animation: float 4s infinite ease-in-out; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
};

export default LanguageProgramPage;

