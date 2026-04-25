'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Server-side product catalog to act as the source of truth for pricing
// This prevents price manipulation vulnerabilities where clients could send arbitrary prices
const PRODUCT_CATALOG: Record<string, number> = {
    "Ceremonial Grade A": 49.00,
    "Daily Ritual Set": 85.00,
    "Ceremonial Startup Kit": 110.00,
    "Culinary Grade": 29.00,
    "Bamboo Whisk (Chasen)": 25.00,
    "Traditional Whisk": 22.00,
};

export async function addToCart(product: { name: string, price: string | number }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
    }

    // 🚨 Security Fix: Validate product exists and use server-side price to prevent manipulation
    const trustedPrice = PRODUCT_CATALOG[product.name];
    if (trustedPrice === undefined) {
        return { error: "Invalid product selected." }
    }

    // Check if item already exists in cart for this user
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_name', product.name)
        .single()

    if (existingItem) {
        // Update quantity
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('id', existingItem.id)

        if (error) return { error: error.message }
    } else {
        // Insert new item
        const { error } = await supabase
            .from('cart_items')
            .insert({
                user_id: user.id,
                product_name: product.name,
                price: trustedPrice,
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
