'use client';

import React, { useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
  FiChevronDown,
  FiDownload,
} from 'react-icons/fi';

export default function CertificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with real data from your API
  const certifications = [
    {
      id: 1,
      title: 'Web Development Professional',
      code: 'WEB-PRO-001',
      course: 'Web Development Mastery',
      students: 18,
      issueDate: '2024-01-15',
      expiryDate: '2026-01-15',
      status: 'Active',
      validity: '2 years',
    },
    {
      id: 2,
      title: 'Digital Marketing Expert',
      code: 'DM-EXP-002',
      course: 'Digital Marketing Pro',
      students: 12,
      issueDate: '2024-02-20',
      expiryDate: '2025-02-20',
      status: 'Expiring Soon',
      validity: '1 year',
    },
    {
      id: 3,
      title: 'UI/UX Design Master',
      code: 'UIUX-MAE-003',
      course: 'UI/UX Design Advanced',
      students: 9,
      issueDate: '2024-03-10',
      expiryDate: '2027-03-10',
      status: 'Active',
      validity: '3 years',
    },
    {
      id: 4,
      title: 'Python Data Science',
      code: 'PDS-001-004',
      course: 'Python Data Science',
      students: 24,
      issueDate: '2023-12-01',
      expiryDate: '2025-12-01',
      status: 'Expired',
      validity: '2 years',
    },
    {
      id: 5,
      title: 'Business Analytics Pro',
      code: 'BA-PRO-005',
      course: 'Business Analytics',
      students: 7,
      issueDate: '2024-04-05',
      expiryDate: '2026-04-05',
      status: 'Active',
      validity: '2 years',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Expiring Soon':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Expired':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-blue-50 text-blue-700 border border-blue-200';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Certifications</h1>
        <p className="text-slate-600 mt-2">Manage certification programs and credentials</p>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            <FiDownload size={18} />
            <span>Export</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg btn-gradient text-white font-medium hover:shadow-lg transition">
            <FiPlus size={20} />
            <span>New Certificate</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-600 text-sm">Total Certifications</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">5</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">3</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-600 text-sm">Expiring Soon</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">1</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-slate-600 text-sm">Expired</p>
          <p className="text-2xl font-bold text-red-600 mt-1">1</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Certificate Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Code
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Associated Course
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Issued
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Expires
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr
                  key={cert.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{cert.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {cert.students} students issued
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="bg-slate-100 px-2 py-1 rounded text-sm text-slate-700">
                      {cert.code}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{cert.course}</td>
                  <td className="px-6 py-4 text-center text-slate-600">
                    {cert.issueDate}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600">
                    {cert.expiryDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        cert.status
                      )}`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                        <FiEye size={18} />
                      </button>
                      <button className="p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-600">Showing 1 to 5 of 5 results</p>
        </div>
      </div>
    </div>
  );
}

