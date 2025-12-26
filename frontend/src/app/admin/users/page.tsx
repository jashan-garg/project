'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await axios.put(`/api/admin/users/${userId}/role`, {
                role: newRole,
            });
            fetchUsers();
        } catch (error: any) {
            alert(
                error.response?.data?.message || 'Failed to update user role'
            );
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await axios.delete(`/api/admin/users/${userId}`);
            fetchUsers();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to delete user');
        }
    };

    return (
        <PrivateRoute role="admin">
            <div className="py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Manage Users
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading users...
                    </div>
                )}

                {/* Table */}
                {!loading && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700/50">
                                    <tr>
                                        {[
                                            'Name',
                                            'Email',
                                            'Phone',
                                            'Role',
                                            'Actions',
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
                                    {users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {user.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {user.phone || 'N/A'}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        handleRoleChange(
                                                            user._id,
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
                                                    <option value="patient">
                                                        Patient
                                                    </option>
                                                    <option value="doctor">
                                                        Doctor
                                                    </option>
                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user._id)
                                                    }
                                                    className="
                            px-3 py-1.5 text-sm rounded-md 
                            bg-red-500 text-white 
                            hover:bg-red-600 
                            transition shadow-sm
                          "
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
