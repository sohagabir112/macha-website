
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, Package, LogOut, CreditCard } from 'lucide-react';
import Image from 'next/image';
import ProfileInfo from './ProfileInfo';

async function getUserData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return { user, profile, orders };
}

export default async function ProfilePage() {
    const { user, profile, orders } = await getUserData();

    // Placeholder data for demo if empty
    const demoOrders = orders && orders.length > 0 ? orders : [
        {
            id: 'ord_123456789',
            created_at: new Date().toISOString(),
            status: 'Delivered',
            total_amount: 45.00,
            items: [
                { name: 'Premium Matcha Ceremonial Grade', quantity: 1, price: 35.00 },
                { name: 'Bamboo Whisk', quantity: 1, price: 10.00 }
            ]
        },
        {
            id: 'ord_987654321',
            created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
            status: 'Processing',
            total_amount: 28.50,
            items: [
                { name: 'Matcha Latte Mix', quantity: 2, price: 14.25 }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-matcha/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-matcha/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* Sidebar / User Info */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    <ProfileInfo profile={profile} user={user}>
                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm text-left">
                                <User size={16} className="text-white/60" />
                                <span>Personal Info</span>
                            </div>
                            <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm text-left">
                                <Package size={16} className="text-white/60" />
                                <span>Orders</span>
                            </Link>
                            <Link href="/cart" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm text-left">
                                <ShoppingBag size={16} className="text-white/60" />
                                <span>My Cart</span>
                            </Link>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm text-left">
                                <CreditCard size={16} className="text-white/60" />
                                <span>Payment Methods</span>
                            </div>
                        </div>

                        <form action="/auth/signout" method="post" className="w-full mt-6 pt-6 border-t border-white/10">
                            <button className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </form>
                    </ProfileInfo>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-8 lg:col-span-9 space-y-8">

                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-matcha/20 to-transparent border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Hello, {profile?.full_name?.split(' ')[0] || 'Friend'}</h1>
                            <p className="text-white/60 max-w-md">Track your orders, manage your subscription, and explore new matcha blends curated just for you.</p>
                        </div>
                        <Package className="absolute right-8 bottom-[-20px] text-matcha/10 w-32 h-32 rotate-12" />
                    </div>

                    {/* Recent Orders Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Order History</h3>
                            <Link href="/orders" className="text-xs text-matcha hover:text-white transition-colors uppercase tracking-wider font-medium">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {demoOrders.map((order: any) => (
                                <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-matcha/30 transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 rounded-lg text-matcha">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="font-mono text-sm text-white/40">ORDER #{order.id.slice(-6).toUpperCase()}</p>
                                                <p className="text-xs text-white/30">{new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.status === 'Delivered'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {order.status}
                                            </span>
                                            <span className="text-lg font-bold">${order.total_amount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {/* Parse items cleanly if string or array */}
                                        {(Array.isArray(order.items) ? order.items : JSON.parse(order.items || '[]')).map((item: any, idx: number) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-white/70">{item.quantity}x {item.name || item.product_name}</span>
                                                <span className="text-white/40">${item.price?.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 flex justify-end">
                                        <button className="text-sm text-white/50 hover:text-matcha transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300">
                                            Track Order <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    )
}
