'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface Doctor {
    _id: string;
    specialization: string;
    experience: number;
    qualifications: string;
    consultationFee: number;
    bio?: string;
    availability?: any;
    userId: {
        name: string;
        email: string;
        phone?: string;
    };
}

export default function DoctorDetail() {
    const params = useParams();
    const router = useRouter();
    const doctorId = params.doctorId as string;

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [relatedDoctors, setRelatedDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctor();
    }, [doctorId]);

    useEffect(() => {
        if (doctor) fetchRelatedDoctors();
    }, [doctor]);

    const fetchDoctor = async () => {
        try {
            const res = await axios.get(`/api/doctors/${doctorId}`);
            setDoctor(res.data);
        } catch {
            setError('Failed to load doctor details');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedDoctors = async () => {
        try {
            const res = await axios.get('/api/doctors');
            const related = res.data
                .filter(
                    (d: Doctor) =>
                        d._id !== doctor?._id &&
                        d.specialization === doctor?.specialization
                )
                .slice(0, 3);

            setRelatedDoctors(related);
        } catch (err) {
            console.error('Failed to fetch related doctors:', err);
        }
    };

    const formatAvailability = (day: string, data: any) => {
        if (!data?.available) {
            return (
                <span className="text-red-600 dark:text-red-400">
                    Not Available
                </span>
            );
        }

        if (data.startTime && data.endTime) {
            return (
                <span className="text-green-600 dark:text-green-400">
                    {data.startTime} - {data.endTime}
                </span>
            );
        }

        return (
            <span className="text-green-600 dark:text-green-400">
                Available
            </span>
        );
    };

    /* LOADING */
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-600 dark:text-gray-400 animate-pulse">
                Loading doctor details...
            </div>
        );
    }

    /* ERROR */
    if (error || !doctor) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 py-4 px-6 rounded-lg">
                    {error || 'Doctor not found'}
                </div>

                <Link
                    href="/doctors"
                    className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Back to Doctors
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* BACK BUTTON */}
            <button
                onClick={() => router.back()}
                className="mb-6 text-blue-600 dark:text-blue-400 hover:underline"
            >
                ← Back to Doctors
            </button>

            {/* HEADER */}
            <div className="rounded-xl overflow-hidden shadow bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-10 text-white mb-10">
                <h1 className="text-4xl font-bold mb-2">
                    {doctor.userId?.name}
                </h1>
                <p className="text-xl opacity-90">{doctor.specialization}</p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-10">
                    {/* ABOUT */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                            About
                        </h2>

                        {doctor.bio ? (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {doctor.bio}
                            </p>
                        ) : (
                            <p className="italic text-gray-500 dark:text-gray-400">
                                No biography available.
                            </p>
                        )}
                    </section>

                    {/* QUALIFICATIONS */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                            Qualifications
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {doctor.qualifications}
                        </p>
                    </section>

                    {/* AVAILABILITY */}
                    {doctor.availability && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-5">
                                Availability
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(doctor.availability).map(
                                    ([day, data]) => (
                                        <div
                                            key={day}
                                            className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                {day}
                                            </span>
                                            {formatAvailability(day, data)}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-6 sticky top-4 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Doctor Information
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Experience
                                </p>
                                <p className="text-lg text-gray-900 dark:text-gray-200 font-semibold">
                                    {doctor.experience} years
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Consultation Fee
                                </p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    ₹{doctor.consultationFee}
                                </p>
                            </div>

                            {doctor.userId.email && (
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Email
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-200">
                                        {doctor.userId.email}
                                    </p>
                                </div>
                            )}

                            {doctor.userId.phone && (
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Phone
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-200">
                                        {doctor.userId.phone}
                                    </p>
                                </div>
                            )}
                        </div>

                        <Link
                            href={`/book-appointment/${doctor._id}`}
                            className="block text-center w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 
                            dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition"
                        >
                            Book Appointment
                        </Link>
                    </div>
                </aside>
            </div>

            {/* RELATED DOCTORS */}
            {relatedDoctors.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Other {doctor.specialization} Specialists
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedDoctors.map((rd) => (
                            <Link
                                key={rd._id}
                                href={`/doctors/${rd._id}`}
                                className="
                                    block bg-white dark:bg-gray-800 rounded-xl 
                                    border border-gray-200 dark:border-gray-700 
                                    shadow hover:shadow-lg transition-all p-6
                                    hover:border-blue-500 dark:hover:border-blue-400
                                "
                            >
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-1">
                                    {rd.userId?.name}
                                </h3>

                                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                    {rd.specialization}
                                </p>

                                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                                    {rd.qualifications}
                                </p>

                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Experience: {rd.experience} years
                                </p>

                                <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
                                    Fee: ₹{rd.consultationFee}
                                </p>

                                <div className="mt-4 py-2 text-center rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
                                    View Profile
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
