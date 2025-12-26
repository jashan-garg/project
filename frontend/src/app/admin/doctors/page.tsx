'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface Doctor {
    _id: string;
    specialization: string;
    experience: number;
    consultationFee: number;
    status: string;
    userId: {
        name: string;
        email: string;
    };
}

export default function AdminDoctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/api/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (doctorId: string, newStatus: string) => {
        try {
            await axios.put(`/api/admin/doctors/${doctorId}/status`, {
                status: newStatus,
            });
            fetchDoctors();
        } catch (error: any) {
            alert(
                error.response?.data?.message ||
                    'Failed to update doctor status'
            );
        }
    };

    return (
        <PrivateRoute role="admin">
            <div className="py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Manage Doctors
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading doctors...
                    </div>
                )}

                {/* Empty State */}
                {!loading && doctors.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-12 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No doctors found.
                        </p>
                    </div>
                )}

                {/* Table */}
                {!loading && doctors.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700/50">
                                    <tr>
                                        {[
                                            'Name',
                                            'Email',
                                            'Specialization',
                                            'Experience',
                                            'Fee',
                                            'Status',
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {doctors.map((doc) => (
                                        <tr
                                            key={doc._id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {doc.userId?.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {doc.userId?.email}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {doc.specialization}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {doc.experience} years
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                ₹{doc.consultationFee}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={doc.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            doc._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        px-3 py-1.5 text-sm rounded-md 
                                                        border border-gray-300 dark:border-gray-600
                                                        bg-white dark:bg-gray-700 
                                                        text-gray-900 dark:text-gray-200
                                                        focus:outline-none focus:ring-2 
                                                        focus:ring-blue-500 dark:focus:ring-blue-400
                                                        transition
                                                    "
                                                >
                                                    <option value="active">
                                                        Active
                                                    </option>
                                                    <option value="inactive">
                                                        Inactive
                                                    </option>
                                                </select>
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
