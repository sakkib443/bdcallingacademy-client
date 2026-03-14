'use client';

import React, { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiCheck, FiCheckCircle } from 'react-icons/fi';

export default function MentorMessagesPage() {
    const [selectedChat, setSelectedChat] = useState(0);
    const [message, setMessage] = useState('');

    const conversations = [
        { id: 0, name: 'Rahim Ahmed', lastMessage: 'Thank you for the explanation!', time: '2 min ago', unread: 2, avatar: 'R', course: 'MERN Stack', online: true },
        { id: 1, name: 'Fatima Khan', lastMessage: 'Can we schedule an extra session?', time: '1 hour ago', unread: 0, avatar: 'F', course: 'React Advanced', online: true },
        { id: 2, name: 'Karim Hossain', lastMessage: 'Got it, will submit tomorrow.', time: '3 hours ago', unread: 0, avatar: 'K', course: 'MERN Stack', online: false },
        { id: 3, name: 'Ayesha Begum', lastMessage: 'The assignment is really helpful.', time: 'Yesterday', unread: 0, avatar: 'A', course: 'Node.js Backend', online: false },
        { id: 4, name: 'Hassan Ali', lastMessage: 'Please check my project.', time: 'Yesterday', unread: 1, avatar: 'H', course: 'React Advanced', online: false },
    ];

    const messages = [
        { id: 1, sender: 'student', text: 'Hello Sir, I have a question about React Hooks.', time: '10:30 AM' },
        { id: 2, sender: 'mentor', text: 'Sure, what would you like to know about hooks?', time: '10:32 AM' },
        { id: 3, sender: 'student', text: 'When should I use useCallback vs useMemo?', time: '10:35 AM' },
        { id: 4, sender: 'mentor', text: 'Great question! useCallback is for memoizing functions, while useMemo is for memoizing computed values. useCallback returns a memoized callback, and useMemo returns a memoized value.', time: '10:38 AM' },
        { id: 5, sender: 'student', text: 'Thank you for the explanation!', time: '10:40 AM' },
    ];

    const handleSend = () => {
        if (message.trim()) {
            // Handle send message
            setMessage('');
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex">
            {/* Conversations List */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 outfit mb-3">Messages</h2>
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedChat(conv.id)}
                            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${selectedChat === conv.id ? 'bg-[#41bfb8]/10 border-l-4 border-[#41bfb8]' : 'hover:bg-slate-50'
                                }`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold">
                                    {conv.avatar}
                                </div>
                                {conv.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-slate-800 truncate">{conv.name}</h3>
                                    <span className="text-xs text-slate-400">{conv.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                                <p className="text-[10px] text-[#41bfb8]">{conv.course}</p>
                            </div>
                            {conv.unread > 0 && (
                                <div className="w-5 h-5 bg-[#41bfb8] rounded-full text-white text-xs flex items-center justify-center font-bold">
                                    {conv.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41bfb8] to-[#38a89d] flex items-center justify-center text-white font-bold">
                                {conversations[selectedChat].avatar}
                            </div>
                            {conversations[selectedChat].online && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-800">{conversations[selectedChat].name}</h3>
                            <p className="text-xs text-slate-500">
                                {conversations[selectedChat].online ? 'Online' : 'Offline'} • {conversations[selectedChat].course}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <FiMoreVertical className="text-slate-400" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${msg.sender === 'mentor' ? 'order-2' : ''}`}>
                                <div
                                    className={`px-4 py-3 rounded-2xl ${msg.sender === 'mentor'
                                            ? 'bg-[#41bfb8] text-white rounded-br-sm'
                                            : 'bg-white text-slate-800 rounded-bl-sm shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'mentor' ? 'justify-end' : ''}`}>
                                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                                    {msg.sender === 'mentor' && (
                                        <FiCheckCircle className="text-[#41bfb8]" size={12} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <FiPaperclip className="text-slate-400" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#41bfb8] focus:border-[#41bfb8] outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="p-3 bg-[#41bfb8] text-white rounded-lg hover:bg-[#38a89d] transition-colors"
                        >
                            <FiSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
