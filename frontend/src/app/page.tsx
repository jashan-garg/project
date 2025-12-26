'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    // Animated Counters
    useEffect(() => {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach((counter) => {
            const target = Number(counter.getAttribute('data-counter'));
            let count = 0;
            const speed = target / 100;

            const update = () => {
                count += speed;
                if (count < target) {
                    counter.textContent = Math.floor(count).toString();
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toString();
                }
            };
            update();
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* ========================= HERO ========================= */}
            <section
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 
                text-white py-24 px-4 rounded-b-3xl shadow-lg"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Healthcare Made Simple.
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
                        Book appointments, connect with trusted doctors, and
                        manage your healthcare journey effortlessly.
                    </p>

                    <Link
                        href="/doctors"
                        className="btn btn-primary btn-large shadow-md hover:shadow-xl"
                    >
                        Browse Doctors
                    </Link>
                </div>
            </section>

            {/* ========================= STATS SECTION ========================= */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: 'Patients Served', value: 12000 },
                        { label: 'Verified Doctors', value: 450 },
                        { label: 'Appointments Booked', value: 38000 },
                        { label: 'Cities Covered', value: 24 },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p
                                className="text-4xl font-extrabold text-blue-600 dark:text-blue-400"
                                data-counter={stat.value}
                            >
                                0
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================= TRUSTED BY ========================= */}
            <section className="max-w-6xl mx-auto px-4 py-12 opacity-90">
                <h2 className="text-center text-xl font-bold text-gray-600 dark:text-gray-300 mb-6">
                    Trusted by Leading Healthcare Providers
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
                    {['Apollo', 'Fortis', 'Max', 'AIIMS', 'Narayana'].map(
                        (brand) => (
                            <div
                                key={brand}
                                className="text-gray-500 dark:text-gray-400 text-lg font-semibold opacity-70 hover:opacity-100 transition"
                            >
                                {brand}
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* ========================= DOCTOR PREVIEW CARDS ========================= */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
                    Featured Doctors
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[1, 2, 3].map((d) => (
                        <div
                            key={d}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg 
                            border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                        Dr. John Doe
                                    </h3>
                                    <p className="text-blue-600 dark:text-blue-400">
                                        Cardiologist
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                Expert in treating heart-related conditions with
                                12+ years of experience.
                            </p>

                            <Link
                                href="/doctors"
                                className="btn btn-primary w-full text-center block"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================= FAQ ACCORDION ========================= */}
            <section className="max-w-5xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {[
                        {
                            q: 'How do I book an appointment?',
                            a: 'Choose your doctor, select a slot, provide details, and confirm your booking instantly.',
                        },
                        {
                            q: 'Is this platform free to use?',
                            a: 'Yes. Browsing doctors and booking appointments is completely free for patients.',
                        },
                        {
                            q: 'Are the doctors verified?',
                            a: 'Every doctor on our platform goes through a strict verification and approval process.',
                        },
                        {
                            q: 'Can I cancel or reschedule appointments?',
                            a: "Absolutely. You can manage your appointments under the 'My Appointments' section.",
                        },
                    ].map((faq, index) => (
                        <details
                            key={index}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                            rounded-lg p-5 cursor-pointer shadow-sm open:shadow-md transition-all"
                        >
                            <summary className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                                {faq.q}
                            </summary>
                            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            {/* ========================= FINAL CTA ========================= */}
            <section
                className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                dark:from-blue-700 dark:to-indigo-700 text-white text-center mt-10 rounded-t-3xl shadow-inner"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Schedule Your Appointment?
                </h2>
                <p className="text-lg opacity-90 mb-8">
                    Find trusted doctors across all major specializations.
                </p>

                <Link href="/doctors" className="btn btn-primary btn-large">
                    Browse Doctors
                </Link>
            </section>
        </div>
    );
}
