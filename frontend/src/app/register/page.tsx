'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        role: 'patient',
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await register(formData);
        if (result.success) {
            router.push('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-180px)] py-12 px-4">
            <div
                className="
                w-full max-w-2xl 
                bg-white dark:bg-gray-800 
                rounded-xl border border-gray-200 dark:border-gray-700 
                shadow-lg dark:shadow-xl 
                p-8 md:p-10
            "
            >
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
                    Create an Account
                </h2>

                {/* ERROR */}
                {error && (
                    <div
                        className="
                        mb-6 px-4 py-3 rounded-lg 
                        bg-red-50 dark:bg-red-900/30 
                        border border-red-200 dark:border-red-800 
                        text-red-700 dark:text-red-300 text-sm
                    "
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Two Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="
                                    w-full px-3 py-2 rounded-lg 
                                    bg-white dark:bg-gray-700 
                                    border border-gray-300 dark:border-gray-600 
                                    text-gray-900 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 dark:focus:ring-blue-400
                                "
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="
                                    w-full px-3 py-2 rounded-lg 
                                    bg-white dark:bg-gray-700 
                                    border border-gray-300 dark:border-gray-600 
                                    text-gray-900 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 dark:focus:ring-blue-400
                                "
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="
                                    w-full px-3 py-2 rounded-lg 
                                    bg-white dark:bg-gray-700 
                                    border border-gray-300 dark:border-gray-600 
                                    text-gray-900 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 dark:focus:ring-blue-400
                                "
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="
                                    w-full px-3 py-2 rounded-lg 
                                    bg-white dark:bg-gray-700 
                                    border border-gray-300 dark:border-gray-600 
                                    text-gray-900 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 dark:focus:ring-blue-400
                                "
                            />
                        </div>

                        {/* DOB */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="
                                    w-full px-3 py-2 rounded-lg 
                                    bg-white dark:bg-gray-700 
                                    border border-gray-300 dark:border-gray-600 
                                    text-gray-900 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-blue-500 dark:focus:ring-blue-400
                                "
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="
                                w-full px-3 py-2 rounded-lg min-h-[90px]
                                bg-white dark:bg-gray-700 
                                border border-gray-300 dark:border-gray-600 
                                text-gray-900 dark:text-gray-200 
                                focus:outline-none focus:ring-2 
                                focus:ring-blue-500 dark:focus:ring-blue-400
                            "
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="
                            w-full py-3 rounded-lg 
                            bg-blue-600 hover:bg-blue-700 
                            dark:bg-blue-500 dark:hover:bg-blue-600 
                            text-white text-sm font-semibold 
                            transition
                        "
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-700 dark:text-gray-300 text-sm">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
