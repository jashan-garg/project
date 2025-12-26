'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        ClinixSphere
                    </Link>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Generic Links */}
                        <NavItem href="/" label="Home" />
                        <NavItem href="/doctors" label="Doctors" />

                        {/* Patient-specific */}
                        {user?.role === 'patient' && (
                            <NavItem
                                href="/my-appointments"
                                label="My Appointments"
                                className="hidden sm:block"
                            />
                        )}

                        {/* Admin-specific */}
                        {user?.role === 'admin' && (
                            <>
                                <NavItem
                                    href="/admin/dashboard"
                                    label="Dashboard"
                                    className="hidden lg:block"
                                />
                                <NavItem
                                    href="/admin/users"
                                    label="Users"
                                    className="hidden lg:block"
                                />
                                <NavItem
                                    href="/admin/doctors"
                                    label="Doctors"
                                    className="hidden lg:block"
                                />
                                <NavItem
                                    href="/admin/appointments"
                                    label="Appointments"
                                    className="hidden lg:block"
                                />
                            </>
                        )}

                        {/* AUTH */}
                        {user ? (
                            <>
                                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block font-medium">
                                    Hi, {user.name}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 
                                        text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white 
                                        transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavItem href="/login" label="Login" />
                                <Link
                                    href="/register"
                                    className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm 
                                        hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {/* THEME TOGGLE */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 
                                transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

/* --------------------------------------------
    Reusable NavItem Component
-------------------------------------------- */
const NavItem = ({
    href,
    label,
    className = '',
}: {
    href: string;
    label: string;
    className?: string;
}) => (
    <Link
        href={href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
        hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
    >
        {label}
    </Link>
);

/* --------------------------------------------
    Icons
-------------------------------------------- */
const SunIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const MoonIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
    </svg>
);
