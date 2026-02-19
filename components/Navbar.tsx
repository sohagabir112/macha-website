"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-[#050505]/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl tracking-tighter text-matcha">
                    MATCHA
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80 uppercase tracking-widest">
                    <Link href="/shop" className="hover:text-matcha transition-colors">Shop</Link>
                    <Link href="/about" className="hover:text-matcha transition-colors">About</Link>
                    <Link href="/journal" className="hover:text-matcha transition-colors">Journal</Link>
                </div>

                <div className="flex items-center gap-6 text-white/80">
                    <Link href="/profile" className="hover:text-matcha transition-colors uppercase text-xs tracking-widest font-medium">
                        Account
                    </Link>
                    <Link href="/cart" className="hover:text-matcha transition-colors uppercase text-xs tracking-widest font-medium">
                        Cart ({cartCount})
                    </Link>
                </div>
            </div>
        </nav>
    );
}
