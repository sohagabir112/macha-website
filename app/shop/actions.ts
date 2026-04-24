'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { PRODUCTS } from './products'

export async function addToCart(product: { name: string, price: string | number }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
    }

    // 🛡️ SECURITY: Validate product against server-side catalog to prevent price manipulation
    const validProduct = PRODUCTS.find(p => p.name === product.name)
    if (!validProduct) {
        return { error: "Invalid product." }
    }

    // Use the trusted server-side price, ignoring the client-provided price
    const trustedPrice = validProduct.price

    // Check if item already exists in cart for this user
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_name', validProduct.name)
        .single()

    if (existingItem) {
        // Update quantity
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('id', existingItem.id)
            .eq('user_id', user.id) // 🛡️ SECURITY: Additional IDOR protection

        if (error) return { error: error.message }
    } else {
        // Insert new item
        const { error } = await supabase
            .from('cart_items')
            .insert({
                user_id: user.id,
                product_name: validProduct.name,
                price: trustedPrice,
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
