'use client';

import { useState } from 'react';

const faqs = [
    {
        q: 'Is this real? How can I trust you?',
        a: 'Yes. All consultations are done by certified astrologers using birth chart analysis. Stones are authentic and certified, and thousands of users have seen real results.',
    },
    {
        q: 'How is the stone selected?',
        a: 'The gemstone is selected strictly based on your birth chart, planetary positions, and personal life goals — not randomly.',
    },
    {
        q: 'What if I already wear a stone?',
        a: 'Our astrologer will first analyze your existing stone and guide whether it should be continued, replaced, or removed safely.',
    },
    {
        q: 'When will I see results?',
        a: 'Results vary per individual, but most people notice changes within a few weeks of wearing the correctly energized stone.',
    },
    {
        q: 'Is this safe? Any side effects?',
        a: 'Yes, it is completely safe. Stones are recommended only after analysis to avoid negative effects.',
    },
    {
        q: "Can I cancel? What's the refund policy?",
        a: 'Consultation fees are non-refundable once the session is completed. However, support is available for any concerns.',
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="bg-white py-24" id="faq">
            <div className="mx-auto max-w-4xl px-6 md:px-8">
                {/* Pill */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-medium tracking-wide text-blue-700">
                        COMMON QUESTIONS
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-center text-3xl md:text-4xl font-serif font-semibold">
                    Frequently Asked Questions
                </h2>
                <p className="mt-3 text-center text-gray-600">
                    Here are answers to some common questions
                </p>

                {/* FAQ list */}
                <div className="mt-12 space-y-4">
                    {faqs.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-black/10 bg-[#FFF8EE] px-6 py-5"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="flex w-full items-center justify-between text-left text-lg font-medium"
                            >
                                {item.q}
                                <span
                                    className={`ml-4 transition-transform ${
                                        openIndex === i ? 'rotate-180' : ''
                                    }`}
                                >
                                    ▾
                                </span>
                            </button>

                            {openIndex === i && (
                                <p className="mt-4 text-gray-700 leading-relaxed">
                                    {item.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
