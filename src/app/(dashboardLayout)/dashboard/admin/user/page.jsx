'use client';

import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiLoader,
  FiShield,
  FiUser,
  FiUsers,
  FiCheck,
  FiX,
  FiClock,
} from 'react-icons/fi';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleDropdown, setRoleDropdown] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/user');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change - uses custom id for API call (backend uses custom id like bac-(2025)01)
  const handleRoleChange = async (mongoId, customId, newRole) => {
    if (!customId) {
      alert('❌ User ID not found');
      return;
    }
    setUpdatingRole(mongoId);
    try {
      const res = await fetch(`http://localhost:5000/api/user/${customId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setUsers(prev => prev.map(user =>
          user._id === mongoId ? { ...user, role: newRole } : user
        ));
        alert(`✅ Role updated to "${newRole}" successfully!`);
      } else {
        alert(`❌ Failed to update role: ${data.message || 'Unknown error'}`);
        console.log('Role update response:', data);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('❌ Network error while updating role');
    } finally {
      setUpdatingRole(null);
      setRoleDropdown(null);
    }
  };

  // Handle status change - uses custom id for API call
  const handleStatusChange = async (mongoId, customId, newStatus) => {
    if (!customId) {
      alert('❌ User ID not found');
      return;
    }
    setUpdatingStatus(mongoId);
    try {
      const res = await fetch(`http://localhost:5000/api/user/${customId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setUsers(prev => prev.map(user =>
          user._id === mongoId ? { ...user, status: newStatus } : user
        ));
        alert(`✅ Status updated to "${newStatus}"!`);
      } else {
        alert(`❌ Failed to update status: ${data.message || 'Backend validation error'}`);
        console.log('Status update response:', data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('❌ Network error while updating status');
    } finally {
      setUpdatingStatus(null);
      setStatusDropdown(null);
    }
  };

  const statuses = ['active', 'pending'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'inactive':
        return 'bg-slate-50 text-slate-600 border border-slate-200';
      case 'suspended':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FiCheck className="text-emerald-500" size={12} />;
      case 'pending':
        return <FiClock className="text-amber-500" size={12} />;
      case 'inactive':
      case 'suspended':
        return <FiX className="text-red-500" size={12} />;
      default:
        return null;
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case 'superAdmin':
        return {
          bg: 'bg-gradient-to-r from-yellow-500 to-amber-600',
          text: 'text-white',
          icon: <FiShield size={12} />
        };
      case 'admin':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-rose-600',
          text: 'text-white',
          icon: <FiShield size={12} />
        };
      case 'trainingManager':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          text: 'text-white',
          icon: <FiUsers size={12} />
        };
      case 'mentor':
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-violet-600',
          text: 'text-white',
          icon: <FiUsers size={12} />
        };
      case 'parent':
        return {
          bg: 'bg-gradient-to-r from-pink-500 to-rose-500',
          text: 'text-white',
          icon: <FiUser size={12} />
        };
      case 'student':
      case 'user':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          text: 'text-white',
          icon: <FiUser size={12} />
        };
      default:
        return {
          bg: 'bg-slate-200',
          text: 'text-slate-700',
          icon: <FiUser size={12} />
        };
    }
  };

  const roles = ['superAdmin', 'admin', 'trainingManager', 'mentor', 'student', 'parent'];

  // Filter users
  const filteredUsers = users.filter(user => {
    if (user.isDeleted) return false;

    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const stats = {
    total: users.filter(u => !u.isDeleted).length,
    superAdmins: users.filter(u => u.role === 'superAdmin' && !u.isDeleted).length,
    admins: users.filter(u => u.role === 'admin' && !u.isDeleted).length,
    trainingManagers: users.filter(u => u.role === 'trainingManager' && !u.isDeleted).length,
    mentors: users.filter(u => u.role === 'mentor' && !u.isDeleted).length,
    students: users.filter(u => (u.role === 'student' || u.role === 'user') && !u.isDeleted).length,
    parents: users.filter(u => u.role === 'parent' && !u.isDeleted).length,
    active: users.filter(u => u.status === 'active' && !u.isDeleted).length,
    pending: users.filter(u => u.status === 'pending' && !u.isDeleted).length,
  };

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 outfit">User Management</h1>
        <p className="text-slate-500 mt-1">Manage platform users, roles and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-500">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-red-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <FiShield className="text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
              <p className="text-xs text-slate-500">Admins</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-purple-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <FiUsers className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.mentors}</p>
              <p className="text-xs text-slate-500">Mentors</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-emerald-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <FiUser className="text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{stats.students}</p>
              <p className="text-xs text-slate-500">Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <FiCheck className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-amber-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <FiClock className="text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#41bfb8] focus:ring-2 focus:ring-[#41bfb8]/20 outline-none transition text-sm"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 focus:border-[#41bfb8] outline-none text-sm bg-white"
          >
            <option value="all">All Roles</option>
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="trainingManager">Training Manager</option>
            <option value="mentor">Mentor</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 focus:border-[#41bfb8] outline-none text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchUsers}
            className="px-4 py-2.5 rounded-lg bg-[#41bfb8] text-white font-medium text-sm hover:bg-[#38a89d] transition flex items-center gap-2"
          >
            <FiLoader className={loading ? 'animate-spin' : ''} size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
          <div className="text-center">
            <FiLoader className="animate-spin text-[#41bfb8] mx-auto" size={40} />
            <p className="text-slate-500 mt-4">Loading users...</p>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Change Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Change Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user, index) => {
                  const roleStyle = getRoleStyle(user.role);
                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || ''}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.firstName || ''} {user.lastName || 'Unknown'}
                            </p>
                            <p className="text-xs text-slate-400">
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <FiMail size={13} className="text-[#41bfb8]" />
                            <span className="truncate max-w-[180px]">{user.email || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <FiPhone size={13} className="text-[#F79952]" />
                            <span>{user.phoneNumber || 'N/A'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono">
                          {user.id || user._id?.slice(-8)}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${roleStyle.bg} ${roleStyle.text} shadow-sm`}
                          >
                            {roleStyle.icon}
                            {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                          >
                            {getStatusIcon(user.status)}
                            {user.status?.charAt(0).toUpperCase() + user.status?.slice(1) || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center relative">
                          <button
                            onClick={() => setRoleDropdown(roleDropdown === user._id ? null : user._id)}
                            disabled={updatingRole === user._id}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-600 hover:border-[#41bfb8] hover:text-[#41bfb8] hover:bg-[#41bfb8]/5 transition text-xs font-semibold disabled:opacity-50"
                          >
                            {updatingRole === user._id ? (
                              <>
                                <FiLoader className="animate-spin" size={14} />
                                <span>Updating...</span>
                              </>
                            ) : (
                              <>
                                <span>Change Role</span>
                                <FiChevronDown size={14} className={roleDropdown === user._id ? 'rotate-180 transition-transform' : 'transition-transform'} />
                              </>
                            )}
                          </button>

                          {/* Role Dropdown */}
                          {roleDropdown === user._id && (
                            <div className="absolute top-full mt-2 z-30 w-44 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 overflow-hidden">
                              <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select New Role</p>
                              {roles.map((role) => {
                                const style = getRoleStyle(role);
                                const isCurrent = user.role === role;
                                return (
                                  <button
                                    key={role}
                                    onClick={() => !isCurrent && handleRoleChange(user._id, user.id, role)}
                                    disabled={isCurrent}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition ${isCurrent
                                      ? 'bg-slate-50 cursor-not-allowed'
                                      : 'hover:bg-slate-50'
                                      }`}
                                  >
                                    <span className={`w-7 h-7 rounded-lg ${style.bg} flex items-center justify-center ${style.text}`}>
                                      {style.icon}
                                    </span>
                                    <span className={`font-semibold ${isCurrent ? 'text-slate-400' : 'text-slate-700'}`}>
                                      {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </span>
                                    {isCurrent && (
                                      <span className="ml-auto">
                                        <FiCheck className="text-emerald-500" size={16} />
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center relative">
                          <button
                            onClick={() => setStatusDropdown(statusDropdown === user._id ? null : user._id)}
                            disabled={updatingStatus === user._id}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50/50 transition text-xs font-semibold disabled:opacity-50"
                          >
                            {updatingStatus === user._id ? (
                              <>
                                <FiLoader className="animate-spin" size={14} />
                                <span>Updating...</span>
                              </>
                            ) : (
                              <>
                                <span>Change Status</span>
                                <FiChevronDown size={14} className={statusDropdown === user._id ? 'rotate-180 transition-transform' : 'transition-transform'} />
                              </>
                            )}
                          </button>

                          {/* Status Dropdown */}
                          {statusDropdown === user._id && (
                            <div className="absolute top-full mt-2 z-30 w-44 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 overflow-hidden">
                              <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Status</p>
                              {statuses.map((status) => {
                                const isCurrent = user.status === status;
                                const statusColors = {
                                  active: { bg: 'bg-emerald-500', icon: <FiCheck size={12} /> },
                                  pending: { bg: 'bg-amber-500', icon: <FiClock size={12} /> },
                                  inactive: { bg: 'bg-slate-400', icon: <FiX size={12} /> },
                                  suspended: { bg: 'bg-red-500', icon: <FiX size={12} /> },
                                };
                                const style = statusColors[status] || { bg: 'bg-slate-400', icon: null };
                                return (
                                  <button
                                    key={status}
                                    onClick={() => !isCurrent && handleStatusChange(user._id, user.id, status)}
                                    disabled={isCurrent}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition ${isCurrent
                                      ? 'bg-slate-50 cursor-not-allowed'
                                      : 'hover:bg-slate-50'
                                      }`}
                                  >
                                    <span className={`w-7 h-7 rounded-lg ${style.bg} flex items-center justify-center text-white`}>
                                      {style.icon}
                                    </span>
                                    <span className={`font-semibold ${isCurrent ? 'text-slate-400' : 'text-slate-700'}`}>
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                    {isCurrent && (
                                      <span className="ml-auto">
                                        <FiCheck className="text-emerald-500" size={16} />
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition"
                            title="Edit User"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                            title="Delete User"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-2xl text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold">No users found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredUsers.length}</span> of <span className="font-semibold text-slate-900">{stats.total}</span> users
            </p>
            <div className="text-xs text-slate-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Click Outside to Close Dropdown */}
      {(roleDropdown || statusDropdown) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => { setRoleDropdown(null); setStatusDropdown(null); }}
        />
      )}
    </div>
  );
}
