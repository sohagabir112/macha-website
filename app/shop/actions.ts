'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Trusted server-side catalog to prevent price manipulation
const TRUSTED_PRODUCTS = [
    { name: "Ceremonial Grade A", price: 49.00 },
    { name: "Daily Ritual Set", price: 85.00 },
    { name: "Ceremonial Startup Kit", price: 110.00 },
    { name: "Culinary Grade", price: 29.00 },
    { name: "Bamboo Whisk (Chasen)", price: 25.00 },
    { name: "Traditional Whisk", price: 22.00 },
];

export async function addToCart(product: { name: string, price: string | number }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
    }

    // 🛡️ Sentinel: Validate product against trusted server catalog
    const trustedProduct = TRUSTED_PRODUCTS.find(p => p.name === product.name);
    if (!trustedProduct) {
        return { error: "Invalid product selected." };
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
                product_name: trustedProduct.name,
                price: trustedProduct.price, // Use trusted server price, NOT client price
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
