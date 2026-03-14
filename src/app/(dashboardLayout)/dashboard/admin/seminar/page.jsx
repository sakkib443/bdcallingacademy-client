'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiPlus, FiEdit2, FiTrash2, FiSearch,
  FiCalendar, FiUsers,
  FiChevronLeft, FiChevronRight,
  FiClock, FiBarChart2, FiX,
  FiVideo, FiLink, FiLoader
} from 'react-icons/fi';
import { MdOutlineOnlinePrediction } from 'react-icons/md';

const API_BASE = 'http://localhost:5000/api';

const statusColor = {
  upcoming: 'bg-blue-50 text-blue-700 border border-blue-100',
  ongoing: 'bg-green-50 text-green-700 border border-green-100 animate-pulse',
  completed: 'bg-slate-100 text-slate-600',
  cancelled: 'bg-red-50 text-red-600 border border-red-100',
};

const typeColor = {
  online: 'bg-teal-50 text-teal-600',
  offline: 'bg-orange-50 text-orange-600',
  hybrid: 'bg-purple-50 text-purple-600',
};

// ============================================================
// Live Today Modal
// ============================================================
const LiveTodayModal = ({ seminar, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    zoomJoinLink: seminar?.zoomJoinLink || '',
    zoomPasscode: seminar?.zoomPasscode || '',
    startTime: seminar?.startTime || '',
    endTime: seminar?.endTime || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.zoomJoinLink) {
      setError('Zoom/Meet link is required!');
      return;
    }
    if (!form.startTime || !form.endTime) {
      setError('Start time and end time are required!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/seminars/${seminar._id}/toggle-live`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      onSuccess(data.data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
      className="flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#41bfb8] to-[#F79952] p-5 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <FiX className="text-xl" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-bold tracking-widest">GO LIVE</span>
          </div>
          <h3 className="text-lg font-bold outfit">{seminar.title}</h3>
          <p className="text-white/70 text-sm mt-1">Set this seminar as LIVE on the website</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Zoom/Meet Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              <FiLink className="inline mr-1.5" />
              Zoom / Google Meet Link *
            </label>
            <input
              type="url"
              value={form.zoomJoinLink}
              onChange={(e) => setForm({ ...form, zoomJoinLink: e.target.value })}
              placeholder="https://zoom.us/j/... or https://meet.google.com/..."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all"
              required
            />
          </div>

          {/* Passcode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Passcode (optional)
            </label>
            <input
              type="text"
              value={form.zoomPasscode}
              onChange={(e) => setForm({ ...form, zoomPasscode: e.target.value })}
              placeholder="Seminar passcode"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <FiClock className="inline mr-1.5" />
                Start Time *
              </label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                End Time *
              </label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#41bfb8] focus:ring-1 focus:ring-[#41bfb8]/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
            ⚠️ This will make this seminar <strong>LIVE</strong> on the website. If another seminar is currently live, it will be automatically turned off.
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#41bfb8] to-[#F79952] text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><FiLoader className="animate-spin" /> Processing...</>
              ) : (
                <><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Go Live Now</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================================
// Main Admin Seminar List
// ============================================================
export default function AdminSeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [liveModal, setLiveModal] = useState(null);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, ongoing: 0, completed: 0 });
  const perPage = 10;

  const fetchSeminars = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seminars?limit=100`);
      const data = await res.json();
      const all = data.data || [];
      setSeminars(all);
      setStats({
        total: all.length,
        upcoming: all.filter(s => s.status === 'upcoming').length,
        ongoing: all.filter(s => s.status === 'ongoing').length,
        completed: all.filter(s => s.status === 'completed').length,
      });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSeminars(); }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/seminars/${id}`, { method: 'DELETE' });
      setDeleteConfirm(null);
      fetchSeminars();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleLiveOff = async (id) => {
    try {
      await fetch(`${API_BASE}/seminars/${id}/toggle-live`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      fetchSeminars();
    } catch (err) {
      console.error('Toggle live error:', err);
    }
  };

  const filtered = seminars.filter(s => {
    const matchSearch =
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchType = filterType === 'all' || s.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 outfit">Seminars & Events</h1>
          <p className="text-slate-500 text-sm work">Manage all seminars, track registrations and attendees</p>
        </div>
        <Link
          href="/dashboard/admin/seminar/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all shadow-lg shadow-teal-100"
        >
          <FiPlus className="text-lg" />
          Create Seminar
        </Link>
      </div>

      {/* Currently Live Banner */}
      {seminars.some(s => s.isLiveToday) && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 flex items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
            <div>
              <span className="font-bold text-sm tracking-wider mr-2">CURRENTLY LIVE:</span>
              <span className="text-sm text-white/90">
                {seminars.find(s => s.isLiveToday)?.title}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleToggleLiveOff(seminars.find(s => s.isLiveToday)?._id)}
            className="shrink-0 px-4 py-1.5 bg-white/20 text-white font-medium text-sm rounded-lg hover:bg-white/30 transition-colors border border-white/30"
          >
            Stop Live ✕
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-slate-800', bg: 'bg-white', icon: FiCalendar, iconColor: 'text-[#41bfb8]' },
          { label: 'Upcoming', value: stats.upcoming, color: 'text-blue-700', bg: 'bg-blue-50', icon: FiClock, iconColor: 'text-blue-500' },
          { label: 'Live Now', value: stats.ongoing, color: 'text-green-700', bg: 'bg-green-50', icon: MdOutlineOnlinePrediction, iconColor: 'text-green-500' },
          { label: 'Completed', value: stats.completed, color: 'text-slate-600', bg: 'bg-slate-50', icon: FiBarChart2, iconColor: 'text-slate-400' },
        ].map(({ label, value, color, bg, icon: Icon, iconColor }) => (
          <div key={label} className={`${bg} rounded-xl border border-slate-200 p-5 flex items-center gap-3`}>
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Icon className={`text-lg ${iconColor}`} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
              <p className={`text-2xl font-bold mt-0.5 outfit ${color}`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or speaker..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none transition-all text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none text-sm text-slate-600 bg-white"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Live Now</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#41bfb8]/20 focus:border-[#41bfb8] outline-none text-sm text-slate-600 bg-white"
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-[#41bfb8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Loading seminars...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-2xl text-slate-400" />
            </div>
            <p className="text-slate-500 mb-4">No seminars found</p>
            <Link
              href="/dashboard/admin/seminar/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-all"
            >
              <FiPlus /> Create First Seminar
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Seminar</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Live Today</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Seats</th>
                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((s) => (
                    <tr key={s._id} className={`hover:bg-slate-50 transition-colors ${s.isLiveToday ? 'bg-red-50/50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {s.isLiveToday && (
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0"></span>
                          )}
                          <div>
                            <p className={`font-semibold text-sm line-clamp-1 ${s.isLiveToday ? 'text-red-700' : 'text-slate-800'}`}>
                              {s.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">👨‍🏫 {s.speaker}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <FiCalendar className="text-slate-400 text-xs" />
                          <span>{formatDate(s.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <FiClock className="text-xs" />
                          <span>{s.startTime} - {s.endTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${typeColor[s.type]}`}>
                          {s.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor[s.status]}`}>
                          {s.status === 'ongoing' ? '🔴 Live' : s.status}
                        </span>
                      </td>
                      {/* Live Today Toggle */}
                      <td className="px-6 py-4 text-center">
                        {s.isLiveToday ? (
                          <button
                            onClick={() => handleToggleLiveOff(s._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg shadow-md shadow-red-200 hover:bg-red-600 transition-all animate-pulse"
                            title="Click to stop live"
                          >
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            LIVE ✕
                          </button>
                        ) : (
                          <button
                            onClick={() => setLiveModal(s)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-red-200 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all"
                            title="Set as Live Today"
                          >
                            <FiVideo className="text-xs" />
                            Go Live
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{s.maxSeats}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/dashboard/admin/seminar/${s._id}/registrations`}
                            className="p-2 text-slate-400 hover:text-[#41bfb8] hover:bg-teal-50 rounded-lg transition-all"
                            title="View Registrations"
                          >
                            <FiUsers className="text-sm" />
                          </Link>
                          <Link
                            href={`/dashboard/admin/seminar/${s._id}/attendees`}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Live Attendees"
                          >
                            <FiVideo className="text-sm" />
                          </Link>
                          <Link
                            href={`/dashboard/admin/seminar/create?id=${s._id}`}
                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <FiEdit2 className="text-sm" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(s._id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <FiTrash2 className="text-sm" />
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
                  Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                    <FiChevronLeft />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg font-medium text-sm transition-all ${currentPage === i + 1 ? 'bg-[#41bfb8] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Live Today Modal */}
      {liveModal && (
        <LiveTodayModal
          seminar={liveModal}
          onClose={() => setLiveModal(null)}
          onSuccess={() => fetchSeminars()}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-xl text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 outfit mb-2 text-center">Delete Seminar?</h3>
            <p className="text-slate-500 mb-6 text-center text-sm">This will permanently delete the seminar and all its registrations. This cannot be undone.</p>
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
