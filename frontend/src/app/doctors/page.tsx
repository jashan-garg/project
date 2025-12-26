'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Doctor {
    _id: string;
    specialization: string;
    experience: number;
    qualifications: string;
    consultationFee: number;
    bio?: string;
    userId: {
        name: string;
        email: string;
        phone?: string;
    };
}

type SortOption =
    | 'name-asc'
    | 'name-desc'
    | 'specialization-asc'
    | 'specialization-desc'
    | 'fee-asc'
    | 'fee-desc'
    | 'experience-asc'
    | 'experience-desc'
    | 'none';

export default function Doctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('none');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/api/doctors');
            setDoctors(response.data);
        } catch {
            setError('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const sortedDoctors = useMemo(() => {
        if (sortBy === 'none') return doctors;

        const [field, order] = sortBy.split('-');
        const sorted = [...doctors].sort((a, b) => {
            let aValue: string | number = '';
            let bValue: string | number = '';

            switch (field) {
                case 'name':
                    aValue = a.userId?.name?.toLowerCase() || '';
                    bValue = b.userId?.name?.toLowerCase() || '';
                    break;
                case 'specialization':
                    aValue = a.specialization.toLowerCase();
                    bValue = b.specialization.toLowerCase();
                    break;
                case 'fee':
                    aValue = a.consultationFee;
                    bValue = b.consultationFee;
                    break;
                case 'experience':
                    aValue = a.experience;
                    bValue = b.experience;
                    break;
            }

            if (typeof aValue === 'string') {
                return order === 'asc'
                    ? aValue.localeCompare(bValue as string)
                    : (bValue as string).localeCompare(aValue);
            }

            return order === 'asc'
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number);
        });

        return sorted;
    }, [doctors, sortBy]);

    /* LOADING UI */
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-600 dark:text-gray-400 animate-pulse">
                Loading doctors...
            </div>
        );
    }

    /* ERROR UI */
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 px-6 py-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row justify-between gap-5 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                    Our Doctors
                </h1>

                <div className="flex items-center gap-3">
                    <label
                        htmlFor="sort"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                        Sort by:
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as SortOption)
                        }
                        className="
                            px-4 py-2 rounded-lg text-sm
                            bg-white dark:bg-gray-800
                            border border-gray-300 dark:border-gray-600
                            text-gray-900 dark:text-gray-200
                            focus:outline-none focus:ring-2 
                            focus:ring-blue-500 dark:focus:ring-blue-400
                        "
                    >
                        <option value="none">Default</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="specialization-asc">
                            Specialization (A-Z)
                        </option>
                        <option value="specialization-desc">
                            Specialization (Z-A)
                        </option>
                        <option value="fee-asc">Fee (Low to High)</option>
                        <option value="fee-desc">Fee (High to Low)</option>
                        <option value="experience-asc">
                            Experience (Low to High)
                        </option>
                        <option value="experience-desc">
                            Experience (High to Low)
                        </option>
                    </select>
                </div>
            </div>

            {/* DOCTORS GRID */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {sortedDoctors.map((doctor) => (
                    <Link
                        key={doctor._id}
                        href={`/doctors/${doctor._id}`}
                        className="
                            block bg-white dark:bg-gray-800 
                            border border-gray-200 dark:border-gray-700 
                            rounded-xl shadow-sm p-6 
                            hover:shadow-lg dark:hover:shadow-xl 
                            hover:border-blue-500 dark:hover:border-blue-400 
                            transition-all
                        "
                    >
                        {/* Name */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-1">
                            {doctor.userId.name}
                        </h3>

                        {/* Specialization */}
                        <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-3">
                            {doctor.specialization}
                        </p>

                        {/* Qualifications */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {doctor.qualifications}
                        </p>

                        {/* Experience */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            Experience: {doctor.experience} years
                        </p>

                        {/* Fee */}
                        <p className="text-green-600 dark:text-green-400 font-semibold text-lg mb-4">
                            Fee: ₹{doctor.consultationFee}
                        </p>

                        {/* Bio Preview */}
                        {doctor.bio && (
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                {doctor.bio}
                            </p>
                        )}

                        {/* CTA */}
                        <span
                            className="
                                block text-center w-full py-2 rounded-md
                                bg-blue-600 hover:bg-blue-700
                                dark:bg-blue-500 dark:hover:bg-blue-600 
                                text-white text-sm font-medium
                                transition
                            "
                        >
                            View Details
                        </span>
                    </Link>
                ))}
            </div>

            {/* NO DOCTORS */}
            {sortedDoctors.length === 0 && (
                <div className="text-center text-gray-600 dark:text-gray-400 text-xl py-20">
                    No doctors available at the moment.
                </div>
            )}
        </div>
    );
}
