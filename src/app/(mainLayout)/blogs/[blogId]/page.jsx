"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsData } from "@/redux/blogSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    HiOutlineNewspaper, HiOutlineClock, HiOutlineUser,
    HiOutlineCalendar, HiOutlineArrowLeft, HiOutlineShare,
    HiOutlineBookmark, HiOutlineHeart
} from "react-icons/hi2";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const SingleBlog = () => {
    const params = useParams();
    const blogId = params.blogId;
    const dispatch = useDispatch();
    const { t, language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const { blogs = [] } = useSelector((state) => state.blogs || {});
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        dispatch(fetchBlogsData());
    }, [dispatch]);

    useEffect(() => {
        if (blogs && blogs.length > 0) {
            const foundBlog = blogs.find((b) => b._id === blogId || b.id === blogId);
            setBlog(foundBlog);

            // Get related blogs from same category
            if (foundBlog) {
                const related = blogs
                    .filter(b => b.category === foundBlog.category && (b._id !== blogId && b.id !== blogId))
                    .slice(0, 3);
                setRelatedBlogs(related);
            }
        }
    }, [blogs, blogId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [blogId]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog?.title || '')}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent((blog?.title || '') + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`,
    };

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin"></div>
                    <p className={`mt-4 text-gray-500 font-medium outfit text-center ${bengaliClass}`}>
                        {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
                    </p>
                </div>
            </div>
        );
    }

    const title = language === 'bn' && blog.titleBn ? blog.titleBn : blog.title;
    const content = language === 'bn' && blog.contentBn ? blog.contentBn : blog.content;
    const excerpt = language === 'bn' && blog.excerptBn ? blog.excerptBn : blog.excerpt;

    return (
        <div className="min-h-screen bg-[#FDFEFF]">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fffe] via-[#e8f9f8] to-[#f5f5ff] pt-10 pb-24 lg:pt-16 lg:pb-36">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-400/15 to-transparent blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-teal-300/20 to-cyan-300/20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

                {/* Floating Animated Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 right-1/4 w-20 h-20 bg-gradient-to-br from-teal-400/30 to-cyan-400/20 rounded-2xl blur-sm pointer-events-none"
                ></motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 right-1/3 w-16 h-16 bg-gradient-to-br from-amber-400/25 to-orange-300/20 rounded-full blur-sm pointer-events-none"
                ></motion.div>

                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="container mx-auto px-4 lg:px-24 relative z-10">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Link
                                href="/blogs"
                                className={`inline-flex items-center gap-2 text-gray-600 hover:text-[#41bfb8] transition-colors ${bengaliClass}`}
                            >
                                <HiOutlineArrowLeft />
                                {language === 'bn' ? 'সব ব্লগ' : 'All Blogs'}
                            </Link>
                        </motion.div>

                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-3"
                        >
                            <span className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-md text-white text-xs font-bold uppercase tracking-widest work shadow-lg shadow-teal-200/50">
                                {blog.category || 'Blog'}
                            </span>
                            {blog.featured && (
                                <span className="px-4 py-1.5 bg-gradient-to-r from-[#F79952] to-[#f97316] rounded-md text-white text-xs font-bold uppercase tracking-widest work shadow-lg shadow-orange-200/50">
                                    Featured
                                </span>
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-3xl lg:text-5xl font-extrabold outfit leading-tight tracking-tight text-gray-900 ${bengaliClass}`}
                        >
                            {title}
                        </motion.h1>

                        {/* Excerpt */}
                        {excerpt && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-base lg:text-lg text-gray-600 work font-medium leading-relaxed max-w-3xl ${bengaliClass}`}
                            >
                                {excerpt}
                            </motion.p>
                        )}

                        {/* Meta Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 pt-2"
                        >
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200">
                                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                                    <HiOutlineUser className="text-teal-600 text-sm" />
                                </div>
                                <span className="text-gray-700 font-medium work">{blog.author || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200">
                                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                                    <HiOutlineCalendar className="text-purple-600 text-sm" />
                                </div>
                                <span className="text-gray-700 font-medium work">{formatDate(blog.createdAt || blog.date)}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200">
                                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                                    <HiOutlineClock className="text-amber-600 text-sm" />
                                </div>
                                <span className="text-gray-700 font-medium work">5 min read</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 lg:px-24 -mt-24 lg:-mt-32 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Article */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xl"
                        >
                            {blog.image ? (
                                <img
                                    src={blog.image}
                                    alt={title}
                                    className="w-full aspect-video object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center">
                                    <HiOutlineNewspaper className="text-white text-7xl opacity-50" />
                                </div>
                            )}
                        </motion.div>

                        {/* Article Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12 shadow-sm"
                        >
                            {/* Content */}
                            <div className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${bengaliClass}`}>
                                {content?.split('\n').map((paragraph, idx) => (
                                    paragraph.trim() && (
                                        <p key={idx} className="mb-6 text-justify">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>

                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mt-10 pt-8 border-t border-gray-100">
                                    <h4 className={`text-sm font-bold text-gray-700 mb-4 ${bengaliClass}`}>
                                        {language === 'bn' ? 'ট্যাগস' : 'Tags'}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-gray-100 hover:bg-[#41bfb8]/10 hover:text-[#41bfb8] rounded-lg text-sm text-gray-600 transition-colors cursor-pointer"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share Section */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <h4 className={`text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 ${bengaliClass}`}>
                                    <HiOutlineShare className="text-[#41bfb8]" />
                                    {language === 'bn' ? 'শেয়ার করুন' : 'Share this article'}
                                </h4>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={shareLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a
                                        href={shareLinks.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href={shareLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                    >
                                        <FaLinkedinIn />
                                    </a>
                                    <a
                                        href={shareLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-[#25D366] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                    <button
                                        onClick={copyToClipboard}
                                        className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors relative"
                                    >
                                        <FaLink />
                                        {copied && (
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 sticky top-28 space-y-8">
                        {/* Author Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h3 className={`text-lg font-bold outfit text-gray-900 mb-4 ${bengaliClass}`}>
                                {language === 'bn' ? 'লেখক' : 'About the Author'}
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white text-2xl font-bold">
                                    {blog.author?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{blog.author || 'Admin'}</h4>
                                    <p className="text-sm text-gray-500">Content Writer</p>
                                </div>
                            </div>
                            <p className={`text-sm text-gray-500 mt-4 ${bengaliClass}`}>
                                {language === 'bn'
                                    ? 'আমাদের দক্ষ কন্টেন্ট রাইটার যিনি প্রযুক্তি ও শিক্ষা সম্পর্কিত আর্টিকেল লেখেন।'
                                    : 'Experienced content writer specializing in technology and education articles.'}
                            </p>
                        </div>

                        {/* Related Posts */}
                        {relatedBlogs.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className={`text-lg font-bold outfit text-gray-900 mb-4 ${bengaliClass}`}>
                                    {language === 'bn' ? 'সম্পর্কিত আর্টিকেল' : 'Related Articles'}
                                </h3>
                                <div className="space-y-4">
                                    {relatedBlogs.map((relatedBlog) => {
                                        const relatedTitle = language === 'bn' && relatedBlog.titleBn ? relatedBlog.titleBn : relatedBlog.title;
                                        return (
                                            <Link
                                                key={relatedBlog._id || relatedBlog.id}
                                                href={`/blogs/${relatedBlog._id || relatedBlog.id}`}
                                                className="flex gap-4 group"
                                            >
                                                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                    {relatedBlog.image ? (
                                                        <img
                                                            src={relatedBlog.image}
                                                            alt={relatedTitle}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center">
                                                            <HiOutlineNewspaper className="text-white text-lg opacity-50" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-sm font-semibold text-gray-800 group-hover:text-[#41bfb8] transition-colors line-clamp-2 ${bengaliClass}`}>
                                                        {relatedTitle}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 mt-1">
                                                        {formatDate(relatedBlog.createdAt || relatedBlog.date)}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-[#41bfb8] to-[#38a89d] rounded-xl p-6 text-white">
                            <h3 className={`text-lg font-bold outfit mb-2 ${bengaliClass}`}>
                                {language === 'bn' ? 'নিউজলেটার সাবস্ক্রাইব করুন' : 'Subscribe to Newsletter'}
                            </h3>
                            <p className={`text-sm opacity-90 mb-4 ${bengaliClass}`}>
                                {language === 'bn'
                                    ? 'সর্বশেষ আপডেট পেতে সাবস্ক্রাইব করুন'
                                    : 'Get the latest updates delivered to your inbox'}
                            </p>
                            <input
                                type="email"
                                placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                                className={`w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-colors ${bengaliClass}`}
                            />
                            <button className={`w-full mt-3 px-4 py-3 bg-white text-[#41bfb8] font-bold rounded-lg hover:bg-gray-100 transition-colors ${bengaliClass}`}>
                                {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                            </button>
                        </div>

                        {/* Back to Blogs */}
                        <Link
                            href="/blogs"
                            className={`flex items-center justify-center gap-2 w-full py-3 text-[#41bfb8] font-bold work text-sm border border-gray-200 rounded-lg hover:bg-teal-50 transition-all bg-white ${bengaliClass}`}
                        >
                            <HiOutlineArrowLeft />
                            {language === 'bn' ? 'সব ব্লগ দেখুন' : 'View All Blogs'}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleBlog;
