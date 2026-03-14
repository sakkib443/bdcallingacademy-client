'use client';

import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiSave, FiCamera, FiLoader, FiShield, FiLock } from 'react-icons/fi';

export default function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setFormData({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    phoneNumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    dateOfBirth: userData.dateOfBirth || '',
                });
            } catch (e) { }
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        alert('🔄 Profile update is processing. This feature will be available soon!');
        setIsEditing(false);
    };

    return (
        <div className="p-6 lg:p-8 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 outfit">My Profile</h1>
                <p className="text-slate-500 mt-1">Manage your personal information and account settings</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    {/* Avatar */}
                    <div className="text-center mb-6">
                        <div className="relative inline-block">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white text-4xl font-bold mx-auto">
                                {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'S'}
                            </div>
                            <button
                                onClick={() => alert('🔄 Avatar upload is processing. This feature will be available soon!')}
                                className="absolute bottom-0 right-0 w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#41bfb8] hover:border-[#41bfb8] transition shadow-sm"
                            >
                                <FiCamera size={16} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mt-4">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full uppercase">
                            {user?.role || 'Student'}
                        </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <p className="text-2xl font-bold text-slate-800">0</p>
                            <p className="text-xs text-slate-500">Courses</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                            <p className="text-2xl font-bold text-slate-800">0</p>
                            <p className="text-xs text-slate-500">Certificates</p>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-3">
                            <FiShield className="text-emerald-600" size={20} />
                            <div>
                                <p className="font-medium text-emerald-900 text-sm">Account Active</p>
                                <p className="text-xs text-emerald-700">Status: {user?.status || 'Active'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <FiUser className="text-[#41bfb8]" />
                            Personal Information
                        </h2>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#41bfb8] hover:bg-[#41bfb8]/10 rounded-lg transition"
                            >
                                <FiEdit3 size={16} />
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#41bfb8] text-white rounded-lg hover:bg-[#38a89d] transition"
                            >
                                <FiSave size={16} />
                                Save Changes
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none disabled:bg-slate-50 disabled:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none disabled:bg-slate-50 disabled:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none disabled:bg-slate-50 disabled:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                            <div className="relative">
                                <FiMapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder={isEditing ? 'Enter your address' : 'Not provided'}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none disabled:bg-slate-50 disabled:text-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Processing Notice */}
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <FiLoader className="text-amber-600 animate-spin" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-900">Profile Update Processing</h4>
                                <p className="text-sm text-amber-700 mt-1">
                                    Profile editing and password change features are currently being finalized.
                                    Your changes will be saved once this feature goes live.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <FiLock className="text-[#41bfb8]" />
                            Security
                        </h3>
                        <button
                            onClick={() => alert('🔄 Password change feature is coming soon!')}
                            className="w-full md:w-auto px-6 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-[#41bfb8] hover:text-[#41bfb8] transition flex items-center justify-center gap-2"
                        >
                            <FiLoader className="animate-spin" />
                            Change Password (Coming Soon)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
