export default function Footer() {
    return (
        <footer className="relative z-50 bg-[#050505] border-t border-white/10 pt-20 pb-10 text-white/60">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-2xl font-bold text-white tracking-tighter mb-6">MACHA</h4>
                        <p className="max-w-md font-light">
                            Elevating the ritual of matcha with precision, purity, and sustainable energy.
                            Hand-picked from the hills of Shizuoka, Japan.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white font-medium uppercase tracking-widest mb-6">Explore</h5>
                        <ul className="space-y-4 font-light">
                            <li><a href="#" className="hover:text-matcha transition-colors">Shop All</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">Ceremonial Grade</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">Sets & Whisks</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-medium uppercase tracking-widest mb-6">Support</h5>
                        <ul className="space-y-4 font-light">
                            <li><a href="#" className="hover:text-matcha transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">Shipping</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-matcha transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs tracking-wide">
                    <p>&copy; {new Date().getFullYear()} Macha Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
