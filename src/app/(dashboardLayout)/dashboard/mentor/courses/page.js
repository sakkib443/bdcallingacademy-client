'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiBook, FiUsers, FiClock, FiPlay, FiEdit, FiSearch, FiFilter } from 'react-icons/fi';

export default function MentorCoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const courses = [
        {
            id: 1,
            title: 'MERN Stack Development',
            students: 45,
            lessons: 32,
            duration: '3 months',
            status: 'active',
            progress: 65,
            image: 'https://i.ibb.co/XZ78JQ9f/Mern-card.jpg',
            nextClass: 'Today, 10:00 AM',
        },
        {
            id: 2,
            title: 'React Advanced Concepts',
            students: 28,
            lessons: 24,
            duration: '2 months',
            status: 'active',
            progress: 45,
            image: 'https://i.ibb.co/GvS6k4FJ/DM-caed.jpg',
            nextClass: 'Tomorrow, 2:00 PM',
        },
        {
            id: 3,
            title: 'Node.js Backend Mastery',
            students: 35,
            lessons: 28,
            duration: '2.5 months',
            status: 'active',
            progress: 80,
            image: 'https://i.ibb.co/zWvWjS9X/GD-Card-1.jpg',
            nextClass: 'Friday, 11:00 AM',
        },
        {
            id: 4,
            title: 'JavaScript Fundamentals',
            students: 52,
            lessons: 20,
            duration: '1.5 months',
            status: 'completed',
            progress: 100,
            image: 'https://i.ibb.co/XZ78JQ9f/Mern-card.jpg',
            nextClass: 'Completed',
        },
    ];

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">My Courses</h1>
                    <p className="text-slate-500 text-sm work">Manage and track your assigned courses</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <FiFilter />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-teal-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                            <FiBook className="text-xl text-[#41bfb8]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{courses.length}</p>
                            <p className="text-xs text-slate-500">Total Courses</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-orange-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <FiUsers className="text-xl text-[#F79952]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
                            <p className="text-xs text-slate-500">Total Students</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-purple-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <FiClock className="text-xl text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{courses.reduce((acc, c) => acc + c.lessons, 0)}</p>
                            <p className="text-xs text-slate-500">Total Lessons</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <div className="relative h-40 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${course.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {course.status === 'active' ? 'Active' : 'Completed'}
                                </span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                                <h3 className="text-lg font-bold text-white">{course.title}</h3>
                            </div>
                        </div>
                        <div className="p-5">
                            {/* Stats Row */}
                            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <FiUsers className="text-[#41bfb8]" />
                                    {course.students} Students
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiBook className="text-[#F79952]" />
                                    {course.lessons} Lessons
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiClock className="text-purple-500" />
                                    {course.duration}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-slate-500">Course Progress</span>
                                    <span className="font-bold text-slate-700">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#41bfb8] to-[#6ee7b7] rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Next Class */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400">Next Class</p>
                                    <p className="text-sm font-medium text-slate-700">{course.nextClass}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                                        <FiEdit size={16} />
                                    </button>
                                    <button className="p-2 bg-[#41bfb8] text-white rounded-lg hover:bg-[#38a89d] transition-colors">
                                        <FiPlay size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
