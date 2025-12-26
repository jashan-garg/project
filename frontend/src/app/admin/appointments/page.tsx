'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface Appointment {
    _id: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    status: string;
    patient: {
        name: string;
    };
    doctor: {
        userId: {
            name: string;
        };
    };
}

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/appointments');
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
            setLoading(false);
        }
    };

    const handleStatusChange = async (
        appointmentId: string,
        newStatus: string
    ) => {
        try {
            await axios.put(`/api/appointments/${appointmentId}/status`, {
                status: newStatus,
            });
            fetchAppointments();
        } catch (error: any) {
            alert(
                error.response?.data?.message ||
                    'Failed to update appointment status'
            );
        }
    };

    const handleDelete = async (appointmentId: string) => {
        if (!confirm('Are you sure you want to delete this appointment?'))
            return;

        try {
            await axios.delete(`/api/appointments/${appointmentId}`);
            fetchAppointments();
        } catch (error: any) {
            alert(
                error.response?.data?.message || 'Failed to delete appointment'
            );
        }
    };

    return (
        <PrivateRoute role="admin">
            <div className="py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Manage Appointments
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading appointments...
                    </div>
                )}

                {/* Empty */}
                {!loading && appointments.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-12 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No appointments found.
                        </p>
                    </div>
                )}

                {/* Table */}
                {!loading && appointments.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700/50">
                                    <tr>
                                        {[
                                            'Patient',
                                            'Doctor',
                                            'Date',
                                            'Time',
                                            'Reason',
                                            'Status',
                                            'Actions',
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 tracking-wider"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {appointments.map((a) => (
                                        <tr
                                            key={a._id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {a.patient?.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {a.doctor?.userId?.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(
                                                    a.appointmentDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {a.appointmentTime}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {a.reason}
                                            </td>

                                            <td className="px-6 py-4">
                                                <select
                                                    value={a.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            a._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-3 py-1.5 text-sm rounded-md border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-200 transition"
                                                >
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="confirmed">
                                                        Confirmed
                                                    </option>
                                                    <option value="cancelled">
                                                        Cancelled
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(a._id)
                                                    }
                                                    className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
}
