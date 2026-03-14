"use client";

import { useEffect, useState, useRef } from "react";
import { LuAlarmClockMinus, LuCalendarDays, LuUsers, LuArrowRight } from "react-icons/lu";
import { PiCertificateThin } from "react-icons/pi";
import { HiOutlineComputerDesktop, HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";

const SeminarAndEvent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f9f9] via-white to-[#fff8f0]"></div>

      {/* Zigzag Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.172L6.172 0h5.656L0 11.828V6.172zm20 0L26.172 0h5.656L20 11.828V6.172zm20 0L46.172 0h5.656L40 11.828V6.172zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zM20 0L26.172 6.172 20 12 13.828 6.172 20 0z' fill='%2341bfb8' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#41bfb8]/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#F79952]/10 via-transparent to-transparent rounded-full blur-3xl"></div>

      <div ref={sectionRef} className="container mx-auto px-4 lg:px-16 relative z-10">
        <div className="flex lg:flex-row flex-col justify-center items-center gap-12 lg:gap-16">

          {/* Left - Image with Animation */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#41bfb8]/20 rounded-md -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F79952]/20 rounded-md -z-10"></div>

              {/* Main Image */}
              <div className="relative rounded-md overflow-hidden shadow-2xl">
                <img
                  className="w-full h-auto object-cover"
                  src="/images/seminar02.png"
                  alt="Seminar & Events"
                />

                {/* Overlay Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-md px-4 py-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-md flex items-center justify-center">
                      <LuCalendarDays className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 outfit">100+</p>
                      <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{t("seminarEvent.eventsCompleted")}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content with Staggered Animation */}
          <motion.div
            className="flex-1 w-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.2 },
              },
            }}
          >
            <div className="max-w-lg">
              {/* Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#D8F7F6] flex items-center justify-center">
                  <LuAlarmClockMinus className="text-[#41bfb8]" />
                </div>
                <span className={`text-sm font-medium text-gray-700 work ${bengaliClass}`}>{t("seminarEvent.badge")}</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
                }}
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit-semibold text-gray-800 mb-4 ${bengaliClass}`}
              >
                {t("seminarEvent.title1")}
                <span className="text-[#41bfb8]">{t("seminarEvent.title2")}</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className={`text-gray-600 work text-sm sm:text-base leading-relaxed mb-6 ${bengaliClass}`}
              >
                {t("seminarEvent.description")}
              </motion.p>

              {/* Event Cards with Stagger */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="space-y-4"
              >
                {/* Seminar Card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                  }}
                >
                  <Link href="/events" className="block group">
                    <div className="relative bg-white border border-gray-200 rounded-md p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:border-[#41bfb8]/30 hover:-translate-y-1">
                      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] rounded-t-md transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#41bfb8]/10 to-[#41bfb8]/5 flex items-center justify-center shrink-0">
                        <PiCertificateThin className="text-3xl text-[#41bfb8]" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg text-gray-800 outfit-semibold group-hover:text-[#41bfb8] transition-colors ${bengaliClass}`}>
                          {t("seminarEvent.joinSeminar")}
                        </h3>
                        <p className={`text-sm text-gray-500 work ${bengaliClass}`}>
                          {t("seminarEvent.seminarDesc")}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#41bfb8] flex items-center justify-center transition-all duration-300">
                        <LuArrowRight className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Events Card */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
                  }}
                >
                  <Link href="/events" className="block group">
                    <div className="relative bg-white border border-gray-200 rounded-md p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:border-[#F79952]/30 hover:-translate-y-1">
                      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#F79952] to-[#f59e0b] rounded-t-md transition-all duration-500"></div>
                      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#F79952]/10 to-[#F79952]/5 flex items-center justify-center shrink-0">
                        <HiOutlineComputerDesktop className="text-3xl text-[#F79952]" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg text-gray-800 outfit-semibold group-hover:text-[#F79952] transition-colors ${bengaliClass}`}>
                          {t("seminarEvent.enjoyEvents")}
                        </h3>
                        <p className={`text-sm text-gray-500 work ${bengaliClass}`}>
                          {t("seminarEvent.eventsDesc")}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#F79952] flex items-center justify-center transition-all duration-300">
                        <LuArrowRight className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex gap-6 mt-6 pt-6 border-t border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <LuUsers className="text-[#41bfb8] text-xl" />
                  <div>
                    <p className="text-lg font-bold text-gray-800 outfit">5000+</p>
                    <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{t("seminarEvent.attendees")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineSparkles className="text-[#F79952] text-xl" />
                  <div>
                    <p className="text-lg font-bold text-gray-800 outfit">50+</p>
                    <p className={`text-xs text-gray-500 work ${bengaliClass}`}>{t("seminarEvent.expertSpeakers")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeminarAndEvent;

