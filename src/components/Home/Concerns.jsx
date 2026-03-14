"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiOutlineBuildingOffice2, HiOutlineSparkles } from "react-icons/hi2";
import { LuHandshake, LuUsers } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "@/redux/partnerSlice";

const Concerns = () => {
  const dispatch = useDispatch();
  const { partners = [], loading } = useSelector((state) => state.partners || {});
  const [selectedCategory, setSelectedCategory] = useState("Our Concern");
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const staticCollaborations = [
    { id: 10, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/1_bteb.png" },
    { id: 11, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/2_ict.png" },
    { id: 12, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/3_iitu.png" },
    { id: 13, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/4_edge.png" },
    { id: 14, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/5_nsda.png" },
    { id: 15, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/6_dhaka_university.jpg" },
    { id: 16, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/7_crown_institute_of_business_and_technology.jpg" },
    { id: 17, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/8_eastern_eniversity.png" },
    { id: 18, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/9_jagannath_university.png" },
    { id: 19, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/10_dhaka_college.png" },
    { id: 20, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/11_united_international_university.png" },
    { id: 21, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/12_metropolitan_university.png" },
    { id: 22, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/13_north_south_university.png" },
    { id: 23, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/14_east_west_university.png" },
    { id: 24, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/15_smuct.png" },
    { id: 25, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/16_bracu.png" },
    { id: 26, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/17_polytechnic.png" },
    { id: 27, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/18_polytechnic.png" },
    { id: 28, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/19_polytechnic.jpg" },
    { id: 29, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/20_polytechnic.jpg" },
    { id: 30, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/21_polytechnic.png" },
    { id: 31, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/22_polytechnic.jpg" },
    { id: 32, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/23_polytechnic.png" },
    { id: 33, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/24_polytechnic.png" },
    { id: 34, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/25_polytechnic.png" },
    { id: 35, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/26_polytechnic.png" },
    { id: 36, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/27_polytechnic.jpg" },
    { id: 37, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/28_polytechnic.png" },
    { id: 38, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/29_polytechnic.png" },
    { id: 39, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/30_polytechnic.png" },
    { id: 40, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/31_polytechnic.jpg" },
    { id: 41, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/32_polytechnic.png" },
    { id: 42, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/33_polytechnic.jpg" },
    { id: 43, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/34_polytechnic.png" },
    { id: 44, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/35_polytechnic.jpg" },
    { id: 45, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/36_polytechnic.jpg" },
    { id: 46, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/37_polytechnic.png" },
    { id: 47, category: "Colaboration With", image: "/images/Our Working Partner Images/Working with all images/38_polytechnic.png" },
  ];

  const staticMembers = [
    { id: 48, category: "Member Of", image: "/images/Our Working Partner Images/Members of all images/1_basis.png" },
    { id: 49, category: "Member Of", image: "/images/Our Working Partner Images/Members of all images/2_bangladesh_computer_samity.png" },
    { id: 50, category: "Member Of", image: "/images/memberOf/member og -bitm.webp" },
    { id: 51, category: "Member Of", image: "/images/Our Working Partner Images/Members of all images/british-council-logo.svg--BugRp5Z9.png" },
  ];

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const dynamicConcerns = partners.filter(p => p.category === "Our Concern");

  const allPartners = [
    ...dynamicConcerns,
    ...staticCollaborations,
    ...staticMembers
  ];

  const categories = [
    {
      name: "Our Concern",
      labelKey: "ourConcern",
      icon: HiOutlineBuildingOffice2,
      count: dynamicConcerns.length
    },
    {
      name: "Colaboration With",
      labelKey: "collaborationWith",
      icon: LuHandshake,
      count: staticCollaborations.length
    },
    {
      name: "Member Of",
      labelKey: "memberOf",
      icon: LuUsers,
      count: staticMembers.length
    },
  ];

  const filteredImages = allPartners.filter((image) => image.category === selectedCategory);

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Topography Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Cpath fill='none' stroke='%2341bfb8' stroke-width='1' d='M239.5 139.5l0 -5l0 -5l0 -5l0 -5l5 0l0 -5l5 0l0 -5l5 0l5 0l5 0l5 0l0 5l5 0l0 5l0 5l5 0l0 5l0 5l0 5l0 5l0 5l0 5l0 5l0 5l0 5l0 5l0 5l-5 0l0 5l-5 0l0 5l-5 0l-5 0l-5 0l-5 0l0 -5l-5 0l0 -5l0 -5l-5 0l0 -5l0 -5l0 -5l0 -5l0 -5l0 -5l0 -5l0 -5z'/%3E%3C/svg%3E")`
      }}></div>

      {/* Base Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30"></div>

      {/* Gradient Mesh */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#41bfb8]/8 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[#F79952]/8 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gradient-to-r from-purple-100/20 via-transparent to-transparent rounded-full blur-3xl"></div>

      {/* Diamond Grid */}
      <div className="absolute top-20 right-[5%] grid grid-cols-3 gap-2 opacity-10">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-[#41bfb8] rotate-45"></div>
        ))}
      </div>
      <div className="absolute bottom-20 left-[5%] grid grid-cols-3 gap-2 opacity-10">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-[#F79952] rotate-45"></div>
        ))}
      </div>

      {/* Floating Rings */}
      <div className="absolute top-1/4 left-[8%] w-24 h-24 border border-[#41bfb8]/10 rounded-full"></div>
      <div className="absolute top-1/4 left-[8%] w-20 h-20 border border-[#41bfb8]/5 rounded-full translate-x-2 translate-y-2"></div>
      <div className="absolute bottom-1/4 right-[10%] w-20 h-20 border border-[#F79952]/10 rounded-full"></div>
      <div className="absolute bottom-1/4 right-[10%] w-16 h-16 border border-[#F79952]/5 rounded-full translate-x-2 translate-y-2"></div>

      {/* Decorative Lines */}
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-[#41bfb8]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-1/3 w-px h-24 bg-gradient-to-t from-[#F79952]/20 to-transparent"></div>

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
            <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("concerns.badge")}</span>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
            }}
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 ${bengaliClass}`}
          >
            {t("concerns.title1")}<span className="text-[#41bfb8]">{t("concerns.title2")}</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={`mt-3 text-gray-500 work text-sm sm:text-base max-w-2xl mx-auto ${bengaliClass}`}
          >
            {t("concerns.subtitle")}
          </motion.p>
        </motion.div>

        {/* Category Tabs with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm work transition-all duration-300 overflow-hidden ${bengaliClass} ${selectedCategory === cat.name
                ? "text-white shadow-lg shadow-[#41bfb8]/30"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#41bfb8]/50 hover:text-[#41bfb8]"
                }`}
            >
              {selectedCategory === cat.name && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#41bfb8] to-[#38a89d]"></span>
              )}
              <span className="relative z-10 flex items-center gap-2">
                <cat.icon className="text-lg" />
                {t(`concerns.${cat.labelKey}`)}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.name ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {cat.count}
                </span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image._id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={image.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative bg-white border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#41bfb8]/30 hover:-translate-y-1">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#41bfb8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Fixed Size Container for Logo */}
                    <div className="w-full h-24 p-4 flex items-center justify-center">
                      <Image
                        src={image.image}
                        alt={image.name || `Partner ${image.id}`}
                        width={150}
                        height={80}
                        className="max-w-[120px] max-h-[60px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className={`text-gray-500 work ${bengaliClass}`}>{t("concerns.noPartners")}</p>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-100"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-[#41bfb8] outfit">50+</p>
            <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("concerns.partners")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#F79952] outfit">30+</p>
            <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("concerns.universities")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#8B5CF6] outfit">10+</p>
            <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("concerns.govtOrganizations")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Concerns;
