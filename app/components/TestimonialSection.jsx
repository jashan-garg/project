'use client';

import { useEffect, useState } from 'react';

const testimonials = [
    {
        text: `Pehle online patthar mangwaya tha, koi asar nahi hua.
        Yahan se certified stone liya aur 2 mahine mein promotion mil gaya!
        Quality matters bhai.`,
        name: 'Vikram Singh',
        city: 'Pune',
    },
    {
        text: `Mujhe emerald suggest kiya gaya tha. Health aur focus dono
        mein improvement dikha. Genuine guidance.`,
        name: 'Anjali Verma',
        city: 'Delhi',
    },
    {
        text: `Proper birth chart analysis ke baad gemstone diya.
        Results noticeable hain. Highly recommended.`,
        name: 'Rahul Mehta',
        city: 'Ahmedabad',
    },
    {
        text: `Pehlay skeptical tha, par 1.5 month mein hi difference
        feel hua. Consultation worth it.`,
        name: 'Suresh Iyer',
        city: 'Chennai',
    },
    {
        text: `Stone ke saath proper wearing method bhi bataya.
        That made the difference.`,
        name: 'Neha Kapoor',
        city: 'Mumbai',
    },
];

const INTERVAL = 3000;

const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);

    // Auto-scroll
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, []);

    const prev = () => {
        setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section className="bg-white py-20" id="reviews">
            <div className="mx-auto max-w-5xl px-6 text-center">
                {/* Tag */}
                <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-xs tracking-wide text-orange-700 mb-6">
                    REAL STORIES
                </span>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                    Real Experiences from <br /> Real People
                </h2>

                <p className="mt-4 text-gray-600">
                    Over 10,000 people have transformed their lives with Humara
                    Pandit
                </p>

                {/* Animated Testimonial Card */}
                <div
                    key={index}
                    className="
                        mx-auto mt-12 max-w-xl rounded-2xl bg-orange-50 p-8 text-left shadow-sm
                        animate-testimonial
                    "
                >
                    <div className="text-5xl text-orange-300 leading-none mb-4">
                        “
                    </div>

                    <div className="mb-3 text-orange-500">★ ★ ★ ★ ★</div>

                    <p className="text-gray-700">{testimonials[index].text}</p>

                    <div className="mt-6 border-t pt-4">
                        <p className="font-medium">
                            {testimonials[index].name}
                        </p>
                        <p className="text-sm text-gray-600">
                            {testimonials[index].city}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-10 flex justify-center items-center gap-4">
                    <button
                        onClick={prev}
                        className="h-8 w-8 rounded-full border flex items-center justify-center"
                    >
                        ‹
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <span
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2 w-2 rounded-full cursor-pointer ${
                                    i === index ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="h-8 w-8 rounded-full border flex items-center justify-center"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
