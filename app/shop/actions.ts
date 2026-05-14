'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { PRODUCTS } from '@/utils/products'

export async function addToCart(productData: { id: number }) {
    const supabase = await createClient()

    // Server-side validation of product and pricing to prevent manipulation
    const product = PRODUCTS.find(p => p.id === productData.id)
    if (!product) {
        return { error: "Product not found." }
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
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
                price: product.price,
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
