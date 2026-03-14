'use client';

import React, { useState } from 'react';
import { FiUsers, FiSearch, FiMail, FiPhone, FiBook, FiAward, FiTrendingUp, FiMoreVertical } from 'react-icons/fi';

export default function MentorStudentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('all');

    const students = [
        { id: 1, name: 'Rahim Ahmed', email: 'rahim@email.com', phone: '01712345678', course: 'MERN Stack', progress: 85, grade: 'A+', avatar: 'R', status: 'active' },
        { id: 2, name: 'Fatima Khan', email: 'fatima@email.com', phone: '01723456789', course: 'React Advanced', progress: 72, grade: 'A', avatar: 'F', status: 'active' },
        { id: 3, name: 'Karim Hossain', email: 'karim@email.com', phone: '01734567890', course: 'MERN Stack', progress: 95, grade: 'A+', avatar: 'K', status: 'active' },
        { id: 4, name: 'Ayesha Begum', email: 'ayesha@email.com', phone: '01745678901', course: 'Node.js Backend', progress: 68, grade: 'B+', avatar: 'A', status: 'active' },
        { id: 5, name: 'Hassan Ali', email: 'hassan@email.com', phone: '01756789012', course: 'React Advanced', progress: 45, grade: 'B', avatar: 'H', status: 'inactive' },
        { id: 6, name: 'Nadia Islam', email: 'nadia@email.com', phone: '01767890123', course: 'MERN Stack', progress: 92, grade: 'A+', avatar: 'N', status: 'active' },
    ];

    const courses = ['all', 'MERN Stack', 'React Advanced', 'Node.js Backend'];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    const getGradeColor = (grade) => {
        if (grade.includes('A')) return 'text-green-600 bg-green-50';
        if (grade.includes('B')) return 'text-blue-600 bg-blue-50';
        return 'text-orange-600 bg-orange-50';
    };

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">My Students</h1>
                    <p className="text-slate-500 text-sm work">Track and manage your enrolled students</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none w-64"
                        />
                    </div>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none"
                    >
                        {courses.map(course => (
                            <option key={course} value={course}>
                                {course === 'all' ? 'All Courses' : course}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-teal-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                            <FiUsers className="text-xl text-[#41bfb8]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{students.length}</p>
                            <p className="text-xs text-slate-500">Total Students</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-green-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <FiTrendingUp className="text-xl text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{students.filter(s => s.status === 'active').length}</p>
                            <p className="text-xs text-slate-500">Active Students</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-orange-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <FiAward className="text-xl text-[#F79952]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{students.filter(s => s.grade.includes('A')).length}</p>
                            <p className="text-xs text-slate-500">Top Performers</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-purple-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <FiBook className="text-xl text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800 outfit">{Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%</p>
                            <p className="text-xs text-slate-500">Avg Progress</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold text-sm">
                                                {student.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                                                <p className="text-xs text-slate-400">ID: STU-{String(student.id).padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-slate-600 flex items-center gap-1">
                                                <FiMail className="text-slate-400" size={12} />
                                                {student.email}
                                            </p>
                                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                                <FiPhone className="text-slate-400" size={12} />
                                                {student.phone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{student.course}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-32">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="text-slate-500">{student.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#41bfb8] to-[#6ee7b7] rounded-full"
                                                    style={{ width: `${student.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(student.grade)}`}>
                                            {student.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${student.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {student.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                            <FiMoreVertical className="text-slate-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
