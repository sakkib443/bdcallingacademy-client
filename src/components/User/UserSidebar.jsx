'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiBook,
    FiAward,
    FiUser,
    FiMenu,
    FiX,
    FiLogOut,
    FiArrowLeft,
    FiHelpCircle,
    FiCalendar,
    FiCreditCard,
} from 'react-icons/fi';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [userName, setUserName] = useState('Student');
    const pathname = usePathname();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setUserName(userObj.name || 'Student');
            } catch (e) { }
        }
    }, []);

    const isActive = (href) =>
        pathname === href || pathname.startsWith(href + '/');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const menuItems = [
        { title: 'Dashboard', href: '/dashboard/user', icon: FiHome },
        { title: 'My Courses', href: '/dashboard/user/courses', icon: FiBook },
        { title: 'Certificates', href: '/dashboard/user/certificates', icon: FiAward },
        { title: 'Schedule', href: '/dashboard/user/schedule', icon: FiCalendar },
        { title: 'Payments', href: '/dashboard/user/payments', icon: FiCreditCard },
        { title: 'Profile', href: '/dashboard/user/profile', icon: FiUser },
        { title: 'Support', href: '/dashboard/user/support', icon: FiHelpCircle },
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold text-lg shadow-md">
                            S
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800 outfit">
                                Student <span className="text-[#41bfb8]">Portal</span>
                            </h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">BD Calling Academy</p>
                        </div>
                    </Link>
                </div>

                {/* User Info */}
                <div className="px-4 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-[#41bfb8]/10 to-teal-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold">
                            {userName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
                            <p className="text-xs text-[#41bfb8] font-medium">Student</p>
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
                    <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Menu</p>

                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive(item.href)
                                        ? 'bg-[#41bfb8] text-white shadow-md shadow-teal-200'
                                        : 'text-slate-600 hover:bg-teal-50 hover:text-[#41bfb8]'
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
                    className="fixed inset-0 bg-black/40 lg:hidden z-30 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default UserSidebar;
