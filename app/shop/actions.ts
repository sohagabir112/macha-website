'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { PRODUCTS } from '@/utils/products'

export async function addToCart(product: { name: string, price: string | number }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Please log in to add items to your cart." }
    }

    // Security: Validate product and price against server-side source of truth
    const serverProduct = PRODUCTS.find(p => p.name === product.name);

    if (!serverProduct) {
        return { error: "Product not found." };
    }

    // Convert prices to numbers for reliable comparison
    const clientPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    if (clientPrice !== serverProduct.price) {
        return { error: "Invalid product price." };
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
