'use client';
import { FileText, Video, Package } from 'lucide-react';

const HowItWorks = () => {
    return (
        <section className="bg-white py-24" id="how-it-works">
            <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
                {/* Pill */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-medium tracking-wide text-blue-700">
                        SIMPLE 3-STEP PROCESS
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                    How Does It Work?
                </h2>

                <p className="text-gray-600 mb-20">
                    Get your exact gemstone remedy in just 3 simple steps
                </p>

                {/* Steps line (desktop only) */}
                <div className="relative hidden md:block mb-20">
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300" />

                    <div className="relative flex justify-between">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className="flex flex-col items-center"
                            >
                                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#FFF7EE] border border-black/5">
                                    <div className="text-center">
                                        <p className="text-xs tracking-wide text-gray-500">
                                            STEP
                                        </p>
                                        <p className="text-3xl font-semibold">
                                            {step}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* Step 1 */}
                    <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <FileText className="text-purple-600" size={20} />
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                            Fill Basic Details
                        </h3>
                        <p className="text-gray-600">
                            Enter your name, birth date, time and place
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Video className="text-purple-600" size={20} />
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                            Talk to Certified Astrologer
                        </h3>
                        <p className="text-gray-600">
                            Get personal consultation via video call
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Package className="text-purple-600" size={20} />
                        </div>
                        <h3 className="font-serif text-xl font-semibold mb-2">
                            Get Exact Gemstone + Remedy
                        </h3>
                        <p className="text-gray-600">
                            Temple-charged stone delivered to your home with
                            wearing guide
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
