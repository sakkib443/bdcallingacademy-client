'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft, FiSearch, FiPhone, FiMail,
  FiChevronDown, FiDownload, FiUsers, FiCalendar,
  FiBarChart2, FiCheck, FiX, FiMessageSquare
} from 'react-icons/fi';
import { MdOutlinePhoneCallback } from 'react-icons/md';

const API_BASE = 'http://localhost:5000/api';

// Call status config
const callStatusConfig = {
  not_called: { label: 'Not Called', color: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  called: { label: 'Called', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  interested: { label: 'Interested', color: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  not_interested: { label: 'Not Interested', color: 'bg-red-50 text-red-600', dot: 'bg-red-400' },
  enrolled: { label: 'Enrolled ✅', color: 'bg-teal-50 text-teal-700', dot: 'bg-teal-500' },
};

export default function SeminarRegistrations() {
  const { id } = useParams();

  const [seminar, setSeminar] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);
  const [noteModal, setNoteModal] = useState(null); // { reg, note }

  const fetchData = async () => {
    try {
      const [semRes, regRes, statRes] = await Promise.all([
        fetch(`${API_BASE}/seminars/${id}`),
        fetch(`${API_BASE}/seminars/${id}/registrations?limit=200`),
        fetch(`${API_BASE}/seminars/${id}/registrations/stats`),
      ]);
      const semData = await semRes.json();
      const regData = await regRes.json();
      const statData = await statRes.json();

      setSeminar(semData.data);
      setRegistrations(regData.data || []);
      setStats(statData.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const updateCallStatus = async (regId, callStatus, callNotes = '') => {
    setUpdatingId(regId);
    try {
      await fetch(`${API_BASE}/seminars/registrations/${regId}/call-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callStatus, callNotes }),
      });
      setRegistrations(prev =>
        prev.map(r => r._id === regId ? { ...r, callStatus, callNotes } : r)
      );
      // Update stats
      fetchData();
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Export to CSV (Google Sheets compatible)
  const exportCSV = () => {
    const BOM = '\uFEFF';
    const headers = ['SL', 'Name', 'Phone', 'Email', 'Course Interest', 'Source', 'Call Status', 'Notes', 'Registered At'];
    const rows = filteredRegs.map((r, i) => [
      i + 1,
      r.name, r.phone, r.email,
      r.courseInterest || '-',
      r.source || '-',
      callStatusConfig[r.callStatus]?.label || r.callStatus,
      r.callNotes || '-',
      new Date(r.createdAt).toLocaleString('en-US'),
    ]);
    const csvContent = BOM + [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${seminar?.title || 'seminar'}_registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to Excel
  const exportExcel = () => {
    const headers = ['SL', 'Name', 'Phone', 'Email', 'Course Interest', 'Source', 'Call Status', 'Notes', 'Registered At'];
    const rows = filteredRegs.map((r, i) => [
      i + 1,
      r.name, r.phone, r.email,
      r.courseInterest || '-',
      r.source || '-',
      callStatusConfig[r.callStatus]?.label || r.callStatus,
      r.callNotes || '-',
      new Date(r.createdAt).toLocaleString('en-US'),
    ]);
    let tableHTML = '<table>';
    tableHTML += '<tr>' + headers.map(h => `<th style="background:#41bfb8;color:white;font-weight:bold;padding:8px;border:1px solid #ddd;">${h}</th>`).join('') + '</tr>';
    rows.forEach(row => {
      tableHTML += '<tr>' + row.map(cell => `<td style="padding:6px;border:1px solid #ddd;">${cell}</td>`).join('') + '</tr>';
    });
    tableHTML += '</table>';
    const excelContent = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Registrations</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${tableHTML}</body></html>`;
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${seminar?.title || 'seminar'}_registrations.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter
  const filteredRegs = registrations.filter(r => {
    const matchSearch =
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search) ||
      r.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.callStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

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
            <h1 className="text-2xl font-bold text-slate-800 outfit">Registrations</h1>
            <p className="text-slate-500 text-sm work line-clamp-1">
              {seminar?.title} • {formatDate(seminar?.date)} • {seminar?.startTime}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-all text-sm"
          >
            <FiDownload /> CSV
          </button>
          <button
            onClick={exportExcel}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all text-sm shadow-md"
          >
            <FiDownload /> Excel
          </button>
          <Link
            href={`/dashboard/admin/seminar/create?id=${id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all text-sm shadow-md shadow-teal-100"
          >
            Edit Seminar
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'text-slate-800', bg: 'bg-white' },
            { label: 'Not Called', value: stats.notCalled, color: 'text-slate-500', bg: 'bg-slate-50' },
            { label: 'Called', value: stats.called, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Interested', value: stats.interested, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Enrolled', value: stats.enrolled, color: 'text-teal-700', bg: 'bg-teal-50' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl border border-slate-200 p-4 text-center`}>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-bold outfit ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text" placeholder="Search by name, phone or email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all text-sm"
            />
          </div>
          <select
            value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white outline-none focus:border-[#41bfb8]"
          >
            <option value="all">All Status</option>
            {Object.entries(callStatusConfig).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredRegs.length === 0 ? (
          <div className="p-12 text-center">
            <FiUsers className="text-4xl text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Registrant</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Interest</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Call Status</th>
                  <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegs.map((reg, index) => {
                  const cfg = callStatusConfig[reg.callStatus] || callStatusConfig.not_called;
                  return (
                    <tr key={reg._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3.5 text-sm text-slate-400">{index + 1}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#F79952] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {reg.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-800 text-sm">{reg.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <FiPhone className="text-xs text-slate-400" />
                            <a href={`tel:${reg.phone}`} className="hover:text-[#41bfb8] transition-colors font-medium">
                              {reg.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <FiMail className="text-xs" />
                            <span className="truncate max-w-[150px]">{reg.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {reg.courseInterest ? (
                          <span className="px-2.5 py-1 bg-[#41bfb8]/10 text-[#41bfb8] rounded-full text-xs font-medium">
                            {reg.courseInterest}
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-slate-500 capitalize">{reg.source || '-'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-slate-500">{formatDate(reg.createdAt)}</span>
                      </td>
                      {/* Call Status Dropdown */}
                      <td className="px-4 py-3.5">
                        <div className="relative">
                          <select
                            value={reg.callStatus || 'not_called'}
                            onChange={(e) => updateCallStatus(reg._id, e.target.value)}
                            disabled={updatingId === reg._id}
                            className={`pl-2 pr-6 py-1.5 rounded-lg text-xs font-semibold border-0 outline-none cursor-pointer appearance-none ${cfg.color} disabled:opacity-50`}
                          >
                            {Object.entries(callStatusConfig).map(([key, { label }]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                          {updatingId === reg._id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                              <div className="w-3 h-3 border-2 border-[#41bfb8] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                        {reg.callNotes && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[120px]" title={reg.callNotes}>
                            💬 {reg.callNotes}
                          </p>
                        )}
                      </td>
                      {/* Note Button */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => setNoteModal({ reg, note: reg.callNotes || '' })}
                          className="p-1.5 text-slate-400 hover:text-[#41bfb8] hover:bg-teal-50 rounded-lg transition-all"
                          title="Add/Edit Note"
                        >
                          <FiMessageSquare className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400">
                Showing {filteredRegs.length} of {registrations.length} registrations
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Note Modal */}
      {noteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-slate-800 outfit mb-1">Call Notes</h3>
            <p className="text-slate-500 text-sm mb-4">{noteModal.reg.name} — {noteModal.reg.phone}</p>
            <textarea
              value={noteModal.note}
              onChange={(e) => setNoteModal(prev => ({ ...prev, note: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none"
              placeholder="Write call notes here... e.g. 'Interested in Web Dev, will call back tomorrow'"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setNoteModal(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await updateCallStatus(noteModal.reg._id, noteModal.reg.callStatus, noteModal.note);
                  setNoteModal(null);
                }}
                className="flex-1 py-2.5 bg-[#41bfb8] text-white rounded-lg font-medium hover:bg-[#38a89d] transition-colors text-sm"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
