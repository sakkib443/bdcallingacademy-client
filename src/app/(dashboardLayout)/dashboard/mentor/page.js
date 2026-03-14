'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBook, FiUsers, FiCalendar, FiTrendingUp, FiArrowRight, FiClock, FiStar, FiMessageSquare, FiActivity } from 'react-icons/fi';

export default function MentorDashboard() {
    const [mentorName, setMentorName] = useState('Mentor');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        upcomingSessions: 0,
        avgRating: 0,
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setMentorName(userObj.name || 'Mentor');
            } catch (e) { }
        }

        setTimeout(() => {
            setStats({
                totalCourses: 5,
                totalStudents: 120,
                upcomingSessions: 3,
                avgRating: 4.8,
            });
            setLoading(false);
        }, 500);
    }, []);

    const statCards = [
        {
            title: 'My Courses',
            value: stats.totalCourses,
            icon: FiBook,
            color: '#F79952',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
        },
        {
            title: 'Total Students',
            value: stats.totalStudents,
            icon: FiUsers,
            color: '#41bfb8',
            bg: 'bg-teal-50',
            border: 'border-teal-200',
        },
        {
            title: 'Upcoming Sessions',
            value: stats.upcomingSessions,
            icon: FiCalendar,
            color: '#8B5CF6',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
        },
        {
            title: 'Avg Rating',
            value: stats.avgRating,
            icon: FiStar,
            color: '#EAB308',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
        },
    ];

    const upcomingClasses = [
        { id: 1, course: 'MERN Stack Development', time: '10:00 AM', date: 'Today', students: 25 },
        { id: 2, course: 'React Advanced', time: '2:00 PM', date: 'Today', students: 18 },
        { id: 3, course: 'Node.js Backend', time: '11:00 AM', date: 'Tomorrow', students: 22 },
    ];

    const recentMessages = [
        { id: 1, name: 'Rahim Ahmed', message: 'I have a question about the assignment...', time: '5 min ago' },
        { id: 2, name: 'Fatima Khan', message: 'Thank you for the feedback!', time: '1 hour ago' },
        { id: 3, name: 'Karim Hossain', message: 'Can we schedule an extra session?', time: '2 hours ago' },
    ];

    const quickActions = [
        { title: 'View Courses', href: '/dashboard/mentor/courses', icon: FiBook, color: '#F79952' },
        { title: 'View Students', href: '/dashboard/mentor/students', icon: FiUsers, color: '#41bfb8' },
        { title: 'Check Messages', href: '/dashboard/mentor/messages', icon: FiMessageSquare, color: '#8B5CF6' },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm work">Welcome back, {mentorName}! Here's your teaching summary.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm">
                        <FiClock className="text-[#41bfb8]" />
                        <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className={`bg-white rounded-xl border ${stat.border} p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-slate-500 text-xs font-medium work uppercase tracking-wider">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-800 mt-2 outfit">
                                        {loading ? (
                                            <span className="inline-block w-12 h-8 bg-slate-200 animate-pulse rounded"></span>
                                        ) : stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.bg} p-3 rounded-xl`}>
                                    <Icon className="text-xl" style={{ color: stat.color }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Classes */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between p-5 border-b border-slate-100">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 outfit">Upcoming Classes</h2>
                            <p className="text-xs text-slate-500">Your scheduled sessions</p>
                        </div>
                        <Link
                            href="/dashboard/mentor/schedule"
                            className="flex items-center gap-1 text-sm text-[#41bfb8] hover:text-[#38a89d] font-medium transition-colors"
                        >
                            View All <FiArrowRight />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {upcomingClasses.map((cls) => (
                            <div key={cls.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white">
                                        <FiBook size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800">{cls.course}</h3>
                                        <p className="text-xs text-slate-500">{cls.students} students enrolled</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-800">{cls.time}</p>
                                    <p className="text-xs text-[#41bfb8] font-medium">{cls.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Quick Actions</h2>
                    </div>
                    <div className="p-4 space-y-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={action.title}
                                    href={action.href}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${action.color}15` }}
                                    >
                                        <Icon className="text-lg" style={{ color: action.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">{action.title}</p>
                                    </div>
                                    <FiArrowRight className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Performance Card */}
                    <div className="p-4">
                        <div className="bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-xl p-5 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FiActivity />
                                <span className="text-sm font-medium opacity-90">This Month</span>
                            </div>
                            <p className="text-3xl font-bold">{loading ? '...' : `+${Math.max(12, Math.floor(stats.totalCourses * 2))}`}</p>
                            <p className="text-sm opacity-80 mt-1">new enrollments</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 outfit">Recent Messages</h2>
                    <Link
                        href="/dashboard/mentor/messages"
                        className="flex items-center gap-1 text-sm text-[#41bfb8] hover:text-[#38a89d] font-medium transition-colors"
                    >
                        View All <FiArrowRight />
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentMessages.map((msg) => (
                        <div key={msg.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold text-sm">
                                {msg.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-800">{msg.name}</h3>
                                <p className="text-xs text-slate-500 truncate">{msg.message}</p>
                            </div>
                            <span className="text-xs text-slate-400">{msg.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
