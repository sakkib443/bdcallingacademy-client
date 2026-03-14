"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsData } from "@/redux/blogSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    HiOutlineNewspaper, HiOutlineSparkles, HiOutlineClock,
    HiOutlineUser, HiOutlineArrowRight, HiOutlineTag
} from "react-icons/hi2";
import { LuSearch, LuFilter, LuCalendar } from "react-icons/lu";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

// Loading fallback component
const LoadingFallback = () => (
    <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
    </div>
);

// Blog Card Component
const BlogCard = ({ blog, bengaliClass, language }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const title = language === 'bn' && blog.titleBn ? blog.titleBn : blog.title;
    const excerpt = language === 'bn' && blog.excerptBn ? blog.excerptBn : (blog.excerpt || blog.content?.substring(0, 150) + '...');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#41bfb8]/30 transition-all duration-300"
        >
            {/* Image */}
            <Link href={`/blogs/${blog._id || blog.id}`} className="block relative overflow-hidden aspect-[16/9]">
                {blog.image ? (
                    <img
                        src={blog.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center">
                        <HiOutlineNewspaper className="text-white text-5xl opacity-50" />
                    </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#41bfb8]">
                        {blog.category || 'Blog'}
                    </span>
                </div>
                {/* Featured Badge */}
                {blog.featured && (
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#F79952] to-[#f97316] rounded-full text-xs font-bold text-white flex items-center gap-1">
                            <HiOutlineSparkles className="text-sm" />
                            Featured
                        </span>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <LuCalendar className="text-[#41bfb8]" />
                        <span>{formatDate(blog.createdAt || blog.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <HiOutlineUser className="text-[#41bfb8]" />
                        <span>{blog.author || 'Admin'}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/blogs/${blog._id || blog.id}`}>
                    <h3 className={`text-xl font-bold outfit text-gray-800 group-hover:text-[#41bfb8] transition-colors line-clamp-2 leading-tight ${bengaliClass}`}>
                        {title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className={`text-gray-500 work text-sm line-clamp-3 leading-relaxed ${bengaliClass}`}>
                    {excerpt}
                </p>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read More */}
                <Link
                    href={`/blogs/${blog._id || blog.id}`}
                    className={`inline-flex items-center gap-2 text-[#41bfb8] font-semibold text-sm group-hover:gap-3 transition-all ${bengaliClass}`}
                >
                    {language === 'bn' ? 'আরও পড়ুন' : 'Read More'}
                    <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </motion.div>
    );
};

// Featured Blog Card (Bigger)
const FeaturedBlogCard = ({ blog, bengaliClass, language }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const title = language === 'bn' && blog.titleBn ? blog.titleBn : blog.title;
    const excerpt = language === 'bn' && blog.excerptBn ? blog.excerptBn : (blog.excerpt || blog.content?.substring(0, 250) + '...');

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <Link href={`/blogs/${blog._id || blog.id}`} className="block relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full">
                    {blog.image ? (
                        <img
                            src={blog.image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center min-h-[300px]">
                            <HiOutlineNewspaper className="text-white text-7xl opacity-50" />
                        </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-b lg:from-transparent lg:to-black/10"></div>
                </Link>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center space-y-6">
                    {/* Badges */}
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-[#F79952] to-[#f97316] rounded-md text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                            <HiOutlineSparkles />
                            Featured
                        </span>
                        <span className="px-4 py-1.5 bg-[#41bfb8]/10 rounded-md text-xs font-bold text-[#41bfb8] uppercase tracking-wider">
                            {blog.category || 'Blog'}
                        </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blogs/${blog._id || blog.id}`}>
                        <h2 className={`text-2xl lg:text-3xl font-bold outfit text-gray-800 group-hover:text-[#41bfb8] transition-colors leading-tight ${bengaliClass}`}>
                            {title}
                        </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className={`text-gray-500 work text-base leading-relaxed line-clamp-4 ${bengaliClass}`}>
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#41bfb8]/10 flex items-center justify-center">
                                <HiOutlineUser className="text-[#41bfb8]" />
                            </div>
                            <span className="font-medium">{blog.author || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#41bfb8]/10 flex items-center justify-center">
                                <LuCalendar className="text-[#41bfb8]" />
                            </div>
                            <span>{formatDate(blog.createdAt || blog.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#41bfb8]/10 flex items-center justify-center">
                                <HiOutlineClock className="text-[#41bfb8]" />
                            </div>
                            <span>5 min read</span>
                        </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                        href={`/blogs/${blog._id || blog.id}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-[#41bfb8] text-white font-bold rounded-lg hover:bg-[#38a89d] transition-all self-start ${bengaliClass}`}
                    >
                        {language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Full Article'}
                        <HiOutlineArrowRight />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const BlogContent = () => {
    const dispatch = useDispatch();
    const { blogs = [], loading } = useSelector((state) => state.blogs || {});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;
    const { t, language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchBlogsData());
    }, [dispatch]);

    // Get all unique categories
    const categories = [...new Set(blogs.filter(b => b.category).map(b => b.category))];

    // Filter blogs
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.titleBn?.includes(searchQuery) ||
            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || blog.category === selectedCategory;
        const isPublished = blog.status !== 'draft';
        return matchesSearch && matchesCategory && isPublished;
    });

    // Get featured blogs (maximum 1)
    const featuredBlogs = filteredBlogs.filter(blog => blog.featured).slice(0, 1);

    // Get regular blogs (excluding featured ones)
    const regularBlogs = filteredBlogs.filter(blog => !featuredBlogs.includes(blog));

    // Pagination
    const totalPages = Math.ceil(regularBlogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const paginatedBlogs = regularBlogs.slice(startIndex, startIndex + blogsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <section className="relative bg-gradient-to-br from-[#e8f9f9] via-white to-[#e8f9f9] overflow-hidden border-b border-gray-200">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(65,191,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,191,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Gradient Orbs */}
                <div className="absolute top-10 left-10 w-60 h-60 bg-[#41bfb8]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#F79952]/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 lg:px-16 py-10 lg:py-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-[#41bfb8]/10 border border-[#41bfb8]/20 rounded-full">
                            <HiOutlineNewspaper className="text-[#41bfb8] text-base" />
                            <span className={`text-xs font-medium text-gray-700 work ${bengaliClass}`}>
                                {language === 'bn' ? 'আমাদের ব্লগ' : 'Our Blog'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold outfit text-gray-800 mb-2 ${bengaliClass}`}>
                            {language === 'bn' ? 'জ্ঞান ও ' : 'Knowledge & '}
                            <span className="text-[#41bfb8]">{language === 'bn' ? 'অনুপ্রেরণা' : 'Inspiration'}</span>
                        </h1>

                        {/* Description */}
                        <p className={`text-gray-500 work text-sm leading-relaxed mb-6 ${bengaliClass}`}>
                            {language === 'bn'
                                ? 'আমাদের ব্লগে সর্বশেষ প্রযুক্তি, টিপস এবং সাফল্যের গল্প পড়ুন'
                                : 'Read the latest technology insights, tips, and success stories from our blog'}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-[#41bfb8]/10 rounded-md flex items-center justify-center">
                                    <HiOutlineNewspaper className="text-[#41bfb8] text-base" />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg font-bold text-gray-800 outfit">{blogs.length || '0'}+</p>
                                    <p className={`text-xs text-gray-500 work ${bengaliClass}`}>
                                        {language === 'bn' ? 'আর্টিকেল' : 'Articles'}
                                    </p>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-[#F79952]/10 rounded-md flex items-center justify-center">
                                    <HiOutlineTag className="text-[#F79952] text-base" />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg font-bold text-gray-800 outfit">{categories.length}+</p>
                                    <p className={`text-xs text-gray-500 work ${bengaliClass}`}>
                                        {language === 'bn' ? 'ক্যাটেগরি' : 'Categories'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 lg:px-16 py-8 lg:py-12">
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={language === 'bn' ? 'ব্লগ খুঁজুন...' : 'Search blogs...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all ${bengaliClass}`}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`w-full md:w-48 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all appearance-none bg-white ${bengaliClass}`}
                            >
                                <option value="">{language === 'bn' ? 'সব ক্যাটেগরি' : 'All Categories'}</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <LuFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <LoadingFallback />
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiOutlineNewspaper className="text-3xl text-gray-400" />
                        </div>
                        <h3 className={`text-xl font-bold text-gray-700 outfit mb-2 ${bengaliClass}`}>
                            {language === 'bn' ? 'কোনো ব্লগ পাওয়া যায়নি' : 'No blogs found'}
                        </h3>
                        <p className={`text-gray-500 work ${bengaliClass}`}>
                            {language === 'bn' ? 'অন্য শব্দ দিয়ে খুঁজুন' : 'Try searching with different keywords'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Featured Blog */}
                        {featuredBlogs.length > 0 && currentPage === 1 && (
                            <div className="mb-10">
                                <FeaturedBlogCard
                                    blog={featuredBlogs[0]}
                                    bengaliClass={bengaliClass}
                                    language={language}
                                />
                            </div>
                        )}

                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {paginatedBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id || blog.id}
                                    blog={blog}
                                    bengaliClass={bengaliClass}
                                    language={language}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FiChevronLeft />
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    // Show first page, last page, current page, and pages around current
                                    if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage)) {
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${currentPage === i + 1
                                                        ? 'bg-[#41bfb8] text-white shadow-lg shadow-teal-100'
                                                        : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    } else if (i === currentPage - 3 || i === currentPage + 1) {
                                        return <span key={i} className="px-2 text-gray-400">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

const Blogs = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <BlogContent />
        </Suspense>
    );
};

export default Blogs;
