"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, User } from "lucide-react";
import { login, signup } from "./actions";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setMessage(null);

        const action = isLogin ? login : signup;
        const result = await action(formData);

        if (result && result.error) {
            // Human-readable error for missing keys
            if (result.error.includes("project's URL and Key are required") || result.error.includes("fetch failed")) {
                setMessage("Configuration Error: Please update .env.local with valid Supabase keys.");
            } else {
                setMessage(result.error);
            }
            setIsLoading(false);
        } else {
            // Redirect handled by server action
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-matcha/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-matcha/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 z-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isLogin ? "Welcome Back" : "Join the Ritual"}
                    </h1>
                    <p className="text-white/50 text-sm">
                        {isLogin ? "Enter your credentials to access your account." : "Begin your journey with Macha today."}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-white/5 rounded-lg p-1 mb-8">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    {message && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                            {message}
                        </div>
                    )}


                    {!isLogin && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-matcha/50 focus:ring-1 focus:ring-matcha/50 transition-all font-light"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Username</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="johndoe"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-matcha/50 focus:ring-1 focus:ring-matcha/50 transition-all font-light"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">
                            {isLogin ? "Email or Username" : "Email"}
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                name={isLogin ? "identifier" : "email"}
                                type={isLogin ? "text" : "email"}
                                placeholder={isLogin ? "hello@example.com or username" : "hello@example.com"}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-matcha/50 focus:ring-1 focus:ring-matcha/50 transition-all font-light"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-matcha/50 focus:ring-1 focus:ring-matcha/50 transition-all font-light"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-matcha hover:bg-white hover:text-matcha text-white font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
                    >
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Create Account"}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-white/30">
                        By continuing, you agree to our <a href="#" className="underline hover:text-white transition-colors">Terms</a> and <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
                    </p>
                </div>

            </motion.div>
        </main>
    );
}
