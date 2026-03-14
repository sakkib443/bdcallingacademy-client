'use client';

import React, { useState, useEffect } from 'react';
import { FiSettings, FiSave, FiRefreshCw } from 'react-icons/fi';
import { LuGlobe, LuPhone, LuMail, LuMapPin, LuFacebook, LuYoutube, LuLinkedin } from 'react-icons/lu';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        // Hero Section - English
        heroBadge: '',
        heroHeading1: '',
        heroHeading2: '',
        heroHeadingWith: '',
        heroAcademyName: '',
        heroDescription: '',

        // Hero Section - Bengali
        heroBadgeBn: '',
        heroHeading1Bn: '',
        heroHeading2Bn: '',
        heroHeadingWithBn: '',
        heroAcademyNameBn: '',
        heroDescriptionBn: '',

        // Contact Information
        phoneNumber: '',
        whatsappNumber: '',
        email: '',
        address: '',
        addressBn: '',

        // Social Links
        facebookUrl: '',
        youtubeUrl: '',
        linkedinUrl: '',
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/settings`, { cache: "no-store" });
            const data = await response.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_URL}/api/settings`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Settings saved successfully!' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to save settings' });
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 mt-3">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 outfit flex items-center gap-3">
                    <FiSettings className="text-[#41bfb8]" />
                    Design & Settings
                </h1>
                <p className="text-gray-500 text-sm mt-1">ওয়েবসাইটের কন্টেন্ট, ডিজাইন এবং যোগাযোগের তথ্য পরিচালনা করুন</p>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Hero Section - English */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LuGlobe className="text-[#41bfb8]" />
                            <h2 className="text-lg font-semibold text-gray-800">Hero Section (English)</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                                <input
                                    type="text"
                                    name="heroBadge"
                                    value={settings.heroBadge}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading 1</label>
                                    <input
                                        type="text"
                                        name="heroHeading1"
                                        value={settings.heroHeading1}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading 2</label>
                                    <input
                                        type="text"
                                        name="heroHeading2"
                                        value={settings.heroHeading2}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">"With" Text</label>
                                    <input
                                        type="text"
                                        name="heroHeadingWith"
                                        value={settings.heroHeadingWith}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Academy Name</label>
                                    <input
                                        type="text"
                                        name="heroAcademyName"
                                        value={settings.heroAcademyName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="heroDescription"
                                    value={settings.heroDescription}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hero Section - Bengali */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LuGlobe className="text-[#F79952]" />
                            <h2 className="text-lg font-semibold text-gray-800">Hero Section (বাংলা)</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ব্যাজ টেক্সট</label>
                                <input
                                    type="text"
                                    name="heroBadgeBn"
                                    value={settings.heroBadgeBn}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম ১</label>
                                    <input
                                        type="text"
                                        name="heroHeading1Bn"
                                        value={settings.heroHeading1Bn}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম ২</label>
                                    <input
                                        type="text"
                                        name="heroHeading2Bn"
                                        value={settings.heroHeading2Bn}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">"সাথে" টেক্সট</label>
                                    <input
                                        type="text"
                                        name="heroHeadingWithBn"
                                        value={settings.heroHeadingWithBn}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">একাডেমির নাম</label>
                                    <input
                                        type="text"
                                        name="heroAcademyNameBn"
                                        value={settings.heroAcademyNameBn}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
                                <textarea
                                    name="heroDescriptionBn"
                                    value={settings.heroDescriptionBn}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LuPhone className="text-[#41bfb8]" />
                            <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuPhone className="inline mr-1" /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={settings.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+88 01335202802"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <span className="p-1 bg-green-100 rounded text-green-600">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 69.4 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.2 3.7-5.6 5.5-9.3 1.9-3.7.9-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 14.1 4.5 26.9 3.9 37 2.4 11.3-1.7 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                                    </span>
                                    WhatsApp Number
                                </label>
                                <input
                                    type="text"
                                    name="whatsappNumber"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => {
                                        // Strictly allow only numbers
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        setSettings(prev => ({ ...prev, whatsappNumber: value }));
                                    }}
                                    placeholder="8801335202802"
                                    maxLength={15}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-green-50 focus:border-green-400 outline-none text-lg font-mono transition-all"
                                />
                                <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <span>📝</span> সঠিক ফরম্যাট:
                                    </h4>
                                    <ul className="space-y-1.5 text-xs text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            <code className="bg-white px-2 py-0.5 rounded border">8801335202802</code>
                                            <span className="text-gray-400">- Country code সহ, শুধু সংখ্যা</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-red-500">✗</span>
                                            <code className="bg-red-50 px-2 py-0.5 rounded border border-red-200 line-through">+8801335202802</code>
                                            <span className="text-gray-400">- প্লাস চিহ্ন দেবেন না</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-red-500">✗</span>
                                            <code className="bg-red-50 px-2 py-0.5 rounded border border-red-200 line-through">880-132-123-1802</code>
                                            <span className="text-gray-400">- ড্যাশ বা স্পেস দেবেন না</span>
                                        </li>
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-green-200 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500">🔗 Live Preview:</span>
                                        <a
                                            href={`https://wa.me/${settings.whatsappNumber || ''}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-mono text-green-600 bg-white px-3 py-1 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                                        >
                                            wa.me/{settings.whatsappNumber || 'your_number'}
                                        </a>
                                    </div>
                                </div>
                                {settings.whatsappNumber && settings.whatsappNumber.length < 10 && (
                                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1 bg-red-50 p-2 rounded-lg">
                                        <span>⚠️</span> নম্বরটি সম্পূর্ণ মনে হচ্ছে না। Country code (88) সহ সম্পূর্ণ নম্বর দিন।
                                    </p>
                                )}
                                {settings.whatsappNumber && settings.whatsappNumber.length >= 10 && (
                                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1 bg-green-50 p-2 rounded-lg">
                                        <span>✅</span> নম্বরটি সঠিক মনে হচ্ছে! WhatsApp বাটনে ক্লিক করে টেস্ট করুন।
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuMail className="inline mr-1" /> Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuMapPin className="inline mr-1" /> Address (English)
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuMapPin className="inline mr-1" /> ঠিকানা (বাংলা)
                                </label>
                                <input
                                    type="text"
                                    name="addressBn"
                                    value={settings.addressBn}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <LuGlobe className="text-[#41bfb8]" />
                            <h2 className="text-lg font-semibold text-gray-800">Social Links</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuFacebook className="inline mr-1 text-blue-600" /> Facebook URL
                                </label>
                                <input
                                    type="url"
                                    name="facebookUrl"
                                    value={settings.facebookUrl}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuYoutube className="inline mr-1 text-red-600" /> YouTube URL
                                </label>
                                <input
                                    type="url"
                                    name="youtubeUrl"
                                    value={settings.youtubeUrl}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <LuLinkedin className="inline mr-1 text-blue-700" /> LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    name="linkedinUrl"
                                    value={settings.linkedinUrl}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#41bfb8] hover:bg-[#38a89d] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave />
                                Save Settings
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={fetchSettings}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        <FiRefreshCw />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
