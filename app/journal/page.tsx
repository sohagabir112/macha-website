"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ARTICLES = [
    {
        id: 1,
        title: "The Art of the Whisk",
        excerpt: "Mastering the bamboo chasen is the first step to the perfect bowl.",
        date: "Oct 12, 2025",
        category: "Guide",
        image: "/img/The Art of the Whisk.jpeg"
    },
    {
        id: 2,
        title: "Why First Harvest Matters",
        excerpt: "Understanding the difference between ceremonial and culinary grades.",
        date: "Sep 28, 2025",
        category: "Education",
        image: "/img/Why First Harvest Matters.jpeg"
    },
    {
        id: 3,
        title: "Morning Rituals: A CEO's Perspective",
        excerpt: "How replacing coffee with matcha changed my productivity.",
        date: "Sep 15, 2025",
        category: "Lifestyle",
        image: "/img/Morning Rituals.jpeg"
    },
    {
        id: 4,
        title: "Matcha Latte vs. Traditional",
        excerpt: "Exploring the two sides of the same green coin.",
        date: "Aug 30, 2025",
        category: "Brewing",
        image: "/img/Matcha Latte vs. Traditional.avif"
    },
];

export default function JournalPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="border-b border-white/10 pb-12 mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6">The Journal</h1>
                    <p className="text-xl text-white/50 max-w-2xl">
                        Thoughts on tea, design, and the slow life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 pb-32">
                    {ARTICLES.map((article, i) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="aspect-video w-full mb-8 rounded-sm overflow-hidden relative bg-white/5">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <span className="absolute top-4 left-4 text-xs font-bold tracking-wider uppercase text-white/80 bg-black/60 px-2 py-1 backdrop-blur-sm">
                                    {article.category}
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center text-xs text-matcha mb-3 uppercase tracking-widest font-medium">
                                    {article.date}
                                </div>
                                <h2 className="text-3xl font-bold mb-4 group-hover:text-matcha transition-colors duration-300">
                                    {article.title}
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-6 flex-1">
                                    {article.excerpt}
                                </p>
                                <span className="inline-block text-sm font-semibold border-b border-transparent group-hover:border-matcha pb-0.5 transition-all w-max px-0">
                                    Read Story
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
}
