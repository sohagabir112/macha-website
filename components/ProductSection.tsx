
import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
    {
        id: 1,
        name: "Ceremonial Grade A",
        price: "$39.00",
        tag: "Best Seller",
        image: "/img/Ceremonial%20Grade%20A.png"
    },
    {
        id: 2,
        name: "Daily Ritual Set",
        price: "$85.00",
        tag: "Bundle",
        image: "/img/Daily%20Ritual%20Set.png"
    },
    {
        id: 3,
        name: "Bamboo Whisk (Chasen)",
        price: "$18.00",
        tag: "Essential",
        image: "/img/Bamboo%20Whisk%20(Chasen).png"
    }
];

export default function ProductSection() {
    return (
        <section className="py-32 bg-[#050505] text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Collection</h3>
                        <p className="text-white/60 max-w-lg font-light text-lg">
                            Discover the tools and teas that define the modern matcha experience.
                        </p>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-2 text-matcha uppercase tracking-widest font-medium mt-8 md:mt-0 px-6 py-3 border border-matcha/20 rounded-full hover:bg-matcha hover:text-black transition-all">
                        View All
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((product) => (
                        <Link href="/shop" key={product.id} className="group cursor-pointer">
                            <div className="relative aspect-[4/5] bg-white/5 mb-6 overflow-hidden rounded-2xl border border-white/5 group-hover:border-matcha/30 transition-all duration-500">

                                {/* Image */}
                                <div className="absolute inset-0 p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {product.tag && (
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs uppercase tracking-widest text-white group-hover:bg-matcha group-hover:text-black group-hover:border-matcha transition-colors duration-300">
                                        Macha {product.tag}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-matcha uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        Macha
                                    </p>
                                    <h4 className="text-xl font-medium tracking-wide mb-1 text-white group-hover:text-matcha transition-colors duration-300">
                                        {product.name}
                                    </h4>
                                </div>
                                <p className="text-white/60 font-mono text-lg">{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
