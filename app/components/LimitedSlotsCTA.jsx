'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Clock, Gem } from 'lucide-react';
import Link from 'next/link';

const LimitedSlotsCTA = () => {
    const getTargetTime = () => {
        const target = new Date();
        target.setHours(23, 59, 59, 999);
        return target.getTime();
    };

    const [timeLeft, setTimeLeft] = useState(getTargetTime() - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTargetTime() - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
            2,
            '0'
        );
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <section className="bg-linear-to-b from-[#FFEFE4] to-[#FFD6D6] py-20">
            <div className="mx-auto max-w-4xl px-6 text-center">
                {/* Pill */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-medium tracking-wide text-gray-700 backdrop-blur">
                        <AlertTriangle size={14} />
                        Limited Slots Warning
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
                    Only{' '}
                    <span className="text-purple-600 animate-pulse">5</span>{' '}
                    Consultations Left Today
                </h2>

                {/* Countdown */}
                <div className="mb-6 flex items-center justify-center gap-3">
                    <Clock size={20} className="text-gray-700" />

                    <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-white px-4 py-2 text-lg font-semibold shadow">
                            {hours}
                        </span>
                        :
                        <span className="rounded-lg bg-white px-4 py-2 text-lg font-semibold shadow">
                            {minutes}
                        </span>
                        :
                        <span className="rounded-lg bg-white px-4 py-2 text-lg font-semibold shadow">
                            {seconds}
                        </span>
                    </div>
                </div>

                {/* Subtext */}
                <p className="mb-8 text-gray-700">
                    Next batch of slots opens <strong>tomorrow morning</strong>.
                    Book now to avoid waiting!
                </p>

                {/* CTA */}
                <Link
                    href="#consult"
                    className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-3.5 text-white font-semibold shadow-lg transition hover:scale-105"
                >
                    <Gem size={18} />
                    START MY SACRED CONSULTATION @ ₹251
                </Link>
            </div>
        </section>
    );
};

export default LimitedSlotsCTA;
