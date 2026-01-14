'use client';

import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8 py-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/hp_logo.png"
                        alt="Humara Pandit"
                        width={50}
                        height={50}
                    />
                </div>

                {/* Links */}
                <ul className="hidden md:flex items-center gap-8 font-medium text-gray-800">
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
                    <li>
                        <Link href="#why-us">Why Us</Link>
                    </li>
                </ul>

                <Link
                    href="#consult"
                    className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black shadow-md transition hover:scale-105"
                >
                    ✨ Book Now!
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
