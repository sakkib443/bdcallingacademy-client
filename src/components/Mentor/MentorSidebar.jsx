'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiBook,
    FiUsers,
    FiCalendar,
    FiUser,
    FiMenu,
    FiX,
    FiLogOut,
    FiArrowLeft,
    FiMessageSquare,
    FiTrendingUp,
    FiGrid,
    FiChevronDown,
} from 'react-icons/fi';

const MentorSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [mentorName, setMentorName] = useState('Mentor');
    const [openMenu, setOpenMenu] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setMentorName(userObj.name || 'Mentor');
            } catch (e) { }
        }
    }, []);

    const isActive = (href) =>
        pathname === href || pathname.startsWith(href + '/');

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const menuItems = [
        { title: 'Dashboard', href: '/dashboard/mentor', icon: FiHome },
        {
            title: 'Courses',
            icon: FiBook,
            submenu: [
                { title: 'All Courses', href: '/dashboard/mentor/course' },
                { title: 'My Courses', href: '/dashboard/mentor/courses' },
            ],
        },
        {
            title: 'Categories',
            icon: FiGrid,
            submenu: [
                { title: 'All Categories', href: '/dashboard/mentor/category' },
            ],
        },
        {
            title: 'Mentors',
            icon: FiUsers,
            submenu: [
                { title: 'All Mentors', href: '/dashboard/mentor/mentors' },
            ],
        },
        { title: 'My Students', href: '/dashboard/mentor/students', icon: FiUsers },
        { title: 'Schedule', href: '/dashboard/mentor/schedule', icon: FiCalendar },
        { title: 'Performance', href: '/dashboard/mentor/performance', icon: FiTrendingUp },
        { title: 'Messages', href: '/dashboard/mentor/messages', icon: FiMessageSquare },
        { title: 'Profile', href: '/dashboard/mentor/profile', icon: FiUser },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#41bfb8] text-white shadow-lg hover:bg-[#38a89d] transition-colors"
            >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-40
        ${isOpen ? 'w-72' : 'w-0 lg:w-72'} overflow-hidden shadow-sm`}
            >
                {/* Logo */}
                <div className="px-6 py-5 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white font-bold text-lg shadow-md">
                            BD
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800 outfit">
                                BD Calling <span className="text-[#41bfb8]">Academy</span>
                            </h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Mentor Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Mentor Info */}
                <div className="px-4 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-[#41bfb8]/10 to-teal-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold">
                            {mentorName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 truncate">{mentorName}</p>
                            <p className="text-xs text-[#41bfb8] font-medium">Mentor</p>
                        </div>
                    </div>
                </div>

                {/* Back to Website */}
                <div className="px-4 py-3 border-b border-slate-100">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#41bfb8] transition-all group"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Website</span>
                    </Link>
                </div>

                {/* Menu */}
                <nav className="px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)]">
                    <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mentor Menu</p>

                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        /* SUBMENU */
                        if (item.submenu) {
                            const activeSub = item.submenu.some((s) => isActive(s.href));

                            return (
                                <div key={item.title}>
                                    <button
                                        onClick={() => toggleMenu(item.title)}
                                        className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all
                    ${activeSub
                                                ? 'bg-[#41bfb8]/10 text-[#41bfb8]'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon size={18} />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </span>
                                        <FiChevronDown
                                            className={`transition-transform ${openMenu === item.title ? 'rotate-180' : ''
                                                }`}
                                            size={16}
                                        />
                                    </button>

                                    {/* Submenu */}
                                    <div className={`overflow-hidden transition-all duration-200 ${openMenu === item.title ? 'max-h-40' : 'max-h-0'}`}>
                                        <div className="ml-6 mt-1 pl-4 border-l-2 border-slate-100 space-y-1">
                                            {item.submenu.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                          ${isActive(sub.href)
                                                            ? 'bg-[#41bfb8] text-white font-medium'
                                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                                        }`}
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        /* NORMAL MENU */
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive(item.href)
                                        ? 'bg-[#41bfb8] text-white shadow-md shadow-teal-200'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 bg-white">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                        <FiLogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 lg:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default MentorSidebar;
