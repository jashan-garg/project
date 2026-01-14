'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#1f1f1f] text-gray-400">
            {/* Top CTA */}
            <div className="flex justify-center pt-16">
                <Link
                    href="#consult"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-md transition hover:scale-105"
                >
                    💎 START MY SACRED CONSULTATION @ ₹251
                </Link>
            </div>

            {/* Main footer content */}
            <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand */}
                <div>
                    <Image
                        src="/hp_logo.png"
                        alt="Humara Pandit"
                        width={48}
                        height={48}
                    />
                    <p className="mt-4 text-sm leading-relaxed max-w-sm">
                        India’s trusted faith-tech platform providing authentic
                        gemstone remedies through verified astrologers and
                        temple-charged stones.
                    </p>

                    <div className="mt-6 flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-2">
                            ✔ Verified Astrologers
                        </span>
                        <span className="flex items-center gap-2">
                            ❤️ 10,000+ Happy Clients
                        </span>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="mb-4 font-serif text-white text-lg">
                        Quick Links
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="#how-it-works">How It Works</Link>
                        </li>
                        <li>
                            <Link href="#benefits">Benefits</Link>
                        </li>
                        <li>
                            <Link href="#reviews">Reviews</Link>
                        </li>
                        <li>
                            <Link href="#faq">FAQ</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="mb-4 font-serif text-white text-lg">
                        Contact Us
                    </h4>
                    <ul className="space-y-3 text-sm">
                        <li>📞 +91 62847 06101</li>
                        <li>✉️ jashangarg961@gmail.com</li>
                        <li>📍 India</li>
                    </ul>
                </div>
            </div>

            {/* Disclaimer cards */}
            <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-[#2a2a2a] p-6 text-sm">
                    <p className="mb-2 font-medium text-white">
                        ⚠️ Spiritual & Karmic Disclaimer
                    </p>
                    <p className="leading-relaxed">
                        Gemstone remedies are based on Vedic astrology
                        principles. Results vary based on individual karma and
                        planetary positions. We do not provide medical or
                        financial advice. No guaranteed results are claimed.
                    </p>
                </div>

                <div className="rounded-xl bg-[#2a2a2a] p-6 text-sm">
                    <p className="mb-2 font-medium text-white">
                        🛡️ Anti-Fraud Warning
                    </p>
                    <p className="leading-relaxed">
                        Only book through the official Humara Pandit website.
                        Beware of fake accounts and unauthorized sellers.
                        Payments must be made only through official channels.
                    </p>
                </div>
            </div>

            {/* Refund */}
            <div className="mt-8 px-6 text-center text-xs text-gray-500">
                Refund Policy: Consultation can be cancelled 24 hours before
                with full refund. Cancellation is not possible after stone order
                because each stone is specifically energized before delivery.
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-white/10 py-6 text-xs">
                <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© 2026 Humara Pandit. Made By Jashan Garg.</p>

                    <div className="flex gap-6">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/refund">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
