'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updatePartner, fetchPartners } from '@/redux/partnerSlice';
import { FiArrowLeft, FiSave, FiImage, FiType, FiLayers, FiLink } from 'react-icons/fi';
import Link from 'next/link';

const categories = ['Our Concern', 'Colaboration With', 'Member Of'];

export default function EditPartner() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { partners = [] } = useSelector((state) => state.partners || {});

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Our Concern',
        image: '',
        link: ''
    });

    useEffect(() => {
        if (partners.length === 0) {
            dispatch(fetchPartners());
        } else {
            const partner = partners.find(p => (p._id || p.id) === id);
            if (partner) {
                setFormData({
                    name: partner.name || '',
                    category: partner.category || 'Our Concern',
                    image: partner.image || '',
                    link: partner.link || ''
                });
            }
        }
    }, [id, partners, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(updatePartner({ id, partnerData: formData })).unwrap();
            router.push('/dashboard/admin/partners');
        } catch (err) {
            console.error('Failed to update partner:', err);
            alert('Failed to update partner');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        href="/dashboard/admin/partners"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#41bfb8] transition-colors mb-2"
                    >
                        <FiArrowLeft />
                        <span>Back to Partners</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">Edit Partner</h1>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <FiType className="text-[#41bfb8]" />
                                Partner Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter partner name"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <FiLayers className="text-[#41bfb8]" />
                                Category
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all appearance-none bg-white"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <FiImage className="text-[#41bfb8]" />
                                Logo Image URL
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/logo.png"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all"
                            />
                        </div>

                        {/* Link URL */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <FiLink className="text-[#41bfb8]" />
                                Website Link (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="https://partner-website.com"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Image Preview */}
                    {formData.image && (
                        <div className="mt-4 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider text-center">Logo Preview</p>
                            <div className="flex justify-center">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="max-h-24 object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#41bfb8] text-white font-bold rounded-xl hover:bg-[#38a89d] transition-all shadow-lg shadow-teal-100 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <FiSave />
                            )}
                            {loading ? 'Updating...' : 'Update Partner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
