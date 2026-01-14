'use client';

import Image from 'next/image';

const people = [
    { img: '/trusted/salman.webp' },
    { img: '/trusted/aishwarya.webp' },
    { img: '/trusted/amitabh.webp' },
    { img: '/trusted/ajay.webp' },
    { img: '/trusted/nita.webp' },
    { img: '/trusted/sonu.webp' },
    { img: '/trusted/shilpa.webp' },
    { img: '/trusted/dilip.webp' },
];

const TrustedSection = () => {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-14 border-b border-gray-300 pb-12">
                    <div>
                        <p className="text-2xl font-semibold">10,000+</p>
                        <p className="text-sm text-gray-600">
                            Consultations Completed
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">4.9 ★</p>
                        <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">100%</p>
                        <p className="text-sm text-gray-600">
                            Birth Chart Based Remedies
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">Pan-India</p>
                        <p className="text-sm text-gray-600">Delivery</p>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-center text-3xl font-serif font-semibold mb-10">
                    Trusted by the Trendsetters
                </h2>

                {/* Scroll Container */}
                <div className="relative overflow-hidden">
                    {/* Scroll Track */}
                    <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused]">
                        {[...people, ...people].map((person, i) => (
                            <div
                                key={i}
                                className="mx-4 w-105 shrink-0 rounded-2xl border border-black/10 bg-white"
                            >
                                <div className="h-65 w-full overflow-hidden rounded-xl">
                                    <Image
                                        src={person.img}
                                        alt="Trusted personality"
                                        width={320}
                                        height={260}
                                        className="h-full w-full object-cover"
                                        priority={i < 4}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedSection;
