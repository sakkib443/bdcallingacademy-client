'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft, FiSave, FiCalendar, FiClock,
  FiUser, FiImage, FiWifi, FiMapPin, FiVideo,
  FiUsers, FiStar, FiAlertCircle, FiCheck,
  FiBook, FiChevronDown
} from 'react-icons/fi';

const API_BASE = 'http://localhost:5000/api';

export default function CreateEditSeminar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // if exists → edit mode
  const isEdit = Boolean(editId);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Courses & Mentors for dropdown
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    description: '',
    descriptionBn: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'online',
    // Online
    zoomMeetingId: '',
    zoomJoinLink: '',
    zoomPasscode: '',
    // Offline
    venue: '',
    venueAddress: '',
    // Speaker
    speaker: '',
    speakerDesignation: '',
    speakerImage: '',
    // Media
    bannerImage: '',
    // Settings
    maxSeats: 100,
    status: 'upcoming',
    isFeatured: false,
  });

  // Fetch courses & mentors
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courseRes, mentorRes] = await Promise.all([
          fetch(`${API_BASE}/courses`),
          fetch(`${API_BASE}/mentors`),
        ]);
        const courseData = await courseRes.json();
        const mentorData = await mentorRes.json();
        setCourses(courseData.data || []);
        setMentors(mentorData.data || []);
      } catch (err) {
        console.error('Failed to load courses/mentors:', err);
      }
    };
    fetchDropdownData();
  }, []);

  // Fetch existing seminar if editing
  useEffect(() => {
    if (!isEdit) return;
    const fetchSeminar = async () => {
      try {
        const res = await fetch(`${API_BASE}/seminars/${editId}`);
        const data = await res.json();
        if (data.data) {
          const s = data.data;
          setFormData({
            title: s.title || '',
            titleBn: s.titleBn || '',
            description: s.description || '',
            descriptionBn: s.descriptionBn || '',
            date: s.date ? s.date.split('T')[0] : '',
            startTime: s.startTime || '',
            endTime: s.endTime || '',
            type: s.type || 'online',
            zoomMeetingId: s.zoomMeetingId || '',
            zoomJoinLink: s.zoomJoinLink || '',
            zoomPasscode: s.zoomPasscode || '',
            venue: s.venue || '',
            venueAddress: s.venueAddress || '',
            speaker: s.speaker || '',
            speakerDesignation: s.speakerDesignation || '',
            speakerImage: s.speakerImage || '',
            bannerImage: s.bannerImage || '',
            maxSeats: s.maxSeats || 100,
            status: s.status || 'upcoming',
            isFeatured: s.isFeatured || false,
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchSeminar();
  }, [editId, isEdit]);

  // When course is selected → auto-fill title & description
  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    if (!courseId) return;
    const course = courses.find(c => c._id === courseId);
    if (course) {
      setFormData(prev => ({
        ...prev,
        title: `${course.title} Masterclass Seminar`,
        description: prev.description || `Join our exclusive seminar on ${course.title}. Learn the latest skills, get career guidance, and interact with industry experts. This seminar covers key topics in ${course.title} and helps you understand the career roadmap ahead.`,
        bannerImage: prev.bannerImage || course.image || '',
      }));
    }
  };

  // When mentor is selected → auto-fill speaker info
  const handleMentorSelect = (mentorId) => {
    setSelectedMentor(mentorId);
    if (!mentorId) return;
    const mentor = mentors.find(m => m._id === mentorId);
    if (mentor) {
      setFormData(prev => ({
        ...prev,
        speaker: mentor.name || '',
        speakerDesignation: mentor.designation || '',
        speakerImage: prev.speakerImage || mentor.image || '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.speaker.trim()) newErrors.speaker = 'Speaker name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const url = isEdit
        ? `${API_BASE}/seminars/${editId}`
        : `${API_BASE}/seminars/create`;
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, maxSeats: Number(formData.maxSeats) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setSuccess(true);
      setTimeout(() => router.push('/dashboard/admin/seminar'), 1500);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const inputClass = (err) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all text-sm ${err ? 'border-red-400 bg-red-50' : 'border-slate-200'}`;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/admin/seminar"
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <FiArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 outfit">
              {isEdit ? 'Edit Seminar' : 'Create Seminar'}
            </h1>
            <p className="text-slate-500 text-sm work">
              {isEdit ? 'Update seminar details' : 'Schedule a new seminar or event'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || success}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all shadow-lg shadow-teal-100 disabled:opacity-60"
        >
          {success ? <><FiCheck /> Saved!</> : loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</> : <><FiSave /> {isEdit ? 'Update Seminar' : 'Create Seminar'}</>}
        </button>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          <FiAlertCircle className="shrink-0" />
          <span className="text-sm">{errors.submit}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
          <FiCheck className="shrink-0" />
          <span className="text-sm">Seminar {isEdit ? 'updated' : 'created'} successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================== LEFT COLUMN (Main Content) ==================== */}
        <div className="lg:col-span-2 space-y-5">

          {/* Quick Select — Course & Mentor */}
          {!isEdit && (
            <div className="bg-gradient-to-r from-[#41bfb8]/5 to-[#F79952]/5 rounded-xl border-2 border-dashed border-[#41bfb8]/30 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-[#41bfb8]/10 rounded-lg flex items-center justify-center">
                  <FiBook className="text-[#41bfb8]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 text-sm">Quick Setup — Select Course & Mentor</h3>
                  <p className="text-xs text-slate-400">Auto-fills title, description, speaker info from existing data</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Course Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Course
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCourse}
                      onChange={(e) => handleCourseSelect(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all appearance-none pr-10"
                    >
                      <option value="">-- Choose a course --</option>
                      {courses.map(c => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Mentor Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Mentor / Speaker
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMentor}
                      onChange={(e) => handleMentorSelect(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all appearance-none pr-10"
                    >
                      <option value="">-- Choose a mentor --</option>
                      {mentors.map(m => (
                        <option key={m._id} value={m._id}>{m.name} — {m.designation}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Quick preview of selected */}
              {(selectedCourse || selectedMentor) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedCourse && (() => {
                    const c = courses.find(x => x._id === selectedCourse);
                    return c ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#41bfb8]/10 text-[#41bfb8] text-xs font-semibold rounded-full">
                        <FiBook className="text-[10px]" /> {c.title}
                      </span>
                    ) : null;
                  })()}
                  {selectedMentor && (() => {
                    const m = mentors.find(x => x._id === selectedMentor);
                    return m ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F79952]/10 text-[#F79952] text-xs font-semibold rounded-full">
                        <FiUser className="text-[10px]" /> {m.name}
                      </span>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2"><FiCalendar className="text-[#41bfb8]" /> Seminar Title</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title (English) *</label>
              <input name="title" value={formData.title} onChange={handleChange}
                className={inputClass(errors.title)} placeholder="e.g. AI & Machine Learning Career Roadmap" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title (Bengali)</label>
              <input name="titleBn" value={formData.titleBn} onChange={handleChange}
                className={`${inputClass('')} hind-siliguri`} placeholder="বাংলায় শিরোনাম লিখুন..." />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-700">Description</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description (English) *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                className={`${inputClass(errors.description)} resize-none`}
                placeholder="Describe what the seminar is about, who should attend, and what they'll learn..." />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description (Bengali)</label>
              <textarea name="descriptionBn" value={formData.descriptionBn} onChange={handleChange} rows={3}
                className={`${inputClass('')} resize-none hind-siliguri`}
                placeholder="বাংলায় বিস্তারিত লিখুন..." />
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4"><FiClock className="text-[#41bfb8]" /> Date & Time</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange}
                  className={inputClass(errors.date)} />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Start Time *</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange}
                  className={inputClass(errors.startTime)} />
                {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">End Time *</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange}
                  className={inputClass(errors.endTime)} />
                {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </div>

          {/* Type & Location */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4"><FiWifi className="text-[#41bfb8]" /> Type & Location</h3>

            {/* Type Radio */}
            <div className="flex gap-3 mb-4">
              {['online', 'offline', 'hybrid'].map(t => (
                <label key={t} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium capitalize transition-all
                  ${formData.type === t ? 'border-[#41bfb8] bg-[#41bfb8]/5 text-[#41bfb8]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  <input type="radio" name="type" value={t} checked={formData.type === t}
                    onChange={handleChange} className="hidden" />
                  {t === 'online' ? <FiVideo /> : t === 'offline' ? <FiMapPin /> : <FiWifi />}
                  {t}
                </label>
              ))}
            </div>

            {/* Online fields */}
            {(formData.type === 'online' || formData.type === 'hybrid') && (
              <div className="space-y-3 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Zoom Details</p>
                <input name="zoomJoinLink" value={formData.zoomJoinLink} onChange={handleChange}
                  className={inputClass('')} placeholder="Zoom Join Link (https://zoom.us/j/...)" />
                <div className="grid grid-cols-2 gap-3">
                  <input name="zoomMeetingId" value={formData.zoomMeetingId} onChange={handleChange}
                    className={inputClass('')} placeholder="Meeting ID" />
                  <input name="zoomPasscode" value={formData.zoomPasscode} onChange={handleChange}
                    className={inputClass('')} placeholder="Passcode" />
                </div>
              </div>
            )}

            {/* Offline fields */}
            {(formData.type === 'offline' || formData.type === 'hybrid') && (
              <div className="space-y-3 p-4 bg-orange-50/50 rounded-lg border border-orange-100 mt-3">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">Venue Details</p>
                <input name="venue" value={formData.venue} onChange={handleChange}
                  className={inputClass('')} placeholder="Venue Name (e.g. BdCalling Academy Office)" />
                <input name="venueAddress" value={formData.venueAddress} onChange={handleChange}
                  className={inputClass('')} placeholder="Full Address" />
              </div>
            )}
          </div>

          {/* Speaker */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4"><FiUser className="text-[#41bfb8]" /> Speaker Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Speaker Name *</label>
                <input name="speaker" value={formData.speaker} onChange={handleChange}
                  className={inputClass(errors.speaker)} placeholder="Full name" />
                {errors.speaker && <p className="text-red-500 text-xs mt-1">{errors.speaker}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Designation</label>
                <input name="speakerDesignation" value={formData.speakerDesignation} onChange={handleChange}
                  className={inputClass('')} placeholder="e.g. Senior Software Engineer" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Speaker Photo URL</label>
                <input name="speakerImage" value={formData.speakerImage} onChange={handleChange}
                  className={inputClass('')} placeholder="https://..." />
                {formData.speakerImage && (
                  <img src={formData.speakerImage} alt="Speaker" onError={(e) => e.target.style.display = 'none'}
                    className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-slate-200" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT COLUMN (Settings) ==================== */}
        <div className="space-y-5">

          {/* Banner Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              <FiImage className="text-[#41bfb8]" /> Banner Image
            </label>
            <input name="bannerImage" value={formData.bannerImage} onChange={handleChange}
              className={inputClass('')} placeholder="https://..." />
            {formData.bannerImage && (
              <img src={formData.bannerImage} alt="Banner" onError={(e) => e.target.style.display = 'none'}
                className="mt-3 w-full h-32 object-cover rounded-lg border border-slate-200" />
            )}
          </div>

          {/* Max Seats */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              <FiUsers className="text-[#41bfb8]" /> Max Seats
            </label>
            <input type="number" name="maxSeats" value={formData.maxSeats} onChange={handleChange}
              min="1" className={inputClass('')} />
            <p className="text-xs text-slate-400 mt-1.5">Registration will stop when this limit is reached</p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">Status</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className={`${inputClass('')} bg-white`}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">🔴 Live / Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Featured */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${formData.isFeatured ? 'bg-[#41bfb8]' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${formData.isFeatured ? 'translate-x-5' : ''}`}></div>
              </div>
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="hidden" />
              <div>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <FiStar className={formData.isFeatured ? 'text-[#F79952]' : 'text-slate-400'} />
                  Featured Seminar
                </p>
                <p className="text-xs text-slate-400">Show prominently on homepage</p>
              </div>
            </label>
          </div>

          {/* Submit button (sticky at bottom of sidebar) */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || success}
            className="w-full py-3.5 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-bold rounded-xl shadow-lg shadow-teal-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {success ? <><FiCheck /> Saved!</>
              : loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                : <><FiSave /> {isEdit ? 'Update Seminar' : 'Create Seminar'}</>}
          </button>

          {isEdit && (
            <Link
              href={`/dashboard/admin/seminar/${editId}/registrations`}
              className="w-full py-3 border-2 border-[#41bfb8] text-[#41bfb8] font-semibold rounded-xl hover:bg-[#41bfb8]/5 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FiUsers /> View Registrations
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
