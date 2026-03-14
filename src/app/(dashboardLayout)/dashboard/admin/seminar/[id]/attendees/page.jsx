'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft, FiSearch, FiPhone, FiMail,
  FiDownload, FiUsers, FiCalendar,
  FiClock, FiMapPin, FiVideo, FiFileText
} from 'react-icons/fi';

const API_BASE = 'http://localhost:5000/api';

export default function SeminarAttendees() {
  const { id } = useParams();

  const [seminar, setSeminar] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [semRes, attRes] = await Promise.all([
        fetch(`${API_BASE}/seminars/${id}`),
        fetch(`${API_BASE}/seminars/${id}/attendees`),
      ]);
      const semData = await semRes.json();
      const attData = await attRes.json();

      setSeminar(semData.data);
      setAttendees(attData.data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  // Filter
  const filtered = attendees.filter(a => {
    const q = search.toLowerCase();
    return (
      a.name?.toLowerCase().includes(q) ||
      a.phone?.includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.location?.toLowerCase().includes(q)
    );
  });

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const formatTime = (d) =>
    d ? new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '';

  // ========================================
  // Export as CSV (Google Sheets compatible)
  // ========================================
  const exportCSV = () => {
    const BOM = '\uFEFF'; // UTF-8 BOM for Excel/Sheets support
    const headers = ['SL', 'Name', 'Phone', 'Email', 'Location', 'Joined At'];
    const rows = filtered.map((a, i) => [
      i + 1,
      a.name,
      a.phone,
      a.email,
      a.location || '-',
      new Date(a.joinedAt || a.createdAt).toLocaleString('en-US'),
    ]);
    const csvContent = BOM + [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${seminar?.title || 'seminar'}_live_attendees.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ========================================
  // Export as Excel (.xlsx using simple XML)
  // ========================================
  const exportExcel = () => {
    const headers = ['SL', 'Name', 'Phone', 'Email', 'Location', 'Joined At'];
    const rows = filtered.map((a, i) => [
      i + 1,
      a.name,
      a.phone,
      a.email,
      a.location || '-',
      new Date(a.joinedAt || a.createdAt).toLocaleString('en-US'),
    ]);

    let tableHTML = '<table>';
    tableHTML += '<tr>' + headers.map(h => `<th style="background:#41bfb8;color:white;font-weight:bold;padding:8px;border:1px solid #ddd;">${h}</th>`).join('') + '</tr>';
    rows.forEach(row => {
      tableHTML += '<tr>' + row.map(cell => `<td style="padding:6px;border:1px solid #ddd;">${cell}</td>`).join('') + '</tr>';
    });
    tableHTML += '</table>';

    const excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>Live Attendees</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
      </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
      <body>${tableHTML}</body></html>
    `;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${seminar?.title || 'seminar'}_live_attendees.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard/admin/seminar"
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors mt-1"
          >
            <FiArrowLeft />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-800 outfit">Live Attendees</h1>
              <span className="px-2.5 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block mr-1 animate-pulse"></span>
                LIVE
              </span>
            </div>
            <p className="text-slate-500 text-sm work line-clamp-1">
              {seminar?.title} • {formatDate(seminar?.date)} • {seminar?.startTime} - {seminar?.endTime}
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-all text-sm"
          >
            <FiFileText className="text-green-600" /> CSV
          </button>
          <button
            onClick={exportExcel}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all text-sm shadow-md"
          >
            <FiDownload /> Excel Download
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Total Joined</p>
          <p className="text-3xl font-bold outfit text-[#41bfb8]">{attendees.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Max Seats</p>
          <p className="text-3xl font-bold outfit text-slate-800">{seminar?.maxSeats || '-'}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Type</p>
          <p className="text-lg font-bold outfit text-slate-600 capitalize">{seminar?.type || '-'}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Status</p>
          <p className={`text-lg font-bold outfit capitalize ${seminar?.isLiveToday ? 'text-red-500' : 'text-slate-600'}`}>
            {seminar?.isLiveToday ? '🔴 Live' : seminar?.status}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" placeholder="Search by name, phone, email or location..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Attendees Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FiUsers className="text-4xl text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">No attendees found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((att, index) => (
                  <tr key={att._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-slate-400">{index + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {att.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{att.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <a href={`tel:${att.phone}`} className="text-sm text-slate-600 hover:text-[#41bfb8] transition-colors flex items-center gap-1.5">
                        <FiPhone className="text-xs text-slate-400" />
                        {att.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-500 flex items-center gap-1.5">
                        <FiMail className="text-xs text-slate-400" />
                        <span className="truncate max-w-[180px]">{att.email}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {att.location ? (
                        <span className="text-sm text-slate-600 flex items-center gap-1.5">
                          <FiMapPin className="text-xs text-slate-400" />
                          {att.location}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-xs text-slate-500">
                        <div>{formatDate(att.joinedAt || att.createdAt)}</div>
                        <div className="text-slate-400">{formatTime(att.joinedAt || att.createdAt)}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400">
                Showing {filtered.length} of {attendees.length} attendees
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
