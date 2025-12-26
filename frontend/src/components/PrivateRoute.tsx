'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const PrivateRoute = ({
    children,
    role,
}: {
    children: React.ReactNode;
    role?: string;
}) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (role && user.role !== role) {
                router.push('/');
            }
        }
    }, [user, loading, role, router]);

    // Loading Screen
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="animate-pulse text-lg text-gray-700 dark:text-gray-300">
                    Verifying access...
                </div>
            </div>
        );
    }

    // No access (user null or wrong role)
    if (!user || (role && user.role !== role)) {
        return null;
    }

    // Authorized
    return <>{children}</>;
};

export default PrivateRoute;
