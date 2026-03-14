"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi2";
import { LuArrowLeft, LuMail, LuPhone, LuBadgeCheck, LuUsers, LuBookOpen } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const SingleMentor = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/mentors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load mentor");
        return res.json();
      })
      .then((result) => {
        if (result.success && result.data) {
          setMentor(result.data);
          window.scrollTo(0, 0);
        } else {
          setError("Mentor not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching mentor:", err);
        setError("Failed to load mentor profile.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#41bfb8] mb-4"></div>
          <h3 className={`text-lg font-medium text-gray-800 outfit ${bengaliClass}`}>{t("mentorDetails.loading")}</h3>
          <p className={`text-gray-500 text-sm work ${bengaliClass}`}>{t("mentorDetails.pleaseWait")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-md shadow-lg p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LuUsers className="w-8 h-8 text-red-500" />
          </div>
          <h2 className={`text-2xl font-bold text-gray-800 outfit mb-2 ${bengaliClass}`}>{t("mentorDetails.mentorNotFound")}</h2>
          <p className="text-gray-500 work mb-6">{error}</p>
          <Link
            href="/mentors"
            className={`inline-flex items-center gap-2 bg-[#41bfb8] hover:bg-[#38a89d] text-white font-medium py-2.5 px-6 rounded-md transition-colors ${bengaliClass}`}
          >
            <LuArrowLeft />
            {t("mentorDetails.backToMentors")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e8f9f9] via-white to-[#fff8f0] border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 lg:px-16">
          <Link
            href="/mentors"
            className={`inline-flex items-center gap-2 text-gray-600 hover:text-[#41bfb8] transition-colors work text-sm ${bengaliClass}`}
          >
            <LuArrowLeft />
            {t("mentorDetails.backToMentors")}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left - Image Section */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Profile Image */}
              <div className="relative bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Experience Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 bg-[#41bfb8] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 ${bengaliClass}`}>
                    <LuBadgeCheck />
                    {mentor.training_experience?.years}+ {t("mentorDetails.years")}
                  </div>

                  {/* Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white outfit">{mentor.name}</h2>
                    <p className="text-white/80 text-sm work">{mentor.designation}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-4 space-y-3">
                  {mentor.subject && (
                    <span className="inline-block px-3 py-1 bg-[#F79952]/10 text-[#F79952] text-sm font-medium rounded-full">
                      {mentor.subject}
                    </span>
                  )}

                  {mentor.email && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 work">
                      <div className="w-8 h-8 bg-[#41bfb8]/10 rounded-full flex items-center justify-center">
                        <LuMail className="text-[#41bfb8] text-sm" />
                      </div>
                      {mentor.email}
                    </div>
                  )}

                  {mentor.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 work">
                      <div className="w-8 h-8 bg-[#F79952]/10 rounded-full flex items-center justify-center">
                        <LuPhone className="text-[#F79952] text-sm" />
                      </div>
                      {mentor.phone}
                    </div>
                  )}

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/88${mentor.phone || '01335202802'}?text=${encodeURIComponent(
                      `Hello ${mentor.name}, I want to learn from you.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium rounded-md transition-colors mt-2 ${bengaliClass}`}
                  >
                    <FaWhatsapp className="text-lg" />
                    {t("mentorDetails.contactWhatsapp")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content Section */}
          <div className="flex-1 space-y-6">
            {/* Name & Title */}
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 outfit mb-2">{mentor.name}</h1>
              <p className="text-xl text-[#F79952] font-medium outfit">{mentor.designation}</p>

              {/* Specialized Areas */}
              <div className="flex flex-wrap gap-2 mt-4">
                {mentor.specialized_area?.map((area, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full work">
                    {area}
                  </span>
                ))}
              </div>

              {/* About */}
              <p className="text-gray-600 work leading-relaxed mt-4">{mentor.details}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-md p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#41bfb8]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <LuBadgeCheck className="text-[#41bfb8] text-xl" />
                </div>
                <p className="text-2xl font-bold text-gray-800 outfit">{mentor.training_experience?.years}+</p>
                <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("mentorDetails.yearsExperience")}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-md p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#F79952]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <LuUsers className="text-[#F79952] text-xl" />
                </div>
                <p className="text-2xl font-bold text-gray-800 outfit">{mentor.training_experience?.students}+</p>
                <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("mentorDetails.studentsTrained")}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-md p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <LuBookOpen className="text-purple-600 text-xl" />
                </div>
                <p className="text-2xl font-bold text-gray-800 outfit">{mentor.specialized_area?.length || 0}</p>
                <p className={`text-sm text-gray-500 work ${bengaliClass}`}>{t("mentorDetails.specializations")}</p>
              </div>
            </div>

            {/* Education & Work Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <h3 className={`text-lg font-bold text-gray-800 outfit mb-4 flex items-center gap-3 ${bengaliClass}`}>
                  <div className="w-10 h-10 bg-[#41bfb8]/10 rounded-full flex items-center justify-center">
                    <HiOutlineAcademicCap className="text-[#41bfb8] text-xl" />
                  </div>
                  {t("mentorDetails.education")}
                </h3>
                <ul className="space-y-3">
                  {mentor.education_qualification?.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm work">
                      <span className="w-2 h-2 bg-[#41bfb8] rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work Experience */}
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <h3 className={`text-lg font-bold text-gray-800 outfit mb-4 flex items-center gap-3 ${bengaliClass}`}>
                  <div className="w-10 h-10 bg-[#F79952]/10 rounded-full flex items-center justify-center">
                    <HiOutlineBriefcase className="text-[#F79952] text-xl" />
                  </div>
                  {t("mentorDetails.workExperience")}
                </h3>
                <ul className="space-y-3">
                  {mentor.work_experience?.map((work, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm work">
                      <span className="w-2 h-2 bg-[#F79952] rounded-full mt-2 shrink-0"></span>
                      <span className="text-gray-600">{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Life Journey */}
            {mentor.lifeJourney && (
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <h3 className={`text-lg font-bold text-gray-800 outfit mb-4 flex items-center gap-3 ${bengaliClass}`}>
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <HiOutlineSparkles className="text-amber-500 text-xl" />
                  </div>
                  {t("mentorDetails.lifeJourney")}
                </h3>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-5 rounded-r-md">
                  <p className="text-gray-600 work leading-relaxed whitespace-pre-line">
                    {mentor.lifeJourney}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMentor;
