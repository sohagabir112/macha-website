'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Security Enhancement: Trusted server-side catalog to prevent client price manipulation
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

    // Security Enhancement: Validate product name against server catalog
    const trustedPrice = PRODUCT_CATALOG[product.name];
    if (trustedPrice === undefined) {
        return { error: "Invalid product." };
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

        if (error) {
            console.error('Failed to update cart item', error);
            return { error: "Failed to update cart." }; // Security Enhancement: Do not leak DB error messages
        }
    } else {
        // Insert new item
        const { error } = await supabase
            .from('cart_items')
            .insert({
                user_id: user.id,
                product_name: product.name,
                price: trustedPrice, // Security Enhancement: Use trusted server price instead of client input
                quantity: 1
            })

        if (error) {
            console.error('Failed to add cart item', error);
            return { error: "Failed to add to cart." }; // Security Enhancement: Do not leak DB error messages
        }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
