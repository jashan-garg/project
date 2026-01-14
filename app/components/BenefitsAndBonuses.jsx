'use client';

import {
    TrendingUp,
    Briefcase,
    Heart,
    Shield,
    Eye,
    Sparkles,
    Palette,
    BookOpen,
    Wand2,
    Gift,
} from 'lucide-react';

const benefits = [
    {
        title: 'Wealth & Money Growth',
        desc: 'Powerful gemstone remedies for financial stability and growth',
        icon: TrendingUp,
        bg: 'bg-orange-100',
        iconColor: 'text-orange-700',
    },
    {
        title: 'Career Stability',
        desc: 'Exact stone guidance for job, promotion and business success',
        icon: Briefcase,
        bg: 'bg-blue-100',
        iconColor: 'text-blue-700',
    },
    {
        title: 'Love & Marriage Fix',
        desc: 'Permanent solution for relationship problems and marriage delays',
        icon: Heart,
        bg: 'bg-pink-100',
        iconColor: 'text-pink-700',
    },
    {
        title: 'Health Protection',
        desc: 'Protective gemstones for physical and mental health',
        icon: Shield,
        bg: 'bg-green-100',
        iconColor: 'text-green-700',
    },
    {
        title: 'Evil Eye / Negative Energy Removal',
        desc: 'Complete protection from evil eye and negative vibes',
        icon: Eye,
        bg: 'bg-purple-100',
        iconColor: 'text-purple-700',
    },
    {
        title: 'Mental Peace & Confidence',
        desc: 'Remove anxiety and stress, boost inner peace and confidence',
        icon: Sparkles,
        bg: 'bg-gray-200',
        iconColor: 'text-gray-700',
    },
];

const bonuses = [
    {
        title: 'Personal Lucky Colour & Number',
        desc: 'Your lucky colour and number based on your birth chart that you can use in daily life',
        worth: '₹199',
        icon: Palette,
    },
    {
        title: 'Free 7-Day Mantra Remedy Guide',
        desc: 'Complete guide of powerful mantras to chant daily along with your stone',
        worth: '₹299',
        icon: BookOpen,
    },
    {
        title: 'Stone Energization Ritual',
        desc: 'Every stone is energized in temple with sacred rituals before delivery',
        worth: '₹499',
        icon: Wand2,
        highlight: true,
    },
];

const BenefitsAndBonuses = () => {
    return (
        <section className="bg-[#FFF7EE] py-28" id="benefits">
            <div className="mx-auto max-w-7xl px-6 md:px-8 text-center">
                <div className="mb-24">
                    <div className="mb-6 flex justify-center">
                        <span className="rounded-full bg-green-200 px-4 py-1 text-xs font-medium tracking-wide text-green-900">
                            GEMSTONE BENEFITS
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                        Solutions for Every Life Problem
                    </h2>

                    <p className="text-gray-600 mb-14">
                        The right gemstone can improve every area of your life
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {benefits.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl bg-white border border-black/5 p-8"
                                >
                                    <div
                                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                                    >
                                        <Icon
                                            size={20}
                                            className={item.iconColor}
                                        />
                                    </div>
                                    <h3 className="font-serif text-xl font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="mb-6 flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-purple-200 px-4 py-1 text-xs font-medium tracking-wide text-purple-900">
                            <Gift size={14} />
                            FREE BONUSES
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                        FREE with Your Consultation
                    </h2>

                    <p className="text-gray-600 mb-14">
                        All these extra bonuses are included in your ₹251
                        consultation
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
                        {bonuses.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={i}
                                    className={`relative rounded-2xl bg-white border p-8 border-black/5'`}
                                >
                                    <span className="absolute right-4 top-4 rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-900">
                                        Worth {item.worth}
                                    </span>

                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <Icon
                                            size={20}
                                            className="text-purple-700"
                                        />
                                    </div>

                                    <h3 className="font-serif text-xl font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-lg">
                        Total Value:{' '}
                        <span className="line-through text-gray-500">₹997</span>{' '}
                        <strong>You get it FREE!</strong>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BenefitsAndBonuses;
