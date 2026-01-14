'use client';
import { X, Check, AlertTriangle, Shield } from 'lucide-react';

const Mistakes = () => {
    return (
        <section className="bg-[#FFF7EE] py-24" id="why-us">
            <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
                {/* Pill */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#FFEBD6] px-4 py-1 text-xs font-medium tracking-wide text-[#9A6A3A]">
                        <AlertTriangle size={14} />
                        WHY MOST GEMSTONES FAIL
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-14">
                    Are You Making These Mistakes Too?
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Left: Problems */}
                    <div className="rounded-2xl bg-white border border-black/5 p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                                <X className="text-red-600" size={18} />
                            </span>
                            <h3 className="text-xl font-serif font-semibold">
                                Common Problems
                            </h3>
                        </div>

                        <ul className="space-y-4 text-gray-700">
                            <li className="flex gap-3">
                                <X size={18} className="mt-1 text-[#C9A27A]" />
                                Random gemstones fail because they don’t match
                                your birth chart
                            </li>
                            <li className="flex gap-3">
                                <X size={18} className="mt-1 text-[#C9A27A]" />
                                Money gets wasted on fake or low-quality stones
                            </li>
                            <li className="flex gap-3">
                                <X size={18} className="mt-1 text-[#C9A27A]" />
                                Wrong stones can make your problems worse
                            </li>
                            <li className="flex gap-3">
                                <X size={18} className="mt-1 text-[#C9A27A]" />
                                Without proper energization, stones are useless
                            </li>
                        </ul>
                    </div>

                    {/* Right: Solution */}
                    <div className="rounded-2xl bg-white border border-black/5 p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                                <Shield className="text-green-700" size={18} />
                            </span>
                            <h3 className="text-xl font-serif font-semibold">
                                Humara Pandit Solution
                            </h3>
                        </div>

                        <ul className="space-y-4 text-gray-700">
                            <li className="flex gap-3">
                                <Check
                                    size={18}
                                    className="mt-1 text-[#6B7C93]"
                                />
                                Birth chart based exact stone selection
                            </li>
                            <li className="flex gap-3">
                                <Check
                                    size={18}
                                    className="mt-1 text-[#6B7C93]"
                                />
                                100% authentic certified gemstones
                            </li>
                            <li className="flex gap-3">
                                <Check
                                    size={18}
                                    className="mt-1 text-[#6B7C93]"
                                />
                                Temple energized with sacred rituals
                            </li>
                            <li className="flex gap-3">
                                <Check
                                    size={18}
                                    className="mt-1 text-[#6B7C93]"
                                />
                                Personal guidance from expert astrologers
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="mx-auto mt-14 max-w-3xl text-gray-700">
                    Humara Pandit gives you an{' '}
                    <strong>ethical, scientific and sacred</strong> approach —
                    with birth chart analysis, expert consultation and
                    temple-charged stones all included.
                </p>
            </div>
        </section>
    );
};

export default Mistakes;
