'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiBook,
  FiUsers,
  FiAward,
  FiMessageSquare,
  FiImage,
  FiList,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiArrowLeft,
  FiSettings,
  FiCalendar,
} from 'react-icons/fi';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + '/');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    { title: 'Dashboard', href: '/dashboard/admin', icon: FiHome },
    {
      title: 'Courses',
      icon: FiBook,
      submenu: [
        { title: 'All Courses', href: '/dashboard/admin/course' },
        { title: 'Create Course', href: '/dashboard/admin/course/create' },
      ],
    },
    {
      title: 'Categories',
      icon: FiList,
      submenu: [
        { title: 'All Categories', href: '/dashboard/admin/category' },
        { title: 'Add Category', href: '/dashboard/admin/category/create' },
      ],
    },
    {
      title: 'Blogs',
      icon: FiBook,
      submenu: [
        { title: 'All Blogs', href: '/dashboard/admin/blog' },
        { title: 'Create Blog', href: '/dashboard/admin/blog/create' },
      ],
    },
    {
      title: 'Mentors',
      icon: FiUsers,
      submenu: [
        { title: 'All Mentors', href: '/dashboard/admin/mentor' },
        { title: 'Add Mentor', href: '/dashboard/admin/mentor/create' },
      ],
    },
    { title: 'Certifications', href: '/dashboard/admin/certification', icon: FiAward },
    {
      title: 'Seminars & Events',
      icon: FiCalendar,
      submenu: [
        { title: 'All Seminars', href: '/dashboard/admin/seminar' },
        { title: 'Create Seminar', href: '/dashboard/admin/seminar/create' },
      ],
    },
    { title: 'Users', href: '/dashboard/admin/user', icon: FiUsers },
    { title: 'Messages', href: '/dashboard/admin/messages', icon: FiMessageSquare },
    { title: 'Feedback', href: '/dashboard/admin/feedback', icon: FiMessageSquare },
    { title: 'Images', href: '/dashboard/admin/image', icon: FiImage },
    {
      title: 'Working Partners',
      icon: FiUsers,
      submenu: [
        { title: 'All Partners', href: '/dashboard/admin/partners' },
        { title: 'Add Partner', href: '/dashboard/admin/partners/create' },
      ],
    },
    { title: 'Design & Settings', href: '/dashboard/admin/settings', icon: FiSettings },
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white font-bold text-lg">
              BD
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 outfit">
                BD Calling <span className="text-[#41bfb8]">Academy</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Panel</p>
            </div>
          </Link>
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
        <nav className="px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Menu</p>

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
          <Link
            href="/api/auth/signout"
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <FiLogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </Link>
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

export default AdminSidebar;
