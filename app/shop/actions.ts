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

    // Security: Do not trust the client-provided price to prevent Price Manipulation.
    // Look up the product in our trusted data source by name (or ID).
    const serverProduct = PRODUCTS.find(p => p.name === product.name);
    if (!serverProduct) {
        return { error: "Invalid product selected." };
    }
    const trustedPrice = serverProduct.price;

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

        if (error) return { error: error.message }
    } else {
        // Insert new item using the trusted price
        const { error } = await supabase
            .from('cart_items')
            .insert({
                user_id: user.id,
                product_name: serverProduct.name,
                price: trustedPrice,
                quantity: 1
            })

        if (error) return { error: error.message }
    }

    revalidatePath('/shop')
    revalidatePath('/profile')
    return { success: true }
}
