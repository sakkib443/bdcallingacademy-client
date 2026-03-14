import React from 'react';
import UserSidebar from '@/components/User/UserSidebar';
import ProtectedRoute from '@/app/providers/protectedRoutes';

const UserLayout = ({ children }) => {
    return (
        <ProtectedRoute allowedRoles={["user", "student", "parent", "admin", "superAdmin"]}>
            <div className="min-h-screen bg-slate-50">
                {/* Sidebar */}
                <UserSidebar />

                {/* Main Content */}
                <main
                    className="
            min-h-screen
            transition-all
            duration-300
            lg:ml-72
          "
                >
                    <div className="p-6 lg:p-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[calc(100vh-4rem)]">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default UserLayout;
