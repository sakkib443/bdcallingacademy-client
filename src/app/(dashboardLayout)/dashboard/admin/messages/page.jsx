'use client';

import React, { useState, useEffect } from 'react';
import { FiMail, FiTrash2, FiEye, FiCheck, FiX, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { LuMailOpen, LuMail } from 'react-icons/lu';

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read, replied

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/contacts`);
            const data = await response.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/api/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            if (data.success) {
                setMessages(messages.map(msg => msg._id === id ? { ...msg, status } : msg));
                if (selectedMessage?._id === id) {
                    setSelectedMessage({ ...selectedMessage, status });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const response = await fetch(`${API_URL}/api/contacts/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setMessages(messages.filter(msg => msg._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const openMessage = (message) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            handleStatusUpdate(message._id, 'read');
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || msg.status === filter;

        return matchesSearch && matchesFilter;
    });

    const unreadCount = messages.filter(msg => msg.status === 'unread').length;

    const getStatusColor = (status) => {
        switch (status) {
            case 'unread': return 'bg-blue-100 text-blue-700';
            case 'read': return 'bg-gray-100 text-gray-700';
            case 'replied': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 outfit flex items-center gap-3">
                    <FiMail className="text-[#41bfb8]" />
                    Contact Messages
                    {unreadCount > 0 && (
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </h1>
                <p className="text-gray-500 text-sm mt-1">Manage messages from the contact form</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-[#41bfb8] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        All ({messages.length})
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Unread ({messages.filter(m => m.status === 'unread').length})
                    </button>
                    <button
                        onClick={() => setFilter('read')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'read' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Read ({messages.filter(m => m.status === 'read').length})
                    </button>
                    <button
                        onClick={() => setFilter('replied')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'replied' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Replied ({messages.filter(m => m.status === 'replied').length})
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none"
                        />
                    </div>
                    <button
                        onClick={fetchMessages}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Refresh"
                    >
                        <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin w-8 h-8 border-2 border-[#41bfb8] border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-gray-500 mt-3">Loading messages...</p>
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="p-8 text-center">
                            <FiMail className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No messages found</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredMessages.map((msg) => (
                                <div
                                    key={msg._id}
                                    onClick={() => openMessage(msg)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessage?._id === msg._id ? 'bg-[#41bfb8]/5 border-l-4 border-[#41bfb8]' : ''
                                        } ${msg.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'
                                                }`}>
                                                {msg.status === 'unread' ? (
                                                    <LuMail className="text-blue-600" />
                                                ) : (
                                                    <LuMailOpen className="text-gray-500" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`font-semibold text-gray-800 truncate ${msg.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                                                        }`}>
                                                        {msg.name}
                                                    </h3>
                                                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${getStatusColor(msg.status)}`}>
                                                        {msg.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 truncate">{msg.email}</p>
                                                <p className={`text-sm mt-1 truncate ${msg.status === 'unread' ? 'font-medium text-gray-800' : 'text-gray-600'
                                                    }`}>
                                                    {msg.subject}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs text-gray-400">{formatDate(msg.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Detail */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    {selectedMessage ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMessage.status)}`}>
                                    {selectedMessage.status}
                                </span>
                                <div className="flex items-center gap-2">
                                    {selectedMessage.status !== 'replied' && (
                                        <button
                                            onClick={() => handleStatusUpdate(selectedMessage._id, 'replied')}
                                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                            title="Mark as replied"
                                        >
                                            <FiCheck size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(selectedMessage._id)}
                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedMessage.subject}</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#41bfb8]/10 flex items-center justify-center">
                                        <span className="text-[#41bfb8] font-bold">{selectedMessage.name?.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{selectedMessage.name}</p>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-sm text-[#41bfb8] hover:underline">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">{formatDate(selectedMessage.createdAt)}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                            </div>

                            <div className="mt-6">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#41bfb8] text-white font-medium rounded-lg hover:bg-[#38a89d] transition-colors"
                                >
                                    <FiMail />
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FiEye className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
