'use client';

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="pt-4 pb-10">
            <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
                {/* Stats */}
                <div className="mb-8 flex justify-start">
                    <div className="text-left">
                        <p className="text-sm font-semibold text-yellow-600">
                            ⭐ TRUSTED BY ⭐
                        </p>
                        <p className="text-4xl font-bold text-purple-700">
                            12,391
                        </p>
                        <p className="text-sm text-gray-700">Happy Indians</p>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="mx-auto max-w-2xl text-4xl font-serif font-semibold text-gray-900 leading-tight">
                    A good gemstone can <br /> get you:
                </h1>

                {/* Benefits */}
                <div className="mt-6 flex flex-wrap justify-center gap-8 text-purple-700 font-medium">
                    <span>✔ A good partner</span>
                    <span>✔ A lot of money</span>
                    <span>✔ Health Benefits</span>
                </div>

                {/* Hero image */}
                <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                        src="/header_image.webp"
                        alt="Gemstone consultation"
                        width={1200}
                        height={600}
                        className="w-full object-cover"
                        priority
                    />
                </div>

                {/* Sub text */}
                <p className="mt-6 text-gray-700">
                    Get a{' '}
                    <span className="font-semibold">personal consultation</span>{' '}
                    with certified astrologers for just
                    <span className="font-semibold"> ₹251</span> — find your
                    exact lucky gemstone + life guidance.
                </p>

                {/* CTA */}
                <Link
                    href="#consult"
                    className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-white font-semibold shadow-lg transition hover:scale-105"
                >
                    💎 Book My Personal Gemstone Consultation @ ₹251
                </Link>
            </div>
        </header>
    );
};

export default Header;
