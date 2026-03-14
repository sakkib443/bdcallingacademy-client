'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FiBook,
    FiClock,
    FiPlay,
    FiLock,
    FiSearch,
    FiGrid,
    FiList,
    FiLoader,
} from 'react-icons/fi';

export default function UserCoursesPage() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) { }
        }
    }, []);

    // Sample enrolled courses (will be replaced with API data later)
    const enrolledCourses = []; // Empty for now - no courses purchased yet

    // Available courses for browsing
    const availableCourses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp',
            instructor: 'John Doe',
            thumbnail: '/images/course-1.jpg',
            duration: '48 hours',
            lessons: 180,
            price: 4999,
            category: 'Web Development',
        },
        {
            id: 2,
            title: 'UI/UX Design Masterclass',
            instructor: 'Jane Smith',
            thumbnail: '/images/course-2.jpg',
            duration: '32 hours',
            lessons: 95,
            price: 3999,
            category: 'Design',
        },
        {
            id: 3,
            title: 'Digital Marketing Complete Course',
            instructor: 'Mike Johnson',
            thumbnail: '/images/course-3.jpg',
            duration: '24 hours',
            lessons: 72,
            price: 2999,
            category: 'Marketing',
        },
    ];

    const filteredCourses = availableCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 outfit">My Courses</h1>
                <p className="text-slate-500 mt-1">Manage and continue your learning journey</p>
            </div>

            {/* Enrolled Courses Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FiBook className="text-[#41bfb8]" />
                        Enrolled Courses
                    </h2>
                    <span className="text-sm text-slate-500">{enrolledCourses.length} courses</span>
                </div>

                {enrolledCourses.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiBook className="text-3xl text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Courses Enrolled Yet</h3>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            You haven't enrolled in any courses yet. Browse our catalog and start your learning journey!
                        </p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-semibold rounded-xl hover:shadow-lg transition"
                        >
                            <FiSearch size={18} />
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {/* Enrolled courses would be displayed here */}
                    </div>
                )}
            </div>

            {/* Browse Courses Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Browse Available Courses</h2>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none w-64"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-[#41bfb8] text-white' : 'bg-white text-slate-600'}`}
                            >
                                <FiGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-[#41bfb8] text-white' : 'bg-white text-slate-600'}`}
                            >
                                <FiList size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className={`bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-[#41bfb8]/30 transition-all group ${viewMode === 'list' ? 'flex' : ''
                                }`}
                        >
                            {/* Thumbnail */}
                            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'} bg-gradient-to-br from-[#41bfb8] to-[#38a89d]`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FiPlay className="text-white/50 text-4xl" />
                                </div>
                                {/* Lock Badge */}
                                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <FiLock size={12} />
                                    <span>Premium</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 flex-1">
                                <p className="text-xs text-[#41bfb8] font-medium mb-1">{course.category}</p>
                                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#41bfb8] transition line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-3">By {course.instructor}</p>

                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <FiClock size={14} />
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiPlay size={14} />
                                        {course.lessons} lessons
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-[#41bfb8]">৳{course.price}</span>
                                    <button
                                        onClick={() => alert('🔄 Course enrollment is processing. This feature will be available soon!')}
                                        className="px-4 py-2 bg-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-[#41bfb8] hover:text-white transition flex items-center gap-2"
                                    >
                                        <FiLoader size={14} />
                                        Coming Soon
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
