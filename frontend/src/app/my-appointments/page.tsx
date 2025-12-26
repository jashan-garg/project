'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface Appointment {
    _id: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    notes?: string;
    status: string;
    doctor: {
        specialization: string;
        userId: {
            name: string;
        };
    };
}

export default function MyAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('/api/appointments');
            setAppointments(res.data);
        } catch {
            setError('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: string) => {
        if (!confirm('Are you sure you want to cancel this appointment?'))
            return;

        try {
            await axios.put(`/api/appointments/${id}/status`, {
                status: 'cancelled',
            });
            fetchAppointments();
        } catch (err: any) {
            alert(
                err.response?.data?.message || 'Failed to cancel appointment'
            );
        }
    };

    const badgeClass = (status: string) => {
        const base =
            'px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide';

        switch (status) {
            case 'confirmed':
                return (
                    base +
                    ' bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                );
            case 'pending':
                return (
                    base +
                    ' bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                );
            case 'cancelled':
                return (
                    base +
                    ' bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                );
            case 'completed':
                return (
                    base +
                    ' bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                );
            default:
                return (
                    base +
                    ' bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                );
        }
    };

    return (
        <PrivateRoute>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                    My Appointments
                </h1>

                {error && (
                    <div
                        className="
                        mb-6 px-4 py-3 rounded-lg
                        bg-red-50 dark:bg-red-900/30 
                        text-red-700 dark:text-red-300 
                        border border-red-200 dark:border-red-800
                    "
                    >
                        {error}
                    </div>
                )}

                {/* LOADING STATE */}
                {loading && (
                    <div className="text-center py-20 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading appointments...
                    </div>
                )}

                {/* EMPTY */}
                {!loading && appointments.length === 0 && (
                    <div
                        className="
                        bg-white dark:bg-gray-800 
                        rounded-xl shadow-md dark:shadow-lg 
                        border border-gray-200 dark:border-gray-700 
                        p-12 text-center
                    "
                    >
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                            You have no appointments yet.
                        </p>

                        <Link
                            href="/doctors"
                            className="
                                inline-block px-6 py-3 rounded-lg 
                                bg-blue-600 hover:bg-blue-700 
                                dark:bg-blue-500 dark:hover:bg-blue-600 
                                text-white font-medium
                            "
                        >
                            Book Appointment
                        </Link>
                    </div>
                )}

                {/* LIST */}
                <div className="space-y-6">
                    {!loading &&
                        appointments.map((a) => (
                            <div
                                key={a._id}
                                className="
                                    bg-white dark:bg-gray-800 
                                    rounded-xl shadow 
                                    border border-gray-200 dark:border-gray-700 
                                    p-6
                                "
                            >
                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                                        {a.doctor.userId.name}
                                    </h3>

                                    <span className={badgeClass(a.status)}>
                                        {a.status}
                                    </span>
                                </div>

                                {/* DETAILS */}
                                <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">
                                            Specialization:
                                        </strong>{' '}
                                        {a.doctor.specialization}
                                    </p>

                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">
                                            Date:
                                        </strong>{' '}
                                        {new Date(
                                            a.appointmentDate
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">
                                            Time:
                                        </strong>{' '}
                                        {a.appointmentTime}
                                    </p>

                                    <p>
                                        <strong className="text-gray-900 dark:text-gray-200">
                                            Reason:
                                        </strong>{' '}
                                        {a.reason}
                                    </p>

                                    {a.notes && (
                                        <p>
                                            <strong className="text-gray-900 dark:text-gray-200">
                                                Notes:
                                            </strong>{' '}
                                            {a.notes}
                                        </p>
                                    )}
                                </div>

                                {/* CANCEL BUTTON */}
                                {a.status !== 'cancelled' &&
                                    a.status !== 'completed' && (
                                        <button
                                            onClick={() => handleCancel(a._id)}
                                            className="
                                            mt-5 px-5 py-2 rounded-lg 
                                            bg-red-600 hover:bg-red-700 
                                            dark:bg-red-500 dark:hover:bg-red-600 
                                            text-white font-medium
                                        "
                                        >
                                            Cancel Appointment
                                        </button>
                                    )}
                            </div>
                        ))}
                </div>
            </div>
        </PrivateRoute>
    );
}
