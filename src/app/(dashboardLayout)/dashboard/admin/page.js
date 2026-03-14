/* eslint-disable react/no-unescaped-entities */
'use client';

import ProtectedRoute from '@/app/providers/protectedRoutes';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiUsers, FiBook, FiAward, FiGrid, FiTrendingUp, FiPlus, FiArrowRight, FiCalendar, FiActivity } from 'react-icons/fi';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ users: 0, courses: 0, mentors: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentMentors, setRecentMentors] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        // Fetch all data in parallel
        const [coursesRes, mentorsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5000/api/courses'),
          fetch('http://localhost:5000/api/mentors'),
          fetch('http://localhost:5000/api/categories'),
        ]);

        const coursesData = await coursesRes.json();
        const mentorsData = await mentorsRes.json();
        const categoriesData = await categoriesRes.json();

        // Extract arrays from response
        const courses = Array.isArray(coursesData) ? coursesData : (coursesData.data || []);
        const mentors = Array.isArray(mentorsData) ? mentorsData : (mentorsData.data || []);
        const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData.data || []);

        if (mounted) {
          setCounts({
            users: 150, // Sample - API needed
            courses: courses.length,
            mentors: mentors.length,
            categories: categories.length,
          });
          setRecentCourses(courses.slice(0, 5));
          setRecentMentors(mentors.slice(0, 4));
          setLoading(false);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, []);

  const stats = [
    {
      title: 'Total Users',
      count: counts.users,
      icon: FiUsers,
      color: '#3B82F6',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      title: 'Total Courses',
      count: counts.courses,
      icon: FiBook,
      color: '#F79952',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      title: 'Total Mentors',
      count: counts.mentors,
      icon: FiAward,
      color: '#41bfb8',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      title: 'Categories',
      count: counts.categories,
      icon: FiGrid,
      color: '#8B5CF6',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
  ];

  const quickActions = [
    { title: 'Create Course', href: '/dashboard/admin/course/create', icon: FiBook, color: '#F79952' },
    { title: 'Add Mentor', href: '/dashboard/admin/mentor/create', icon: FiUsers, color: '#41bfb8' },
    { title: 'New Category', href: '/dashboard/admin/category/create', icon: FiGrid, color: '#8B5CF6' },
  ];

  // Simple bar chart data
  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 110 },
  ];
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <ProtectedRoute allowedRoles={["superAdmin", "admin", "trainingManager"]}>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 outfit">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm work">Welcome back! Here's your academy summary.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
              <FiCalendar className="text-[#41bfb8]" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
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
                      ) : stat.count}
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
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800 outfit">Enrollment Overview</h2>
                <p className="text-xs text-slate-500">Monthly student enrollments</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <FiTrendingUp />
                <span>+24%</span>
              </div>
            </div>
            <div className="p-5">
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-3 h-48">
                {chartData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-[#41bfb8] to-[#6ee7b7] rounded-t-lg transition-all hover:from-[#38a89d] hover:to-[#5dd3a8]"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                    <span className="text-xs text-slate-500">{item.month}</span>
                  </div>
                ))}
              </div>
              {/* Chart Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#41bfb8]"></div>
                  <span className="text-xs text-slate-600">Enrollments</span>
                </div>
                <div className="text-xs text-slate-400">Total: 519 students</div>
              </div>
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
                      <p className="text-xs text-slate-400">Click to add new</p>
                    </div>
                    <FiPlus className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {/* Stats Card */}
            <div className="p-4">
              <div className="bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <FiActivity />
                  <span className="text-sm font-medium opacity-90">This Month</span>
                </div>
                <p className="text-3xl font-bold">{loading ? '...' : `+${Math.max(12, Math.floor(counts.courses * 2))}`}</p>
                <p className="text-sm opacity-80 mt-1">new enrollments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Courses */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 outfit">Recent Courses</h2>
              <Link
                href="/dashboard/admin/course"
                className="flex items-center gap-1 text-sm text-[#41bfb8] hover:text-[#38a89d] font-medium transition-colors"
              >
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-8 text-center text-slate-400 text-sm">Loading courses...</div>
              ) : recentCourses.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No courses found</div>
              ) : (
                recentCourses.map((course, idx) => (
                  <div key={course._id || idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      {course.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white font-bold">
                          {course.title?.charAt(0) || 'C'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.type || 'Online'} • {course.durationMonth || '3'} months</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{course.fee || '৳0'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Mentors */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 outfit">Our Mentors</h2>
              <Link
                href="/dashboard/admin/mentor"
                className="flex items-center gap-1 text-sm text-[#41bfb8] hover:text-[#38a89d] font-medium transition-colors"
              >
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {loading ? (
                <div className="col-span-2 p-8 text-center text-slate-400 text-sm">Loading mentors...</div>
              ) : recentMentors.length === 0 ? (
                <div className="col-span-2 p-8 text-center text-slate-400 text-sm">No mentors found</div>
              ) : (
                recentMentors.map((mentor, idx) => (
                  <div key={mentor._id || idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                      {mentor.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white font-bold text-sm">
                          {mentor.name?.charAt(0) || 'M'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">{mentor.name}</h3>
                      <p className="text-xs text-slate-500 truncate">{mentor.designation}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
