"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiClock, FiMapPin, FiUser, FiUsers, FiWifi, FiX,
  FiCheck, FiAlertCircle, FiVideo, FiLoader
} from "react-icons/fi";
import { MdOutlineOnlinePrediction } from "react-icons/md";

const API_BASE = "http://localhost:5000/api";

// ============================================================
// Registration Modal Component
// ============================================================
const RegistrationModal = ({ seminar, onClose, onSuccess }) => {
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";
  const [form, setForm] = useState({
    name: "", phone: "", email: "", courseInterest: "", source: "website"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/seminars/${seminar._id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess(true);
      setTimeout(() => { onSuccess(); onClose(); }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}
      className="p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#41bfb8] to-[#38a89d] p-5 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
            <FiX className="text-xl" />
          </button>
          <h3 className={`text-lg font-bold outfit mb-1 ${bengaliClass}`}>
            📝 {language === "bn" ? "সেমিনার রেজিস্ট্রেশন" : "Seminar Registration"}
          </h3>
          <p className={`text-white/80 text-sm work truncate ${bengaliClass}`}>{seminar.title}</p>
        </div>

        {/* Body */}
        <div className="p-5">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiCheck className="text-3xl text-green-500" />
              </div>
              <h4 className={`text-gray-800 font-bold text-lg mb-1 ${bengaliClass}`}>
                {language === "bn" ? "রেজিস্ট্রেশন সফল!" : "Registration Successful!"}
              </h4>
              <p className={`text-gray-500 text-sm work ${bengaliClass}`}>
                {language === "bn"
                  ? "আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।"
                  : "Our team will contact you very soon."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                  <FiAlertCircle className="shrink-0" />
                  <span className={bengaliClass}>{error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 work ${bengaliClass}`}>
                  {language === "bn" ? "আপনার নাম *" : "Your Name *"}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    className={`w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all ${bengaliClass}`}
                    placeholder={language === "bn" ? "নাম লিখুন" : "Enter your name"}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 work ${bengaliClass}`}>
                  {language === "bn" ? "ফোন নম্বর *" : "Phone Number *"}
                </label>
                <input
                  name="phone" value={form.phone} onChange={handleChange} required
                  className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all`}
                  placeholder="01XXXXXXXXX"
                  type="tel"
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 work ${bengaliClass}`}>
                  {language === "bn" ? "ইমেইল *" : "Email *"}
                </label>
                <input
                  name="email" value={form.email} onChange={handleChange} required type="email"
                  className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all`}
                  placeholder="example@email.com"
                />
              </div>

              {/* Course Interest */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 work ${bengaliClass}`}>
                  {language === "bn" ? "কোন কোর্সে আগ্রহী?" : "Which course interests you?"}
                </label>
                <select
                  name="courseInterest" value={form.courseInterest} onChange={handleChange}
                  className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm work focus:outline-none focus:border-[#41bfb8] transition-all bg-white ${bengaliClass}`}
                >
                  <option value="">{language === "bn" ? "বেছে নিন" : "Select one"}</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Python & AI">Python & AI</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Source */}
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 work ${bengaliClass}`}>
                  {language === "bn" ? "কোথা থেকে জানলেন?" : "How did you find us?"}
                </label>
                <select
                  name="source" value={form.source} onChange={handleChange}
                  className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm work focus:outline-none focus:border-[#41bfb8] transition-all bg-white ${bengaliClass}`}
                >
                  <option value="website">{language === "bn" ? "ওয়েবসাইট" : "Website"}</option>
                  <option value="facebook">{language === "bn" ? "ফেসবুক" : "Facebook"}</option>
                  <option value="referral">{language === "bn" ? "বন্ধু/পরিচিত" : "Friend/Referral"}</option>
                  <option value="sms">SMS</option>
                  <option value="other">{language === "bn" ? "অন্যান্য" : "Other"}</option>
                </select>
              </div>

              <button
                type="submit" disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-1 work ${bengaliClass}`}
              >
                {loading ? (
                  <><FiLoader className="animate-spin" /> {language === "bn" ? "পাঠানো হচ্ছে..." : "Submitting..."}</>
                ) : (
                  <>{language === "bn" ? "✅ রেজিস্ট্রেশন করুন" : "✅ Register Now"}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};

// ============================================================
// Live Join Modal Component (Part 2)
// ============================================================
const LiveJoinModal = ({ seminar, onClose }) => {
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";
  const [form, setForm] = useState({ name: "", phone: "", email: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [seminarData, setSeminarData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/seminars/${seminar._id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Join failed");
      setSeminarData(data.data?.seminar);
      setJoined(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const modalContent = (
    <div
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}
      className="p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header — Primary/Secondary gradient */}
        <div className="bg-gradient-to-r from-[#41bfb8] to-[#F79952] p-5 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <FiX className="text-lg" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Live Seminar</span>
          </div>
          <h3 className={`text-lg font-bold outfit leading-snug pr-8 ${bengaliClass}`}>{seminar.title}</h3>
          <div className={`flex items-center gap-3 text-white/80 text-sm mt-2 work ${bengaliClass}`}>
            <span className="flex items-center gap-1"><FiClock className="text-xs" /> {seminar.startTime} - {seminar.endTime}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><FiUser className="text-xs" /> {seminar.speaker}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {joined ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#41bfb8]/20 to-[#F79952]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="text-3xl text-[#41bfb8]" />
              </div>
              <h4 className={`font-bold text-gray-800 text-xl mb-2 outfit ${bengaliClass}`}>
                {language === "bn" ? "স্বাগতম! 🎉" : "Welcome! 🎉"}
              </h4>
              <p className={`text-gray-500 text-sm mb-6 work ${bengaliClass}`}>
                {language === "bn"
                  ? "সেমিনারে আপনাকে স্বাগতম! নিচের বাটনে ক্লিক করে জয়েন করুন।"
                  : "You're all set! Click below to join the seminar."}
              </p>
              {seminar.zoomJoinLink && (
                <a
                  href={seminar.zoomJoinLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-bold rounded-xl shadow-lg shadow-[#41bfb8]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-base"
                >
                  <FiVideo className="text-lg" /> {language === "bn" ? "সেমিনারে জয়েন করুন" : "Join Seminar"}
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4">
              <p className={`text-gray-600 text-sm work ${bengaliClass}`}>
                {language === "bn"
                  ? "সেমিনারে যোগ দিতে নিচের তথ্য দিন:"
                  : "Fill in your info to join the live seminar:"}
              </p>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                  <FiAlertCircle className="shrink-0" />
                  <span className={bengaliClass}>{error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className={`block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider ${bengaliClass}`}>
                  {language === "bn" ? "আপনার নাম" : "Your Name"} *
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/10 transition-all"
                  placeholder={language === "bn" ? "আপনার পুরো নাম" : "Enter your full name"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider ${bengaliClass}`}>
                  {language === "bn" ? "ফোন নম্বর" : "Phone Number"} *
                </label>
                <input
                  name="phone" value={form.phone} onChange={handleChange} required type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/10 transition-all"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider ${bengaliClass}`}>
                  {language === "bn" ? "ইমেইল" : "Email"} *
                </label>
                <input
                  name="email" value={form.email} onChange={handleChange} required type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/10 transition-all"
                  placeholder="example@email.com"
                />
              </div>

              {/* Location */}
              <div>
                <label className={`block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider ${bengaliClass}`}>
                  {language === "bn" ? "লোকেশন" : "Location"}
                </label>
                <input
                  name="location" value={form.location} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm work focus:outline-none focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/10 transition-all"
                  placeholder={language === "bn" ? "আপনার জেলা/এলাকা" : "Your District/Area"}
                />
              </div>

              <button
                type="submit" disabled={loading}
                className={`w-full py-3.5 bg-gradient-to-r from-[#41bfb8] to-[#F79952] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base work ${bengaliClass}`}
              >
                {loading ? (
                  <><FiLoader className="animate-spin" /> {language === "bn" ? "অপেক্ষা করুন..." : "Please wait..."}</>
                ) : (
                  <><FiVideo className="text-lg" /> {language === "bn" ? "সেমিনারে জয়েন করুন" : "Join Live Seminar"}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
};

// ============================================================
// Seminar Card Component
// ============================================================
const SeminarCard = ({ event, index, onRegister, isLive, onJoinLive }) => {
  const { language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  return (
    <div className={`group relative bg-white rounded-xl border overflow-hidden transition-all duration-300
      ${isLive
        ? "border-red-300 shadow-xl shadow-red-100 ring-2 ring-red-300 ring-offset-2"
        : "border-gray-100 hover:shadow-xl hover:shadow-[#41bfb8]/10"
      }`}
    >
      {/* Live accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isLive
        ? "bg-gradient-to-b from-red-400 to-red-600"
        : "bg-gradient-to-b from-[#41bfb8] to-[#F79952] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        }`}></div>

      <div className="flex flex-col md:flex-row items-stretch">
        {/* Left — Index & Image */}
        <div className="flex items-center gap-4 p-5 md:p-6 md:border-r border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#41bfb8]/10 to-[#41bfb8]/5 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-[#41bfb8] outfit">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm bg-gradient-to-br from-[#41bfb8]/10 to-[#F79952]/10">
            {event.bannerImage ? (
              <Image src={event.bannerImage} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <HiOutlineCalendarDays className="text-3xl text-[#41bfb8]/40" />
              </div>
            )}
            {/* Badge */}
            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-bold
              ${isLive ? "bg-red-500 text-white" : event.type === "online"
                ? "bg-white/90 backdrop-blur-sm text-gray-700"
                : "bg-white/90 backdrop-blur-sm text-gray-700"
              }`}
            >
              {isLive ? (
                <><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE</>
              ) : event.type === "online" ? (
                <><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE</>
              ) : (
                <><span className="w-1.5 h-1.5 bg-[#F79952] rounded-full"></span> VENUE</>
              )}
            </div>
          </div>
        </div>

        {/* Middle — Info */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md
              ${event.type === "online" ? "bg-green-50 text-green-600 border border-green-100"
                : "bg-[#F79952]/10 text-[#F79952] border border-[#F79952]/20"}`}
            >
              {event.type === "online" ? (language === "bn" ? "অনলাইন" : "Online")
                : event.type === "offline" ? (language === "bn" ? "অফলাইন" : "Offline")
                  : "Hybrid"}
            </span>
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#41bfb8]/10 text-[#41bfb8] border border-[#41bfb8]/20 rounded-md">
              {language === "bn" ? "সেমিনার" : "Seminar"}
            </span>
            {isLive && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-100 rounded-md animate-pulse">
                🔴 LIVE NOW
              </span>
            )}
          </div>

          <h3 className={`text-lg font-bold text-gray-800 outfit group-hover:text-[#41bfb8] transition-colors mb-2 ${bengaliClass}`}>
            {event.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 work">
            <div className="flex items-center gap-1.5">
              <FiUser className="text-[#41bfb8] text-xs" />
              <span>{event.speaker}</span>
              {event.speakerDesignation && <span className="text-gray-400">• {event.speakerDesignation}</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineCalendarDays className="text-[#41bfb8] text-xs" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock className="text-[#41bfb8] text-xs" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-[#41bfb8] text-xs" />
                <span>{event.venue}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right — CTA */}
        <div className="flex items-center gap-4 p-5 md:p-6 bg-gradient-to-r from-transparent to-gray-50/50 md:border-l border-gray-100">
          <div className="flex items-center gap-2 text-gray-400 text-sm work hidden md:flex">
            <FiUsers className="text-xs" />
            <span>{event.maxSeats} seats</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          {isLive ? (
            <button
              onClick={() => onJoinLive(event)}
              className={`relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm rounded-lg shadow-md shadow-red-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 ${bengaliClass}`}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {language === "bn" ? "লাইভে জয়েন করুন" : "Join Live"}
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              className={`relative overflow-hidden px-6 py-3 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-semibold text-sm rounded-lg shadow-md shadow-[#41bfb8]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${bengaliClass}`}
            >
              {language === "bn" ? "রেজিস্ট্রেশন করুন" : "Register Now →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main Events Page
// ============================================================
const EventsPage = () => {
  const { t, language } = useLanguage();
  const bengaliClass = language === "bn" ? "hind-siliguri" : "";

  const [seminars, setSeminars] = useState([]);
  const [todaySeminar, setTodaySeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [modalType, setModalType] = useState(null); // "register" | "join"
  const [registered, setRegistered] = useState(false);

  // Fetch all seminars + today's seminar
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allRes, todayRes] = await Promise.all([
          fetch(`${API_BASE}/seminars?upcoming=true`),
          fetch(`${API_BASE}/seminars/today`),
        ]);
        const allData = await allRes.json();
        const todayData = await todayRes.json();

        setSeminars(allData.data || []);
        setTodaySeminar(todayData.data || null);
      } catch (err) {
        console.error("Failed to fetch seminars:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [registered]);

  const isLiveSeminar = (seminar) => {
    if (!todaySeminar) return false;
    return todaySeminar._id === seminar._id && todaySeminar.isLiveToday;
  };

  const handleRegister = (seminar) => {
    setSelectedSeminar(seminar);
    setModalType("register");
  };

  const handleJoinLive = (seminar) => {
    setSelectedSeminar(seminar);
    setModalType("join");
  };

  const handleClose = () => {
    setSelectedSeminar(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#ecfcfb]">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#e8f9f9] via-white to-[#fff8f0] overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-10 left-10 w-60 h-60 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#F79952]/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 lg:px-16 py-10 lg:py-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-[#F79952]/10 border border-[#F79952]/20 rounded-full">
              <HiOutlineCalendarDays className="text-[#F79952] text-base" />
              <span className={`text-xs font-medium text-gray-700 work ${bengaliClass}`}>
                {t("eventsPage.badge")}
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 mb-2 ${bengaliClass}`}>
              {t("eventsPage.title1")}<span className="text-[#41bfb8]">{t("eventsPage.title2")}</span>
            </h1>
            <p className={`text-gray-500 work text-sm leading-relaxed ${bengaliClass}`}>
              {t("eventsPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* =============================================
          LIVE SEMINAR — Premium Standalone Section
         ============================================= */}
      {todaySeminar && todaySeminar.isLiveToday && (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/8 rounded-full blur-[100px]"></div>
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 lg:px-16 py-12 lg:py-16">
            {/* Top — Live indicator bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {/* Pulsing live dot with ring */}
                <div className="relative">
                  <span className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-40"></span>
                  <span className="relative block w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
                </div>
                <span className="text-red-400 text-sm font-bold tracking-[0.3em] uppercase">Live Now</span>
                <div className="hidden sm:block h-px w-20 bg-gradient-to-r from-red-500/50 to-transparent"></div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <FiUsers className="text-white/60 text-xs" />
                <span className="text-white/60 text-xs font-medium">{todaySeminar.maxSeats} {language === "bn" ? "সিট" : "seats available"}</span>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              
              {/* Left — Seminar Info (2 cols) */}
              <div className="lg:col-span-2">
                {/* Category/Type badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full border border-red-500/30 backdrop-blur-sm">
                    {todaySeminar.type === "online" ? "🌐 Online" : todaySeminar.type === "offline" ? "📍 Offline" : "🔄 Hybrid"}
                  </span>
                  {todaySeminar.relatedCourses?.map((course, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 text-white/60 text-xs font-medium rounded-full border border-white/10">
                      {course}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold text-white outfit leading-tight mb-4 ${bengaliClass}`}>
                  {language === "bn" && todaySeminar.titleBn ? todaySeminar.titleBn : todaySeminar.title}
                </h2>

                {/* Description */}
                <p className={`text-white/50 text-sm lg:text-base work leading-relaxed mb-6 max-w-2xl line-clamp-2 ${bengaliClass}`}>
                  {language === "bn" && todaySeminar.descriptionBn
                    ? todaySeminar.descriptionBn
                    : todaySeminar.description}
                </p>

                {/* Speaker + Time row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Speaker card */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {todaySeminar.speaker?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{todaySeminar.speaker}</p>
                      {todaySeminar.speakerDesignation && (
                        <p className="text-white/40 text-xs">{todaySeminar.speakerDesignation}</p>
                      )}
                    </div>
                  </div>

                  {/* Time card */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <FiClock className="text-red-400 text-sm" />
                    <span className="text-white text-sm font-medium">{todaySeminar.startTime}</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white text-sm font-medium">{todaySeminar.endTime}</span>
                  </div>

                  {/* Venue card */}
                  {todaySeminar.venue && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <FiMapPin className="text-amber-400 text-sm" />
                      <span className="text-white/80 text-sm">{todaySeminar.venue}</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleJoinLive(todaySeminar)}
                  className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white font-bold text-base lg:text-lg rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ${bengaliClass}`}
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 rounded-2xl overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  </span>
                  
                  <span className="relative flex items-center gap-3">
                    <span className="relative">
                      <span className="absolute inset-0 w-5 h-5 bg-white rounded-full animate-ping opacity-30"></span>
                      <span className="relative block w-5 h-5 bg-white rounded-full shadow-md"></span>
                    </span>
                    <FiVideo className="text-xl" />
                    {language === "bn" ? "এখনই জয়েন করুন" : "Join Live Seminar"}
                  </span>
                </button>
                <p className={`text-white/30 text-xs mt-3 work ${bengaliClass}`}>
                  {language === "bn" ? "ক্লিক করলে জয়েন ফর্ম আসবে — কোনো লগইন লাগবে না" : "No login required — just fill a quick form to join"}
                </p>
              </div>

              {/* Right — Visual element (1 col) */}
              <div className="hidden lg:flex flex-col items-center justify-center">
                {/* Animated rings */}
                <div className="relative w-56 h-56">
                  {/* Outer ring */}
                  <div className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-[spin_8s_linear_infinite]">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
                  </div>
                  {/* Middle ring */}
                  <div className="absolute inset-6 border border-white/10 rounded-full animate-[spin_12s_linear_infinite_reverse]">
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#41bfb8] rounded-full"></span>
                  </div>
                  {/* Inner ring */}
                  <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_6s_linear_infinite]"></div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-2">
                      <span className="absolute inset-0 w-16 h-16 bg-red-500/20 rounded-2xl blur-lg animate-pulse"></span>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <FiVideo className="text-white text-2xl" />
                      </div>
                    </div>
                    <span className="text-white/80 text-xs font-bold tracking-widest mt-2 uppercase">
                      {language === "bn" ? "সরাসরি সম্প্রচার" : "Broadcasting"}
                    </span>
                    <span className="text-white/30 text-[10px] mt-1 tracking-wider">
                      {todaySeminar.startTime} - {todaySeminar.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade to page */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#ecfcfb] to-transparent"></div>
        </section>
      )}

      {/* Events List */}
      <section className="container mx-auto px-4 lg:px-16 py-10">
        {/* Section Title */}
        {seminars.length > 0 && (
          <div className="mb-6">
            <h2 className={`text-xl font-bold text-gray-800 outfit ${bengaliClass}`}>
              {language === "bn" ? "📋 সকল সেমিনার" : "📋 All Seminars"}
            </h2>
            <p className={`text-gray-500 text-sm work ${bengaliClass}`}>
              {language === "bn" ? "আসন্ন সেমিনারগুলোতে রেজিস্ট্রেশন করুন" : "Register for upcoming seminars"}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#41bfb8]/20 border-t-[#41bfb8] rounded-full animate-spin"></div>
            <p className={`text-gray-500 work text-sm ${bengaliClass}`}>
              {language === "bn" ? "লোড হচ্ছে..." : "Loading seminars..."}
            </p>
          </div>
        ) : seminars.length === 0 ? (
          <div className="text-center py-20">
            <HiOutlineCalendarDays className="text-6xl text-gray-200 mx-auto mb-4" />
            <h3 className={`text-gray-400 font-medium text-lg ${bengaliClass}`}>
              {language === "bn" ? "এখন কোনো সেমিনার নেই" : "No upcoming seminars"}
            </h3>
            <p className={`text-gray-300 text-sm mt-1 work ${bengaliClass}`}>
              {language === "bn" ? "শীঘ্রই নতুন সেমিনার আসবে" : "Check back soon!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {seminars.map((event, index) => (
              <SeminarCard
                key={event._id}
                event={event}
                index={index}
                isLive={isLiveSeminar(event)}
                onRegister={handleRegister}
                onJoinLive={handleJoinLive}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      {selectedSeminar && modalType === "register" && (
        <RegistrationModal
          seminar={selectedSeminar}
          onClose={handleClose}
          onSuccess={() => setRegistered(r => !r)}
        />
      )}
      {selectedSeminar && modalType === "join" && (
        <LiveJoinModal
          seminar={selectedSeminar}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default EventsPage;
