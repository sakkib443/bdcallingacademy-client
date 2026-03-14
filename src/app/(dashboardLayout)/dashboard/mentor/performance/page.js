'use client';

import React from 'react';
import { FiTrendingUp, FiUsers, FiStar, FiBook, FiAward, FiBarChart2 } from 'react-icons/fi';

export default function MentorPerformancePage() {
    const performanceData = {
        overallRating: 4.8,
        totalReviews: 156,
        studentSatisfaction: 92,
        completionRate: 87,
        responseTime: '< 2 hours',
    };

    const monthlyStats = [
        { month: 'Jan', students: 35, rating: 4.7 },
        { month: 'Feb', students: 42, rating: 4.8 },
        { month: 'Mar', students: 38, rating: 4.6 },
        { month: 'Apr', students: 51, rating: 4.9 },
        { month: 'May', students: 48, rating: 4.8 },
        { month: 'Jun', students: 55, rating: 4.9 },
    ];

    const coursePerformance = [
        { id: 1, course: 'MERN Stack Development', students: 45, avgRating: 4.9, completionRate: 92 },
        { id: 2, course: 'React Advanced Concepts', students: 28, avgRating: 4.7, completionRate: 85 },
        { id: 3, course: 'Node.js Backend Mastery', students: 35, avgRating: 4.8, completionRate: 88 },
        { id: 4, course: 'JavaScript Fundamentals', students: 52, avgRating: 4.6, completionRate: 95 },
    ];

    const recentReviews = [
        { id: 1, name: 'Rahim Ahmed', rating: 5, comment: 'Excellent mentor! Very clear explanations.', course: 'MERN Stack', date: '2 days ago' },
        { id: 2, name: 'Fatima Khan', rating: 5, comment: 'Best instructor I have ever had. Highly recommended!', course: 'React Advanced', date: '1 week ago' },
        { id: 3, name: 'Karim Hossain', rating: 4, comment: 'Great teaching style. Very patient with beginners.', course: 'Node.js Backend', date: '2 weeks ago' },
    ];

    const maxStudents = Math.max(...monthlyStats.map(s => s.students));

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">Performance</h1>
                    <p className="text-slate-500 text-sm work">Track your teaching performance and ratings</p>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-yellow-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                            <FiStar className="text-xl text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{performanceData.overallRating}</p>
                            <p className="text-xs text-slate-500">Overall Rating</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-teal-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                            <FiUsers className="text-xl text-[#41bfb8]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{performanceData.totalReviews}</p>
                            <p className="text-xs text-slate-500">Total Reviews</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-green-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <FiTrendingUp className="text-xl text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{performanceData.studentSatisfaction}%</p>
                            <p className="text-xs text-slate-500">Satisfaction</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-orange-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <FiAward className="text-xl text-[#F79952]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{performanceData.completionRate}%</p>
                            <p className="text-xs text-slate-500">Completion Rate</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-purple-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <FiBarChart2 className="text-xl text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{performanceData.responseTime}</p>
                            <p className="text-xs text-slate-500">Response Time</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Chart */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Monthly Enrollments</h2>
                        <p className="text-xs text-slate-500">Students enrolled over time</p>
                    </div>
                    <div className="p-5">
                        <div className="flex items-end justify-between gap-3 h-48">
                            {monthlyStats.map((item, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-slate-600">{item.students}</span>
                                    <div
                                        className="w-full bg-gradient-to-t from-[#41bfb8] to-[#6ee7b7] rounded-t-lg transition-all hover:from-[#38a89d] hover:to-[#5dd3a8]"
                                        style={{ height: `${(item.students / maxStudents) * 100}%` }}
                                    ></div>
                                    <span className="text-xs text-slate-500">{item.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Performance */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Course Performance</h2>
                        <p className="text-xs text-slate-500">Performance by course</p>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {coursePerformance.map((course) => (
                            <div key={course.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white">
                                        <FiBook size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800">{course.course}</h3>
                                        <p className="text-xs text-slate-500">{course.students} students</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                                            <FiStar size={12} /> {course.avgRating}
                                        </p>
                                        <p className="text-[10px] text-slate-400">Rating</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-green-500">{course.completionRate}%</p>
                                        <p className="text-[10px] text-slate-400">Complete</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-xl border border-slate-200">
                <div className="p-5 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 outfit">Recent Reviews</h2>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentReviews.map((review) => (
                        <div key={review.id} className="p-5 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800">{review.name}</h3>
                                        <p className="text-xs text-slate-500">{review.course} • {review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} size={14} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-3 ml-13">&ldquo;{review.comment}&rdquo;</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
