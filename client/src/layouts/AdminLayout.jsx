import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import { AdminNavbar } from '@/components';

// Lazy load the Header component since it's above the fold
const Header = lazy(() => import('@/components/sharedComponents/Header'));

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Suspense fallback={<div className="w-full h-16 bg-gray-100" />}>
                <Header className="w-full" />
            </Suspense>

            {/* Main Layout */}
            <div className="flex flex-1">
                <AdminNavbar className="w-64 bg-primary text-white flex-shrink-0" />

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    <ScrollRestoration />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default React.memo(AdminLayout);
