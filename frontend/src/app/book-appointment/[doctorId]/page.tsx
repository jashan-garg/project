'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import PrivateRoute from '@/components/PrivateRoute';

interface Doctor {
    _id: string;
    specialization: string;
    experience: number;
    consultationFee: number;
    userId: {
        name: string;
    };
}

export default function BookAppointment() {
    const params = useParams();
    const router = useRouter();
    const doctorId = params.doctorId as string;

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [formData, setFormData] = useState({
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        notes: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchDoctor();
    }, [doctorId]);

    const fetchDoctor = async () => {
        try {
            const response = await axios.get(`/api/doctors/${doctorId}`);
            setDoctor(response.data);
        } catch {
            setError('Failed to load doctor details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await axios.post('/api/appointments', {
                doctorId,
                ...formData,
            });
            router.push('/my-appointments');
        } catch (error: any) {
            setError(
                error.response?.data?.message || 'Failed to book appointment'
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Book Appointment
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading doctor details...
                    </div>
                )}

                {/* Doctor Not Found */}
                {!loading && !doctor && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg p-6 border border-red-200 dark:border-red-800">
                        Doctor not found.
                    </div>
                )}

                {/* Main Content */}
                {!loading && doctor && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Doctor Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                {doctor.userId?.name}
                            </h2>

                            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mb-3">
                                {doctor.specialization}
                            </p>

                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                Experience:{' '}
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {doctor.experience} years
                                </span>
                            </p>

                            <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                                Fee: ₹{doctor.consultationFee}
                            </p>
                        </div>

                        {/* Appointment Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 lg:col-span-2">
                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="appointmentDate"
                                        value={formData.appointmentDate}
                                        onChange={handleChange}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        required
                                        className="
                                            w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-200
                                            bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                        "
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Appointment Time
                                    </label>
                                    <input
                                        type="time"
                                        name="appointmentTime"
                                        value={formData.appointmentTime}
                                        onChange={handleChange}
                                        required
                                        className="
                                            w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-200
                                            bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                        "
                                    />
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Reason for Visit
                                    </label>
                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required
                                        placeholder="Describe your symptoms or reason for the appointment"
                                        className="
                                            w-full h-28 px-3 py-2 rounded-md resize-none
                                            text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700
                                            border border-gray-300 dark:border-gray-600
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                        "
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Any additional information you'd like to provide"
                                        className="
                                            w-full h-24 px-3 py-2 rounded-md resize-none
                                            text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700
                                            border border-gray-300 dark:border-gray-600
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                        "
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        w-full py-3 text-center rounded-md text-white text-sm font-medium 
                                        bg-blue-600 hover:bg-blue-700 
                                        dark:bg-blue-500 dark:hover:bg-blue-600
                                        transition disabled:opacity-60
                                    "
                                >
                                    {submitting
                                        ? 'Booking...'
                                        : 'Book Appointment'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
}
