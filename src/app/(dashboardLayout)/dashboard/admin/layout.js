import React from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import ProtectedRoute from '@/app/providers/protectedRoutes';

const AdminLayout = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["superAdmin", "admin", "trainingManager"]}>
      <div className="min-h-screen bg-slate-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main
          className="
            min-h-screen
            transition-all
            duration-300
            lg:ml-72   /* sidebar width */
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

export default AdminLayout;

