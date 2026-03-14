'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiCamera, FiSave, FiBook, FiAward, FiStar, FiLink } from 'react-icons/fi';

export default function MentorProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Mentor User',
        email: 'mentor@bdcalling.com',
        phone: '+880 1712 345 678',
        designation: 'Senior Instructor',
        specialization: 'Full Stack Development',
        address: 'Dhaka, Bangladesh',
        bio: 'Passionate educator with 8+ years of experience in web development. Specialized in MERN stack and modern JavaScript frameworks.',
        website: 'www.mentorprofile.com',
        linkedin: 'linkedin.com/in/mentor',
        github: 'github.com/mentor',
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userObj = JSON.parse(user);
                setProfile(prev => ({
                    ...prev,
                    name: userObj.name || prev.name,
                    email: userObj.email || prev.email,
                }));
            } catch (e) { }
        }
    }, []);

    const stats = [
        { label: 'Courses', value: 5, icon: FiBook, color: '#F79952' },
        { label: 'Students', value: 120, icon: FiUser, color: '#41bfb8' },
        { label: 'Reviews', value: 156, icon: FiStar, color: '#EAB308' },
        { label: 'Certificates', value: 8, icon: FiAward, color: '#8B5CF6' },
    ];

    const skills = [
        'React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'TypeScript', 'Next.js', 'TailwindCSS'
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">My Profile</h1>
                    <p className="text-slate-500 text-sm work">Manage your profile information</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditing
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-[#41bfb8] text-white hover:bg-[#38a89d]'
                        }`}
                >
                    {isEditing ? <><FiSave /> Save Changes</> : <><FiEdit /> Edit Profile</>}
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-lg">
                                <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white text-3xl font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 bg-[#41bfb8] text-white rounded-full shadow-md">
                                    <FiCamera size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 pb-6 px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 outfit">{profile.name}</h2>
                            <p className="text-[#41bfb8] font-medium">{profile.designation}</p>
                            <p className="text-sm text-slate-500">{profile.specialization}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {stats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.label} className="text-center">
                                        <p className="text-2xl font-bold text-slate-800 outfit">{stat.value}</p>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <Icon size={12} style={{ color: stat.color }} />
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Info */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 outfit">Personal Information</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                    <FiUser className="text-slate-400" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="flex-1 bg-transparent outline-none text-sm text-slate-800"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-800">{profile.name}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                    <FiMail className="text-slate-400" />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="flex-1 bg-transparent outline-none text-sm text-slate-800"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-800">{profile.email}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                    <FiPhone className="text-slate-400" />
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="flex-1 bg-transparent outline-none text-sm text-slate-800"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-800">{profile.phone}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                    <FiMapPin className="text-slate-400" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            className="flex-1 bg-transparent outline-none text-sm text-slate-800"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-800">{profile.address}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Bio</label>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                                {isEditing ? (
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        rows={3}
                                        className="w-full bg-transparent outline-none text-sm text-slate-800 resize-none"
                                    />
                                ) : (
                                    <p className="text-sm text-slate-600">{profile.bio}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills & Links */}
                <div className="space-y-6">
                    {/* Skills */}
                    <div className="bg-white rounded-xl border border-slate-200">
                        <div className="p-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 outfit">Skills</h2>
                        </div>
                        <div className="p-5">
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-[#41bfb8]/10 text-[#41bfb8] text-sm font-medium rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-xl border border-slate-200">
                        <div className="p-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 outfit">Social Links</h2>
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                <FiLink className="text-slate-400" />
                                <span className="text-sm text-slate-600">{profile.website}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                <FiLink className="text-slate-400" />
                                <span className="text-sm text-slate-600">{profile.linkedin}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                                <FiLink className="text-slate-400" />
                                <span className="text-sm text-slate-600">{profile.github}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
