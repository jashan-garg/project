'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);
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
                w-full max-w-md 
                bg-white dark:bg-gray-800 
                rounded-xl border border-gray-200 dark:border-gray-700 
                shadow-lg dark:shadow-xl 
                p-8 md:p-10
            "
            >
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
                    Login
                </h2>

                {/* ERROR MESSAGE */}
                {error && (
                    <div
                        className="
                        mb-4 px-4 py-3 rounded-lg 
                        bg-red-50 dark:bg-red-900/30 
                        border border-red-200 dark:border-red-800 
                        text-red-700 dark:text-red-300 text-sm
                    "
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* EMAIL */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    {/* PASSWORD */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="
                            w-full py-3 rounded-lg 
                            bg-blue-600 hover:bg-blue-700 
                            dark:bg-blue-500 dark:hover:bg-blue-600 
                            text-white font-semibold
                            transition
                        "
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-700 dark:text-gray-300 text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
