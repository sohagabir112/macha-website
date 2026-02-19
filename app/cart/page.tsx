
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { checkout } from './actions';
import CartClient from './CartClient';

async function getCartData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: cartItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

    return { user, cartItems };
}

export default async function CartPage() {
    const { user, cartItems } = await getCartData();

    const subtotal = cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-matcha/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-matcha/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">My Bag</h1>
                    <p className="text-white/50">
                        {cartItems?.length || 0} items in your cart
                    </p>
                </header>

                {(!cartItems || cartItems.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/5">
                        <ShoppingBag size={48} className="text-white/20 mb-6" />
                        <h2 className="text-2xl font-medium mb-2">Your bag is empty</h2>
                        <p className="text-white/40 mb-8 max-w-md text-center">It looks like you haven't started your ritual yet. Explore our collection to find your perfect match.</p>
                        <Link href="/shop" className="px-8 py-3 bg-matcha text-white hover:bg-white hover:text-black transition-all rounded-full font-medium tracking-wide uppercase text-sm">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            <CartClient initialItems={cartItems} />
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sticky top-32">
                                <h3 className="text-xl font-bold mb-6 tracking-wide">Summary</h3>

                                <div className="space-y-4 mb-8 text-sm">
                                    <div className="flex justify-between text-white/70">
                                        <span>Subtotal</span>
                                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/70">
                                        <span>Shipping</span>
                                        <span className="font-mono">
                                            {shipping === 0 ? <span className="text-matcha">Free</span> : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-medium text-white">
                                        <span>Total</span>
                                        <span className="font-mono">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <form action={async (formData) => {
                                    "use server"
                                    await checkout(formData)
                                }}>
                                    <button className="w-full bg-white text-black hover:bg-matcha py-4 rounded-xl font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group">
                                        Checkout
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
                                    <Package size={14} />
                                    <span>Free shipping on all orders over $50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
