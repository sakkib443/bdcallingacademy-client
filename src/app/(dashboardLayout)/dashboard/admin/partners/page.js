'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartners, deletePartner } from '@/redux/partnerSlice';
import {
    FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiLink
} from 'react-icons/fi';

export default function AdminPartnerList() {
    const dispatch = useDispatch();
    const { partners = [], loading, error } = useSelector((state) => state.partners || {});
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const partnersPerPage = 10;

    useEffect(() => {
        dispatch(fetchPartners());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deletePartner(id)).unwrap();
            setDeleteConfirm(null);
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const filteredPartners = partners.filter(partner =>
        partner.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);
    const startIndex = (currentPage - 1) * partnersPerPage;
    const paginatedPartners = filteredPartners.slice(startIndex, startIndex + partnersPerPage);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 outfit">Working Partners</h1>
                    <p className="text-slate-500 text-sm work">Manage your collaborators and partners</p>
                </div>
                <Link
                    href="/dashboard/admin/partners/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all shadow-lg shadow-teal-100"
                >
                    <FiPlus className="text-lg" />
                    Add New Partner
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-slate-500 text-xs font-medium work uppercase tracking-wider">Total Partners</p>
                    <p className="text-3xl font-bold text-slate-800 mt-2 outfit">{partners.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-slate-500 text-xs font-medium work uppercase tracking-wider">Our Concern</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2 outfit">
                        {partners.filter(p => p.category === 'Our Concern').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-slate-500 text-xs font-medium work uppercase tracking-wider">Colaboration</p>
                    <p className="text-3xl font-bold text-[#F79952] mt-2 outfit">
                        {partners.filter(p => p.category === 'Colaboration With').length}
                    </p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search partners by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Partner Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-10 h-10 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500">Loading partners...</p>
                    </div>
                ) : error ? (
                    <div className="p-12 text-center">
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                ) : paginatedPartners.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiPlus className="text-2xl text-slate-400" />
                        </div>
                        <p className="text-slate-500 mb-4">No partners found</p>
                        <Link
                            href="/dashboard/admin/partners/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all"
                        >
                            <FiPlus />
                            Add Your First Partner
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Partner</th>
                                        <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Link</th>
                                        <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedPartners.map((partner, idx) => (
                                        <tr key={partner._id || idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0 p-1">
                                                        <img src={partner.image} alt={partner.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-slate-800 truncate max-w-[250px]">{partner.name}</h3>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${partner.category === 'Our Concern' ? 'bg-indigo-50 text-indigo-600' :
                                                        partner.category === 'Colaboration With' ? 'bg-orange-50 text-[#F79952]' :
                                                            'bg-purple-50 text-purple-600'
                                                    }`}>
                                                    {partner.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {partner.link ? (
                                                    <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#41bfb8] hover:underline">
                                                        <FiLink size={14} />
                                                        Visit Site
                                                    </a>
                                                ) : (
                                                    <span className="text-sm text-slate-400">No link</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/admin/partners/${partner._id}`}
                                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteConfirm(partner._id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                                <p className="text-sm text-slate-500">
                                    Showing {startIndex + 1} to {Math.min(startIndex + partnersPerPage, filteredPartners.length)} of {filteredPartners.length} partners
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <FiChevronLeft />
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-8 h-8 rounded-lg font-medium text-sm transition-all ${currentPage === i + 1
                                                ? 'bg-[#41bfb8] text-white'
                                                : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-800 outfit mb-2">Delete Partner?</h3>
                        <p className="text-slate-500 mb-6">Are you sure you want to delete this partner? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
