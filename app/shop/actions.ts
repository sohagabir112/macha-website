'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Server-side product catalog to enforce correct pricing and prevent price manipulation
const SERVER_PRICES: Record<string, number> = {
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

    // Security: Validate product exists in server catalog
    if (!SERVER_PRICES[product.name]) {
        return { error: "Invalid product selected." };
    }

    // Security: Use trusted server-side price, ignoring client-provided price
    const trustedPrice = SERVER_PRICES[product.name];

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
                price: trustedPrice, // Use server-validated price
                quantity: 1
            })

        if (error) return { error: "Failed to add item to cart." } // Security: Don't leak DB error details
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
