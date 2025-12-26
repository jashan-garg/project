'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface DashboardStats {
    totalUsers: number;
    totalDoctors: number;
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    completedAppointments: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/admin/dashboard');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            color: 'text-blue-600 dark:text-blue-400',
            link: '/admin/users',
        },
        {
            title: 'Total Doctors',
            value: stats?.totalDoctors || 0,
            color: 'text-purple-600 dark:text-purple-400',
            link: '/admin/doctors',
        },
        {
            title: 'Total Appointments',
            value: stats?.totalAppointments || 0,
            color: 'text-indigo-600 dark:text-indigo-400',
            link: '/admin/appointments',
        },
        {
            title: 'Pending Appointments',
            value: stats?.pendingAppointments || 0,
            color: 'text-yellow-600 dark:text-yellow-400',
            link: '/admin/appointments',
        },
        {
            title: 'Confirmed Appointments',
            value: stats?.confirmedAppointments || 0,
            color: 'text-green-600 dark:text-green-400',
            link: '/admin/appointments',
        },
        {
            title: 'Completed Appointments',
            value: stats?.completedAppointments || 0,
            color: 'text-teal-600 dark:text-teal-400',
            link: '/admin/appointments',
        },
    ];

    return (
        <PrivateRoute role="admin">
            <div className="py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 dark:text-gray-200">
                    Admin Dashboard
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading dashboard...
                    </div>
                )}

                {/* Dashboard Cards */}
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="
                  bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-700
                  rounded-xl shadow-sm 
                  hover:shadow-md dark:hover:shadow-lg 
                  transition-all duration-200 
                  p-6 flex flex-col items-center text-center
                "
                            >
                                <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                                    {card.title}
                                </h3>

                                <p
                                    className={`text-5xl font-bold ${card.color} mb-4`}
                                >
                                    {card.value}
                                </p>

                                <Link
                                    href={card.link}
                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
}
