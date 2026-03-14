"use client";

import { HiOutlineSparkles } from "react-icons/hi2";
import { LuRocket, LuTrendingUp, LuTarget, LuUsers, LuAward } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";

const Value = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const valueItems = [
    {
      icon: LuRocket,
      titleKey: "pioneers",
      subtitleKey: "pioneersSubtitle",
      descKey: "pioneersDesc",
      color: "#41bfb8",
    },
    {
      icon: LuTrendingUp,
      titleKey: "growth",
      subtitleKey: "growthSubtitle",
      descKey: "growthDesc",
      color: "#F79952",
    },
    {
      icon: LuTarget,
      titleKey: "impact",
      subtitleKey: "impactSubtitle",
      descKey: "impactDesc",
      color: "#8B5CF6",
    },
    {
      icon: LuUsers,
      titleKey: "community",
      subtitleKey: "communitySubtitle",
      descKey: "communityDesc",
      color: "#EC4899",
    },
    {
      icon: LuAward,
      titleKey: "excellence",
      subtitleKey: "excellenceSubtitle",
      descKey: "excellenceDesc",
      color: "#10B981",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <HiOutlineSparkles className="text-[#41bfb8] text-lg" />
            <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("aboutPage.valuesBadge")}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 ${bengaliClass}`}>
            {t("aboutPage.valuesTitle1")}<span className="text-[#F79952]">{t("aboutPage.valuesTitle2")}</span>
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {valueItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="text-2xl" style={{ color: item.color }} />
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold text-gray-800 outfit mb-1 ${bengaliClass}`}>{t(`aboutPage.${item.titleKey}`)}</h3>

              {/* Subtitle */}
              <p
                className={`text-sm font-medium mb-3 work ${bengaliClass}`}
                style={{ color: item.color }}
              >
                {t(`aboutPage.${item.subtitleKey}`)}
              </p>

              {/* Description */}
              <p className={`text-sm text-gray-500 work leading-relaxed ${bengaliClass}`}>
                {t(`aboutPage.${item.descKey}`)}
              </p>

              {/* Bottom Accent */}
              <div
                className="w-12 h-1 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
