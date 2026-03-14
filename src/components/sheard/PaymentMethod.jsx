"use client";

import React, { useState, useRef } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";

const paymentMethods = [
  {
    name: "bKash",
    logo: "/images/bkash.webp",
    number: "01322896396",
    color: "#E2136E",
    bgColor: "#FDF2F8"
  },
  {
    name: "Nagad",
    logo: "/images/nagad.png",
    number: "01322896396",
    color: "#F6921E",
    bgColor: "#FFF7ED"
  }
];

const PaymentMethod = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const copyToClipboard = (number, index) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-10 bg-gray-50">
      <div ref={sectionRef} className="container mx-auto px-4 lg:px-16">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={`text-xl sm:text-2xl font-bold outfit text-center text-gray-800 mb-6 ${bengaliClass}`}
        >
          {t("paymentMethod.title")}
        </motion.h2>

        {/* Payment Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group flex items-center gap-4 bg-white border border-gray-200 rounded-md px-5 py-4 hover:shadow-lg hover:border-transparent transition-all duration-300 cursor-pointer w-full sm:w-auto"
              onClick={() => copyToClipboard(method.number, index)}
            >
              {/* Logo */}
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: method.bgColor }}
              >
                <img src={method.logo} alt={method.name} className="w-8 h-8 object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-xs text-gray-400 work">{method.name}</p>
                <p className="text-lg font-bold work" style={{ color: method.color }}>
                  {method.number}
                </p>
              </div>

              {/* Copy Button */}
              <div className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                {copiedIndex === index ? (
                  <LuCheck className="text-green-500" />
                ) : (
                  <LuCopy className="text-gray-400" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`text-center text-xs text-gray-400 work mt-4 ${bengaliClass}`}
        >
          {t("paymentMethod.reference")}
        </motion.p>
      </div>
    </section>
  );
};

export default PaymentMethod;
