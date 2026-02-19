
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

async function getOrders() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return { orders };
}

export default async function OrdersPage() {
    const { orders } = await getOrders();

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12">
                    <Link href="/profile" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 text-sm transition-colors">
                        <ArrowLeft size={16} /> Back to Profile
                    </Link>
                    <h1 className="text-4xl font-bold">Your Orders</h1>
                </div>

                {(!orders || orders.length === 0) ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                        <Package size={48} className="text-white/20 mx-auto mb-4" />
                        <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                        <p className="text-white/40">Once you make a purchase, it will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-matcha/30 transition-all">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/5 pb-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-lg font-medium tracking-wide">#{order.id.slice(0, 8).toUpperCase()}</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        'bg-white/5 text-white/50 border-white/10'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-white/40">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{Array.isArray(JSON.parse(order.items || '[]')) ? JSON.parse(order.items).length : 0} Items</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">${order.total_amount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {JSON.parse(order.items || '[]').map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-sm py-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                                <span className="text-white/80">{item.product_name}</span>
                                                <span className="text-white/30 text-xs">x{item.quantity}</span>
                                            </div>
                                            <span className="font-mono text-white/50">${item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
