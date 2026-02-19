"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Loader2, Check } from "lucide-react";
import { addToCart } from "./actions";
import { useRouter } from "next/navigation";

const PRODUCTS = [
    {
        id: 1,
        name: "Ceremonial Grade A",
        price: 49.00,
        image: "/img/Ceremonial%20Grade%20A.png",
        tag: "Best Seller",
        description: "The highest quality matcha for your daily ritual. Smooth, vibrant, and rich in antioxidants.",
        slug: "ceremonial-grade-a"
    },
    {
        id: 2,
        name: "Daily Ritual Set",
        price: 85.00,
        image: "/img/Daily%20Ritual%20Set.png",
        tag: "Kit",
        description: "Everything you need to start your matcha journey. Includes whisk, bowl, and ceremonial grade matcha.",
        slug: "daily-ritual-set"
    },
    {
        id: 3,
        name: "Ceremonial Startup Kit",
        price: 110.00,
        image: "/img/Ceremonial%20Startup%20Kit.png",
        tag: "Bundle",
        description: "The ultimate collection for the true enthusiast. Hand-crafted tools for the perfect brew.",
        slug: "ceremonial-startup-kit"
    },
    {
        id: 4,
        name: "Culinary Grade",
        price: 29.00,
        image: "/img/Cooking%20Culinary%20Grade.png",
        tag: "Cooking",
        description: "Perfect for lattes, baking, and smoothies. Stronger flavor profile to stand out in recipes.",
        slug: "culinary-grade"
    },
    {
        id: 5,
        name: "Bamboo Whisk (Chasen)",
        price: 25.00,
        image: "/img/Bamboo%20Whisk%20(Chasen).png",
        tag: "Tool",
        description: "Hand-carved from a single piece of bamboo. Essential for creating the perfect froth.",
        slug: "bamboo-whisk-chasen"
    },
    {
        id: 6,
        name: "Traditional Whisk",
        price: 22.00,
        image: "/img/Bamboo%20Whisk.png",
        tag: "Essential",
        description: "Standard 80-prong whisk for everyday use. Durable and effective.",
        slug: "traditional-whisk"
    },
];

export default function ShopPage() {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [successId, setSuccessId] = useState<number | null>(null);

    const handleAddToCart = async (product: any) => {
        setLoadingId(product.id);

        try {
            const result = await addToCart(product);

            if (result.error) {
                if (result.error.includes("log in")) {
                    router.push("/login"); // Redirect if not logged in
                } else {
                    alert(result.error);
                }
            } else {
                setSuccessId(product.id);
                setTimeout(() => setSuccessId(null), 2000); // Reset success after 2s
            }
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-matcha/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] bg-matcha/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto relative z-10">
                <header className="mb-20 max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-matcha text-sm tracking-[0.2em] font-medium uppercase block mb-4"
                    >
                        Our Collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[0.9]"
                    >
                        Pure Fusion <br />
                        <span className="text-white/30">For Your Ritual.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/60 text-lg font-light leading-relaxed"
                    >
                        Source directly from Uji, Japan. Stone-ground to perfection.
                        Experience the collision of tradition and modern energy.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {PRODUCTS.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group"
                        >
                            {/* Product Card */}
                            <div className="relative aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden mb-6 border border-white/5 group-hover:border-matcha/30 transition-all duration-500">

                                {/* Image */}
                                <div className="absolute inset-0 p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                                {/* Tags */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white group-hover:bg-matcha group-hover:text-black group-hover:border-matcha transition-colors duration-300">
                                        {product.tag}
                                    </span>
                                </div>

                                {/* Quick Add Button (appears on hover) */}
                                <div className="absolute bottom-6 right-6 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={loadingId === product.id}
                                        className={`p-3 rounded-full hover:scale-110 transition-all shadow-lg flex items-center justify-center ${successId === product.id ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-matcha'}`}
                                    >
                                        {loadingId === product.id ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : successId === product.id ? (
                                            <Check size={20} />
                                        ) : (
                                            <ShoppingBag size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-medium text-white group-hover:text-matcha transition-colors duration-300 truncate pr-4">
                                        {product.name}
                                    </h3>
                                    <span className="text-lg font-light text-white/90">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
