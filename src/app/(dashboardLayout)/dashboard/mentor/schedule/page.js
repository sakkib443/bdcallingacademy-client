'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiVideo, FiMapPin, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function MentorSchedulePage() {
    const [currentWeek, setCurrentWeek] = useState(0);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    const getWeekDates = () => {
        const dates = [];
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    const schedule = [
        { id: 1, day: 0, time: '10:00 AM', course: 'MERN Stack Development', topic: 'React Hooks Deep Dive', students: 45, type: 'online', duration: '2 hours' },
        { id: 2, day: 1, time: '2:00 PM', course: 'React Advanced', topic: 'State Management', students: 28, type: 'online', duration: '1.5 hours' },
        { id: 3, day: 2, time: '11:00 AM', course: 'Node.js Backend', topic: 'REST API Design', students: 35, type: 'offline', duration: '2 hours' },
        { id: 4, day: 3, time: '10:00 AM', course: 'MERN Stack Development', topic: 'MongoDB Aggregation', students: 45, type: 'online', duration: '2 hours' },
        { id: 5, day: 4, time: '3:00 PM', course: 'React Advanced', topic: 'Performance Optimization', students: 28, type: 'online', duration: '1.5 hours' },
        { id: 6, day: 5, time: '10:00 AM', course: 'Node.js Backend', topic: 'Authentication & Security', students: 35, type: 'offline', duration: '2 hours' },
    ];

    const upcomingClasses = [
        { id: 1, course: 'MERN Stack Development', time: '10:00 AM', date: 'Today', students: 45, topic: 'React Hooks' },
        { id: 2, course: 'React Advanced', time: '2:00 PM', date: 'Today', students: 28, topic: 'State Management' },
        { id: 3, course: 'Node.js Backend', time: '11:00 AM', date: 'Tomorrow', students: 35, topic: 'REST API' },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">Schedule</h1>
                    <p className="text-slate-500 text-sm work">Manage your class schedule and sessions</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#41bfb8] text-white rounded-lg text-sm font-medium hover:bg-[#38a89d] transition-colors shadow-md shadow-teal-100">
                    <FiPlus />
                    Add Session
                </button>
            </div>

            {/* Week Navigation */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <FiChevronLeft className="text-slate-600" />
                    </button>
                    <h2 className="text-lg font-bold text-slate-800 outfit">
                        {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </h2>
                    <button
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <FiChevronRight className="text-slate-600" />
                    </button>
                </div>

                {/* Week Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {weekDates.map((date, idx) => {
                        const isToday = date.toDateString() === today.toDateString();
                        const daySchedule = schedule.filter(s => s.day === idx);

                        return (
                            <div key={idx} className={`rounded-xl p-3 min-h-[200px] ${isToday ? 'bg-[#41bfb8]/10 border-2 border-[#41bfb8]' : 'bg-slate-50 border border-slate-200'}`}>
                                <div className="text-center mb-3">
                                    <p className={`text-xs font-medium ${isToday ? 'text-[#41bfb8]' : 'text-slate-500'}`}>
                                        {days[idx].slice(0, 3)}
                                    </p>
                                    <p className={`text-lg font-bold ${isToday ? 'text-[#41bfb8]' : 'text-slate-800'}`}>
                                        {date.getDate()}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {daySchedule.map((session) => (
                                        <div key={session.id} className="bg-white rounded-lg p-2 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                                            <p className="text-xs font-semibold text-slate-800 truncate">{session.course.split(' ')[0]}</p>
                                            <p className="text-[10px] text-[#41bfb8] font-medium">{session.time}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {session.type === 'online' ? (
                                                    <FiVideo className="text-green-500" size={10} />
                                                ) : (
                                                    <FiMapPin className="text-orange-500" size={10} />
                                                )}
                                                <span className="text-[10px] text-slate-400">{session.type}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Classes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Today's Classes</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {upcomingClasses.filter(c => c.date === 'Today').map((cls) => (
                            <div key={cls.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white">
                                        <FiCalendar size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800">{cls.course}</h3>
                                        <p className="text-xs text-slate-500">{cls.topic}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-800">{cls.time}</p>
                                    <p className="text-xs text-slate-500">{cls.students} students</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Weekly Stats</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50 border border-teal-200">
                            <div className="flex items-center gap-3">
                                <FiCalendar className="text-[#41bfb8] text-xl" />
                                <span className="text-sm font-medium text-slate-700">Total Sessions</span>
                            </div>
                            <span className="text-2xl font-bold text-[#41bfb8]">{schedule.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-200">
                            <div className="flex items-center gap-3">
                                <FiClock className="text-[#F79952] text-xl" />
                                <span className="text-sm font-medium text-slate-700">Total Hours</span>
                            </div>
                            <span className="text-2xl font-bold text-[#F79952]">12</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 border border-purple-200">
                            <div className="flex items-center gap-3">
                                <FiUsers className="text-purple-500 text-xl" />
                                <span className="text-sm font-medium text-slate-700">Students to Teach</span>
                            </div>
                            <span className="text-2xl font-bold text-purple-500">108</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
