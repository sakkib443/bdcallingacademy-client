"use client";

import Image from "next/image";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuTarget, LuTrendingUp, LuBookOpen, LuUsers } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const Mission = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const missionItems = [
    {
      icon: LuTrendingUp,
      titleKey: "globalLeadership",
      descKey: "globalLeadershipDesc",
      color: "#41bfb8",
    },
    {
      icon: LuTarget,
      titleKey: "employmentGoals",
      descKey: "employmentGoalsDesc",
      color: "#F79952",
    },
    {
      icon: LuBookOpen,
      titleKey: "practicalSkills",
      descKey: "practicalSkillsDesc",
      color: "#8B5CF6",
    },
    {
      icon: LuUsers,
      titleKey: "careerPaths",
      descKey: "careerPathsDesc",
      color: "#EC4899",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full">
            <HiOutlineSparkles className="text-[#41bfb8] text-lg" />
            <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("aboutPage.missionBadge")}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 ${bengaliClass}`}>
            {t("aboutPage.missionTitle1")}<span className="text-[#F79952]">{t("aboutPage.missionTitle2")}</span>
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left - Image */}
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <div className="relative h-[400px] rounded-md overflow-hidden shadow-xl">
                <Image
                  src="/images/seminar02.png"
                  alt="Mission"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#41bfb8] text-white px-6 py-3 rounded-md shadow-lg">
                <p className="text-2xl font-bold outfit">5000+</p>
                <p className={`text-xs work ${bengaliClass}`}>{t("aboutPage.jobsByYear")}</p>
              </div>
            </div>
          </div>

          {/* Right - Mission Cards */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missionItems.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 border border-gray-100 rounded-md p-5 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="text-2xl" style={{ color: item.color }} />
                  </div>
                  <h3 className={`text-lg font-bold text-gray-800 outfit mb-2 ${bengaliClass}`}>{t(`aboutPage.${item.titleKey}`)}</h3>
                  <p className={`text-sm text-gray-500 work leading-relaxed ${bengaliClass}`}>{t(`aboutPage.${item.descKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
