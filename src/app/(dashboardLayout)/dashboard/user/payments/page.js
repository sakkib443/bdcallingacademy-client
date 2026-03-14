'use client';

import React from 'react';
import { FiCreditCard, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle, FiDownload, FiLoader } from 'react-icons/fi';

export default function UserPaymentsPage() {
    // Empty payment history for now
    const payments = [];

    // Stats
    const stats = {
        totalSpent: 0,
        pendingPayments: 0,
        completedPayments: 0,
    };

    // Sample payment methods
    const paymentMethods = [
        { id: 1, type: 'bkash', name: 'bKash', number: '01XXX-XXXXX', isDefault: true },
        { id: 2, type: 'nagad', name: 'Nagad', number: 'Not Added', isDefault: false },
    ];

    return (
        <div className="p-6 lg:p-8 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 outfit">Payments</h1>
                <p className="text-slate-500 mt-1">Manage your payment methods and view transaction history</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <FiDollarSign className="text-emerald-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">৳{stats.totalSpent}</p>
                            <p className="text-sm text-slate-500">Total Spent</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <FiClock className="text-amber-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.pendingPayments}</p>
                            <p className="text-sm text-slate-500">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#41bfb8]/10 flex items-center justify-center">
                            <FiCheckCircle className="text-[#41bfb8] text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{stats.completedPayments}</p>
                            <p className="text-sm text-slate-500">Completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Payment History */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <FiCreditCard className="text-[#41bfb8]" />
                        Payment History
                    </h2>

                    {payments.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiCreditCard className="text-3xl text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Payment History</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Your payment history will appear here once you make a purchase.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Payments would be listed here */}
                        </div>
                    )}

                    {/* Processing Notice */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <FiLoader className="text-blue-600 animate-spin" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900">Payment System Processing</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    Online payment integration is currently being developed.
                                    Soon you'll be able to pay via bKash, Nagad, or Card.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Payment Methods</h2>

                    <div className="space-y-3">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`p-4 rounded-xl border-2 ${method.isDefault ? 'border-[#41bfb8] bg-[#41bfb8]/5' : 'border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.type === 'bkash' ? 'bg-pink-100' : 'bg-orange-100'
                                            }`}>
                                            <span className={`text-sm font-bold ${method.type === 'bkash' ? 'text-pink-600' : 'text-orange-600'
                                                }`}>{method.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">{method.name}</p>
                                            <p className="text-xs text-slate-500">{method.number}</p>
                                        </div>
                                    </div>
                                    {method.isDefault && (
                                        <span className="text-xs bg-[#41bfb8] text-white px-2 py-1 rounded-full">Default</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => alert('🔄 Add payment method feature is coming soon!')}
                        className="w-full mt-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-[#41bfb8] hover:text-[#41bfb8] transition flex items-center justify-center gap-2"
                    >
                        <FiLoader className="animate-spin" />
                        Add Payment Method (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
}
