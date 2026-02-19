"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 px-6">
            <div className="container mx-auto max-w-5xl">
                {/* Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32"
                >
                    <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter loading-tight">
                        ROOTED IN <br /> <span className="text-matcha">TRADITION</span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-light text-white/70 max-w-3xl leading-relaxed">
                        We define the intersection of ancient ceremony and modern chaos. A pure, unadulterated experience crafted for the bold.
                    </p>
                </motion.section>

                {/* Content Block 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="aspect-[3/4] bg-[#1a1a1a] rounded-sm relative overflow-hidden"
                    >
                        <Image
                            src="/img/Uji, Kyoto.jpeg"
                            alt="Uji Kyoto Tea Field"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-1000"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-black/60 opacity-50" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Uji, Kyoto</h2>
                        <p className="text-lg text-white/60 mb-6 leading-relaxed">
                            Our matcha is shaded for 30 days before harvest in the misty hills of Uji. This process boosts chlorophyll levels, resulting in a vibrant emerald hue and a complex, umami-rich flavor profile that defines the Macha standard.
                        </p>
                        <p className="text-lg text-white/60 leading-relaxed">
                            We work directly with master tea farmers who have inherited their craft through generations, ensuring every tin contains only the finest first-harvest leaves.
                        </p>
                    </motion.div>
                </div>

                {/* Content Block 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:order-2 aspect-square bg-[#1a1a1a] rounded-full relative overflow-hidden ring-1 ring-white/10"
                    >
                        <Image
                            src="/img/The Ritual.jpeg"
                            alt="Matcha Ritual"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-matcha/10 to-black/60 opacity-60" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:order-1"
                    >
                        <h2 className="text-4xl font-bold mb-6">The Ritual</h2>
                        <p className="text-lg text-white/60 mb-6 leading-relaxed">
                            Matcha is more than a drink; it is a moment of stillness in a chaotic world. The whisking of the tea, the aroma rising, the first sip—it is a sensory reset.
                        </p>
                        <p className="text-lg text-white/60 leading-relaxed">
                            We believe in the power of this ritual to ground, energize, and inspire.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
