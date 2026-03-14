"use client";

import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuArrowRight, LuTarget, LuUsers, LuTrendingUp } from "react-icons/lu";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const AboutHero = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  return (
    <section className="relative bg-gradient-to-br from-[#e8f9f9] via-white to-[#fff8f0] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#F79952]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-16 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left - Original Image Layout */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Large Image Left */}
              <div className="relative h-80 md:h-[400px] rounded-md overflow-hidden shadow-lg group">
                <Image
                  src="/images/aboutpage/02.jpg"
                  alt="BD Calling Academy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Two Stacked Images Right */}
              <div className="grid grid-rows-2 gap-4">
                <div className="relative h-[190px] rounded-md overflow-hidden shadow-lg group">
                  <Image
                    src="/images/aboutpage/022.jpg"
                    alt="Training Session"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-[190px] rounded-md overflow-hidden shadow-lg group">
                  <Image
                    src="/images/aboutpage/033.jpg"
                    alt="Students"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <HiOutlineSparkles className="text-[#F79952] text-lg" />
              <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("aboutPage.badge")}</span>
            </div>

            {/* Title */}
            <h1 className={`text-3xl lg:text-4xl font-bold outfit text-gray-800 mb-4 ${bengaliClass}`}>
              {t("aboutPage.title1")}<span className="text-[#41bfb8]">{t("aboutPage.title2")}</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg font-semibold text-[#F79952] outfit mb-4 ${bengaliClass}`}>
              {t("aboutPage.subtitle")}
            </p>

            {/* Description */}
            <div className={`space-y-4 text-gray-600 work text-sm leading-relaxed ${bengaliClass}`}>
              <p>
                {t("aboutPage.description1")}
              </p>
              <p>
                {t("aboutPage.description2")}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-white border border-gray-100 rounded-md shadow-sm">
                <LuTarget className="text-2xl text-[#41bfb8] mx-auto mb-1" />
                <p className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("aboutPage.practicalTraining")}</p>
              </div>
              <div className="text-center p-3 bg-white border border-gray-100 rounded-md shadow-sm">
                <LuUsers className="text-2xl text-[#F79952] mx-auto mb-1" />
                <p className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("aboutPage.expertMentors")}</p>
              </div>
              <div className="text-center p-3 bg-white border border-gray-100 rounded-md shadow-sm">
                <LuTrendingUp className="text-2xl text-purple-500 mx-auto mb-1" />
                <p className={`text-xs text-gray-600 work ${bengaliClass}`}>{t("aboutPage.careerGrowth")}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/courses"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-[#41bfb8] hover:bg-[#38a89d] text-white font-medium rounded-md transition-all hover:shadow-lg work group ${bengaliClass}`}
              >
                <span>{t("aboutPage.exploreCourses")}</span>
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
