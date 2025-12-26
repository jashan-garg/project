'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-800 mt-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-3">
                            ClinixSphere
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            A clean, fast, and reliable platform to book
                            appointments with trusted doctors across all
                            specialties.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="footer-link">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/doctors" className="footer-link">
                                    Browse Doctors
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="footer-link">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="footer-link">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="footer-link">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="footer-link">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="footer-link">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="footer-link">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>Email: jashangarg961@gmail.com</li>
                            <li>Phone: +91 6284706101</li>
                            <li>Chandigarh, India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} ClinixSphere. All rights
                        reserved.
                    </p>
                </div>
            </div>

            {/* Custom Link Styles */}
            <style jsx>{`
                .footer-link {
                    color: #6b7280;
                    transition: 0.2s ease;
                }
                .dark .footer-link {
                    color: #9ca3af;
                }
                .footer-link:hover {
                    color: #2563eb;
                }
                .dark .footer-link:hover {
                    color: #3b82f6;
                }
            `}</style>
        </footer>
    );
}
