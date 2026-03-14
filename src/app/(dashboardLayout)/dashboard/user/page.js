'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBook, FiAward, FiClock, FiTrendingUp, FiArrowRight, FiUser, FiMail, FiPhone, FiCalendar, FiLoader, FiShield } from 'react-icons/fi';

export default function UserDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) { }
        }
        setLoading(false);
    }, []);

    // Stats - all 0 because no purchases yet
    const stats = {
        enrolledCourses: 0,
        completedCourses: 0,
        certificates: 0,
        hoursLearned: 0,
    };

    const statCards = [
        {
            title: 'Enrolled Courses',
            value: stats.enrolledCourses,
            icon: FiBook,
            color: '#41bfb8',
            bg: 'bg-teal-50',
            border: 'border-teal-200',
        },
        {
            title: 'Completed',
            value: stats.completedCourses,
            icon: FiAward,
            color: '#22C55E',
            bg: 'bg-green-50',
            border: 'border-green-200',
        },
        {
            title: 'Certificates',
            value: stats.certificates,
            icon: FiAward,
            color: '#F79952',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
        },
        {
            title: 'Hours Learned',
            value: stats.hoursLearned,
            icon: FiClock,
            color: '#8B5CF6',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
        },
    ];

    // Quick links
    const quickLinks = [
        { title: 'My Courses', href: '/dashboard/user/courses', icon: FiBook, color: 'bg-teal-500' },
        { title: 'Certificates', href: '/dashboard/user/certificates', icon: FiAward, color: 'bg-amber-500' },
        { title: 'Schedule', href: '/dashboard/user/schedule', icon: FiCalendar, color: 'bg-purple-500' },
        { title: 'Profile', href: '/dashboard/user/profile', icon: FiUser, color: 'bg-blue-500' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FiLoader className="text-4xl text-[#41bfb8] animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 space-y-6 bg-slate-50 min-h-screen">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-[#41bfb8] to-[#38a89d] rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold outfit">
                                Welcome, {user?.firstName || 'Student'}! 🎓
                            </h1>
                            <p className="text-white/80 text-sm">Start your learning journey today</p>
                        </div>
                    </div>
                    <Link
                        href="/courses"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#41bfb8] rounded-xl text-sm font-semibold hover:shadow-lg transition"
                    >
                        <FiBook />
                        Browse Courses
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className={`bg-white rounded-xl border ${stat.border} p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-800 mt-2 outfit">{stat.value}</p>
                                </div>
                                <div className={`${stat.bg} p-3 rounded-xl`}>
                                    <Icon className="text-xl" style={{ color: stat.color }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Overview */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FiUser className="text-[#41bfb8]" />
                            Profile Overview
                        </h2>
                        <Link
                            href="/dashboard/user/profile"
                            className="text-sm text-[#41bfb8] hover:underline font-medium flex items-center gap-1"
                        >
                            Edit Profile <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-[#41bfb8]/10 rounded-lg flex items-center justify-center">
                                <FiUser className="text-[#41bfb8]" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Full Name</p>
                                <p className="text-sm font-semibold text-slate-800">
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiMail className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Email</p>
                                <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FiPhone className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Phone</p>
                                <p className="text-sm font-semibold text-slate-800">
                                    {user?.phoneNumber || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <FiShield className="text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Account Status</p>
                                <p className="text-sm font-semibold text-emerald-700 capitalize">
                                    {user?.status || 'Active'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Processing Notice */}
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <FiLoader className="text-amber-600 animate-spin" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-900">Dashboard Processing</h4>
                                <p className="text-sm text-amber-700 mt-1">
                                    Course enrollment and learning tracking features are currently being developed.
                                    Once you enroll in courses, your progress and stats will appear here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links & Activity */}
                <div className="space-y-6">
                    {/* Quick Links */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {quickLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition group"
                                    >
                                        <div className={`w-10 h-10 ${link.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition`}>
                                            <Icon size={18} />
                                        </div>
                                        <span className="text-xs font-medium text-slate-700">{link.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Learning Activity */}
                    <div className="bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <FiTrendingUp />
                            <span className="text-sm font-medium opacity-90">This Week</span>
                        </div>
                        <p className="text-4xl font-bold">0 hrs</p>
                        <p className="text-sm opacity-80 mt-1">of learning completed</p>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-xs opacity-70">Enroll in courses to start tracking your progress!</p>
                        </div>
                    </div>

                    {/* Quick Action */}
                    <Link
                        href="/courses"
                        className="block bg-white rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center hover:border-[#41bfb8] hover:bg-[#41bfb8]/5 transition group"
                    >
                        <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#41bfb8]/10 transition">
                            <FiBook className="text-2xl text-slate-400 group-hover:text-[#41bfb8]" />
                        </div>
                        <h3 className="font-semibold text-slate-700 group-hover:text-[#41bfb8]">Start Learning</h3>
                        <p className="text-xs text-slate-500 mt-1">Browse our course catalog</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
