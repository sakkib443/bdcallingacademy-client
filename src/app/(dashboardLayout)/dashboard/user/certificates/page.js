'use client';

import React from 'react';
import { FiAward, FiDownload, FiShare2, FiClock, FiLock } from 'react-icons/fi';
import Link from 'next/link';

export default function UserCertificatesPage() {
    // Empty certificates for now
    const certificates = [];

    // Sample locked certificates (courses not completed yet)
    const lockedCertificates = [
        { id: 1, courseName: 'Complete Web Development Bootcamp', instructor: 'John Doe', estimatedCompletion: '48 hours remaining' },
        { id: 2, courseName: 'UI/UX Design Masterclass', instructor: 'Jane Smith', estimatedCompletion: '32 hours remaining' },
        { id: 3, courseName: 'Digital Marketing Course', instructor: 'Mike Johnson', estimatedCompletion: '24 hours remaining' },
    ];

    return (
        <div className="p-6 lg:p-8 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 outfit">My Certificates</h1>
                <p className="text-slate-500 mt-1">View and download your earned certificates</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <FiAward className="text-emerald-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{certificates.length}</p>
                            <p className="text-sm text-slate-500">Earned Certificates</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <FiClock className="text-amber-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{lockedCertificates.length}</p>
                            <p className="text-sm text-slate-500">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <FiShare2 className="text-purple-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">0</p>
                            <p className="text-sm text-slate-500">Shared Certificates</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earned Certificates */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <FiAward className="text-[#41bfb8]" />
                    Earned Certificates
                </h2>

                {certificates.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiAward className="text-4xl text-amber-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Certificates Yet</h3>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            Complete a course to earn your certificate. Certificates can be downloaded and shared on LinkedIn!
                        </p>
                        <Link
                            href="/dashboard/user/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#41bfb8] to-[#38a89d] text-white font-semibold rounded-xl hover:shadow-lg transition"
                        >
                            Browse My Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Certificates would be displayed here */}
                    </div>
                )}
            </div>

            {/* Locked Certificates (Courses in Progress) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <FiLock className="text-amber-500" />
                    Certificates In Progress
                </h2>

                <div className="grid gap-4">
                    {lockedCertificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                    <FiLock className="text-slate-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">{cert.courseName}</h3>
                                    <p className="text-sm text-slate-500">By {cert.instructor}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                    <FiClock size={12} />
                                    {cert.estimatedCompletion}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Processing Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <FiClock className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900">Feature Processing</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                Certificate generation and download features are currently being developed.
                                Once a course is completed, your certificate will be automatically generated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
