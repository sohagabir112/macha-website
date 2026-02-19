"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

const FRAME_COUNT = 240;

export default function MatchaSplashCanvas({
    scrollYProgress: externalProgress
}: {
    scrollYProgress?: MotionValue<number>
} = {}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress: internalProgress } = useScroll();
    const currentProgress = externalProgress || internalProgress;

    const smoothProgress = useSpring(currentProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        // Format: ezgif-frame-001.jpg to ezgif-frame-240.jpg
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;

            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            imgArray[i - 1] = img; // Index 0 = frame 1
        }
        setImages(imgArray);
    }, []);

    // Canvas Drawing Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Responsive Canvas Sizing
        const handleResize = () => {
            // Set canvas internal resolution to match window size (responsive)
            // Note: For "contain" logic, we might want higher res, 
            // but window size is good for performance.
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(smoothProgress.get());
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        // Render loop triggered by scroll change
        const unsubscribe = smoothProgress.on("change", (latest) => {
            renderFrame(latest);
        });

        function renderFrame(progress: number) {
            if (!ctx || !canvas) return;

            // Map 0-1 to 0-239
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * FRAME_COUNT)
            );

            const img = images[frameIndex];
            if (!img) return;

            // "Contain" logic: Center and maintain aspect ratio
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image (fit height)
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Canvas is taller than image (fit width)
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Optional: Fill background to ensure no leaking edges
            // ctx.fillStyle = "#050505";
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        // Initial draw
        renderFrame(smoothProgress.get());

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [isLoaded, smoothProgress, images]);

    if (!isLoaded) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full bg-matcha transition-all duration-100 ease-out"
                        style={{ width: `${loadProgress}%` }}
                    />
                </div>
                <p className="font-inter text-sm tracking-widest uppercase opacity-60">
                    Brewing {loadProgress}%
                </p>
            </div>
        );
    }

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
            />

            {/* Scroll Guide - Fades out */}
            <ScrollGuide progress={smoothProgress} />
        </div>
    );
}

function ScrollGuide({ progress }: { progress: MotionValue<number> }) {
    const opacity = useTransform(progress, [0, 0.1], [1, 0]);

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 mix-blend-difference pointer-events-none">
            <div
                style={{ opacity: opacity as any }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em]">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/50" />
            </div>
        </div>
    );
}
