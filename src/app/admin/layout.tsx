import AdminHeader from 'src/app/admin/components/AdminHeader';
import AdminSidebar from 'src/app/admin/components/AdminSidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="flex flex-1">
                <AdminSidebar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
