'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { PRODUCTS } from '@/utils/products'

export async function addToCart(productId: number) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
    }

    // Security Fix: Look up the product in the server-side source of truth.
    // This prevents price manipulation attacks where a client could send
    // a modified, lower price in the API request.
    const serverProduct = PRODUCTS.find((p) => p.id === productId);
    if (!serverProduct) {
        return { error: "Product not found." }
    }

    // Check if item already exists in cart for this user
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_name', serverProduct.name)
        .single()

    if (existingItem) {
        // Update quantity
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('id', existingItem.id)
            .eq('user_id', user.id) // Ensure we only update items belonging to this user

        if (error) return { error: error.message }
    } else {
        // Insert new item using the trusted server-side price
        const { error } = await supabase
            .from('cart_items')
            .insert({
                user_id: user.id,
                product_name: serverProduct.name,
                price: serverProduct.price,
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
