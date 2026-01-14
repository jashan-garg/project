'use client';

const ConsultationForm = () => {
    return (
        <section className="bg-[#FFF6EC] py-24" id="consult">
            <div className="mx-auto max-w-7xl px-6 md:px-8 flex justify-center">
                <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-black/5 p-8">
                    {/* Top pill */}
                    <div className="mb-4 flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1 text-xs font-medium text-white">
                            💎 BOOK NOW
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-center text-2xl font-serif font-semibold mb-2">
                        Start Your Sacred Consultation
                    </h2>
                    <p className="text-center text-sm text-gray-600 mb-8">
                        Fill in your details and book your personal consultation
                        for <strong>₹251</strong>
                    </p>

                    {/* Form */}
                    <form className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="10 digit mobile number"
                                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Birth Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Birth Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                        </div>

                        {/* Birth Place */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Birth Place
                            </label>
                            <input
                                type="text"
                                placeholder="City/Town where you were born"
                                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                        {/* Problem */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Main Problem (Optional)
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Briefly describe the problem you want to solve..."
                                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none"
                            />
                        </div>

                        {/* Fee box */}
                        <div className="rounded-xl bg-[#FFF6EC] p-4 border border-black/5">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">
                                    Consultation Fee
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="line-through text-gray-400 text-sm mr-1">
                                        ₹999
                                    </span>
                                    ₹251
                                </p>
                            </div>
                            <p className="text-xs text-gray-600">
                                Includes: Video Call + Birth Chart Analysis +
                                Stone Recommendation + Free Bonuses
                            </p>
                        </div>

                        {/* Security */}
                        <p className="text-center text-xs text-gray-500">
                            🔒 Secured by Razorpay • 100% Safe Payment
                        </p>

                        {/* CTA */}
                        <button
                            type="submit"
                            className="w-full rounded-full bg-black py-4 text-white font-medium tracking-wide transition hover:scale-[1.02]"
                        >
                            💎 PAY ₹251 & BOOK CONSULTATION
                        </button>

                        {/* Trust text */}
                        <p className="text-center text-xs text-gray-500">
                            100% secure • No spam calls • Money back guarantee
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
